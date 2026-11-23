/* ACE104 shared app shell, storage, narration engine and result-booklet calculators */
(function () {
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const pad = n => String(n).padStart(2, "0");
const slideSrc = (id, n) => `assets/slides/${id}/p-${pad(n)}.jpg`;
const params = new URLSearchParams(location.search);

/* ---------- storage ---------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem("ace104:" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("ace104:" + k, JSON.stringify(v)); } catch (e) {} }
};
function markVisited(id) { const v = store.get("visited", []); if (!v.includes(id)) { v.push(id); store.set("visited", v); } }
function scores() { return store.get("scores", {}); }
function saveScore(key, pct) { const s = scores(); s[key] = { best: Math.max(pct, (s[key] || {}).best || 0), last: pct, at: Date.now() }; store.set("scores", s); }

/* ---------- shell ---------- */
const NAV = [["home", "index.html", "home", "Home"], ["lectures", "lectures.html", "play_circle", "Lectures"], ["practice", "practice.html", "assignment_turned_in", "Practice"], ["vault", "vault.html", "folder_zip", "Vault"]];
function shell(o) {
  const head = document.createElement("header");
  head.className = "fixed top-0 w-full z-40 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]";
  head.innerHTML = `<div class="max-w-3xl mx-auto h-16 px-gutter-mobile flex items-center justify-between gap-space-sm">
    <div class="flex items-center gap-space-sm min-w-0">
      ${o.back ? `<a href="${o.back}" aria-label="Go back" class="min-w-[44px] min-h-[44px] -ml-2 flex items-center justify-center rounded-lg hover:text-secondary"><span class="material-symbols-outlined text-[24px]">arrow_back</span></a>` : ""}
      <a href="index.html" class="flex-shrink-0"><img src="assets/logo.svg" alt="ACE104 logo" class="h-8 w-8"></a>
      <div class="flex flex-col min-w-0"><span class="font-label-mono-sm text-label-mono-sm text-secondary truncate uppercase">${esc(o.kicker || "BITS U104 // ACE104")}</span>
      <span class="font-title-md text-title-md truncate">${esc(o.title || "Foundations of Measurement")}</span></div>
    </div>
    <span class="font-label-mono-sm text-label-mono-sm px-2 py-1 rounded-full bg-surface-container text-on-surface-variant flex-shrink-0">Sem I · 2026–27</span>
  </div>`;
  document.body.prepend(head);
  if (o.nav !== false) {
    const nav = document.createElement("nav");
    nav.className = "fixed bottom-0 w-full z-40 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(11,28,48,0.06)]";
    nav.innerHTML = `<div class="max-w-3xl mx-auto flex justify-around items-center h-16 px-space-xs">${NAV.map(([k, h, ic, l]) =>
      `<a href="${h}" ${k === o.active ? 'aria-current="page"' : ""} class="flex flex-col items-center justify-center min-w-[64px] min-h-[44px] px-space-sm py-space-xs rounded-lg transition-colors ${k === o.active ? "text-secondary bg-surface-container-low font-semibold" : "text-on-surface-variant hover:text-on-surface"}"><span class="material-symbols-outlined text-[22px]">${ic}</span><span class="font-label-mono-sm text-label-mono-sm mt-0.5">${l}</span></a>`).join("")}</div>`;
    document.body.append(nav);
  }
  const t = document.createElement("div");
  t.id = "toast";
  t.className = "fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 font-label-mono-sm text-label-mono-sm pointer-events-none opacity-0 transition-opacity duration-200 whitespace-nowrap";
  t.innerHTML = `<span class="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span><span id="toastMsg"></span>`;
  document.body.append(t);
}
let toastT;
function toast(m) { const t = $("#toast"); if (!t) return; $("#toastMsg").textContent = m; t.classList.remove("opacity-0"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.add("opacity-0"), 2300); }

/* ---------- narration engine (Web Speech API) ---------- */
const TTS = {
  ok: "speechSynthesis" in window, voices: [], token: 0,
  load() { if (!this.ok) return; const f = () => { this.voices = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang)); }; f(); speechSynthesis.onvoiceschanged = f; },
  pick(i) { const v = this.voices; if (!v.length) return null; const pref = v.filter(x => /en-(IN|GB|US)/i.test(x.lang)); const pool = pref.length > 1 ? pref : v; return pool[i % pool.length]; },
  stop() { this.token++; if (this.ok) speechSynthesis.cancel(); },
  /* play list of {text, voice} from index i; cb.onItem(i), cb.onEnd() */
  play(items, i, cb, rate) {
    this.stop(); if (!this.ok) { cb.onError && cb.onError(); return; }
    const tok = this.token;
    const step = k => {
      if (tok !== this.token) return;
      if (k >= items.length) { cb.onEnd && cb.onEnd(); return; }
      cb.onItem && cb.onItem(k);
      const u = new SpeechSynthesisUtterance(items[k].text);
      const v = this.pick(items[k].voice || 0); if (v) u.voice = v;
      u.rate = rate || 1; u.pitch = items[k].voice ? 0.92 : 1.05;
      u.onend = () => step(k + 1); u.onerror = () => { if (tok === this.token) step(k + 1); };
      speechSynthesis.speak(u);
    };
    step(i);
  }
};
TTS.load();

