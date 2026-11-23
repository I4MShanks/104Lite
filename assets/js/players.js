/* 104Lite interactive Video Overview + Podcast players.
   Narration uses the Web Speech API; if no voice is available (or the user mutes it),
   the same sequence runs on timers so captions, slides and checkpoints still work. */
(function () {
const { $, esc, pad, slideSrc, TTS, toast, store } = ACE;

/* ---------- generic narrated sequencer ---------- */
function Sequencer(items, cb) {
  const s = { i: 0, on: false, rate: 1, muted: !TTS.usable, timers: [], waiting: false };
  const clear = () => { s.timers.forEach(clearTimeout); s.timers = []; TTS.stop(); };
  const words = t => t.split(/\s+/).length;
  function silentRun(k) {
    if (!s.on) return;
    if (k >= items.length) { s.on = false; cb.onEnd && cb.onEnd(); return; }
    s.i = k; cb.onItem && cb.onItem(k);
    const ws = items[k].text.split(/\s+/), per = 60000 / (165 * s.rate);
    let ci = 0; ws.forEach((w, j) => { s.timers.push(setTimeout(() => cb.onWord && cb.onWord(k, ci), j * per)); ci += w.length + 1; });
    s.timers.push(setTimeout(() => { if (cb.onItemEnd && cb.onItemEnd(k) === false) return; silentRun(k + 1); }, Math.max(2200, ws.length * per + 450)));
  }
  s.play = (k = s.i) => {
    clear(); s.on = true; s.i = Math.max(0, Math.min(items.length - 1, k));
    if (s.muted) return silentRun(s.i);
    TTS.play(items, s.i, { onItem: j => { s.i = j; cb.onItem && cb.onItem(j); }, onWord: cb.onWord, onEnd: () => { s.on = false; cb.onEnd && cb.onEnd(); },
      onItemEnd: j => cb.onItemEnd ? cb.onItemEnd(j) : true }, s.rate);
  };
  s.pause = () => { clear(); s.on = false; };
  s.toggleMute = () => { s.muted = !s.muted; if (!TTS.usable) s.muted = true; if (s.on) s.play(s.i); return s.muted; };
  s.duration = items.reduce((a, it) => a + Math.max(2.2, words(it.text) / 2.75), 0);
  s.startOf = k => items.slice(0, k).reduce((a, it) => a + Math.max(2.2, words(it.text) / 2.75), 0);
  return s;
}

/* ---------- checkpoint card (shared) ---------- */
function checkpointHTML(q, id, dark) {
  return `<div class="flex flex-col gap-2.5" data-cp="${id}">
    <div class="flex items-center gap-2"><span class="material-symbols-outlined text-[20px] ${dark ? "text-secondary-fixed" : "text-secondary"}">psychology_alt</span><span class="font-label-mono-sm text-label-mono-sm uppercase tracking-wider ${dark ? "text-secondary-fixed" : "text-secondary"} font-semibold">Quick check</span></div>
    <p class="font-body-md text-body-md ${dark ? "text-surface-bright" : ""} leading-snug">${esc(q.q)}</p>
    <div class="grid sm:grid-cols-2 gap-2">${q.o.map((o, i) => `<button data-o="${i}" class="cpOpt text-left px-3 py-2 rounded-lg font-body-sm text-body-sm transition-colors ${dark ? "bg-surface-container-lowest/10 text-surface-bright hover:bg-surface-container-lowest/20" : "bg-surface-container-low hover:bg-surface-container"}"><b class="font-label-mono-sm mr-1">${"ABCD"[i]}.</b>${esc(o)}</button>`).join("")}</div>
    <div class="cpFb hidden font-body-sm text-body-sm rounded-lg p-2.5"></div>
    <div class="flex justify-end gap-2"><button class="cpSkip font-label-mono-sm text-label-mono-sm px-3 py-1.5 rounded-lg ${dark ? "text-primary-fixed-dim" : "text-on-surface-variant"}">Skip</button><button class="cpGo hidden font-label-mono-sm text-label-mono-sm px-3.5 py-1.5 rounded-lg bg-secondary text-on-secondary font-semibold flex items-center gap-1">Continue<span class="material-symbols-outlined text-[16px]">play_arrow</span></button></div></div>`;
}
function bindCheckpoint(root, q, dark, onDone) {
  let answered = false;
  root.querySelectorAll(".cpOpt").forEach(b => b.onclick = () => {
    if (answered) return; answered = true; const i = +b.dataset.o, ok = i === q.a;
    root.querySelectorAll(".cpOpt").forEach((x, j) => { if (j === q.a) x.className += dark ? " !bg-secondary !text-on-secondary" : " !bg-secondary-fixed/50 font-semibold"; else if (j === i) x.className += " !bg-error-container !text-on-error-container line-through"; });
    const fb = root.querySelector(".cpFb"); fb.classList.remove("hidden");
    fb.className = `cpFb font-body-sm text-body-sm rounded-lg p-2.5 ${ok ? (dark ? "bg-secondary/40 text-surface-bright" : "bg-secondary-fixed/30") : (dark ? "bg-error/30 text-surface-bright" : "bg-error-container/60")}`;
    fb.innerHTML = `<b>${ok ? "Correct!" : "Not quite."}</b> ${esc(q.e)}`;
    root.querySelector(".cpGo").classList.remove("hidden"); root.querySelector(".cpSkip").classList.add("hidden");
    const st = store.get("checks", {}); st[q.q] = ok; store.set("checks", st);
  });
  root.querySelector(".cpGo").onclick = () => onDone(true);
  root.querySelector(".cpSkip").onclick = () => onDone(false);
}

/* ---------- VIDEO OVERVIEW ---------- */
function videoPlayer(L, mount, bus) {
  const N = L.narration, Q = (window.QUESTIONS || {})[L.id] || [];
  const cps = {}; [[Math.floor(N.length * 0.34) - 1, 3], [Math.floor(N.length * 0.67) - 1, 7], [N.length - 1, 11]].forEach(([at, qi]) => { if (Q[qi] && at >= 0) cps[at] = Q[qi]; });
  let quizOn = true, cc = true, doneCp = {};
  const kb = ["origin-top-left", "origin-top-right", "origin-bottom-left", "origin-bottom-right", "origin-center"];
  mount.innerHTML = `
  <div id="vStage" class="relative w-full aspect-video bg-white overflow-hidden select-none group">
    <div id="vLayers" class="absolute inset-0"></div>
    <div id="vTitle" class="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-primary-container via-primary-container/95 to-on-secondary-fixed-variant transition-opacity duration-500">
      <span class="font-label-mono-sm text-label-mono-sm text-secondary-fixed uppercase tracking-widest">Lecture ${pad(L.no)} · ${esc(L.track)}</span>
      <h3 class="font-headline-sm text-headline-sm sm:font-headline-md sm:text-headline-md text-surface-bright mt-1 max-w-md">${esc(L.title)}</h3>
      <p class="font-body-sm text-body-sm text-primary-fixed-dim mt-1">${esc(L.prof)} · ${N.length} chapters · ~${Math.ceil(Sequencer(N.map(n => ({ text: n.t }))).duration / 60)} min${Object.keys(cps).length ? ` · ${Object.keys(cps).length} quick checks` : ""}</p>
      <button id="vBig" class="mt-4 w-16 h-16 rounded-full bg-secondary-container text-on-secondary-fixed shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"><span class="material-symbols-outlined fill text-[36px] ml-1">play_arrow</span></button>
      <p class="font-label-mono-sm text-label-mono-sm text-primary-fixed-dim mt-3">Space play/pause · ← → chapters</p>
    </div>
    <div class="absolute top-3 left-3 flex items-center gap-1.5 bg-primary/75 backdrop-blur-md px-2 py-0.5 rounded-full text-on-primary"><span id="vDot" class="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span><span class="font-label-mono-sm text-label-mono-sm uppercase">Slide <span id="vSlide">${N[0].s}</span>/${L.slides}</span></div>
    <div id="vChapTag" class="absolute top-3 right-3 font-label-mono-sm text-label-mono-sm bg-primary/75 backdrop-blur-md px-2 py-0.5 rounded-full text-secondary-fixed">Ch ${pad(1)}/${pad(N.length)}</div>
    <div id="vCp" class="hidden absolute inset-0 bg-primary-container/90 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"></div>
    <div id="vCapWrap" class="absolute bottom-0 inset-x-0 px-3 pb-2 pt-10 bg-gradient-to-t from-primary-container/90 via-primary-container/50 to-transparent pointer-events-none">
      <p id="vCap" class="font-body-sm text-body-sm sm:font-body-md sm:text-body-md text-primary-fixed-dim leading-snug text-center max-w-2xl mx-auto"></p>
    </div>
  </div>
  <div class="bg-primary-container px-3 py-2.5 flex flex-col gap-2">
    <div id="vTrack" class="relative flex items-center gap-[3px] h-3 cursor-pointer"></div>
    <div class="flex items-center justify-between text-on-primary font-label-mono-sm text-label-mono-sm">
      <div class="flex items-center gap-1.5">
        <button id="vPlay" aria-label="Play" class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center"><span class="material-symbols-outlined fill text-[20px]">play_arrow</span></button>
        <button id="vPrev" aria-label="Previous chapter" class="w-7 h-7 flex items-center justify-center hover:text-secondary-fixed"><span class="material-symbols-outlined text-[20px]">skip_previous</span></button>
        <button id="vNext" aria-label="Next chapter" class="w-7 h-7 flex items-center justify-center hover:text-secondary-fixed"><span class="material-symbols-outlined text-[20px]">skip_next</span></button>
        <span class="ml-1"><span id="vTime" class="text-secondary-fixed font-semibold">00:00</span><span class="text-outline-variant"> / </span><span id="vDur" class="text-primary-fixed-dim">00:00</span></span>
      </div>
      <div class="flex items-center gap-1">
        <button id="vMute" title="Narration on/off" class="w-7 h-7 flex items-center justify-center hover:text-secondary-fixed"><span class="material-symbols-outlined text-[19px]">volume_up</span></button>
        <button id="vSpeed" class="px-1.5 py-0.5 rounded bg-surface-variant/20 hover:bg-surface-variant/40 text-[11px]">1.0x</button>
        <button id="vQuiz" title="Quiz checkpoints" class="px-1.5 py-0.5 rounded bg-secondary/40 flex items-center gap-1"><span class="material-symbols-outlined text-[15px]">quiz</span><span class="text-[10px]">ON</span></button>
        <button id="vCC" class="px-1.5 py-0.5 rounded bg-surface-variant/20 hover:bg-surface-variant/40 flex items-center gap-1"><span class="material-symbols-outlined text-[15px]">subtitles</span><span class="text-[10px]">CC</span></button>
        <button id="vFull" aria-label="Fullscreen" class="w-7 h-7 flex items-center justify-center hover:text-secondary-fixed"><span class="material-symbols-outlined text-[19px]">fullscreen</span></button>
      </div>
    </div>
  </div>`;
  const items = N.map(n => ({ text: n.t, voice: 0 }));
  const mmss = s => `${pad(Math.floor(s / 60))}:${pad(Math.floor(s % 60))}`;
  let seq, front = 0, shownSlide = null, tickT;
  // timeline
  $("#vTrack").innerHTML = N.map((n, i) => `<div data-i="${i}" title="Ch ${i + 1}: slide ${n.s}" class="vSeg relative flex-1 h-1.5 rounded-full bg-surface-tint/40 overflow-hidden hover:h-2.5 transition-all"><div class="vFill absolute inset-y-0 left-0 bg-secondary-container rounded-full" style="width:0%"></div></div>${cps[i] ? `<span title="Quick check" class="w-2.5 h-2.5 rotate-45 rounded-[2px] bg-secondary-fixed flex-shrink-0"></span>` : ""}`).join("");
  document.querySelectorAll(".vSeg").forEach(el => el.onclick = () => { bus.stopOthers("video"); go(+el.dataset.i, true); });
  $("#vDur").textContent = mmss(Sequencer(items).duration);
  function showSlide(s) {
    if (s === shownSlide) return; shownSlide = s;
    const img = document.createElement("img"); img.src = slideSrc(L.id, s); img.alt = "Lecture slide " + s;
    img.className = `absolute inset-0 w-full h-full object-contain bg-white opacity-0 transition-opacity duration-700 ${kb[s % kb.length]}`;
    img.style.transition = "opacity .7s ease, transform 14s ease-out"; img.style.transform = "scale(1)";
    $("#vLayers").append(img);
    requestAnimationFrame(() => requestAnimationFrame(() => { img.classList.remove("opacity-0"); img.style.transform = "scale(1.09)"; }));
    const layers = $("#vLayers").children; while (layers.length > 2) layers[0].remove();
    if (layers.length === 2) setTimeout(() => layers[0] && layers[0] !== img && layers[0].classList.add("opacity-0"), 50);
  }
  function setChapter(i) {
    front = i; showSlide(N[i].s);
    $("#vSlide").textContent = N[i].s; $("#vChapTag").textContent = `Ch ${pad(i + 1)}/${pad(N.length)}`;
    document.querySelectorAll(".vFill").forEach((f, j) => { f.style.transition = "none"; f.style.width = j < i ? "100%" : "0%"; });
    caption(i, -1); bus.chapter && bus.chapter(i);
  }
  function caption(i, ci) {
    if (!cc) { $("#vCap").innerHTML = ""; return; }
    const t = N[i].t; if (ci < 0) { $("#vCap").innerHTML = esc(t); return; }
    const end = t.indexOf(" ", ci); const e = end < 0 ? t.length : end;
    $("#vCap").innerHTML = `<span class="text-surface-bright">${esc(t.slice(0, e))}</span>${esc(t.slice(e))}`;
  }
  function fillCurrent(i) { const f = document.querySelectorAll(".vFill")[i]; if (!f) return; const d = Math.max(2.2, N[i].t.split(/\s+/).length / 2.75) / seq.rate; f.style.transition = "none"; f.style.width = "0%"; requestAnimationFrame(() => { f.style.transition = `width ${d}s linear`; f.style.width = "100%"; }); }
  function clock() { clearInterval(tickT); const t0 = Date.now(), base = seq.startOf(front); tickT = setInterval(() => { if (!seq.on) return clearInterval(tickT); $("#vTime").textContent = mmss(base + (Date.now() - t0) / 1000 * seq.rate); }, 250); }
  function icon() { $("#vPlay").innerHTML = `<span class="material-symbols-outlined fill text-[20px]">${seq.on ? "pause" : "play_arrow"}</span>`; $("#vDot").classList.toggle("animate-pulse", seq.on); }
  function showCp(i) {
    const q = cps[i]; seq.pause(); icon();
    const box = $("#vCp"); box.innerHTML = checkpointHTML(q, i, true); box.classList.remove("hidden");
    bindCheckpoint(box, q, true, () => { doneCp[i] = true; box.classList.add("hidden"); if (i + 1 < N.length) go(i + 1, true); else finish(); });
  }
  function finish() { icon(); $("#vTitle").classList.remove("opacity-0", "pointer-events-none"); $("#vTitle").querySelector("h3").textContent = "Overview complete"; $("#vBig").innerHTML = `<span class="material-symbols-outlined text-[32px]">replay</span>`; front = 0; }
  seq = Sequencer(items, {
    onItem: i => { if (i !== front) setChapter(i); fillCurrent(i); clock(); },
    onWord: (i, ci) => caption(i, ci),
    onItemEnd: i => { if (quizOn && cps[i] && !doneCp[i]) { showCp(i); return false; } return true; },
    onEnd: finish
  });
  function go(i, play) { $("#vCp").classList.add("hidden"); $("#vTitle").classList.add("opacity-0", "pointer-events-none"); setChapter(Math.max(0, Math.min(N.length - 1, i))); if (play) { seq.play(front); } else seq.pause(); icon(); }
  const toggle = () => { bus.stopOthers("video"); if (seq.on) { seq.pause(); icon(); } else { if (!$("#vCp").classList.contains("hidden")) return; go(front, true); } };
  $("#vBig").onclick = () => { doneCp = {}; toggle(); };
  $("#vPlay").onclick = toggle;
  $("#vPrev").onclick = () => go(front - 1, seq.on);
  $("#vNext").onclick = () => go(front + 1, seq.on);
  $("#vSpeed").onclick = () => { const r = [1, 1.25, 1.5, 0.75]; seq.rate = r[(r.indexOf(seq.rate) + 1) % r.length]; $("#vSpeed").textContent = seq.rate.toFixed(seq.rate % 1 ? 2 : 1).replace(/0$/, "") + "x"; if (seq.on) seq.play(front); };
  $("#vMute").onclick = () => { const m = seq.toggleMute(); $("#vMute").innerHTML = `<span class="material-symbols-outlined text-[19px]">${m ? "volume_off" : "volume_up"}</span>`; toast(m ? (TTS.usable ? "Narration muted — captions only" : "No voice available — captions only") : "Narration on"); };
  if (seq.muted) $("#vMute").innerHTML = `<span class="material-symbols-outlined text-[19px]">volume_off</span>`;
  $("#vQuiz").onclick = () => { quizOn = !quizOn; $("#vQuiz").className = `px-1.5 py-0.5 rounded flex items-center gap-1 ${quizOn ? "bg-secondary/40" : "bg-surface-variant/20"}`; $("#vQuiz").querySelector("span:last-child").textContent = quizOn ? "ON" : "OFF"; toast(quizOn ? "Quiz checkpoints on" : "Quiz checkpoints off"); };
  $("#vCC").onclick = () => { cc = !cc; caption(front, -1); toast(cc ? "Captions on" : "Captions off"); };
  $("#vFull").onclick = () => { const el = $("#vStage"); (document.fullscreenElement ? document.exitFullscreen() : (el.requestFullscreen || el.webkitRequestFullscreen).call(el)); };
  $("#vStage").addEventListener("click", e => { if (e.target.closest("#vCp,#vTitle,button")) return; toggle(); });
  document.addEventListener("keydown", e => { if (/INPUT|TEXTAREA/.test(document.activeElement.tagName)) return; const r = $("#vStage").getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
    if (e.code === "Space") { e.preventDefault(); toggle(); } if (e.code === "ArrowRight") go(front + 1, seq.on); if (e.code === "ArrowLeft") go(front - 1, seq.on); });
  setChapter(0);
  return { stop: () => { if (seq.on) { seq.pause(); icon(); } }, go };
}

/* ---------- PODCAST ---------- */
function podcastPlayer(L, mount, bus) {
  const P = L.podcast, Q = (window.QUESTIONS || {})[L.id] || [];
  const cpAt = Math.floor(P.length / 2) - 1, cpQ = Q[5] || Q[0]; let cpDone = false;
  const items = P.map(([s, t]) => ({ text: t, voice: s === "A" ? 0 : 1 }));
  mount.innerHTML = `
  <div class="flex items-start justify-between gap-3">
    <div class="flex items-center gap-3 min-w-0"><div class="w-11 h-11 rounded-lg bg-primary-container flex items-center justify-center flex-shrink-0 text-secondary-fixed shadow-sm"><span class="material-symbols-outlined text-[24px]">podcasts</span></div>
    <div class="flex flex-col min-w-0"><span class="font-label-mono-sm text-label-mono-sm text-secondary uppercase font-semibold">104Lite Audio #${pad(L.no)}</span><h4 class="font-title-md text-title-md truncate">${esc(L.track)}: ${esc(L.short)}</h4></div></div>
    <span class="font-label-mono-sm text-label-mono-sm px-2 py-0.5 rounded bg-surface-container text-on-surface-variant flex-shrink-0">2 hosts · ${P.length} lines</span></div>
  <div class="bg-primary-container rounded-xl p-3 flex flex-col gap-3">
    <div class="flex items-center justify-between">
      ${["A", "B"].map(h => `<div id="host${h}" class="flex items-center gap-2 transition-opacity ${h === "B" ? "flex-row-reverse text-right" : ""}"><div class="relative w-10 h-10 rounded-full ${h === "A" ? "bg-secondary-container text-on-secondary-fixed" : "bg-tertiary-fixed-dim text-on-tertiary-fixed"} flex items-center justify-center font-headline-sm text-headline-sm"><span>${h === "A" ? "M" : "R"}</span><span class="ring absolute inset-0 rounded-full border-2 ${h === "A" ? "border-secondary-container" : "border-tertiary-fixed-dim"} opacity-0"></span></div><div><p class="font-label-mono-sm text-label-mono-sm text-surface-bright">${h === "A" ? "Meera" : "Rohan"}</p><p class="font-label-mono-sm text-[10px] text-primary-fixed-dim">${h === "A" ? "Host" : "Co-host"}</p></div></div>`).join(`<div id="wave" class="flex items-end justify-center gap-[3px] h-8 flex-1 px-2"></div>`)}
    </div>
    <div class="flex items-center gap-2 text-primary-fixed-dim font-label-mono-sm text-label-mono-sm"><span id="pCur">00:00</span><div id="pTrack" class="relative flex-1 h-1.5 rounded-full bg-surface-tint/40 cursor-pointer"><div id="pFill" class="absolute inset-y-0 left-0 bg-secondary-container rounded-full" style="width:0%"></div>${cpQ ? `<span title="Quick check" class="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45 rounded-[2px] bg-secondary-fixed" style="left:${(cpAt + 1) / P.length * 100}%"></span>` : ""}</div><span id="pTot">00:00</span></div>
    <div class="flex items-center justify-between">
      <button id="pSpeed" class="px-2.5 py-1 rounded bg-surface-variant/20 text-surface-bright font-label-mono-sm text-label-mono-sm">1.0x</button>
      <div class="flex items-center gap-3"><button id="pBack" aria-label="Previous line" class="w-9 h-9 rounded-full bg-surface-variant/20 text-surface-bright flex items-center justify-center"><span class="material-symbols-outlined text-[19px]">replay_10</span></button>
        <button id="pPlay" aria-label="Play podcast" class="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center shadow-md active:scale-95 transition-transform"><span class="material-symbols-outlined fill text-[26px]">play_arrow</span></button>
        <button id="pFwd" aria-label="Next line" class="w-9 h-9 rounded-full bg-surface-variant/20 text-surface-bright flex items-center justify-center"><span class="material-symbols-outlined text-[19px]">forward_10</span></button></div>
      <button id="pMute" title="Voice on/off" class="w-9 h-9 rounded-full text-primary-fixed-dim flex items-center justify-center"><span class="material-symbols-outlined text-[20px]">volume_up</span></button>
    </div>
  </div>
  <div class="flex items-center justify-between"><span class="font-label-mono-sm text-label-mono-sm text-on-surface-variant flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-secondary">forum</span>Live transcript — tap any line to jump there</span><button id="pFollow" class="font-label-mono-sm text-label-mono-sm text-secondary">Auto-scroll: on</button></div>
  <div id="pChat" class="flex flex-col gap-2 max-h-[340px] overflow-y-auto no-scrollbar rounded-xl bg-surface-container-low p-3 scroll-smooth"></div>`;
  const bars = Array.from({ length: 22 }, (_, i) => 30 + Math.round(65 * Math.abs(Math.sin(i * 1.3 + L.no))));
  $("#wave").innerHTML = bars.map((h, i) => `<span class="wb w-[3px] rounded-full bg-secondary-fixed/40" style="height:${h}%;animation-delay:${(i % 7) * 90}ms"></span>`).join("");
  if (!document.getElementById("wbStyle")) { const st = document.createElement("style"); st.id = "wbStyle"; st.textContent = "@keyframes wb{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}.wb.on{animation:wb .9s ease-in-out infinite;background:#57dffe;transform-origin:bottom}@keyframes rg{0%{transform:scale(1);opacity:.9}100%{transform:scale(1.45);opacity:0}}.ring.on{animation:rg 1.2s ease-out infinite}"; document.head.append(st); }
  $("#pChat").innerHTML = P.map(([s, t], i) => `<button data-i="${i}" class="pLine flex ${s === "A" ? "justify-start" : "justify-end"} text-left w-full group">
     <div class="max-w-[85%] rounded-2xl px-3 py-2 font-body-sm text-body-sm transition-all ${s === "A" ? "rounded-bl-sm bg-surface-container-lowest" : "rounded-br-sm bg-secondary-fixed/30"} opacity-60 group-hover:opacity-100 shadow-sm"><span class="block font-label-mono-sm text-[10px] uppercase ${s === "A" ? "text-secondary" : "text-on-tertiary-container"} font-semibold mb-0.5">${s === "A" ? "Meera" : "Rohan"}</span><span class="txt">${esc(t)}</span></div></button>
     ${i === cpAt && cpQ ? `<div id="pCp" class="rounded-xl border border-dashed border-secondary/50 bg-surface-container-lowest p-3 opacity-70">${checkpointHTML(cpQ, "p", false)}</div>` : ""}`).join("");
  const mmss = s => `${pad(Math.floor(s / 60))}:${pad(Math.floor(s % 60))}`;
  let cur = 0, follow = true, tickT;
  const seq = Sequencer(items, {
    onItem: i => highlight(i),
    onWord: (i, ci) => { const el = document.querySelectorAll(".pLine .txt")[i]; if (!el) return; const t = P[i][1], e0 = t.indexOf(" ", ci), e = e0 < 0 ? t.length : e0; el.innerHTML = `<span class="text-on-surface font-medium">${esc(t.slice(0, e))}</span><span class="text-on-surface-variant">${esc(t.slice(e))}</span>`; },
    onItemEnd: i => { resetText(i); if (cpQ && i === cpAt && !cpDone) { pauseAtCp(); return false; } return true; },
    onEnd: () => { anim(false); icon(); resetText(cur); toast("Episode finished — try the lecture quiz!"); cur = 0; $("#pFill").style.width = "100%"; }
  });
  $("#pTot").textContent = mmss(seq.duration);
  function resetText(i) { const el = document.querySelectorAll(".pLine .txt")[i]; if (el) el.textContent = P[i][1]; }
  function highlight(i) {
    document.querySelectorAll(".pLine").forEach((b, j) => { const d = b.firstElementChild; d.classList.toggle("opacity-60", j !== i); d.classList.toggle("ring-2", j === i); d.classList.toggle("ring-secondary-container", j === i); d.classList.toggle("scale-[1.02]", j === i); });
    if (i !== cur) resetText(cur); cur = i;
    const speaker = P[i][0];
    ["A", "B"].forEach(h => { $("#host" + h).classList.toggle("opacity-40", h !== speaker); $("#host" + h).querySelector(".ring").classList.toggle("on", h === speaker && seq.on); });
    $("#pFill").style.width = (seq.startOf(i) / seq.duration * 100) + "%";
    if (follow) { const b = document.querySelectorAll(".pLine")[i], c = $("#pChat"); c.scrollTop = b.offsetTop - c.offsetTop - 60; }
    clearInterval(tickT); const t0 = Date.now(), base = seq.startOf(i); tickT = setInterval(() => { if (!seq.on) return clearInterval(tickT); const t = base + (Date.now() - t0) / 1000 * seq.rate; $("#pCur").textContent = mmss(t); $("#pFill").style.width = Math.min(100, t / seq.duration * 100) + "%"; }, 300);
  }
  function anim(on) { document.querySelectorAll(".wb").forEach(b => b.classList.toggle("on", on)); document.querySelectorAll("#hostA .ring,#hostB .ring").forEach(r => r.classList.remove("on")); if (on) $("#host" + P[cur][0]).querySelector(".ring").classList.add("on"); }
  function icon() { $("#pPlay").innerHTML = `<span class="material-symbols-outlined fill text-[26px]">${seq.on ? "pause" : "play_arrow"}</span>`; }
  function play(i) { bus.stopOthers("podcast"); seq.play(i); anim(true); icon(); highlight(i); }
  function stop() { if (seq.on) { seq.pause(); anim(false); icon(); } }
  function pauseAtCp() {
    seq.pause(); anim(false); icon(); const box = $("#pCp"); box.classList.remove("opacity-70"); box.classList.add("ring-2", "ring-secondary-container");
    const c = $("#pChat"); c.scrollTop = box.offsetTop - c.offsetTop - 20; toast("Quick check — answer to continue");
    bindCheckpoint(box, cpQ, false, () => { cpDone = true; box.classList.remove("ring-2", "ring-secondary-container"); box.classList.add("opacity-70"); play(cpAt + 1); });
  }
  if (cpQ) bindCheckpoint($("#pCp"), cpQ, false, () => { cpDone = true; });
  $("#pPlay").onclick = () => seq.on ? stop() : play(cur);
  $("#pBack").onclick = () => play(Math.max(0, cur - 1));
  $("#pFwd").onclick = () => play(Math.min(P.length - 1, cur + 1));
  $("#pSpeed").onclick = () => { const r = [1, 1.25, 1.5, 2]; seq.rate = r[(r.indexOf(seq.rate) + 1) % r.length]; $("#pSpeed").textContent = seq.rate + "x"; if (seq.on) play(cur); };
  $("#pMute").onclick = () => { const m = seq.toggleMute(); $("#pMute").innerHTML = `<span class="material-symbols-outlined text-[20px]">${m ? "volume_off" : "volume_up"}</span>`; toast(m ? "Voice off — read along as it plays" : "Voice on"); };
  if (seq.muted) $("#pMute").innerHTML = `<span class="material-symbols-outlined text-[20px]">volume_off</span>`;
  $("#pFollow").onclick = () => { follow = !follow; $("#pFollow").textContent = "Auto-scroll: " + (follow ? "on" : "off"); };
  $("#pTrack").onclick = e => { const r = $("#pTrack").getBoundingClientRect(), t = (e.clientX - r.left) / r.width * seq.duration; let i = 0; while (i < P.length - 1 && seq.startOf(i + 1) <= t) i++; play(i); };
  document.querySelectorAll(".pLine").forEach(b => b.onclick = () => play(+b.dataset.i));
  highlight(0); document.querySelectorAll(".pLine")[0].firstElementChild.classList.add("opacity-60"); document.querySelectorAll(".pLine")[0].firstElementChild.classList.remove("ring-2");
  return { stop };
}

window.PLAYERS = { videoPlayer, podcastPlayer };
})();
