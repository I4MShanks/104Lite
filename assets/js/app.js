/* 104Lite — shell, storage, quiz engine, calculator */
(function () {
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const pad = n => String(n).padStart(2, "0");
const params = new URLSearchParams(location.search);

/* ---------- storage ---------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem("lite104:" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("lite104:" + k, JSON.stringify(v)); } catch (e) {} }
};
const results = () => store.get("results", {});
function saveResult(id, r) { const all = results(); const p = all[id] || { attempts: 0, best: -Infinity }; all[id] = { attempts: p.attempts + 1, best: Math.max(p.best, r.marks), last: r, at: Date.now() }; store.set("results", all); }

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
    <button id="themeBtn" aria-label="Toggle dark mode" title="Dark / light mode" class="w-10 h-10 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface flex items-center justify-center"><span class="material-symbols-outlined text-[21px]">${document.documentElement.classList.contains("dark") ? "light_mode" : "dark_mode"}</span></button></div>
  </div>`;
  document.body.prepend(head);
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

window.ACE = { $, esc, pad, params, store, results, saveResult, MARK, MOCKS, EXPS, topicQuizzes, buildQuiz, variant, bumpVariant, shell, toast, calculator, calcEval, hash };
})();
