/* 104Lite — shell, storage, quiz engine, calculator */
(function () {
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const pad = n => String(n).padStart(2, "0");
const params = new URLSearchParams(location.search);

/* ---------- accounts (on-device) ---------- */
const RAW = {
  get(k, d) { try { const v = localStorage.getItem("lite104:" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("lite104:" + k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem("lite104:" + k); } catch (e) {} }
};
const auth = {
  session() { return RAW.get("session", null); },
  users() { return RAW.get("users", {}); },
  key(name) { return name.trim().toLowerCase().replace(/\s+/g, " "); },
  async hash(pw, saltB64) {
    const enc = new TextEncoder(), salt = saltB64 ? Uint8Array.from(atob(saltB64), c => c.charCodeAt(0)) : crypto.getRandomValues(new Uint8Array(16));
    const base = await crypto.subtle.importKey("raw", enc.encode(pw), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt, iterations: 150000, hash: "SHA-256" }, base, 256);
    const b64 = a => btoa(String.fromCharCode(...new Uint8Array(a)));
    return { salt: b64(salt), hash: b64(bits) };
  },
  async signup(name, pw) {
    const k = this.key(name), U = this.users();
    if (k.length < 3) throw "Name must be at least 3 characters.";
    if (!/^[\w .@-]+$/.test(k)) throw "Use letters, numbers, spaces, . _ @ - only.";
    if (pw.length < 6) throw "Password must be at least 6 characters.";
    if (U[k]) throw "That name is already taken on this device — log in instead.";
    U[k] = { display: name.trim(), ...(await this.hash(pw)), created: Date.now() };
    RAW.set("users", U); this.start(k, false);
  },
  async login(name, pw) {
    const k = this.key(name), u = this.users()[k];
    if (!u) throw "No account with that name on this device.";
    const h = await this.hash(pw, u.salt);
    if (h.hash !== u.hash) throw "Incorrect password.";
    this.start(k, false);
  },
  guest() { this.start("guest", true); },
  start(k, guest) {
    RAW.set("session", { u: k, guest, at: Date.now() });
    // adopt scores saved before accounts existed
    if (!RAW.get("migrated", false)) { const old = RAW.get("results", null); if (old) { RAW.set(`u:${k}:results`, old); RAW.del("results"); } RAW.set("migrated", true); }
  },
  logout() { RAW.del("session"); location.href = "login.html"; },
  name() { const s = this.session(); if (!s) return null; return s.guest ? "Guest" : (this.users()[s.u] || {}).display || s.u; },
  async deleteAccount() { const s = this.session(); if (!s || s.guest) return; const U = this.users(); delete U[s.u]; RAW.set("users", U);
    Object.keys(localStorage).filter(k => k.startsWith(`lite104:u:${s.u}:`)).forEach(k => localStorage.removeItem(k)); this.logout(); }
};
/* per-user storage: every key is namespaced by the signed-in account (or guest) */
const ns = () => { const s = auth.session(); return `u:${s ? s.u : "guest"}:`; };
const store = {
  get(k, d) { return k === "theme" ? RAW.get(k, d) : RAW.get(ns() + k, d); },
  set(k, v) { return k === "theme" ? RAW.set(k, v) : RAW.set(ns() + k, v); }
};
const results = () => store.get("results", {});
function saveResult(id, r, items) {
  const all = results(); const p = all[id] || { attempts: 0, best: -Infinity }; all[id] = { attempts: p.attempts + 1, best: Math.max(p.best, r.marks), last: r, at: Date.now() }; store.set("results", all);
  /* per-question log for topic-wise analysis: every attempt of every mock/quiz */
  if (items) { // per-question log (question, options, your answer, correct answer, explanation); trimmed oldest-first if storage is tight
    const log = store.get("log", []); log.push({ id, v: r.variant || 0, at: Date.now(), items }); while (log.length > 150) log.shift();
    const key = "lite104:" + ns() + "log";
    for (;;) { try { localStorage.setItem(key, JSON.stringify(log)); break; } catch (e) { if (log.length <= 1) break; log.shift(); } }
  }
}
/* aggregate the log by topic → { topic: { c, w, b, n:{c,w,b}, k:{c,w,b}, src:{ quizId: {c,w,b} } } } */
function topicStats() {
  const S = {}; const z = () => ({ c: 0, w: 0, b: 0 });
  for (const a of store.get("log", [])) for (const it of a.items) {
    const T = S[it.t] = S[it.t] || { ...z(), n: z(), k: z(), src: {} };
    T[it.s]++; (it.k === "N" ? T.n : T.k)[it.s]++; (T.src[a.id] = T.src[a.id] || z())[it.s]++;
  }
  return S;
}
function topicQuestions(t) { // every logged question of topic t, newest first
  const out = [];
  for (const a of store.get("log", [])) a.items.forEach((it, i) => { if (it.t === t && it.q) out.push({ ...it, src: a.id, at: a.at, n: i + 1 }); });
  return out.reverse();
}
function quizAttempts(id) { return store.get("log", []).filter(a => a.id === id && a.items.some(it => it.q)); }
const QTAG = { c: ["Correct", "text-secondary", "check_circle"], w: ["Wrong", "text-error", "cancel"], b: ["Unattempted", "text-on-surface-variant", "radio_button_unchecked"] };
function qReviewHTML(Qs, key, showSrc) { // Qs: [{q,o,a,u,s,k,e,n,src}]
  if (!Qs.length) return "";
  return `<div class="flex items-center gap-1.5 mb-1.5 flex-wrap font-label-mono-sm text-label-mono-sm">${["all", "w", "b", "c"].map(f => `<button data-f="${f}" data-qt="${key}" class="qf px-2 py-0.5 rounded-full border border-outline-variant ${f === "all" ? "bg-secondary text-on-secondary" : ""}">${f === "all" ? "All " + Qs.length : QTAG[f][0] + " " + Qs.filter(x => x.s === f).length}</button>`).join("")}</div>
  <div class="space-y-1.5 max-h-[460px] overflow-y-auto pr-1" data-ql="${key}">${Qs.map(x => `<details data-s="${x.s}" class="qi rounded-lg bg-surface-container-lowest border border-outline-variant/50">
    <summary class="flex items-start gap-2 p-2 cursor-pointer list-none"><span class="material-symbols-outlined text-[17px] ${QTAG[x.s][1]}">${QTAG[x.s][2]}</span><span class="flex-1 font-body-sm text-body-sm text-left line-clamp-2">${esc(x.q)}</span><span class="font-label-mono-sm text-[10px] text-on-surface-variant whitespace-nowrap text-right">${showSrc ? esc(quizTitle(x.src)) + " · " : ""}Q${x.n}<br>${x.k === "N" ? "Numerical" : "Conceptual"}</span></summary>
    <div class="px-2 pb-2 text-left font-body-sm text-body-sm"><p class="mb-1.5">${esc(x.q)}</p>${x.o.map((o, k) => `<p class="px-2 py-1 my-0.5 rounded ${k === x.a ? "bg-secondary-fixed/40 font-semibold" : k === x.u ? "bg-error-container text-on-error-container line-through" : ""}">${"ABCD"[k]}. ${esc(o)}${k === x.a ? " ✓" : k === x.u ? " (your answer)" : ""}</p>`).join("")}
    <p class="mt-1 text-on-surface-variant">${x.u == null ? "Not attempted · 0 marks" : x.u === x.a ? "+3 marks" : "−1 mark"}${x.e ? " · " + esc(x.e) : ""}</p></div></details>`).join("")}</div>`;
}
function bindQFilters(root = document) {
  root.querySelectorAll(".qf").forEach(b => b.onclick = e => { e.preventDefault(); const f = b.dataset.f, k = b.dataset.qt;
    document.querySelectorAll(`.qf[data-qt="${k}"]`).forEach(x => { const on = x === b; x.classList.toggle("bg-secondary", on); x.classList.toggle("text-on-secondary", on); });
    document.querySelectorAll(`[data-ql="${k}"] .qi`).forEach(d => d.classList.toggle("hidden", f !== "all" && d.dataset.s !== f)); });
}
function attemptPanel(id, p, sel) { // per-attempt question analysis (topic quizzes + mocks)
  const at = quizAttempts(id); if (!at.length) { p.innerHTML = ""; return; } sel = sel ?? at.length - 1; const A = at[sel];
  const items = A.items.map((it, i) => ({ ...it, n: i + 1, src: id })), cnt = (s, L = items) => L.filter(x => x.s === s).length;
  const col = { c: "bg-secondary text-on-secondary", w: "bg-error text-on-error", b: "bg-surface-container-highest text-on-surface-variant" };
  const byT = window.TOPICS.map(t => [t, items.filter(x => x.t === t.id)]).filter(([, L]) => L.length);
  p.innerHTML = `<div class="fade-in">
    ${at.length > 1 ? `<div class="flex gap-1.5 flex-wrap mb-2 font-label-mono-sm text-label-mono-sm">${at.map((a, j) => `<button data-j="${j}" class="atBtn px-2.5 py-1 rounded-lg border ${j === sel ? "border-secondary bg-secondary/15 text-secondary font-semibold" : "border-outline-variant"}">Attempt ${j + 1}<span class="text-on-surface-variant font-normal"> · ${new Date(a.at).toLocaleDateString(undefined, { day: "numeric", month: "short" })}</span></button>`).join("")}</div>` : ""}
    <div class="grid grid-cols-4 gap-2 mb-2 text-center font-label-mono-sm text-label-mono-sm">${[["Marks", 3 * cnt("c") - cnt("w") + "/" + 3 * items.length, ""], ["Correct", cnt("c"), "text-secondary"], ["Wrong", cnt("w"), "text-error"], ["Unattempted", cnt("b"), ""]].map(([k, v, c]) => `<div class="rounded-lg bg-surface-container-lowest p-1.5"><p class="text-[10px] text-on-surface-variant">${k}</p><p class="font-semibold ${c}">${v}</p></div>`).join("")}</div>
    ${byT.length > 1 ? `<table class="w-full mb-3 font-label-mono-sm text-label-mono-sm bg-surface-container-lowest rounded-lg overflow-hidden"><thead class="text-on-surface-variant"><tr><th class="text-left px-2 py-1">Topic</th><th>Qs</th><th class="text-secondary">Correct</th><th class="text-error">Wrong</th><th>Unattempted</th><th>Marks</th></tr></thead><tbody>
      ${byT.map(([t, L]) => `<tr class="border-t border-outline-variant/40 text-center"><td class="text-left px-2 py-1 whitespace-nowrap"><span class="text-secondary font-semibold">${t.code}</span> ${esc(t.dept)}</td><td>${L.length}</td><td class="text-secondary">${cnt("c", L)}</td><td class="text-error">${cnt("w", L)}</td><td>${cnt("b", L)}</td><td>${3 * cnt("c", L) - cnt("w", L)}/${3 * L.length}</td></tr>`).join("")}</tbody></table>` : ""}
    <div class="flex gap-1 flex-wrap mb-3">${items.map((x, i) => `<button data-n="${i}" title="Q${i + 1}" class="qDot w-7 h-7 rounded-md font-label-mono-sm text-[11px] font-semibold ${col[x.s]}">${i + 1}</button>`).join("")}</div>
    ${qReviewHTML(items, id + "-" + sel + "-" + (p.dataset.k || ""), false)}</div>`;
  bindQFilters(p);
  p.querySelectorAll(".atBtn").forEach(b => b.onclick = e => { e.stopPropagation(); attemptPanel(id, p, +b.dataset.j); });
  p.querySelectorAll(".qDot").forEach(b => b.onclick = e => { e.stopPropagation(); const d = p.querySelectorAll(".qi")[+b.dataset.n]; p.querySelector('.qf[data-f="all"]').click(); d.open = true; d.scrollIntoView({ behavior: "smooth", block: "nearest" }); });
}
function quizTitle(id) { const m = /^mock-(\d+)$/.exec(id); if (m) return "Mock " + String(m[1]).padStart(2, "0"); const t = /^t-(\w+)-(\d)$/.exec(id); if (t) { const T = (window.TOPICS || []).find(x => x.id === t[1]); return (T ? T.code + " " : "") + "Quiz " + t[2]; } return id; }

/* ---------- marking ---------- */
const MARK = { right: 3, wrong: -1, blank: 0 };

/* ---------- seeded RNG ---------- */
function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed) {
  let s = seed >>> 0;
  const n = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  return { n, f: (a, b, d) => +(a + (b - a) * n()).toFixed(d), i: (a, b) => a + Math.floor(n() * (b - a + 1)), pick: a => a[Math.floor(n() * a.length)] };
}
function shuffle(q, seed) {
  const r = rng(seed), idx = q.o.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(r.n() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  return { ...q, o: idx.map(i => q.o[i]), a: idx.indexOf(q.a) };
}

/* ---------- quiz catalogue ---------- */
const EXPS = ["bio", "chemeng", "chem", "civil", "eee", "mech", "pharm", "phys"];
const MOCKS = Array.from({ length: 10 }, (_, m) => ({ id: "mock-" + (m + 1), n: m + 1, title: `Mixed Mock ${pad(m + 1)}`, qs: 20, min: 30 }));
const topicQuizzes = t => [1, 2, 3].map(k => ({ id: `t-${t}-${k}`, topic: t, k, title: `${TOPICS.find(x => x.id === t).name} · Quiz ${k}`, qs: 10, min: 15 }));
function variant(id) { return store.get("variant:" + id, 0); }
function bumpVariant(id) { store.set("variant:" + id, variant(id) + 1); }

function mk(topic, kind, idx, seedKey) {
  const T = BANK[topic];
  if (kind === "g") { const g = T.gen[idx % T.gen.length]; return { ...g(rng(hash(seedKey))), topic, kind: "Numerical" }; }
  return { ...T.con[idx % T.con.length], topic, kind: "Conceptual" };
}
/* Mock m: 4 × Lecture 1 (2 numerical + 2 conceptual) + 2 × each experiment (numerical-heavy) = 20 */
function buildMock(m, v) {
  const out = [], key = `mock${m}v${v}`;
  [0, 1].forEach(j => out.push(mk("l1", "g", m * 2 + j + v * 3, `${key}l1g${j}`)));
  [0, 1].forEach(j => out.push(mk("l1", "c", m * 2 + j + v * 5, "")));
  EXPS.forEach((t, j) => {
    out.push(mk(t, "g", m * 2 + v, `${key}${t}g0`));
    out.push((m + j) % 2 === 0 ? mk(t, "c", m + v * 3, "") : mk(t, "g", m * 2 + 1 + v, `${key}${t}g1`));
  });
  return out;
}
/* Topic quiz k: 6 numerical + 4 conceptual */
function buildTopic(t, k, v) {
  const out = [], T = BANK[t], key = `t${t}${k}v${v}`;
  for (let j = 0; j < 6; j++) out.push(mk(t, "g", (k - 1) * 6 + j + v, `${key}g${j}`));
  for (let j = 0; j < 4; j++) out.push(mk(t, "c", (k - 1) * 4 + j + v * 4 + (t === "l1" ? (k - 1) * 1 : 0), ""));
  return out;
}
function buildQuiz(id) {
  const v = variant(id);
  let meta, qs;
  const mm = /^mock-(\d+)$/.exec(id), tm = /^t-(\w+)-(\d)$/.exec(id);
  if (mm) { const m = +mm[1] - 1; meta = MOCKS[m]; qs = buildMock(m, v); }
  else if (tm && BANK[tm[1]]) { meta = topicQuizzes(tm[1])[+tm[2] - 1]; qs = buildTopic(tm[1], +tm[2], v); }
  else return null;
  // interleave: mocks are shown in a fixed shuffled order; options shuffled per question
  const order = qs.map((q, i) => [hash(id + v + i + q.q), i]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
  qs = (mm ? order.map(i => qs[i]) : qs).map((q, i) => shuffle(q, hash(id + v + "o" + i + q.q)));
  return { meta: { ...meta, variant: v }, qs };
}

/* ---------- shell ---------- */
const NAV = [["home", "index.html", "home", "Home"], ["topics", "topics.html", "category", "Topics"], ["mocks", "mocks.html", "timer", "Mocks"], ["formulas", "formulas.html", "functions", "Formulas"]];
function shell(o) {
  if (!auth.session()) { window.__gated = 1; location.replace("login.html?next=" + encodeURIComponent((location.pathname.split("/").pop() || "index.html") + location.search)); throw new Error("LITE_GATE"); }
  const sess = auth.session(), uname = auth.name(), initials = sess.guest ? "G" : uname.split(/\s+/).map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const head = document.createElement("header");
  head.className = "fixed top-0 w-full z-40 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.06)]";
  head.innerHTML = `<div class="max-w-3xl mx-auto h-16 px-gutter-mobile flex items-center justify-between gap-space-sm">
    <div class="flex items-center gap-space-sm min-w-0">
      ${o.back ? `<a href="${o.back}" aria-label="Go back" class="min-w-[44px] min-h-[44px] -ml-2 flex items-center justify-center rounded-lg hover:text-secondary"><span class="material-symbols-outlined text-[24px]">arrow_back</span></a>` : ""}
      <a href="index.html" class="flex-shrink-0"><img src="assets/logo.svg" alt="104Lite" class="h-8 w-8"></a>
      <div class="flex flex-col min-w-0"><span class="font-label-mono-sm text-label-mono-sm text-secondary truncate uppercase">${esc(o.kicker || "BITS U104 · Compre Prep")}</span>
      <span class="font-title-md text-title-md truncate">${esc(o.title || "104Lite")}</span></div>
    </div>
    <div class="flex items-center gap-2 flex-shrink-0">${o.right || ""}
    <div class="relative"><button id="userBtn" aria-label="Account" title="${esc(uname)}" class="w-10 h-10 rounded-full ${sess.guest ? "bg-surface-container-high text-on-surface-variant" : "bg-secondary text-on-secondary"} flex items-center justify-center font-label-mono-md text-label-mono-md font-bold">${sess.guest ? '<span class="material-symbols-outlined text-[20px]">person</span>' : esc(initials)}</button>
      <div id="userMenu" class="hidden absolute right-0 top-12 w-60 rounded-xl bg-surface-container-lowest shadow-xl border border-outline-variant/60 p-2 fade-in z-50">
        <div class="px-2.5 py-2"><p class="font-title-md text-title-md truncate">${esc(uname)}</p><p class="font-label-mono-sm text-label-mono-sm text-on-surface-variant">${sess.guest ? "Guest — scores kept on this device" : "Signed in on this device"}</p></div>
        ${sess.guest ? `<a href="login.html?mode=signup" class="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-surface-container-low font-body-sm text-body-sm"><span class="material-symbols-outlined text-[18px] text-secondary">person_add</span>Create an account</a>` : ""}
        <button id="logoutBtn" class="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-surface-container-low font-body-sm text-body-sm text-left"><span class="material-symbols-outlined text-[18px] text-secondary">logout</span>${sess.guest ? "Exit guest mode" : "Log out"}</button>
        ${sess.guest ? "" : `<button id="delBtn" class="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-error-container/40 font-body-sm text-body-sm text-left text-error"><span class="material-symbols-outlined text-[18px]">delete</span>Delete account</button>`}
      </div></div>
    <button id="themeBtn" aria-label="Toggle dark mode" title="Dark / light mode" class="w-10 h-10 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface flex items-center justify-center"><span class="material-symbols-outlined text-[21px]">${document.documentElement.classList.contains("dark") ? "light_mode" : "dark_mode"}</span></button></div>
  </div>`;
  document.body.prepend(head);
  const um = head.querySelector("#userMenu");
  head.querySelector("#userBtn").onclick = e => { e.stopPropagation(); um.classList.toggle("hidden"); };
  document.addEventListener("click", e => { if (!um.contains(e.target)) um.classList.add("hidden"); });
  head.querySelector("#logoutBtn").onclick = () => { if (!document.querySelector("#timer") || confirm("Leave this quiz? Your answers so far will be lost.")) auth.logout(); };
  const del = head.querySelector("#delBtn"); if (del) del.onclick = () => { if (confirm(`Delete the account "${uname}" and all its scores from this device? This can't be undone.`)) auth.deleteAccount(); };
  head.querySelector("#themeBtn").onclick = () => {
    const root = document.documentElement, toDark = !root.classList.contains("dark");
    const apply = () => { root.classList.add("theme-anim"); root.classList.toggle("dark", toDark); store.set("theme", toDark ? "dark" : "light"); head.querySelector("#themeBtn span").textContent = toDark ? "light_mode" : "dark_mode"; setTimeout(() => root.classList.remove("theme-anim"), 500); };
    document.startViewTransition && !matchMedia("(prefers-reduced-motion: reduce)").matches ? document.startViewTransition(apply) : apply();
  };
  if (o.nav !== false) {
    const nav = document.createElement("nav");
    nav.className = "fixed bottom-0 w-full z-40 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(11,28,48,0.06)]";
    nav.innerHTML = `<div class="max-w-3xl mx-auto flex justify-around items-center h-16 px-space-xs">${NAV.map(([k, h, ic, l]) =>
      `<a href="${h}" ${k === o.active ? 'aria-current="page"' : ""} class="flex flex-col items-center justify-center min-w-[64px] min-h-[44px] px-space-sm py-space-xs rounded-lg ${k === o.active ? "text-secondary bg-surface-container-low font-semibold" : "text-on-surface-variant hover:text-on-surface"}"><span class="material-symbols-outlined text-[22px] ${k === o.active ? "fill" : ""}">${ic}</span><span class="font-label-mono-sm text-label-mono-sm mt-0.5">${l}</span></a>`).join("")}</div>`;
    document.body.append(nav);
  }
  const credit = document.createElement("div");
  credit.className = `noprint fixed right-3 ${o.nav !== false ? "bottom-[76px]" : "bottom-3"} z-30 px-2.5 py-1 rounded-full bg-surface-container-lowest/85 backdrop-blur-md shadow-sm border border-outline-variant/50 font-label-mono-sm text-[10px] text-on-surface-variant pointer-events-none select-none`;
  credit.innerHTML = `Made by <span class="text-secondary font-semibold">Parth Potdar</span> · 2026A7PS0677P`;
  document.body.append(credit);
  const t = document.createElement("div");
  t.id = "toast";
  t.className = "fixed bottom-20 left-1/2 -translate-x-1/2 z-[60] bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 font-label-mono-sm text-label-mono-sm pointer-events-none opacity-0 transition-opacity duration-200 whitespace-nowrap";
  t.innerHTML = `<span class="material-symbols-outlined text-secondary-fixed-dim text-[18px]">check_circle</span><span id="toastMsg"></span>`;
  document.body.append(t);
}
let toastT;
function toast(m) { const t = $("#toast"); if (!t) return; $("#toastMsg").textContent = m; t.classList.remove("opacity-0"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.add("opacity-0"), 2200); }

/* ---------- scientific calculator ---------- */
function calcEval(expr, deg, ans) {
  let e = expr.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-").replace(/π/g, "(PI)").replace(/\be\b/g, "(E)").replace(/Ans/g, "(" + ans + ")").replace(/\^/g, "**").replace(/√\(/g, "sqrt(").replace(/√(\d+(\.\d+)?)/g, "sqrt($1)");
  e = e.replace(/(\d+(?:\.\d+)?)E([+-]?\d+)/g, "($1*10**$2)").replace(/(\d)\s*\(/g, "$1*(").replace(/\)\s*(\d|\()/g, ")*$1");
  if (/[^0-9+\-*/().,\s a-zA-Z_]/.test(e)) throw 0;
  const words = e.match(/[a-zA-Z_]+/g) || [];
  const ok = ["sin", "cos", "tan", "asin", "acos", "atan", "log", "ln", "sqrt", "PI", "E", "abs"];
  if (words.some(w => !ok.includes(w))) throw 0;
  const D = deg ? Math.PI / 180 : 1;
  const f = new Function("sin", "cos", "tan", "asin", "acos", "atan", "log", "ln", "sqrt", "PI", "E", "abs", `return (${e});`);
  const v = f(x => Math.sin(x * D), x => Math.cos(x * D), x => Math.tan(x * D), x => Math.asin(x) / D, x => Math.acos(x) / D, x => Math.atan(x) / D, Math.log10, Math.log, Math.sqrt, Math.PI, Math.E, Math.abs);
  if (!isFinite(v)) throw 0; return v;
}
function calculator() {
  if ($("#calc")) { $("#calc").classList.toggle("hidden"); return; }
  const keys = [["sin(", "cos(", "tan(", "deg"], ["log(", "ln(", "√(", "^"], ["(", ")", "π", "e"], ["7", "8", "9", "÷"], ["4", "5", "6", "×"], ["1", "2", "3", "−"], ["0", ".", "E", "+"], ["Ans", "⌫", "C", "="]];
  const el = document.createElement("div"); el.id = "calc";
  el.className = "fixed z-50 right-3 bottom-12 w-[290px] bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/60 p-3 flex flex-col gap-2 fade-in";
  el.innerHTML = `<div class="flex items-center justify-between cursor-move" id="calcBar"><span class="font-label-mono-sm text-label-mono-sm text-secondary uppercase font-semibold flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">calculate</span>Calculator</span><button id="calcX" class="w-7 h-7 rounded-full hover:bg-surface-container flex items-center justify-center"><span class="material-symbols-outlined text-[18px]">close</span></button></div>
  <div class="rounded-lg bg-surface-container-low px-3 py-2 text-right"><div id="cIn" class="font-label-mono-md text-label-mono-md text-on-surface-variant min-h-[18px] break-all"></div><div id="cOut" class="font-headline-sm text-headline-sm truncate">0</div></div>
  <div class="grid grid-cols-4 gap-1.5">${keys.flat().map(k => `<button data-k="${k}" class="h-10 rounded-lg font-label-mono-md text-label-mono-md ${k === "=" ? "bg-secondary text-on-secondary font-bold" : /^[0-9.]$/.test(k) ? "bg-surface-container-high" : k === "C" || k === "⌫" ? "bg-error-container/60 text-on-error-container" : "bg-surface-container"} hover:brightness-95 active:scale-95">${k === "deg" ? '<span id="cMode">DEG</span>' : k.replace("(", "")}</button>`).join("")}</div>`;
  document.body.append(el);
  let expr = "", ans = 0, deg = true; const inp = $("#cIn"), out = $("#cOut");
  const show = () => { inp.textContent = expr; try { out.textContent = expr ? +calcEval(expr, deg, ans).toPrecision(10) : (ans || 0); out.classList.remove("text-error"); } catch (e) { out.classList.add("text-error"); } };
  el.querySelectorAll("button[data-k]").forEach(b => b.onclick = () => {
    const k = b.dataset.k;
    if (k === "C") expr = ""; else if (k === "⌫") expr = expr.slice(0, -1);
    else if (k === "deg") { deg = !deg; $("#cMode").textContent = deg ? "DEG" : "RAD"; }
    else if (k === "=") { try { ans = +calcEval(expr, deg, ans).toPrecision(12); out.textContent = ans; inp.textContent = expr + " ="; expr = ""; return; } catch (e) { out.textContent = "Error"; out.classList.add("text-error"); return; } }
    else expr += k;
    show();
  });
  document.addEventListener("keydown", e => { if ($("#calc").classList.contains("hidden") || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    const map = { "*": "×", "/": "÷", "-": "−", Enter: "=", Backspace: "⌫", Escape: "C" }; const k = map[e.key] || e.key;
    const b = el.querySelector(`button[data-k="${CSS.escape(k)}"]`); if (b && (/^[0-9.+^()]$/.test(e.key) || map[e.key])) { e.preventDefault(); b.click(); } });
  $("#calcX").onclick = () => el.classList.add("hidden");
  // drag
  let dx, dy; $("#calcBar").onpointerdown = e => { const r = el.getBoundingClientRect(); dx = e.clientX - r.left; dy = e.clientY - r.top; const mv = ev => { el.style.left = ev.clientX - dx + "px"; el.style.top = ev.clientY - dy + "px"; el.style.right = "auto"; el.style.bottom = "auto"; }; document.addEventListener("pointermove", mv); document.addEventListener("pointerup", () => document.removeEventListener("pointermove", mv), { once: true }); };
}

window.ACE = { attemptPanel, topicStats, topicQuestions, quizAttempts, qReviewHTML, bindQFilters, quizTitle, auth, RAW, $, esc, pad, params, store, results, saveResult, MARK, MOCKS, EXPS, topicQuizzes, buildQuiz, variant, bumpVariant, shell, toast, calculator, calcEval, hash };
})();