/* ---------- result-booklet calculators ---------- */
const num = id => parseFloat(($("#c_" + id) || {}).value);
const fmt = (x, d = 3) => (isFinite(x) ? (Math.abs(x) >= 1e4 || (Math.abs(x) < 1e-3 && x !== 0) ? x.toExponential(d - 1) : (+x.toFixed(d)).toString()) : "—");
const CALC = {
  stats: { title: "Mean, SD & standard error", inputs: [["vals", "Readings (comma separated)", "", "9.8, 10.1, 10.0, 9.9, 10.2", "text"]],
    run() { const a = $("#c_vals").value.split(/[ ,;]+/).map(parseFloat).filter(isFinite); const n = a.length; if (n < 2) return "Enter at least two readings.";
      const m = a.reduce((x, y) => x + y) / n, s = Math.sqrt(a.reduce((x, y) => x + (y - m) ** 2, 0) / (n - 1)), se = s / Math.sqrt(n);
      return `N = ${n} · mean = <b>${fmt(m, 4)}</b> · s = ${fmt(s, 3)} · SE = s/√N = ${fmt(se, 3)} · %RSD = ${fmt(100 * s / m, 3)}%<br>Report: <b>${fmt(m, 4)} ± ${fmt(se, 2)}</b>`; } },
  bmi: { title: "BMI from averaged replicates", inputs: [["h", "Mean height", "m", "1.721"], ["w", "Mean weight", "kg", "68.5"]],
    run() { const h = num("h"), w = num("w"); const b = w / (h * h); const c = b < 18.5 ? "Underweight" : b < 25 ? "Normal" : b < 30 ? "Overweight" : "Obese";
      return `BMI = ${fmt(w)} / ${fmt(h)}² = <b>${fmt(b, 3)} kg/m²</b> → <b>${c}</b>`; } },
  venturi: { title: "Venturi / orifice: Qt, Qa and Cd", inputs: [["h", "Manometer reading h", "cm Hg", "10"], ["R", "Tank rise R", "cm", "4.6"], ["t", "Time t", "s", "6.0"]],
    run() { const a1 = 6.157e-4, a2 = 1.539e-4, H = (num("h") / 100) * (13600 / 1000 - 1); const Qt = a1 * a2 * Math.sqrt(2 * 9.81 * H) / Math.sqrt(a1 * a1 - a2 * a2); const Qa = 0.1 * (num("R") / 100) / num("t");
      return `H = ${fmt(H)} m of water · Qt = ${fmt(Qt, 3)} m³/s · Qa = ${fmt(Qa, 3)} m³/s<br>C<sub>d</sub> = Qa/Qt = <b>${fmt(Qa / Qt, 3)}</b> (venturi ≈ 0.95–0.98, orifice ≈ 0.6–0.65)`; } },
  ph: { title: "pH from [H⁺]", inputs: [["hc", "[H⁺]", "mol/L", "1e-3"]],
    run() { const p = -Math.log10(num("hc")); return `pH = −log₁₀[H⁺] = <b>${fmt(p, 3)}</b> → ${p < 7 ? "acidic (turmeric stays yellow)" : p > 7 ? "basic (turmeric turns orange-red)" : "neutral"}`; } },
  capillary: { title: "γ ± δγ by capillary rise", inputs: [["h", "Rise h", "mm", "54.0"], ["dh", "δh", "mm", "0.5"], ["rho", "Density ρ", "kg/m³", "998"], ["r", "Radius r", "mm", "0.275"], ["dr", "δr", "mm", "0.0035"]],
    run() { const h = num("h") / 1000, r = num("r") / 1000; const g = h * num("rho") * 9.81 * r / 2; const f = Math.sqrt((num("dh") / num("h")) ** 2 + (num("dr") / num("r")) ** 2);
      return `γ = hρgr/2 = <b>${fmt(g * 1000, 4)} mN/m</b> · δγ/γ = ${fmt(100 * f, 3)}% → <b>γ = ${fmt(g * 1000, 3)} ± ${fmt(g * 1000 * f, 2)} mN/m</b>`; } },
  lvdt: { title: "LVDT sensitivity (least-squares slope)", inputs: [["x", "Displacements x", "mm", "0, 0.5, 1.0, 1.5, 2.0", "text"], ["y", "Outputs V₀", "mV", "0, 61, 119, 182, 240", "text"]],
    run() { const p = s => $("#c_" + s).value.split(/[ ,;]+/).map(parseFloat).filter(isFinite); const x = p("x"), y = p("y"), n = Math.min(x.length, y.length); if (n < 2) return "Enter matching x and y lists.";
      let sx = 0, sy = 0, sxy = 0, sxx = 0; for (let i = 0; i < n; i++) { sx += x[i]; sy += y[i]; sxy += x[i] * y[i]; sxx += x[i] * x[i]; }
      const m = (n * sxy - sx * sy) / (n * sxx - sx * sx), c = (sy - m * sx) / n; const ym = sy / n; let ss = 0, sr = 0; for (let i = 0; i < n; i++) { ss += (y[i] - ym) ** 2; sr += (y[i] - m * x[i] - c) ** 2; }
      return `Sensitivity = slope = <b>${fmt(m, 4)} mV/mm</b> · intercept = ${fmt(c, 3)} mV · R² = ${fmt(1 - sr / ss, 4)}`; } },
  visc: { title: "Relative viscosity (Ostwald)", inputs: [["mw", "μ water", "mPa·s", "0.890"], ["rw", "ρ water", "kg/m³", "997"], ["tw", "t water", "s", "60.0"], ["rx", "ρ sample", "kg/m³", "1050"], ["tx", "t sample", "s", "96.0"]],
    run() { const mu = num("mw") * num("rx") * num("tx") / (num("rw") * num("tw")); return `μx = μw·ρx·tx/(ρw·tw) = <b>${fmt(mu, 4)} mPa·s</b> · ν = μ/ρ = <b>${fmt(mu / num("rx") * 1000, 4)} mm²/s</b>`; } },
  friab: { title: "Friability & hardness", inputs: [["w0", "Initial weight W₀", "g", "6.512"], ["wf", "Final weight W_f", "g", "6.468"], ["hd", "Hardness", "kg/cm²", "6"]],
    run() { const f = 100 * (num("w0") - num("wf")) / num("w0"); const hd = num("hd");
      return `Friability = <b>${fmt(f, 3)}%</b> → ${f <= 1 ? '<b class="text-secondary">PASS</b> (≤ 1.0%)' : '<b class="text-error">FAIL</b> (> 1.0%)'}<br>Hardness ${fmt(hd)} kg/cm² ≈ ${fmt(hd * 9.807, 3)} N → ${hd >= 4 && hd <= 8 ? "within the typical 4–8 kg/cm²" : "outside the typical 4–8 kg/cm²"}`; } },
  theo: { title: "Height of a building (theodolite)", inputs: [["h", "Instrument height h", "m", "1.45"], ["D", "Horizontal distance D", "m", "25.50"], ["deg", "Mean angle θ (degrees)", "°", "32"], ["min", "and minutes", "′", "15"]],
    run() { const th = (num("deg") + (num("min") || 0) / 60) * Math.PI / 180; const H = num("h") + num("D") * Math.tan(th);
      return `tan θ = ${fmt(Math.tan(th), 4)} · H = h + D tan θ = <b>${fmt(H, 4)} m</b>`; } }
};
function calcHTML(key) {
  const c = CALC[key]; if (!c) return "";
  return `<div class="bg-surface-container-low rounded-lg p-3 flex flex-col gap-2">
    <div class="flex items-center gap-2 text-secondary"><span class="material-symbols-outlined text-[18px]">calculate</span><span class="font-label-mono-sm text-label-mono-sm font-semibold uppercase">${c.title}</span></div>
    <div class="grid grid-cols-2 gap-2">${c.inputs.map(([id, l, u, d, t]) => `<label class="flex flex-col gap-0.5 ${t === "text" ? "col-span-2" : ""}"><span class="font-label-mono-sm text-label-mono-sm text-on-surface-variant">${l}${u ? ` (${u})` : ""}</span><input id="c_${id}" value="${d}" ${t === "text" ? 'type="text"' : 'type="number" step="any"'} class="w-full px-2.5 py-1.5 rounded-lg bg-surface-container-lowest border border-[#E2E8F0] font-label-mono-md text-label-mono-md focus:outline-none focus:border-[#06B6D4] focus:ring-2 focus:ring-[rgba(6,182,212,0.15)]"></label>`).join("")}</div>
    <div id="calcOut" class="font-body-sm text-body-sm text-on-surface bg-surface-container-lowest rounded p-2.5 leading-relaxed"></div></div>`;
}
function bindCalc(key) {
  const c = CALC[key]; if (!c) return;
  const go = () => { try { $("#calcOut").innerHTML = c.run(); } catch (e) { $("#calcOut").textContent = "Check your inputs."; } };
  c.inputs.forEach(([id]) => $("#c_" + id).addEventListener("input", go)); go();
}

