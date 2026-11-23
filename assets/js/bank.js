/* 104Lite question bank.
   Each topic has `con` (conceptual problems, fixed) and `gen` (numerical generators that build a
   question with fresh values from a seeded RNG and compute the answer + common-mistake distractors).
   Calculator use is assumed. Difficulty: intermediate. */
(function () {
const G = {};
/* ---------- helpers ---------- */
function sig(x, s = 3) {
  if (!isFinite(x)) return "—";
  if (x === 0) return "0";
  const a = Math.abs(x);
  if (a >= 1e5 || a < 1e-3) { const e = Math.floor(Math.log10(a)), m = x / 10 ** e; return `${(+m.toFixed(s - 1))} × 10${String(e).replace("-", "⁻").replace(/\d/g, d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d])}`; }
  const d = Math.max(0, s - 1 - Math.floor(Math.log10(a)));
  return (+x.toFixed(d)).toString();
}
/* build an MCQ from a correct value and distractor values (all numeric) */
function N(o) {
  const s = o.s || 3, u = o.u ? " " + o.u : "";
  const f = x => (o.fmt ? o.fmt(x) : sig(x, s)) + u;
  const right = f(o.ans), opts = [right];
  for (const w of o.wrong) { const t = f(w); if (!opts.includes(t) && isFinite(w)) opts.push(t); if (opts.length === 4) break; }
  let k = 1; while (opts.length < 4 && k < 60) { const base = o.ans === 0 ? 1 : o.ans; const t = f(o.ans + base * 0.17 * Math.ceil(k / 2) * (k % 2 ? 1 : -1) * (k > 20 ? 3 : 1)); if (!opts.includes(t)) opts.push(t); k++; }
  while (opts.length < 4) opts.push("None of these" + " ".repeat(opts.length));
  return { q: o.q, o: opts, a: 0, e: o.e, num: true };
}
const P = (x, d = 2) => (+x.toFixed(d)).toString();
const SUP = n => String(n).replace("-", "⁻").replace(/\d/g, d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]);
/* first entry is correct; remove duplicates and top up from extras */
const U4 = (list, extras) => { const out = []; for (const x of [...list, ...extras]) { if (!out.includes(x)) out.push(x); if (out.length === 4) break; } return out; };
const deg = r => r * Math.PI / 180;
const dm = (d, m) => `${d}°${String(m).padStart(2, "0")}′`;

/* ============================== LECTURE 1 ============================== */
G.l1 = {
  con: [
    { q: "A digital balance reads 53.0, 53.1, 52.9, 53.0, 53.0 g for a certified 50.000 g mass. Which statement is correct?", o: ["Precise but not accurate — a systematic error; recalibrate the zero", "Accurate but not precise — random error dominates", "Neither precise nor accurate — a gross error", "Accurate and precise — the spread is only 0.2 g"], a: 0, e: "Tight cluster (precise) offset by ~3 g from the true value (inaccurate) → systematic bias, removed by calibration." },
    { q: "To reduce the random error of a mean to one-third, the number of repeated readings must be multiplied by:", o: ["9", "3", "√3", "27"], a: 0, e: "Standard error ∝ 1/√N, so N must increase by 3² = 9." },
    { q: "Averaging a very large number of readings will NOT remove:", o: ["A zero error of the instrument", "Electrical noise in the readings", "Small reading-to-reading fluctuations", "Scatter due to vibration"], a: 0, e: "Averaging reduces random error only; a zero error is systematic and survives averaging." },
    { q: "Temperature measured in °C is which type of data?", o: ["Interval — equal gaps but no true zero", "Ratio — has a true zero", "Ordinal — ordered categories", "Nominal — labels only"], a: 0, e: "0 °C is not 'no temperature', so ratios are meaningless: interval data." },
    { q: "h = H + R, with H = 90 cm from a metre scale (δH = 0.05 cm) and R = 2.15 mm from a screw gauge (δR = 0.0025 cm). To improve the precision of h you should:", o: ["Measure H with a finer instrument", "Measure R with a finer instrument", "Measure R more times", "Nothing — the two terms contribute equally"], a: 0, e: "δh = √(0.05² + 0.0025²) ≈ 0.05 cm: the coarse metre-scale term dominates." },
    { q: "For a pendulum, T = 2π√(L/g). Which plot gives a straight line through the origin, and what is its slope?", o: ["T² vs L, slope 4π²/g", "T vs L, slope 2π/√g", "T vs √L, slope g/2π", "log T vs L, slope ½"], a: 0, e: "Squaring: T² = (4π²/g)L." },
    { q: "Data follow Y = a·e^(bX). To find b from a straight-line graph, plot:", o: ["ln Y vs X — slope b, intercept ln a", "log Y vs log X — slope b", "Y vs X — slope ab", "Y/X vs X — slope b"], a: 0, e: "ln Y = ln a + bX." },
    { q: "Why is the standard deviation of a sample computed with (N − 1) rather than N?", o: ["Because the mean x̄ was itself estimated from the same data", "Because one reading is always a gross error", "To make s smaller", "Because the first reading is discarded"], a: 0, e: "One degree of freedom is used up in estimating x̄." },
    { q: "Calibration can improve the accuracy of an instrument:", o: ["Only up to, not beyond, its precision", "Beyond its precision if repeated often", "Only for random errors", "Not at all — calibration only improves precision"], a: 0, e: "Key rule from Lecture 1." },
    { q: "The worst-case (common-sense) method of combining uncertainties is considered 'too severe' because:", o: ["It assumes all errors reach their extremes in the same direction at once", "It ignores the largest uncertainty", "It uses squared terms", "It only works for sums"], a: 0, e: "Independent errors rarely all peak together; quadrature (Kline–McClintock) is more realistic." },
    { q: "About what fraction of normally distributed readings lie within ±2σ of the mean?", o: ["95%", "68%", "99.7%", "50%"], a: 0, e: "68–95–99.7 rule." },
    { q: "A least-squares best-fit line y = mx + c always passes through:", o: ["The centroid (x̄, ȳ)", "The origin", "The first and last data points", "The highest data point"], a: 0, e: "Follows from minimising Σ(yᵢ − mxᵢ − c)²." },
    { q: "An uncertainty taken from an instrument's specification sheet (not from repeated readings) is:", o: ["Type B", "Type A", "A gross error", "A random error"], a: 0, e: "Type A = statistical from repeats; Type B = other information (specs, LC)." },
    { q: "Deflection of a beam under a slowly increasing load read only after the pointer settles is a ______ measurement; reading it while the load still oscillates risks a ______ error.", o: ["static; gross", "dynamic; systematic", "static; random only", "dynamic; calibration"], a: 0, e: "Reading before steady state is a gross error (Lecture 1, slide on gross errors)." },
    { q: "Two strongly correlated variables (r = 0.95) show that:", o: ["They are linearly associated, but causation is not proven", "One causes the other", "The data have no random error", "95% of points lie on the line"], a: 0, e: "Correlation ≠ causation; r measures linear association." },
    { q: "Which pair of instrument characteristics is correctly matched?", o: ["Dead zone — largest input change with no output", "Threshold — smallest change detectable from any starting value", "Resolution — minimum input starting from zero", "Drift — loading vs unloading difference"], a: 0, e: "Threshold starts from zero; resolution is the smallest detectable change; hysteresis is loading vs unloading." }
  ],
  gen: [
    r => { const base = r.f(9, 21, 1), d = [r.f(-.3, .3, 2), r.f(-.3, .3, 2), r.f(-.3, .3, 2), r.f(-.3, .3, 2)]; d.push(-d.reduce((a, b) => a + b, 0) + r.f(-.1, .1, 2));
      const x = d.map(v => +(base + v).toFixed(2)), n = 5, m = x.reduce((a, b) => a + b) / n, ss = x.reduce((a, b) => a + (b - m) ** 2, 0), s = Math.sqrt(ss / (n - 1));
      return N({ q: `Five readings of a length are ${x.join(", ")} mm. The standard error (uncertainty of the mean) is:`, ans: s / Math.sqrt(n), wrong: [s, Math.sqrt(ss / n) / Math.sqrt(n), s / n], u: "mm", s: 2, e: `x̄ = ${sig(m, 4)}; s = √[Σ(x−x̄)²/(N−1)] = ${sig(s, 3)}; SE = s/√5 = ${sig(s / Math.sqrt(n), 2)} mm.` }); },
    r => { const E = r.i(50, 240), dE = r.f(1, 4, 1), I = r.f(2, 15, 1), dI = r.f(0.1, 0.5, 2), Pw = E * I, fr = Math.sqrt((dE / E) ** 2 + (dI / I) ** 2);
      return N({ q: `P = EI with E = ${E} ± ${dE} V and I = ${I} ± ${dI} A. Using Kline–McClintock (quadrature), δP is about:`, ans: Pw * fr, wrong: [Pw * (dE / E + dI / I), dE * dI, Math.sqrt(dE ** 2 + dI ** 2)], u: "W", s: 3, e: `δP/P = √[(${dE}/${E})² + (${dI}/${I})²] = ${sig(fr * 100, 3)}%; P = ${sig(Pw, 4)} W → δP ≈ ${sig(Pw * fr, 3)} W.` }); },
    r => { const m = r.f(20, 120, 1), dmm = r.f(0.05, 0.3, 2), a = r.f(1.5, 4, 2), da = r.f(0.005, 0.03, 3), fr = Math.sqrt((dmm / m) ** 2 + (3 * da / a) ** 2);
      return N({ q: `A cube has mass m = ${m} ± ${dmm} g and side a = ${a} ± ${da} cm. The percentage uncertainty in its density ρ = m/a³ is:`, ans: 100 * fr, wrong: [100 * Math.sqrt((dmm / m) ** 2 + (da / a) ** 2), 100 * (dmm / m + 3 * da / a), 100 * 3 * Math.sqrt((dmm / m) ** 2 + (da / a) ** 2)], u: "%", s: 2, e: `δρ/ρ = √[(δm/m)² + (3·δa/a)²] = √[(${sig(dmm / m, 2)})² + (${sig(3 * da / a, 2)})²] = ${sig(100 * fr, 2)}%. The side term is tripled because a is cubed.` }); },
    r => { const R = r.pick([100, 150, 200, 250, 500]), x = r.pick([1, 2, 2.5, 5]), rd = Math.round(R * r.f(0.2, 0.5, 2)), err = x / 100 * R;
      return N({ q: `A thermometer of range 0–${R} °C has accuracy ±${x}% of full scale. When it reads ${rd} °C, the possible error expressed as a percentage of the reading is:`, ans: 100 * err / rd, wrong: [x, 100 * err / R * rd / R, err], u: "%", s: 3, e: `Absolute error = ${x}% × ${R} = ±${sig(err, 3)} °C anywhere on the scale → ${sig(err, 3)}/${rd} × 100 = ${sig(100 * err / rd, 3)}% of the reading.` }); },
    r => { const E = r.i(80, 230), dE = r.i(1, 5), I = r.f(2, 12, 1), dI = r.f(0.1, 0.4, 1);
      return N({ q: `For P = EI with E = ${E} ± ${dE} V and I = ${I} ± ${dI} A, the worst-case (common-sense) maximum power is:`, ans: (E + dE) * (I + dI), wrong: [E * I + dE * dI, (E + dE) * I, E * I * (1 + Math.sqrt((dE / E) ** 2 + (dI / I) ** 2))], u: "W", s: 4, e: `P_max = (E + δE)(I + δI) = ${E + dE} × ${sig(I + dI, 3)} = ${sig((E + dE) * (I + dI), 4)} W.` }); },
    r => { const d1 = r.f(0.02, 0.08, 3), d2 = r.f(0.02, 0.08, 3);
      return N({ q: `A length is found as L = L₁ + L₂ where δL₁ = ${d1} cm and δL₂ = ${d2} cm (independent). δL is:`, ans: Math.sqrt(d1 ** 2 + d2 ** 2), wrong: [d1 + d2, Math.abs(d1 - d2), (d1 + d2) / 2], u: "cm", s: 2, e: "For sums, absolute uncertainties add in quadrature: δL = √(δL₁² + δL₂²)." }); },
    r => { const d = r.f(4, 30, 2), dd = r.f(0.01, 0.05, 2);
      return N({ q: `The diameter of a wire is ${d} ± ${dd} mm. The percentage uncertainty in its cross-sectional area A = πd²/4 is:`, ans: 200 * dd / d, wrong: [100 * dd / d, 400 * dd / d, 100 * Math.SQRT2 * dd / d], u: "%", s: 2, e: `For Q = xⁿ, δQ/Q = |n|·δx/x = 2 × ${dd}/${d} = ${sig(200 * dd / d, 2)}%.` }); },
    r => { const lc = r.pick([0.01, 0.02, 0.005, 0.001]);
      return N({ q: `A length is obtained as the difference of two readings of an instrument with least count ${lc} mm, each read to ±½ LC. The uncertainty in the length is:`, ans: lc / Math.SQRT2, wrong: [lc / 2, lc, lc * Math.SQRT2], u: "mm", s: 3, e: `δ = √[(LC/2)² + (LC/2)²] = LC/√2 = ${sig(lc / Math.SQRT2, 3)} mm.` }); },
    r => { const m = r.f(1.2, 3.5, 2), c = r.f(0.5, 3, 1), xs = [1, 2, 3, 4, 5], ys = xs.map((x, i) => +(m * x + c + [0.12, -0.08, 0.05, -0.1, 0.07][i] * r.f(0.6, 1.4, 1)).toFixed(2));
      const n = 5, sx = 15, sy = ys.reduce((a, b) => a + b), sxy = xs.reduce((a, x, i) => a + x * ys[i], 0), sxx = 55, slope = (n * sxy - sx * sy) / (n * sxx - sx * sx), ic = (sy - slope * sx) / n;
      return N({ q: `Least-squares fit of the data (x, y): ${xs.map((x, i) => `(${x}, ${ys[i]})`).join(", ")}. The slope m is:`, ans: slope, wrong: [(ys[4] - ys[0]) / 4, ic, sy / sx], s: 3, e: `m = [NΣxy − ΣxΣy]/[NΣx² − (Σx)²] = [5×${sig(sxy, 5)} − 15×${sig(sy, 4)}]/[5×55 − 225] = ${sig(slope, 3)}.` }); },
    r => { const t = r.f(9.78, 9.83, 3), mval = r.f(9.4, 10.3, 2);
      return N({ q: `A student measures g = ${mval} m/s² against an accepted ${t} m/s². The percentage error is:`, ans: 100 * Math.abs(mval - t) / t, wrong: [100 * Math.abs(mval - t) / mval, Math.abs(mval - t), 100 * mval / t], u: "%", s: 2, e: "% error = |measured − true| / true × 100." }); },
    r => { const k = r.f(1.5, 6, 2), dk = r.f(0.02, 0.1, 2), x = r.f(2, 9, 2), dx = r.f(0.01, 0.05, 2), Q = k * x * x, fr = Math.sqrt((dk / k) ** 2 + (2 * dx / x) ** 2);
      return N({ q: `Q = kx² with k = ${k} ± ${dk} and x = ${x} ± ${dx}. δQ is:`, ans: Q * fr, wrong: [Q * Math.sqrt((dk / k) ** 2 + (dx / x) ** 2), Q * (dk / k + 2 * dx / x), dk * dx * 2], s: 2, e: `Q = ${sig(Q, 4)}; δQ/Q = √[(δk/k)² + (2δx/x)²] = ${sig(100 * fr, 3)}% → δQ = ${sig(Q * fr, 2)}.` }); }
  ]
};

/* ============================== EXP 1 — BMI & BP (Bio) ============================== */
G.bio = {
  con: [
    { q: "In the BMI experiment, the BMI category (Underweight/Normal/Overweight/Obese) is which data type?", o: ["Ordinal", "Nominal", "Interval", "Ratio"], a: 0, e: "Ordered categories with unequal gaps." },
    { q: "A positive Pearson r between BMI and systolic BP for your group shows that:", o: ["Higher BMI tends to go with higher BP, but it does not prove BMI causes high BP", "BMI causes high BP", "BP readings have no random error", "Every subject with high BMI has high BP"], a: 0, e: "Association, not causation." },
    { q: "Why must the subject step off and back onto the scale between the three weight replicates?", o: ["To make each replicate an independent measurement", "To recalibrate the load cell", "To remove systematic error", "To let the scale cool"], a: 0, e: "Independent replicates expose random variation; the mean then reduces it." },
    { q: "A digital sphygmomanometer works on the oscillometric principle, which means it:", o: ["Detects arterial-wall vibrations as the cuff deflates", "Listens to Korotkoff sounds", "Measures a mercury column", "Uses a strain gauge on the artery"], a: 0, e: "Oscillations in cuff pressure are analysed to give SBP and DBP." },
    { q: "A national-level sprinter has BMI 27. The best interpretation is:", o: ["BMI cannot separate muscle from fat, so it may overstate risk", "The athlete is definitely obese", "BMI must be wrong by a gross error", "BP must also be high"], a: 0, e: "BMI is a screening tool; it ignores body composition and fat distribution." },
    { q: "Measuring the same DNA sample three times on a spectrophotometer gives:", o: ["Technical replicates — they assess measurement variability", "Biological replicates — they assess biological variability", "Positive controls", "Independent samples"], a: 0, e: "Same sample → technical. Different organisms/cultures → biological." },
    { q: "A culture's OD₆₀₀ reads 1.9 and the curve flattens at high density. The correct step is:", o: ["Dilute the sample and multiply the reading by the dilution factor", "Report 1.9 directly as cell number", "Switch to 260 nm", "Increase the path length"], a: 0, e: "OD₆₀₀ is non-linear at high density; dilute into the linear range." },
    { q: "Which control should give NO response if the assay is working correctly?", o: ["Negative control", "Positive control", "Blank used to zero the instrument", "Standard"], a: 0, e: "Positive gives expected response; blank measures background." },
    { q: "A DNA sample has A₂₆₀/A₂₈₀ = 1.4 (pure DNA ≈ 1.8). This most likely indicates:", o: ["Protein contamination", "Very pure DNA", "RNA only", "An instrument zero error"], a: 0, e: "Proteins absorb at 280 nm, lowering the ratio." },
    { q: "A method that is very sensitive but not specific may:", o: ["Give a strong signal from interfering components — misleading results", "Never detect the analyte", "Have no limit of detection", "Always be accurate"], a: 0, e: "Specificity = measuring the target despite other components." },
    { q: "Height, weight, BMI and blood pressure in mmHg are all:", o: ["Ratio data", "Interval data", "Ordinal data", "Nominal data"], a: 0, e: "They have a true zero and equal intervals." },
    { q: "SBP replicates for one subject are 118, 131, 120 mmHg. The most sensible action is:", o: ["Check the cuff position/rest time and repeat — 131 looks like a gross error", "Report the median only", "Discard all readings", "Average them as they are"], a: 0, e: "A reading far from the others suggests a procedural blunder; re-measure under proper conditions." }
  ],
  gen: [
    r => { const h = [r.f(1.6, 1.85, 3)]; h.push(+(h[0] + r.f(-.004, .004, 3)).toFixed(3), +(h[0] + r.f(-.004, .004, 3)).toFixed(3)); const w0 = r.f(50, 95, 1), w = [w0, +(w0 + r.f(-.3, .3, 1)).toFixed(1), +(w0 + r.f(-.3, .3, 1)).toFixed(1)];
      const H = (h[0] + h[1] + h[2]) / 3, W = (w[0] + w[1] + w[2]) / 3, b = W / H / H;
      return N({ q: `Replicate heights ${h.join(", ")} m and weights ${w.join(", ")} kg. BMI from the averaged replicates is:`, ans: b, wrong: [W / H, W / (H * H) * 1.12, H * H / W * 1000], u: "kg/m²", s: 3, e: `H̄ = ${sig(H, 4)} m, W̄ = ${sig(W, 4)} kg → BMI = ${sig(W, 4)}/${sig(H, 4)}² = ${sig(b, 3)}.` }); },
    r => { const h = r.f(1.55, 1.9, 2), lim = r.pick([25, 30, 18.5]);
      return N({ q: `For a person ${h} m tall, the body mass at which BMI reaches ${lim} (a category boundary) is:`, ans: lim * h * h, wrong: [lim * h, lim / h / h * 10, lim * h * h * 1.1], u: "kg", s: 3, e: `m = BMI × h² = ${lim} × ${h}² = ${sig(lim * h * h, 3)} kg.` }); },
    r => { const c = r.i(30, 280), dil = r.pick([4, 5, 6, 7]), v = r.pick([0.1, 0.2, 0.05]), ans = c * 10 ** dil / v;
      return N({ q: `${c} colonies grow when ${v} mL of a 10⁻${dil} dilution is plated. The viable count is:`, ans, wrong: [c * 10 ** dil * v, c * 10 ** dil, c / v * 10 ** (dil - 1)], u: "CFU/mL", s: 3, e: `CFU/mL = colonies × dilution factor ÷ volume = ${c} × 10${"⁰¹²³⁴⁵⁶⁷⁸⁹"[dil]} ÷ ${v}.` }); },
    r => { const kind = r.pick([["dsDNA", 50], ["RNA", 40], ["ssDNA", 33]]), od = r.f(0.15, 0.9, 2), df = r.pick([10, 20, 50, 100]), ans = od * kind[1] * df;
      return N({ q: `A ${kind[0]} sample diluted ${df}-fold gives A₂₆₀ = ${od}. Its concentration in the original sample is:`, ans, wrong: [od * kind[1], od * (kind[1] === 50 ? 40 : 50) * df, od * kind[1] / df], u: "µg/mL", s: 3, e: `A₂₆₀ = 1.0 ↔ ${kind[1]} µg/mL ${kind[0]}; conc = ${od} × ${kind[1]} × ${df}.` }); },
    r => { const xs = [r.f(19, 22, 1), r.f(22, 24, 1), r.f(24, 26, 1), r.f(26, 29, 1), r.f(29, 33, 1)], ys = xs.map(x => +(2.1 * x + 66 + r.f(-6, 6, 0)).toFixed(0));
      const n = 5, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n; let sxy = 0, sxx = 0, syy = 0; for (let i = 0; i < n; i++) { const X = xs[i] - mx, Y = ys[i] - my; sxy += X * Y; sxx += X * X; syy += Y * Y; }
      const rr = sxy / Math.sqrt(sxx * syy);
      return N({ q: `Group data — BMI: ${xs.join(", ")}; SBP_avg (mmHg): ${ys.join(", ")}. The Pearson correlation coefficient r is:`, ans: rr, wrong: [rr * rr, sxy / sxx / 10, -rr], s: 3, e: `With Xᵢ = xᵢ − x̄, Yᵢ = yᵢ − ȳ: r = ΣXᵢYᵢ/√(ΣXᵢ²ΣYᵢ²) = ${sig(sxy, 4)}/√(${sig(sxx, 4)} × ${sig(syy, 4)}) = ${sig(rr, 3)}.` }); },
    r => { const s = [r.i(108, 135)]; s.push(s[0] + r.i(-6, 6), s[0] + r.i(-6, 6)); const m = (s[0] + s[1] + s[2]) / 3, rg = Math.max(...s) - Math.min(...s), sd = Math.sqrt(s.reduce((a, b) => a + (b - m) ** 2, 0) / 2);
      const o = [`${sig(m, 4)} mmHg; ${rg} mmHg`, `${sig(m, 4)} mmHg; ${sig(sd, 2)} mmHg`, `${Math.max(...s)} mmHg; ${rg} mmHg`, `${s[1]} mmHg; ${rg} mmHg`];
      return { q: `Three SBP replicates are ${s.join(", ")} mmHg. The mean of replicates and the replicate range (max − min) are:`, o: U4(o, [`${sig(m + 1, 4)} mmHg; ${rg} mmHg`, `${sig(m, 4)} mmHg; ${rg + 2} mmHg`, `${sig(m - 1, 4)} mmHg; ${rg} mmHg`, `${sig(m, 4)} mmHg; ${rg * 2} mmHg`]), a: 0, e: `Mean = ${sig(m, 4)} mmHg; range = ${Math.max(...s)} − ${Math.min(...s)} = ${rg} mmHg (the second option gives the SD, not the range).`, num: true }; }
  ]
};

/* ============================== EXP 2 — Venturi & orifice (Chem Engg) ============================== */
const A1 = 6.157e-4, A2 = 1.539e-4, Hof = h => h / 100 * (13600 / 1000 - 1), Qt = H => A1 * A2 * Math.sqrt(2 * 9.81 * H) / Math.sqrt(A1 * A1 - A2 * A2);
G.chemeng = {
  con: [
    { q: "Why is the coefficient of discharge of a venturimeter (≈0.97) much higher than that of an orificemeter (≈0.62)?", o: ["The gradual divergent cone recovers pressure with small losses; the orifice jet contracts and forms eddies", "The venturi throat is larger", "The orifice uses mercury", "Venturi flow is turbulent and orifice flow laminar"], a: 0, e: "Orifice: vena contracta + large eddy losses → low Cd." },
    { q: "The vena contracta is the section where the jet has:", o: ["Minimum area, maximum velocity and minimum pressure", "Maximum area and minimum velocity", "Maximum pressure", "Zero velocity"], a: 0, e: "It lies just downstream of the orifice plate." },
    { q: "In a venturimeter P₁ > P₂ because:", o: ["Continuity forces velocity up in the throat and Bernoulli then requires pressure to drop", "Friction is highest at the throat", "The manometer is connected backwards", "Density increases at the throat"], a: 0, e: "A₁V₁ = A₂V₂ → V₂ > V₁ → P₂ < P₁." },
    { q: "A student reports Cd = 1.29 for the venturimeter. This most likely means:", o: ["An experimental error (e.g. timing, trapped air, wrong h) — Cd cannot exceed 1", "The venturi is extremely efficient", "Flow was laminar", "The result is fine"], a: 0, e: "Actual flow can't exceed the ideal (loss-free) flow, so Cd ≤ 1." },
    { q: "Why must the manometer taps be opened slowly after starting the pump?", o: ["So the manometer fluid is not blown out", "To let the pump warm up", "To increase Cd", "To reduce the flow rate"], a: 0, e: "A sudden pressure surge can push mercury out of the U-tube." },
    { q: "In a rotameter, the float settles where:", o: ["Drag + buoyancy = weight", "Drag = buoyancy", "Weight = 0", "Pressure above = pressure below"], a: 0, e: "F_D + F_B = W; higher flow → higher float." },
    { q: "Which pair are BOTH differential-pressure flowmeters?", o: ["Venturimeter and orificemeter", "Rotameter and anemometer", "Orificemeter and rotameter", "Bourdon gauge and venturimeter"], a: 0, e: "The rotameter is variable-area; a Bourdon gauge measures pressure." },
    { q: "An inclined-tube manometer is used instead of a U-tube when:", o: ["The pressure difference is small and needs magnifying", "The pressure is very high", "Mercury is unavailable", "Measuring vacuum"], a: 0, e: "Inclining spreads a small vertical rise over a long scale." },
    { q: "Which action is forbidden while running the flow rig?", o: ["Closing the delivery and by-pass valves together", "Opening the by-pass", "Releasing trapped air", "Closing manometer taps first at the end"], a: 0, e: "It dead-heads the pump." },
    { q: "Why are orificemeters still widely used despite lower Cd?", o: ["They are cheap, compact and easy to install", "They have no pressure loss", "They need no calibration", "They measure temperature too"], a: 0, e: "A thin plate with a hole is simple and inexpensive." },
    { q: "If air bubbles are trapped in the manometer limbs, the measured h (and hence Qt) is most likely:", o: ["Wrong (usually too small) — release air through the air-release valve first", "Unaffected", "Exactly doubled", "Only affects Qa"], a: 0, e: "Air columns distort the pressure balance; bleed them before reading." },
    { q: "Doubling the manometer reading h (all else fixed) changes the theoretical discharge Qt by a factor of:", o: ["√2", "2", "4", "1/√2"], a: 0, e: "Qt ∝ √H and H ∝ h." }
  ],
  gen: [
    r => { const h = r.f(3, 18, 1), H = Hof(h);
      return N({ q: `A mercury–water U-tube manometer shows h = ${h} cm. The head difference in metres of water is (ρm = 13 600, ρw = 1000 kg/m³):`, ans: H, wrong: [h / 100 * 13.6, h / 100, h * 12.6], u: "m", s: 3, e: `H = (h/100)(ρm/ρw − 1) = ${h}/100 × 12.6 = ${sig(H, 3)} m.` }); },
    r => { const h = r.f(3, 15, 1), H = Hof(h), q = Qt(H);
      return N({ q: `For the lab venturimeter (a₁ = 6.157 × 10⁻⁴ m², a₂ = 1.539 × 10⁻⁴ m²) the manometer reads h = ${h} cm of mercury. The theoretical discharge Qt is:`, ans: q, wrong: [Qt(h / 100), A2 * Math.sqrt(2 * 9.81 * H), A1 * A2 * Math.sqrt(9.81 * H) / Math.sqrt(A1 * A1 - A2 * A2)], u: "m³/s", s: 3, e: `H = 0.126h = ${sig(H, 3)} m; Qt = a₁a₂√(2gH)/√(a₁² − a₂²) = ${sig(q, 3)} m³/s.` }); },
    r => { const R = r.f(2, 9, 1), t = r.f(5, 30, 1), Qa = 0.1 * R / 100 / t;
      return N({ q: `In the measuring tank (A = 0.1 m²) the water rises ${R} cm in ${t} s. The actual discharge Qa is:`, ans: Qa, wrong: [0.1 * R / t, 0.1 * R / 100 * t, R / 100 / t], u: "m³/s", s: 3, e: `Qa = A·R/t = 0.1 × ${R / 100} / ${t} = ${sig(Qa, 3)} m³/s.` }); },
    r => { const kind = r.pick(["venturimeter", "orificemeter"]), h = r.f(4, 14, 1), q = Qt(Hof(h)), cd = kind[0] === "v" ? r.f(0.94, 0.98, 2) : r.f(0.6, 0.66, 2), t = r.f(6, 25, 1), R = +(q * cd * t / 0.1 * 100).toFixed(1), cdx = 0.1 * R / 100 / t / q;
      return N({ q: `For the ${kind}: h = ${h} cm Hg, tank rise R = ${R} cm in t = ${t} s (A = 0.1 m², a₁ = 6.157 × 10⁻⁴, a₂ = 1.539 × 10⁻⁴ m²). Cd is:`, ans: cdx, wrong: [1 / cdx, cdx * Math.sqrt(13.6 / 12.6), 0.1 * R / t / q / 100 * 0.8], s: 3, e: `H = ${sig(Hof(h), 3)} m; Qt = ${sig(q, 3)}; Qa = ${sig(0.1 * R / 100 / t, 3)} m³/s → Cd = Qa/Qt = ${sig(cdx, 3)}.` }); },
    r => { const d1 = r.pick([28, 30, 40, 50]), ratio = r.pick([2, 2.5, 1.6]), d2 = +(d1 / ratio).toFixed(1);
      return N({ q: `Water flows from a ${d1} mm pipe into a ${d2} mm throat. The velocity at the throat is how many times the inlet velocity?`, ans: (d1 / d2) ** 2, wrong: [d1 / d2, (d1 / d2) ** 4, Math.sqrt(d1 / d2)], s: 3, fmt: x => sig(x, 3) + "×", e: "Continuity: V₂/V₁ = A₁/A₂ = (d₁/d₂)²." }); },
    r => { const h = r.f(5, 15, 1), cd = r.f(0.6, 0.65, 2), q = Qt(Hof(h));
      return N({ q: `An orificemeter with Cd = ${cd} (same areas as the lab meter) shows h = ${h} cm Hg. The actual flow rate is:`, ans: cd * q, wrong: [q, q / cd, cd * Qt(h / 100)], u: "m³/s", s: 3, e: `Q = Cd·Qt = ${cd} × ${sig(q, 3)} = ${sig(cd * q, 3)} m³/s.` }); }
  ]
};

/* ============================== EXP 3 — pH scale (Chemistry) ============================== */
G.chem = {
  con: [
    { q: "Turmeric indicator stays yellow in both vinegar and tap water. The correct conclusion is:", o: ["Turmeric separates acids from bases but cannot rank acids against neutral or each other", "Vinegar and tap water have the same pH", "The indicator has expired", "Both are basic"], a: 0, e: "Curcumin is yellow over the whole acidic–neutral range; it turns orange-red only in alkali." },
    { q: "In alkaline solution curcumin shifts from yellow to orange-red because of:", o: ["Phenolic deprotonation and keto–enol change altering conjugation (bathochromic shift)", "Oxidation of turmeric to rust", "Precipitation of curcumin", "A hypsochromic (blue) shift"], a: 0, e: "Extended conjugation absorbs longer wavelengths → red shift." },
    { q: "Why must equal volumes of indicator be added to every tube?", o: ["So colour differences reflect pH, not indicator concentration", "To keep the tubes balanced", "To neutralise the samples", "To increase absorbance"], a: 0, e: "Uncontrolled indicator amount is a source of error in colour comparison." },
    { q: "Which calibration strategy cancels matrix interference by spiking aliquots of the sample itself?", o: ["Standard addition", "External standard", "Internal standard", "Blank subtraction"], a: 0, e: "The analyte is measured in its own matrix." },
    { q: "In size-exclusion chromatography (SEC/GPC):", o: ["Larger molecules elute first", "Smaller molecules elute first", "Elution depends on charge", "All molecules co-elute"], a: 0, e: "Large molecules are excluded from the pores and take the shortest path." },
    { q: "Which mass-spectrometry ionisation gives a fragment 'fingerprint' rather than intact molecular ions?", o: ["EI at 70 eV (hard)", "ESI (soft)", "MALDI (soft)", "ICP"], a: 0, e: "Soft ionisation gives [M+H]⁺." },
    { q: "On a DSC curve, melting appears as ______ and crystallisation as ______.", o: ["endothermic; exothermic", "exothermic; endothermic", "endothermic; endothermic", "a step; a step"], a: 0, e: "Tg is a step change; peak area gives ΔH." },
    { q: "Systematic (determinate) errors in a chemical analysis are best detected and corrected using:", o: ["Certified reference materials", "More replicates", "A longer cuvette", "Higher temperature"], a: 0, e: "Replicates reduce random error only." },
    { q: "An unknown is read from a calibration curve made with standards from 0–10 ppm. The unknown's signal corresponds to 25 ppm by extrapolation. You should:", o: ["Dilute the sample into the calibrated range and re-measure", "Report 25 ppm", "Double the slope", "Use the LOD instead"], a: 0, e: "Only read unknowns within the calibrated range." },
    { q: "Lemon juice (pH ≈ 2) and baking-soda solution (pH ≈ 8.3) differ in [H⁺] by a factor of about:", o: ["2 × 10⁶", "6.3", "4", "10⁻⁶"], a: 0, e: "10^(8.3 − 2) = 10^6.3 ≈ 2 × 10⁶." },
    { q: "A pH meter must be calibrated with at least two buffers because:", o: ["Two points fix both the offset and the slope of the electrode response", "One buffer is never accurate", "It warms the electrode", "Buffers clean the glass bulb"], a: 0, e: "Calibration line needs two points (offset + sensitivity)." },
    { q: "An internal standard corrects mainly for:", o: ["Fluctuations in injection volume or instrument response", "Matrix interference only", "Wrong wavelength", "Contaminated glassware"], a: 0, e: "The ratio Ax/Ais cancels run-to-run variations." }
  ],
  gen: [
    r => { const m = r.f(1.1, 9.9, 1), e = r.i(2, 5), H = m * 10 ** -e, pH = -Math.log10(H);
      return N({ q: `A solution has [H⁺] = ${m} × 10${SUP(-e)} mol/L. Its pH is:`, ans: pH, wrong: [e, 14 - pH, -Math.log(H)], s: 3, fmt: x => P(x, 2), e: `pH = −log₁₀(${m} × 10${SUP(-e)}) = ${P(pH, 2)}.` }); },
    r => { const a = r.f(2, 4, 1), b = r.f(a + 1.5, a + 4, 1);
      return N({ q: `Sample X has pH ${a} and sample Y has pH ${b}. [H⁺] in X is how many times that in Y?`, ans: 10 ** (b - a), wrong: [b - a, b / a, 10 * (b - a)], s: 3, fmt: x => sig(x, 3) + "×", e: `Ratio = 10^(${b} − ${a}) = ${sig(10 ** (b - a), 3)}.` }); },
    r => { const eps = r.i(5, 25) * 1000, A = r.f(0.2, 1.2, 2), b = r.pick([1, 1, 0.5, 2]), c = A / (eps * b);
      return N({ q: `A solution with ε = ${eps} L mol⁻¹ cm⁻¹ gives A = ${A} in a ${b} cm cuvette. Its concentration is:`, ans: c, wrong: [A * eps * b, A / eps, A * b / eps], u: "mol/L", s: 3, e: `c = A/(εb) = ${A}/(${eps} × ${b}) = ${sig(c, 3)} mol/L.` }); },
    r => { const sd = r.f(0.002, 0.01, 3), m = r.f(0.05, 0.4, 3), which = r.pick(["LOD", "LOQ"]), k = which === "LOD" ? 3 : 10;
      return N({ q: `Blank readings have SD σ = ${sd} absorbance units and the calibration slope is m = ${m} AU per ppm. The ${which} is:`, ans: k * sd / m, wrong: [(13 - k) * sd / m, k * sd * m, sd / m], u: "ppm", s: 3, e: `${which} = ${k}σ/m = ${k} × ${sd}/${m} = ${sig(k * sd / m, 3)} ppm.` }); },
    r => { const ds = r.f(6, 9, 1), da = r.f(1.5, ds - 1, 1);
      return N({ q: `On a TLC plate the solvent front moves ${ds} cm and the spot moves ${da} cm. Rf is:`, ans: da / ds, wrong: [ds / da, (ds - da) / ds, da / (ds + da)], s: 3, fmt: x => P(x, 2), e: "Rf = d_analyte / d_solvent (best between 0.2 and 0.8)." }); },
    r => { const t1 = r.f(3, 8, 2), t2 = +(t1 + r.f(0.3, 1.2, 2)).toFixed(2), w1 = r.f(0.3, 0.7, 2), w2 = r.f(0.3, 0.7, 2), Rs = 2 * (t2 - t1) / (w1 + w2);
      return N({ q: `Two HPLC peaks have tr = ${t1} and ${t2} min with base widths ${w1} and ${w2} min. Their resolution Rs is (baseline separation needs ≥ 1.5):`, ans: Rs, wrong: [(t2 - t1) / (w1 + w2), 2 * (t2 - t1) / Math.abs(w1 - w2), (t2 - t1) / Math.max(w1, w2)], s: 3, e: `Rs = 2(tr₂ − tr₁)/(w₁ + w₂) = 2 × ${P(t2 - t1, 2)}/${P(w1 + w2, 2)} = ${sig(Rs, 3)}.` }); },
    r => { const e = r.i(1, 3), f = r.pick([10, 100]), pH = e + Math.log10(f);
      return N({ q: `0.${"0".repeat(e - 1)}1 M HCl (strong acid) is diluted ${f}-fold with water. The new pH is:`, ans: pH, wrong: [e, e * Math.log10(f), e - Math.log10(f)], s: 2, fmt: x => P(x, 1), e: `[H⁺] = 10⁻${e}/${f} → pH = ${e} + log₁₀${f} = ${P(pH, 1)}.` }); }
  ]
};

/* ============================== EXP 4 — Theodolite (Civil) ============================== */
G.civil = {
  con: [
    { q: "Why must the instrument height h be added in H = h + D tan θ?", o: ["D tan θ only gives the rise above the trunnion axis, not above the ground", "To correct for curvature", "To cancel index error", "To convert to metres"], a: 0, e: "Forgetting h is the commonest beginner's error." },
    { q: "Taking the mean of Face Left and Face Right vertical angles cancels:", o: ["Index error of the vertical circle and collimation error", "Tape sag", "Refraction", "Error in h"], a: 0, e: "Standard theodolite practice." },
    { q: "An error ΔD in the horizontal distance causes an error in height of about ΔD·tan θ. This is worst when:", o: ["The observer stands close to a tall building (steep θ)", "The building is far away", "θ is about 10°", "The tape is taut"], a: 0, e: "tan θ grows rapidly as θ → 90°." },
    { q: "The principle 'work from the whole to the part' is followed so that:", o: ["Errors stay local instead of accumulating", "Fewer stations are needed", "Angles need not be measured", "Curvature can be ignored"], a: 0, e: "Accurate control first, detail later." },
    { q: "A survey of a 40 km² campus can be done as plane surveying because:", o: ["The area is well under ~250 km², so curvature can be ignored", "It is on flat land", "Theodolites can't measure curvature", "It is inside a city"], a: 0, e: "Geodetic surveying is for areas > 250 km²." },
    { q: "A steel tape that is 2 cm too long causes a ______ error; misreading 6 as 9 is a ______ error.", o: ["systematic; gross", "random; systematic", "gross; random", "systematic; random"], a: 0, e: "Same direction every time → systematic; blunder → gross." },
    { q: "Contour lines drawn close together indicate:", o: ["A steep slope", "Flat ground", "A lake", "A survey error"], a: 0, e: "Contours never cross except at an overhang." },
    { q: "The difference between a map and a plan is:", o: ["Scale — a map is small-scale, a plan large-scale", "Colour", "The instrument used", "Whether heights are shown"], a: 0, e: "From the lecture." },
    { q: "In levelling, the back sight (BS) is:", o: ["The first reading after setting up, taken on a point of known RL", "The last reading before moving the level", "Any reading on a benchmark only", "The height of instrument"], a: 0, e: "HI = RL + BS; RL = HI − FS." },
    { q: "The two-station method is used when:", o: ["The base of the building is inaccessible, so D cannot be taped", "The theodolite has no vertical circle", "The building is short", "Only horizontal angles are available"], a: 0, e: "D₁ = b tan θ₂/(tan θ₁ − tan θ₂)." },
    { q: "A theodolite is not levelled properly. This mainly introduces:", o: ["A systematic error in the vertical angles", "A random error averaged out by repeats", "No error since FL/FR are averaged", "An error only in the tape distance"], a: 0, e: "Poor levelling biases every reading in the same direction." },
    { q: "ΣBS − ΣFS = last RL − first RL is used in a level field book to:", o: ["Check the arithmetic of the reductions", "Detect misread staff readings", "Correct for curvature", "Find the height of instrument"], a: 0, e: "It catches arithmetic slips, not reading errors." }
  ],
  gen: [
    r => { const D = r.f(15, 45, 2), h = r.f(1.3, 1.65, 2), d = r.i(18, 52), m = r.i(0, 59), th = deg(d + m / 60), H = h + D * Math.tan(th);
      return N({ q: `A theodolite (trunnion axis ${h} m above ground) is ${D} m from a building. The mean angle of elevation to the top is ${dm(d, m)}. The building height is:`, ans: H, wrong: [D * Math.tan(th), h + D * Math.sin(th), h + D / Math.tan(th)], u: "m", s: 4, e: `H = h + D tan θ = ${h} + ${D} × ${sig(Math.tan(th), 4)} = ${sig(H, 4)} m.` }); },
    r => { const b = r.f(8, 20, 1), t1 = r.i(35, 55), t2 = t1 - r.i(8, 16), h = r.f(1.4, 1.6, 2), T1 = Math.tan(deg(t1)), T2 = Math.tan(deg(t2)), D1 = b * T2 / (T1 - T2), H = h + D1 * T1;
      return N({ q: `Two-station method: stations ${b} m apart in line with a building; elevation angles ${t1}° (near) and ${t2}° (far); instrument height ${h} m. The building height is:`, ans: H, wrong: [D1 * T1, h + (D1 + b) * T1, h + D1 * T2], u: "m", s: 4, e: `D₁ = b tan θ₂/(tan θ₁ − tan θ₂) = ${sig(D1, 4)} m; H = h + D₁ tan θ₁ = ${sig(H, 4)} m.` }); },
    r => { const rl = r.f(98, 102, 3), bs = r.f(1.1, 1.9, 3), fs = r.f(0.6, 2.6, 3), HI = rl + bs;
      return N({ q: `A benchmark has RL ${rl} m. Back sight on it = ${bs} m; fore sight on point B = ${fs} m. RL of B is:`, ans: HI - fs, wrong: [rl - bs + fs, HI + fs, rl - fs], u: "m", s: 5, fmt: x => x.toFixed(3), e: `HI = ${rl} + ${bs} = ${HI.toFixed(3)}; RL(B) = HI − FS = ${(HI - fs).toFixed(3)} m.` }); },
    r => { const cm = r.pick([1, 2, 5]), m = r.pick([10, 20, 50, 100, 250]);
      return N({ q: `On a plan, ${cm} cm represents ${m * cm} m on the ground. The representative fraction (RF) is 1 :`, ans: m * 100, wrong: [m, m * 10, m * 1000], s: 4, fmt: x => Math.round(x).toLocaleString("en-IN"), e: `RF = drawing/ground = 1 cm/${m} m = 1/${m * 100}.` }); },
    r => { const d = r.f(0.5, 3, 1);
      return N({ q: `The curvature correction for a sight of ${d} km is about (0.0785 d² m, d in km):`, ans: 0.0785 * d * d, wrong: [0.0785 * d, 0.785 * d * d, 0.0785 * d * d * 100], u: "m", s: 3, e: `c = 0.0785 × ${d}² = ${sig(0.0785 * d * d, 3)} m.` }); },
    r => { const dD = r.f(0.05, 0.3, 2), th = r.i(30, 70);
      return N({ q: `The horizontal distance is mistaped by ${dD} m and θ = ${th}°. The resulting error in the computed height is about:`, ans: dD * Math.tan(deg(th)), wrong: [dD, dD * Math.sin(deg(th)), dD / Math.tan(deg(th))], u: "m", s: 3, e: `ΔH ≈ ΔD tan θ = ${dD} × ${sig(Math.tan(deg(th)), 3)}.` }); },
    r => { const H = r.f(12, 40, 1), h = r.f(1.4, 1.6, 2), D = r.f(15, 40, 1), th = Math.atan((H - h) / D) * 180 / Math.PI;
      return N({ q: `To sight the top of a ${H} m tower from ${D} m away with an instrument ${h} m high, the angle of elevation must be:`, ans: th, wrong: [Math.atan(H / D) * 180 / Math.PI, Math.asin(Math.min(1, (H - h) / D)) * 180 / Math.PI, 90 - th], s: 3, fmt: x => P(x, 2) + "°", e: `θ = tan⁻¹[(H − h)/D] = tan⁻¹(${P(H - h, 2)}/${D}) = ${P(th, 2)}°.` }); }
  ]
};

/* ============================== EXP 5 — LVDT (EEE) ============================== */
G.eee = {
  con: [
    { q: "In an LVDT the two secondary windings are connected in series opposition so that:", o: ["The output V₁ − V₂ is zero at the centre (null) and grows with displacement either way", "The output doubles at null", "The primary current is zero", "Frequency changes with displacement"], a: 0, e: "V₀ = V₁ − V₂." },
    { q: "Crossing the null position, the LVDT output on the CRO:", o: ["Changes phase by 180°, which gives the direction of motion", "Changes frequency", "Becomes DC", "Doubles in amplitude"], a: 0, e: "Amplitude → size, phase → direction." },
    { q: "Why is the LVDT described as frictionless with low hysteresis?", o: ["The soft-iron core does not touch the former", "It has no windings", "It uses DC", "It is a piezoelectric device"], a: 0, e: "No mechanical contact between the core and coils." },
    { q: "The LVDT is a ______ transducer.", o: ["passive, inductive", "active, piezoelectric", "active, thermoelectric", "passive, capacitive"], a: 0, e: "It needs an AC excitation supply." },
    { q: "A Bourdon tube turns pressure into displacement and an LVDT turns that into voltage. Here the LVDT acts as:", o: ["A secondary transducer", "A primary sensing element", "A data presentation element", "A calibration standard"], a: 0, e: "From the lecture." },
    { q: "Before measuring, the CRO is connected to its CAL terminal set at 1 V/div and 1 ms/div. A correctly calibrated CRO shows:", o: ["1 V amplitude at 1 kHz", "1 V at 50 Hz", "10 V at 1 kHz", "A flat line"], a: 0, e: "CAL signal = 1 V, 1 kHz." },
    { q: "Turning the screw gauge back and forth gives slightly different readings for the same core position. This is due to:", o: ["Backlash — a dead-zone effect; approach each setting from the same direction", "Random electrical noise", "A wrong CRO setting", "Drift of the null"], a: 0, e: "Dead zone from backlash/friction." },
    { q: "The minimum input, starting from zero, that produces a detectable output is the:", o: ["Threshold", "Resolution", "Dead time", "Sensitivity"], a: 0, e: "Resolution is the smallest detectable change from any point." },
    { q: "A strain gauge's resistance change is converted to a voltage by a bridge circuit. In the generalised measuring system the bridge is the:", o: ["Variable conversion element", "Primary sensing element", "Data transmission element", "Presentation element"], a: 0, e: "It changes an inconvenient output into a convenient one." },
    { q: "Same operator, same instrument, same conditions, short time interval: the closeness of results measures:", o: ["Repeatability", "Reproducibility", "Accuracy", "Linearity"], a: 0, e: "Reproducibility changes operator, instrument, place or time." },
    { q: "A sensor's calibration curve has constant slope over its whole range. The sensor is:", o: ["Linear — constant sensitivity", "Hysteretic", "Non-linear", "Drifting"], a: 0, e: "Constant sensitivity = linear system." },
    { q: "The LVDT graph is linear on both sides of null but the CRO amplitude alone looks identical at ±1 mm. To tell them apart you use:", o: ["The phase of the output relative to the primary", "The frequency", "The DC offset only", "The CRO time base"], a: 0, e: "0° on one side, 180° on the other." }
  ],
  gen: [
    r => { const s = r.f(80, 260, 0), x1 = r.f(0.5, 1.5, 1), x2 = +(x1 + r.f(1, 2.5, 1)).toFixed(1), v1 = +(s * x1 + r.f(-3, 3, 1)).toFixed(1), v2 = +(s * x2 + r.f(-3, 3, 1)).toFixed(1), S = (v2 - v1) / (x2 - x1);
      return N({ q: `An LVDT gives ${v1} mV at ${x1} mm and ${v2} mV at ${x2} mm from null. Its sensitivity is:`, ans: S, wrong: [(v2 + v1) / (x2 - x1), v2 / x1, (v2 - v1) / (x2 + x1)], u: "mV/mm", s: 3, e: `Sensitivity = ΔV/Δx = (${v2} − ${v1})/(${x2} − ${x1}) = ${sig(S, 3)} mV/mm.` }); },
    r => { const fsd = r.pick([10, 20, 50]), L = r.f(fsd * 0.4, fsd * 0.6, 2), U = +(L + r.f(fsd * 0.03, fsd * 0.1, 2)).toFixed(2);
      return N({ q: `A load cell (FSD = ${fsd} mV) reads ${L} mV while loading and ${U} mV while unloading at the same load. The hysteresis is:`, ans: 100 * (U - L) / fsd, wrong: [U - L, 100 * (U - L) / U, 100 * (U - L) / L], u: "% FSD", s: 3, e: `H = (${U} − ${L})/${fsd} × 100 = ${sig(100 * (U - L) / fsd, 3)}% FSD.` }); },
    r => { const W = r.pick([20, 30, 40, 70, 80]), k = r.pick([0.2, 0.25, 0.1]), fsd = k * 100, act = +(k * W * r.f(0.75, 0.93, 2)).toFixed(2);
      return N({ q: `A sensor's ideal output is V = ${k}W mV (W in kg, 0–100 kg, FSD ${fsd} mV). At ${W} kg it reads ${act} mV. The non-linearity at this point is:`, ans: 100 * (act - k * W) / fsd, wrong: [act - k * W, 100 * (act - k * W) / (k * W), 100 * (k * W - act) / fsd], u: "% FSD", s: 3, e: `N = (actual − ideal)/FSD × 100 = (${act} − ${sig(k * W, 3)})/${fsd} × 100.` }); },
    r => { const S = r.f(60, 250, 0), V = r.f(40, 400, 0);
      return N({ q: `An LVDT of sensitivity ${S} mV/mm shows an output of ${V} mV (in phase with the primary). The core displacement from null is:`, ans: V / S, wrong: [S / V, V * S / 1000, V / S / 2], u: "mm", s: 3, e: `x = V/S = ${V}/${S}.` }); },
    r => { const div = r.f(1.4, 4.6, 1), vd = r.pick([0.05, 0.1, 0.2, 0.5]);
      return N({ q: `On the CRO (${vd * 1000} mV/div) the LVDT output spans ${div} divisions peak-to-peak. The peak amplitude is:`, ans: div * vd * 1000 / 2, wrong: [div * vd * 1000, div * vd * 1000 / Math.SQRT2, div * vd * 1000 / 2 / Math.SQRT2], u: "mV", s: 3, e: `Vpp = ${div} × ${vd * 1000} mV; peak = Vpp/2.` }); },
    r => { const R = r.pick([100, 150, 200, 250]), pc = r.pick([1, 2, 0.5]), rd = Math.round(R * r.f(0.15, 0.4, 2));
      return N({ q: `A voltmeter (0–${R} V) is accurate to ±${pc}% of full scale. Reading ${rd} V, the true value may lie within:`, ans: pc / 100 * R, wrong: [pc / 100 * rd, pc, pc / 100 * R / 2], fmt: x => "±" + sig(x, 3), u: "V", s: 3, e: `Error = ${pc}% × ${R} V = ±${sig(pc / 100 * R, 3)} V at any reading (${sig(100 * pc / 100 * R / rd, 3)}% of this reading).` }); }
  ]
};

/* ============================== EXP 6 — Ostwald viscometer (Mechanical) ============================== */
G.mech = {
  con: [
    { q: "The relative method μx = μw(ρx tx)/(ρw tw) is used because:", o: ["The viscometer constant K cancels — its r, L, V need not be known", "Water has zero viscosity", "It removes temperature effects", "It needs no timing"], a: 0, e: "μ = Kρt for the same viscometer and marks." },
    { q: "Why must the viscometer be kept in a constant-temperature bath?", o: ["Liquid viscosity falls strongly with rising temperature", "Glass expands too much", "The stopwatch drifts", "Density does not depend on temperature"], a: 0, e: "Temperature control is essential for comparable flow times." },
    { q: "Which is NOT an assumption of the Ostwald method?", o: ["Turbulent flow in the capillary", "Newtonian liquid", "Viscometer vertical", "Same viscometer and marks for all liquids"], a: 0, e: "Poiseuille's law requires slow laminar flow." },
    { q: "Doubling the capillary radius (all else fixed) changes the flow rate by a factor of:", o: ["16", "2", "4", "8"], a: 0, e: "Q ∝ r⁴." },
    { q: "In the Monte Carlo approach to uncertainty, one:", o: ["Samples each input from its probability distribution many times and takes the spread of the results", "Takes worst-case extremes", "Differentiates the formula", "Uses only the least count"], a: 0, e: "No derivatives needed; handles non-linear models." },
    { q: "Flow times for water at 31 °C are 94, 97, 96, 95, 96 s. Their Type A standard uncertainty of the mean uses:", o: ["s/√n with n = 5", "s alone", "Half the stopwatch resolution", "The range ÷ 2"], a: 0, e: "u_A = s/√n." },
    { q: "Viscosity of glycerol–water rises steeply from 20% to 40% glycerol. In the same viscometer this shows up as:", o: ["Much longer flow times", "Shorter flow times", "Lower density", "No change in time"], a: 0, e: "t ∝ μ/ρ." },
    { q: "The stopwatch should be started when:", o: ["The bottom of the meniscus passes the upper mark", "The liquid is released from the bulb", "The meniscus reaches the lower mark", "The bath reaches room temperature"], a: 0, e: "And stopped at the lower mark." },
    { q: "Liquid is drawn above the upper mark using:", o: ["A pipette bulb — never by mouth", "Mouth suction for speed", "Gravity", "A vacuum pump at full power"], a: 0, e: "Safety precaution." },
    { q: "If an air bubble is trapped in the capillary during a timing run, the measured time will most likely be:", o: ["Unreliable (usually too long) — repeat the trial", "Exactly correct", "Always too short", "Unaffected because K cancels"], a: 0, e: "Bubbles and particles disturb laminar flow." },
    { q: "The relative viscosity method requires the same volume of liquid each time because:", o: ["The driving head h must be the same so that K stays constant", "Density changes with volume", "It shortens the timing", "The bath needs it"], a: 0, e: "K = πr⁴gh/(8VL) assumes the same h, V and marks." },
    { q: "Which input usually dominates the uncertainty of μx in the class data (ρ ± ~15 kg/m³ ≈ 1.5%, t ± ~1.5 s on ~100–340 s)?", o: ["The pycnometer densities", "The flow times", "μw", "g"], a: 0, e: "≈1.5% from density vs < 1% from timing." }
  ],
  gen: [
    r => { const mw = r.pick([0.890, 0.7644, 0.8327]), rw = r.pick([997, 996, 1000]), tw = r.f(60, 115, 1), rx = r.i(1030, 1130), tx = +(tw * r.f(1.4, 3.5, 2)).toFixed(1), mu = mw * rx * tx / (rw * tw);
      return N({ q: `Ostwald viscometer: water μw = ${mw} mPa·s, ρw = ${rw} kg/m³, tw = ${tw} s; glycerol solution ρx = ${rx} kg/m³, tx = ${tx} s. μx is:`, ans: mu, wrong: [mw * tx / tw, mw * rw * tw / (rx * tx), mw * rx * tw / (rw * tx)], u: "mPa·s", s: 3, e: `μx = μw(ρx tx)/(ρw tw) = ${mw} × (${rx} × ${tx})/(${rw} × ${tw}) = ${sig(mu, 3)} mPa·s.` }); },
    r => { const mu = r.f(1.2, 3.4, 2), rho = r.i(1030, 1130);
      return N({ q: `A solution has μ = ${mu} mPa·s and ρ = ${rho} kg/m³. Its kinematic viscosity is:`, ans: mu / rho * 1000, wrong: [mu * rho / 1000, mu, mu / rho], u: "mm²/s", s: 3, e: `ν = μ/ρ = ${mu} × 10⁻³ / ${rho} = ${sig(mu / rho, 3)} × 10⁻³ m²/s = ${sig(mu / rho * 1000, 3)} mm²/s.` }); },
    r => { const V = r.pick([25, 50]), me = r.f(30, 76, 2), net = V * r.f(0.996, 1.13, 3), mf = +(me + net).toFixed(2), rho = (mf - me) / V * 1000;
      return N({ q: `Pycnometer (V = ${V}.00 mL): empty ${me} g, filled ${mf} g. The liquid's density is:`, ans: rho, wrong: [mf / V * 1000, (mf - me) / V, (mf + me) / V * 500], u: "kg/m³", s: 4, e: `ρ = (m_f − m₀)/V = ${P(mf - me, 2)} g / ${V} mL = ${sig(rho, 4)} kg/m³.` }); },
    r => { const t = [r.f(160, 200, 0)]; for (let i = 0; i < 4; i++) t.push(t[0] + r.i(-3, 3)); const m = t.reduce((a, b) => a + b) / 5, s = Math.sqrt(t.reduce((a, b) => a + (b - m) ** 2, 0) / 4);
      return N({ q: `Five flow times: ${t.join(", ")} s. The Type A standard uncertainty of the mean time is:`, ans: s / Math.sqrt(5), wrong: [s, s / 5, Math.sqrt(t.reduce((a, b) => a + (b - m) ** 2, 0) / 5)], u: "s", s: 3, e: `s = ${sig(s, 3)} s; u_A = s/√5 = ${sig(s / Math.sqrt(5), 3)} s.` }); },
    r => { const a = r.f(0.5, 2, 1), b = r.f(0.5, 2, 1), c = r.f(1, 2.5, 1), d = r.f(0.5, 1.5, 1), f = Math.sqrt(a * a + b * b + c * c + d * d);
      return N({ q: `For μx = μw(ρx tx)/(ρw tw) the fractional uncertainties are ρx ${a}%, tx ${b}%, ρw ${c}%, tw ${d}% (μw exact). The uncertainty in μx is:`, ans: f, wrong: [a + b + c + d, Math.sqrt(a * a + b * b), Math.abs(a + b - c - d)], u: "%", s: 3, e: `Quadrature: √(${a}² + ${b}² + ${c}² + ${d}²) = ${sig(f, 3)}%.` }); },
    r => { const k = r.f(1.1, 1.5, 2);
      return N({ q: `A capillary viscometer is replaced by one whose bore radius is ${k} times larger (same length and head). For the same liquid, the flow time becomes:`, ans: 1 / k ** 4, wrong: [1 / k, 1 / k ** 2, k ** 4], s: 3, fmt: x => sig(x, 3) + "× the original", e: `t ∝ 1/Q ∝ 1/r⁴ → factor 1/${k}⁴ = ${sig(1 / k ** 4, 3)}.` }); }
  ]
};

/* ============================== EXP 7 — Tablets (Pharmacy) ============================== */
G.pharm = {
  con: [
    { q: "Disintegration differs from dissolution because disintegration is:", o: ["The tablet breaking into smaller particles; dissolution is the drug entering solution", "The drug entering solution", "Loss of coating", "The same thing measured differently"], a: 0, e: "From the lecture." },
    { q: "A batch has very high hardness (14 kg/cm²). The main risk is:", o: ["Slow disintegration because of low porosity", "High friability", "Tablets breaking in transport", "Low weight"], a: 0, e: "Excessive hardness isn't desirable." },
    { q: "After tumbling, friability is 0.6% but one tablet is visibly cracked. The batch:", o: ["Fails — cracked, cleaved or broken tablets mean failure", "Passes, since loss ≤ 1%", "Must be repeated once only", "Passes if the crack is small"], a: 0, e: "Both criteria must be met." },
    { q: "Each tablet weighs 750 mg. For the friability test you take:", o: ["10 tablets", "Tablets totalling about 6.5 g", "20 tablets", "6 tablets"], a: 0, e: "≤ 650 mg each → ~6.5 g; > 650 mg → 10 tablets." },
    { q: "If the friability result is doubtful, the procedure is to:", o: ["Repeat twice more and average the three runs", "Report the first result", "Double the revolutions", "Increase the speed"], a: 0, e: "From the acceptance slide." },
    { q: "The Roche friabilator test runs at:", o: ["25 ± 1 rpm for 100 revolutions (~4 min)", "50 rpm for 2 min", "100 rpm for 100 revolutions", "10 rpm for 10 min"], a: 0, e: "Drum Ø 287 ± 4 mm, 38 ± 2 mm deep." },
    { q: "Dispersible tablets pass the disintegration test if:", o: ["All six disintegrate within 3 min in water at 24–26 °C", "Five of six disintegrate within 15 min", "The mean time is under 30 min", "One tablet disintegrates in 3 min"], a: 0, e: "As in the lab manual." },
    { q: "Why are tablets de-dusted before the initial and final weighings?", o: ["Loose dust would make the weight loss wrong", "To dry them", "To remove the coating", "To calibrate the balance"], a: 0, e: "Only mass lost by abrasion should count." },
    { q: "Compared with a Monsanto tester, a digital hardness tester mainly reduces:", o: ["Operator variability", "Cost", "The need for power", "The number of tablets tested"], a: 0, e: "Load cell + digital readout." },
    { q: "Superdisintegrants help a tablet break up mainly by:", o: ["Swelling, wicking water in and strain recovery", "Increasing hardness", "Repelling water", "Raising the melting point"], a: 0, e: "Mechanisms listed in the lecture." },
    { q: "Hardness readings of 3, 4, 4, 3.5, 3.5, 3 kg/cm² for a conventional tablet indicate:", o: ["Inadequate mechanical strength — average below 4 kg/cm²", "Excellent hardness", "Tablets too hard", "Nothing — hardness is not specified"], a: 0, e: "Average 3.5 kg/cm² falls below the typical 4–8 range." },
    { q: "Friability testing is most critical for:", o: ["Uncoated compressed tablets", "Capsules", "Syrups", "Film-coated tablets only"], a: 0, e: "From the lecture." }
  ],
  gen: [
    r => { const w0 = r.f(6.3, 6.7, 3), loss = r.f(0.01, 0.09, 3), wf = +(w0 - loss).toFixed(3), f = 100 * (w0 - wf) / w0;
      return N({ q: `Friability test: W₀ = ${w0} g, W_f = ${wf} g (no broken tablets). The friability is:`, ans: f, wrong: [100 * (w0 - wf) / wf * 1.05, w0 - wf, 100 * wf / w0], u: "%", s: 3, e: `F = (W₀ − W_f)/W₀ × 100 = ${P(w0 - wf, 3)}/${w0} × 100 = ${sig(f, 3)}% → ${f <= 1 ? "passes" : "fails"} (limit 1.0%).` }); },
    r => { const w0 = r.f(6.4, 6.7, 3);
      return N({ q: `For W₀ = ${w0} g, the largest weight loss that still passes the 1.0% friability limit is:`, ans: w0 / 100, wrong: [w0 / 10, 0.1, w0 / 1000], u: "g", s: 3, e: `1% of ${w0} g = ${sig(w0 / 100, 3)} g.` }); },
    r => { const h = r.f(3, 9, 1);
      return N({ q: `A Monsanto tester reads ${h} kg/cm². In newtons this is about:`, ans: h * 9.807, wrong: [h, h * 98.07, h / 9.807], u: "N", s: 3, e: `1 kg/cm² ≈ 9.807 N → ${h} × 9.807.` }); },
    r => { const hs = Array.from({ length: 6 }, () => r.f(3, 8.5, 1)), avg = hs.reduce((a, b) => a + b) / 6, inR = hs.filter(x => x >= 4 && x <= 8).length;
      const o = [`${sig(avg, 3)} kg/cm²; ${inR} of 6 within 4–8`, `${sig(avg * 9.807, 3)} kg/cm²; ${inR} of 6 within 4–8`, `${sig(avg, 3)} kg/cm²; ${6 - inR} of 6 within 4–8`, `${sig(hs.reduce((a, b) => a + b) / 5, 3)} kg/cm²; ${inR} of 6 within 4–8`];
      return { q: `Hardness of six tablets: ${hs.join(", ")} kg/cm². The average hardness and the number within the conventional 4–8 kg/cm² range are:`, o: U4(o, [`${sig(avg + 0.5, 3)} kg/cm²; ${inR} of 6 within 4–8`, `${sig(avg, 3)} kg/cm²; ${Math.min(6, inR + 1)} of 6 within 4–8`, `${sig(avg, 3)} kg/cm²; ${Math.max(0, inR - 1)} of 6 within 4–8`]), a: 0, e: `Average = Σ/6 = ${sig(avg, 3)} kg/cm².`, num: true }; },
    r => { const w = r.pick([150, 200, 250, 325, 400, 500]);
      return N({ q: `Each tablet weighs ${w} mg. About how many whole tablets make up the ~6.5 g friability sample?`, ans: Math.round(6500 / w), wrong: [10, Math.round(650 / w * 10) + 3, Math.round(6500 / w) * 2], s: 3, fmt: x => String(Math.round(x)), e: `6500 mg ÷ ${w} mg ≈ ${Math.round(6500 / w)} tablets (rule: ≤ 650 mg each → ~6.5 g).` }); },
    r => { const t = Array.from({ length: 6 }, () => r.i(22, 175)), m = t.reduce((a, b) => a + b) / 6, all = t.every(x => x <= 180);
      const o = [`${sig(m, 3)} s; complies`, `${sig(m, 3)} s; does not comply`, `${Math.max(...t)} s; does not comply`, `${sig(m / 60, 2)} s; complies`];
      return { q: `Six dispersible tablets disintegrate in ${t.join(", ")} s (water at 25 °C). The mean time and the verdict are:`, o: U4(o, [`${sig(m * 1.2, 3)} s; complies`, `${sig(m * 0.8, 3)} s; complies`]), a: 0, e: `Mean = ${sig(m, 3)} s; all six within 180 s → complies.`, num: true }; }
  ]
};

/* ============================== EXP 8 — Surface tension (Physics) ============================== */
G.phys = {
  con: [
    { q: "Adding 5 mM SDS to water makes the capillary rise:", o: ["Smaller, because SDS lowers γ (≈ 43 vs 72.8 mN/m)", "Larger, because SDS raises γ", "Unchanged", "Negative (depression)"], a: 0, e: "Surfactants collect at the surface and reduce γ." },
    { q: "A measured γ for water comes out far below 72.8 mN/m with a clean scale reading. The most likely cause is:", o: ["Incomplete wetting (θ > 0) from a dirty capillary", "The least count of the graph paper", "Using g = 9.81", "The density correction"], a: 0, e: "γ = hρgr/(2cos θ); θ > 0 lowers h." },
    { q: "A capillary that is slightly tilted introduces:", o: ["A systematic error not covered by the least count", "A random error averaged out by repeats", "No error", "A gross error that is easily seen"], a: 0, e: "Keep the capillary perfectly vertical." },
    { q: "In the web-app image method δh is taken as the SD of five repeats because:", o: ["No single least count can be defined for tap placement — a Type A uncertainty is used", "The app has a 1 mm least count", "Five is the rule for every instrument", "The SD is always smaller"], a: 0, e: "From the lecture." },
    { q: "With a travelling microscope δh/h ≈ 0.013% while δr/r ≈ 1.3%. Therefore δγ/γ is:", o: ["About 1.3%, dominated by the radius", "About 0.013%", "About 2.6%", "Zero"], a: 0, e: "Quadrature: the larger term dominates." },
    { q: "Why does surface tension act like a stretched membrane?", o: ["Surface molecules feel a net inward cohesive pull", "Surface molecules are heavier", "Air pushes the surface down", "Gravity is stronger at the surface"], a: 0, e: "Bulk molecules are pulled equally in all directions." },
    { q: "Why is a separate, dedicated capillary used for each liquid?", o: ["Residues (e.g. SDS) would contaminate the next liquid and change θ and γ", "Capillaries break easily", "Each liquid needs a different radius", "To save time"], a: 0, e: "Contamination alters wetting." },
    { q: "In (δγ/γ)² = (δh/h)² + (δr/r)², the density term is dropped because:", o: ["ρ is taken from tables at the measured T, so its uncertainty is negligible", "ρ does not appear in the formula", "ρ is always 1000", "δρ is too hard to estimate"], a: 0, e: "From the lab manual." },
    { q: "Doubling the bore radius of the capillary (same liquid) makes the rise h:", o: ["Half as large", "Twice as large", "Four times smaller", "Unchanged"], a: 0, e: "h = 2γ/(ρgr) ∝ 1/r." },
    { q: "Premature infants lacking pulmonary surfactant develop respiratory distress because:", o: ["High γ in the alveoli makes them collapse on exhalation", "Surfactant raises γ too much", "Their blood viscosity is low", "Oxygen can't dissolve"], a: 0, e: "Surfactant lowers γ at the air–liquid interface." },
    { q: "The literature γ for water is quoted at 20 °C, but the lab is at 30 °C. Your measured value should be:", o: ["Slightly lower — γ and ρ both fall with temperature", "Slightly higher", "Exactly 72.8 mN/m", "Unrelated to temperature"], a: 0, e: "Record the actual liquid temperature and correct ρ." },
    { q: "Reading the meniscus from above eye level introduces:", o: ["Parallax error in h", "An error in r", "A density error", "No error"], a: 0, e: "Read at eye level." }
  ],
  gen: [
    r => { const h = r.f(25, 60, 1), rho = r.pick([998, 996.5, 1059, 1072, 1134]), rr = r.pick([0.275, 0.25, 0.3]), g = h / 1000 * rho * 9.81 * rr / 1000 / 2 * 1000;
      return N({ q: `A liquid (ρ = ${rho} kg/m³) rises h = ${h} mm in a capillary of radius ${rr} mm (θ ≈ 0, g = 9.81). Its surface tension is:`, ans: g, wrong: [g * 2, g / 2, g * 10], u: "mN/m", s: 3, e: `γ = hρgr/2 = ${h / 1000} × ${rho} × 9.81 × ${rr / 1000}/2 = ${sig(g / 1000, 3)} N/m.` }); },
    r => { const gam = r.pick([72.8, 71, 66, 43]), rho = gam === 43 ? 998 : r.pick([998, 1072, 1142]), rr = r.pick([0.275, 0.25, 0.3]), h = 2 * gam / 1000 / (rho * 9.81 * rr / 1000) * 1000;
      return N({ q: `Expected capillary rise for a liquid with γ = ${gam} mN/m, ρ = ${rho} kg/m³ in a bore of radius ${rr} mm is:`, ans: h, wrong: [h / 2, h * 2, h / 10], u: "mm", s: 3, e: `h = 2γ/(ρgr) = ${sig(h, 3)} mm.` }); },
    r => { const h = r.f(30, 60, 1), dh = r.pick([0.5, 0.3, 0.2]), rp = r.pick([1.3, 1.0, 1.5]), f = Math.sqrt((100 * dh / h) ** 2 + rp ** 2);
      return N({ q: `h = ${h} ± ${dh} mm and δr/r = ${rp}%. The percentage uncertainty in γ is:`, ans: f, wrong: [100 * dh / h + rp, 100 * dh / h, rp], u: "%", s: 2, e: `δγ/γ = √[(${sig(100 * dh / h, 2)}%)² + (${rp}%)²] = ${sig(f, 2)}%.` }); },
    r => { const T = r.i(24, 32), which = r.pick([["water", 998.2, 0.20], ["25% glycerol", 1072, 0.4], ["50% glycerol", 1142, 0.5]]), rho = which[1] - which[2] * (T - 20);
      return N({ q: `Using ρ(T) ≈ ρ₂₀ − β(T − 20) with ρ₂₀ = ${which[1]} kg/m³ and β = ${which[2]} kg m⁻³ K⁻¹, the density of ${which[0]} at ${T} °C is:`, ans: rho, wrong: [which[1] + which[2] * (T - 20), which[1] - which[2] * T, which[1] - (T - 20)], u: "kg/m³", s: 5, fmt: x => P(x, 1), e: `ρ = ${which[1]} − ${which[2]} × ${T - 20} = ${P(rho, 1)} kg/m³.` }); },
    r => { const lit = r.pick([72.8, 71, 66, 43]), m = +(lit * r.f(0.9, 1.1, 3)).toFixed(1);
      return N({ q: `A student gets γ = ${m} mN/m for a liquid whose literature value is ${lit} mN/m. The percentage error is:`, ans: 100 * Math.abs(m - lit) / lit, wrong: [100 * Math.abs(m - lit) / m, Math.abs(m - lit), 100 * m / lit], u: "%", s: 2, e: "% error = |γ_measured − γ_lit|/γ_lit × 100." }); },
    r => { const lc = r.pick([0.01, 0.02]);
      return N({ q: `With a travelling microscope of least count ${lc} mm, h = R_top − R_bottom. δh is:`, ans: lc / Math.SQRT2, wrong: [lc / 2, lc, lc * Math.SQRT2], u: "mm", s: 3, e: "Difference of two readings, each ±LC/2 → δh = LC/√2." }); },
    r => { const g1 = 72.8, g2 = r.pick([43, 66, 71]), r1 = 998, r2 = g2 === 43 ? 998 : g2 === 66 ? 1142 : 1072;
      return N({ q: `In identical capillaries, water (γ = 72.8 mN/m, ρ = 998) rises h_w. A liquid with γ = ${g2} mN/m and ρ = ${r2} kg/m³ rises h. The ratio h/h_w is:`, ans: (g2 / r2) / (g1 / r1), wrong: [g2 / g1, (g1 / r1) / (g2 / r2), g2 / g1 * r2 / r1], s: 3, e: "h ∝ γ/ρ for the same r." }); }
  ]
};

window.BANK = G;
window.BANK_UTIL = { sig };
})();