/* ---------- tests ---------- */
const SAMPLE_TESTS = [
  { id: "s1", title: "Sample Test 01 · Core Diagnostic", tag: "Diagnostic", desc: "Units, errors, Kline–McClintock and one key idea from every department.", min: 40 },
  { id: "s2", title: "Sample Test 02 · Instruments & Methods", tag: "Instruments", desc: "Sensors, assays, analytical techniques and meters across all nine lectures.", min: 40 },
  { id: "s3", title: "Sample Test 03 · Numericals & Formulas", tag: "Numericals", desc: "Calculations: CFU, Cd, γ, hysteresis, viscosity, friability, levelling and more.", min: 40 },
  { id: "s4", title: "Sample Test 04 · Final Compre Simulation", tag: "Timed Mock", desc: "Full-syllabus mock with procedures, precautions and sources of error.", min: 40 }
];
/* each sample test takes 3 questions per lecture from disjoint slices of the bank */
function buildTest(key) {
  const L = window.LECTURES, Q = window.QUESTIONS;
  const st = SAMPLE_TESTS.findIndex(t => t.id === key);
  if (st >= 0) {
    const out = [];
    L.forEach(l => { const bank = Q[l.id]; [0, 1, 2].forEach(j => out.push({ ...bank[(st * 3 + j + l.no) % bank.length], lec: l.id })); });
    // interleave deterministically
    return { meta: SAMPLE_TESTS[st], qs: out.sort((a, b) => (hash(a.q + key) - hash(b.q + key))) };
  }
  const l = L.find(x => x.id === key); if (!l) return null;
  return { meta: { id: key, title: `Lecture ${pad(l.no)} Quick Quiz · ${l.track}`, tag: "Lecture Quiz", min: 15 }, qs: Q[key].map(q => ({ ...q, lec: key })) };
}
/* shuffle options per question (seeded per attempt) so the correct letter varies */
function shuffleOpts(q, seed) {
  let s = hash(seed + q.q) >>> 0;
  const rnd = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const idx = q.o.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  return { ...q, o: idx.map(i => q.o[i]), a: idx.indexOf(q.a) };
}
function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return h; }

window.ACE = { $, esc, pad, slideSrc, params, store, markVisited, scores, saveScore, shell, toast, TTS, CALC, calcHTML, bindCalc, SAMPLE_TESTS, buildTest, shuffleOpts };
})();
