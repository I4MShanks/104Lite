/* 104Lite — lecture content for BITS U104 Foundations of Measurement & Experimentation.
   Content is written from the lecture slides and the 2026-27 Compre Guide (chapters 1–3).
   narration[].s = slide page number shown while that segment is spoken. */
window.LECTURES = [
{
  id: "fundamentals", no: 1, track: "Core", icon: "straighten",
  title: "Foundations of Measurement & Experiments",
  short: "Units, accuracy, errors, uncertainty and data analysis",
  prof: "Dr. Biswadip Shome", dept: "Mechanical Engineering", date: "21 Aug 2026", slides: 34,
  summary: "The core vocabulary of the course: what a measurement is, base and derived quantities, the static characteristics of instruments, the three kinds of error, propagation of uncertainty and how to analyse and present experimental data.",
  formula: { eq: "δR = √[ (∂R/∂x₁·δx₁)² + (∂R/∂x₂·δx₂)² + … ]", where: "Kline–McClintock: independent uncertainties combine in quadrature" },
  notes: [
    { h: "Measurement, quantities and units", p: [
      "Measurement = comparing an unknown quantity (the measurand) with a pre-defined standard. A result is a number + unit, and scientifically also ± uncertainty.",
      "Seven SI base quantities: length (m), mass (kg), time (s), temperature (K), electric current (A), amount of substance (mol), luminous intensity (cd). Everything else (force, speed, density) is derived.",
      "Older systems: CGS, FPS, MKS. The metre is now defined through the speed of light, c = 299 792 458 m/s exactly." ] },
    { h: "Static characteristics", p: [
      "Least count – smallest difference two indications can show (metre scale 1 mm). Readability – how closely the scale can be read; both depend on scale length and graduation spacing.",
      "Hysteresis – reading depends on whether the value is approached from above or below; caused by friction, elastic deformation, thermal effects.",
      "Accuracy – deviation of the reading from a known input (often ±% of full scale). Precision – ability to reproduce a reading. Calibration improves accuracy only up to, not beyond, precision." ] },
    { h: "Errors", p: [
      "Error = measured − true value; % error = error/true × 100. Uncertainty = the ± interval in which the value lies, e.g. L = 1.00 ± 0.01 m or 1.00 m ± 1%.",
      "Gross errors (blunders): reading before steady state, parallax – reduced by careful reading.",
      "Systematic errors: bias in one direction – reduced by better design, controlled environment and regular calibration.",
      "Random errors: unknown causes, scatter both ways – never eliminated, reduced by averaging, and their limits can be estimated." ] },
    { h: "Uncertainty analysis", p: [
      "Common-sense (worst-case) method: P = EI with E = 100 ± 2 V and I = 10 ± 0.2 A gives Pmax = 1040.4 W, Pmin = 960.4 W – too severe, only for rough checks.",
      "Kline–McClintock: δR = √Σ(∂R/∂xᵢ · δxᵢ)². For the same P: δP/P = √(0.02² + 0.02²) = 2.8%, so P = 1000 ± 28 W." ] },
    { h: "Statistics and presenting data", p: [
      "Mean x̄ = Σxᵢ/n; standard deviation s uses (n − 1); variance = s². Standard error of the mean = s/√n.",
      "Method of least squares minimises the sum of squared deviations; the best-fit line passes through (x̄, ȳ).",
      "R² = goodness of fit: R² = 0.91 means 91% of the variation is explained by the model.",
      "Plot data as symbols with error bars in x and/or y; a good line passes through most error bars." ] },
    { h: "Responses, planning and devices", p: [
      "Static measurement: quantity not changing (beam under constant load). Dynamic: changing with time (vibrating beam).",
      "Experiment planning: Preliminary (objective, literature, method, feasibility) → Intermediate (perform, check repeatability, validate, find uncertainty) → Final (complete data, compare with theory, report).",
      "Pressure: manometer, Bourdon gauge, diaphragm gauge. Flow: venturi, rotameter, anemometer. Temperature: thermometer, thermocouple, thermistor." ] }
  ],
  narration: [
    { s: 1, t: "Welcome to the first lecture of BITS U104, Foundations of Measurement and Experiments, by Dr. Biswadip Shome of Mechanical Engineering. This overview walks through the ideas every other lecture builds on." },
    { s: 4, t: "A physical quantity is any property we can measure. Base quantities like length, mass and time cannot be defined from anything else; derived quantities such as density or volume are built from them." },
    { s: 5, t: "The International System recognises seven base quantities: length, mass, time, temperature, electric current, amount of substance and luminous intensity. Force, speed and every other unit are combinations of these seven." },
    { s: 8, t: "Least count is the smallest difference an instrument scale can show, and readability is how closely you can actually read that scale. Both depend on scale length and how the graduations are spaced." },
    { s: 9, t: "Hysteresis means the reading depends on whether you approach a value from above or below. Friction, elastic deformation and thermal effects are the usual causes." },
    { s: 10, t: "Accuracy is how close a reading is to the true input; precision is how well the instrument repeats itself. Remember the key rule: calibration can improve accuracy only up to the precision of the instrument, never beyond it." },
    { s: 20, t: "There are three kinds of error. Gross errors are human blunders like parallax. Systematic errors push every reading the same way and are fixed by calibration. Random errors scatter both ways and can only be reduced by averaging." },
    { s: 24, t: "The common-sense method takes worst-case extremes. For power equals voltage times current, with two percent uncertainty in each, it gives a range of 960 to 1040 watts, which is too severe." },
    { s: 25, t: "The Kline and McClintock method combines independent uncertainties in quadrature, using partial derivatives. For the same power example it gives about plus or minus 28 watts, a much more realistic estimate." },
    { s: 26, t: "For repeated readings we report the mean, the standard deviation using n minus one, and the variance, which is the square of the standard deviation." },
    { s: 29, t: "Least squares finds the best-fit line, and R squared tells you how good the fit is. An R squared of 0.91 means 91 percent of the variation in the data is explained by the model." },
    { s: 32, t: "Finally, common devices: manometers, Bourdon and diaphragm gauges for pressure, venturi meters, rotameters and anemometers for flow, and thermometers, thermocouples and thermistors for temperature. You will meet many of these again in the department experiments." }
  ],
  podcast: [
    ["A","Welcome to the 104Lite study podcast. Today: the opening lecture of U104 on the foundations of measurement."],
    ["B","And it's the one everything else depends on. Measurement is basically comparing an unknown quantity with a standard, right?"],
    ["A","Exactly. And a proper result has three parts: a number, a unit and an uncertainty. Forget the uncertainty and it isn't really science."],
    ["B","The lecture made a big deal about accuracy versus precision."],
    ["A","Because people mix them up. Accuracy is closeness to the true value. Precision is how tightly repeated readings agree. A scale that reads 53 grams every time for a 50 gram mass is precise but not accurate."],
    ["B","And that's a systematic error, which you fix by calibration. But calibration can only take you as far as the instrument's precision."],
    ["A","Then there are random errors. You can't eliminate them, but averaging shrinks them."],
    ["B","My favourite part was the power example. P equals E times I, both with two percent uncertainty."],
    ["A","The worst-case method gives 960 to 1040 watts. Kline and McClintock add the fractional errors in quadrature, root of 0.02 squared plus 0.02 squared, so about 2.8 percent, or plus or minus 28 watts."],
    ["B","Exam tip: for products and quotients, add fractional errors in quadrature. For sums and differences, add absolute errors in quadrature."],
    ["A","And remember R squared: 0.91 means the model explains 91 percent of the variation. That's it for this episode. Next up, measuring living systems."]
  ],
  lab: {
    title: "General Laboratory Practice: Recording & Analysing Readings",
    aim: "Record repeated readings of a quantity, estimate its mean and uncertainty, and report the result correctly with units.",
    apparatus: ["Any measuring instrument (metre scale LC 1 mm, vernier caliper LC 0.02 mm, screw gauge LC 0.01 mm)", "Observation table", "Calculator"],
    principle: ["Single reading uncertainty = ½ × least count.", "Repeated readings: x̄ = Σxᵢ/N, s = √[Σ(xᵢ − x̄)²/(N − 1)], standard error = s/√N (Type A).", "A length found as the difference of two readings has δ = LC/√2.", "Derived results: combine uncertainties in quadrature (Kline–McClintock)."],
    procedure: ["Check the instrument for zero error and note its least count.", "Take at least five independent readings, re-positioning each time.", "Record raw data immediately, in ink, with units.", "Compute mean, standard deviation and standard error.", "Report the result as x̄ ± δx with the correct number of significant figures."],
    precautions: ["Avoid parallax: read at eye level.", "Wait for steady state before reading.", "Never adjust or discard data without a recorded reason."],
    errors: ["Zero error (systematic)", "Parallax and misreading (gross)", "Small fluctuations between trials (random)"]
  },
  booklet: { calc: "stats", cols: ["Trial", "Reading", "Deviation (x − x̄)", "(x − x̄)²"], rows: 5,
    sample: "Readings 9.8, 10.1, 10.0, 9.9, 10.2 → x̄ = 10.0, Σ(x − x̄)² = 0.10, s = √(0.10/4) = 0.158, SE = 0.158/√5 = 0.071. Report 10.00 ± 0.07." }
},
{
  id: "biology", no: 2, track: "Biology", icon: "biotech",
  title: "Measurement of Biological Systems",
  short: "Accuracy, controls, replicates, OD600, CFU and BMI vs BP",
  prof: "Prof. S. K. Verma", dept: "Biological Sciences", date: "18 Sep 2026", slides: 31,
  summary: "How biologists turn observations into numbers: measuring signals related to life, sensitivity and specificity, calibration, controls and replicates, and the main cell, nucleic-acid, protein and enzyme assays. Lab: BMI and its correlation with blood pressure.",
  formula: { eq: "CFU/mL = colonies × dilution factor ÷ volume plated (mL)", where: "100 colonies from 0.1 mL of a 10⁻⁶ dilution → 10⁹ CFU/mL" },
  notes: [
    { h: "What a biological measurement is", p: [
      "“In biology we rarely measure life directly; we measure signals, properties or processes related to life.”",
      "Measurement = assigning a number to a property of a biological system using a defined method and a standard or reference.",
      "Qualitative: ‘culture is turbid’. Quantitative: OD₆₀₀ = 0.85, 2.5 × 10⁸ CFU/mL, glucose = 2.5 g/L.",
      "Measurement chain: biological property → principle → detector/sensor → signal → instrument → number." ] },
    { h: "Quality of a measurement", p: [
      "Accuracy = closeness to the true value; precision = closeness of repeats. A method can be precise but inaccurate.",
      "Error sources: instrumental (spectrophotometer drift), experimental (pipetting, dilution, timing, contamination), biological (natural variation), human/data handling.",
      "Random error → precision, reduced by replication. Systematic error → accuracy, needs calibration/correction.",
      "Sensitivity = detects small changes; LOD = lowest amount distinguishable from background. Specificity = measures the target despite other components." ] },
    { h: "Calibration, controls, replicates", p: [
      "Calibration: known standards → instrument response → calibration curve → unknown. Recalibrate when instruments drift.",
      "Blank estimates background; negative control should show no response; positive control should show the expected response.",
      "Technical replicates = repeated measurement of the same sample (measurement variability). Biological replicates = independent samples (biological variability)." ] },
    { h: "Key techniques", p: [
      "Haemocytometer + microscope: direct, cheap, laborious; live/dead needs staining.",
      "Viable plate count (CFU): CFU/mL = colonies × dilution factor ÷ volume plated. One colony ≠ always one cell.",
      "OD₆₀₀: indirect proxy for cell concentration; must be correlated with cell number; non-linear at high density, so dilute.",
      "Beer–Lambert: A = εcl. A₂₆₀ = 1.0 ↔ 50 µg/mL dsDNA, 33 µg/mL ssDNA, 40 µg/mL RNA. A₂₆₀/A₂₈₀ indicates purity.",
      "Protein: Lowry (copper chemistry), Bradford (dye binding), UV₂₈₀. Enzyme activity: initial rate ΔP/Δt.",
      "pH = −log₁₀[H⁺], calibrate the meter with standards. Dissolved O₂: electrochemical and optical probes. Modern: qPCR, flow cytometry, ELISA, mass spec, omics." ] }
  ],
  narration: [
    { s: 1, t: "This is the Biological Sciences lecture by Professor S. K. Verma: measuring biological systems." },
    { s: 3, t: "The central idea: in biology we rarely measure life directly. We measure signals, properties or processes that are related to life." },
    { s: 6, t: "Saying the culture is turbid is qualitative. Saying OD six hundred is 0.85, or 2.5 times ten to the eight colony forming units per millilitre, is quantitative, and that is what lets us compare, model and test." },
    { s: 9, t: "Every measurement follows a chain: a biological property, a measurement principle, a detector, a signal, and finally an instrument reading. The instrument measures a physical signal, not life itself." },
    { s: 12, t: "Errors come from four places: the instrument, the experiment itself such as pipetting and dilution, natural biological variation, and human data handling." },
    { s: 14, t: "Sensitivity is the ability to detect small changes, and the limit of detection is the smallest amount we can tell apart from background. Specificity is measuring the target despite everything else in a complex sample." },
    { s: 17, t: "Controls answer one question: is this signal really due to my variable? A blank measures background, a negative control should show nothing, and a positive control should give the expected response." },
    { s: 18, t: "Technical replicates repeat the measurement on the same sample. Biological replicates use independent samples, and they capture real biological variability." },
    { s: 20, t: "For a viable plate count, colony forming units per millilitre equals colonies times dilution factor divided by volume plated. One hundred colonies from 0.1 millilitre of a ten to the minus six dilution gives ten to the nine CFU per millilitre." },
    { s: 21, t: "OD six hundred is only an indirect proxy for cell number. It must be correlated with real counts, and at high density it becomes non-linear, so samples should be diluted." },
    { s: 23, t: "Nucleic acids absorb near 260 nanometres. An OD two sixty of one corresponds to 50 micrograms per millilitre of double stranded DNA, and the 260 over 280 ratio is a purity check." },
    { s: 31, t: "To summarise: observe, hypothesise, design with controls and replication, and conclude only when results are replicated. In the lab you will apply this by measuring BMI and blood pressure and testing their correlation." }
  ],
  podcast: [
    ["A","This is 104Lite. Today it's biology: how do you measure something that's alive?"],
    ["B","Professor Verma's answer is that mostly you don't. You measure a signal related to life, like light scattered by cells."],
    ["A","Which is why OD six hundred is described as a proxy, not a cell count."],
    ["B","Right. You have to correlate it with real counts, and at high density it stops being linear, so you dilute."],
    ["A","The plate count formula is a guaranteed exam question. CFU per mL equals colonies times dilution factor over volume plated."],
    ["B","Hundred colonies, 0.1 mL plated, ten to the minus six dilution: ten to the nine CFU per mL."],
    ["A","Then DNA. OD 260 of one equals 50 micrograms per mL for double-stranded DNA, 33 for single-stranded, 40 for RNA."],
    ["B","And controls. Blank for background, negative control shows nothing, positive control shows the expected response."],
    ["A","Plus replicates: technical replicates test the measurement, biological replicates test the biology."],
    ["B","In the lab we measure height, weight and blood pressure three times each, compute BMI, and find the correlation coefficient with BP."],
    ["A","And a positive correlation is association, not causation. That's biology. See you next episode."]
  ],
  lab: {
    title: "Experiment 1: BMI and its Correlation with Blood Pressure",
    aim: "Measure height, weight and blood pressure with replicates, classify the data types, compute BMI from averaged replicates and find the Pearson correlation coefficient r between BMI and BP.",
    apparatus: ["Stadiometer (height, heel plane to vertex, m)", "Digital scale with strain-gauge load cells (kg)", "Digital sphygmomanometer – oscillometric method (mmHg)"],
    principle: ["BMI = mass (kg) ÷ height² (m²). Underweight < 18.5 · Normal 18.5–24.9 · Overweight 25.0–29.9 · Obese ≥ 30.0.", "Systolic BP = peak pressure during ventricular contraction; diastolic = minimum during relaxation.", "Mean of replicates cancels random error; range (max − min) shows trial-to-trial precision.", "Data types: subject label – nominal; BMI category – ordinal; °C – interval; height, weight, BMI, BP – ratio."],
    procedure: ["Height: barefoot, heels and back against the board; read at the vertex; 3 readings.", "Weight: check the scale reads 0.0 kg; step off and back on between each of 3 readings.", "BP: subject seated and rested 3 min, cuff at heart level, 1 min between 3 readings.", "Average the replicates, compute BMI and classify it.", "Pool class data and compute r between BMI and systolic BP."],
    precautions: ["Same posture and clothing for all readings.", "Do not talk or move during BP measurement.", "Record every replicate, not just the mean."],
    errors: ["Posture and footwear (height)", "Scale not zeroed (systematic)", "Cuff size/position, white-coat effect (BP)", "BMI ignores muscle vs fat and fat distribution – a screening tool, not a diagnosis"]
  },
  booklet: { calc: "bmi", cols: ["Trial", "Height (m)", "Weight (kg)", "Systolic (mmHg)", "Diastolic (mmHg)"], rows: 3,
    sample: "Heights 1.721, 1.719, 1.723 m → 1.721 m; weights 68.4, 68.6, 68.5 kg → 68.5 kg. BMI = 68.5 / 1.721² = 23.1 (normal)." }
},
{
  id: "chemeng", no: 3, track: "Chemical Engg", icon: "water_drop",
  title: "Industrial Instrumentation: Pressure & Flow",
  short: "Manometers, venturi & orifice meters, rotameter",
  prof: "Prof. Ajaya Kumar Pani", dept: "Chemical Engineering", date: "29 Sep 2026", slides: 17,
  summary: "The process variables industries monitor, the family of pressure gauges, why flow measurement matters, and how differential-pressure (venturi, orifice) and variable-area (rotameter) meters work. Lab: flow rate with a venturimeter and an orificemeter.",
  formula: { eq: "Qt = a₁a₂√(2gH) / √(a₁² − a₂²),   Cd = Qa / Qt", where: "H = (h/100)(ρm/ρw − 1) m of water; Qa = A·R/t from the measuring tank" },
  notes: [
    { h: "Industrial instrumentation", p: [
      "Process variables monitored: level, pressure, flow, temperature and composition.",
      "Pressure instruments: electric resistance (strain gauge), Bourdon, diaphragm, bellows, piezoelectric, manometers; vacuum: McLeod, Pirani, ionisation.",
      "Manometers: U-tube, inclined tube (small pressure differences), inverted U-tube." ] },
    { h: "Why flow measurement matters", p: [
      "Flow measurement = quantity of fluid passing a section per unit time.",
      "Needed for process control, material balance, energy management (steam, cooling water, fuel), safety, product quality and equipment operation (pumps, heat exchangers, reactors)." ] },
    { h: "Venturi and orifice meters", p: [
      "Both are differential-pressure meters. Continuity A₁V₁ = A₂V₂ → the fluid speeds up in the constriction; by Bernoulli V↑ ⇒ P↓, so P₁ > P₂.",
      "Venturimeter: convergent cone → throat → gradual divergent cone; small losses, Cd ≈ 0.95–0.98.",
      "Orificemeter: thin plate with a concentric sharp-edged hole; the jet narrows to the vena contracta (min area, max velocity, min pressure); large losses, Cd ≈ 0.6–0.65, but cheap and compact." ] },
    { h: "Rotameter", p: [
      "Variable-area meter: a float in a vertical tapered tube; fluid enters from the bottom.",
      "Float rises until drag + buoyancy = weight (F_D + F_B = W). Higher flow → higher float position; the tube is calibrated directly in flow rate." ] }
  ],
  narration: [
    { s: 1, t: "This is the Chemical Engineering lecture by Professor Ajaya Kumar Pani on industrial instrumentation, focused on pressure and flow." },
    { s: 2, t: "Process industries constantly monitor five variables: level, pressure, flow, temperature and composition." },
    { s: 4, t: "Pressure can be measured by electric resistance strain gauges, Bourdon tubes, diaphragms, bellows, piezoelectric sensors and manometers. For vacuum we use McLeod, Pirani and ionisation gauges." },
    { s: 6, t: "The U-tube manometer reads a pressure difference from a liquid column. The inclined tube version magnifies small differences, and the inverted U-tube is used with a lighter manometric fluid." },
    { s: 8, t: "Flow measurement tells us how much fluid passes a section per unit time. It matters for process control, material balance, energy management, safety, product quality and running equipment like pumps and reactors." },
    { s: 10, t: "The venturi meter has a converging cone, a throat and a gradually diverging cone. Because the shape is gradual, losses are small and the coefficient of discharge is about 0.95 to 0.98." },
    { s: 11, t: "The orifice meter is simply a thin plate with a sharp-edged hole. The jet keeps narrowing to the vena contracta, losses are large, and the coefficient of discharge is only about 0.6 to 0.65, but it is cheap and compact." },
    { s: 12, t: "Both work the same way. Continuity says area times velocity is constant, so velocity rises in the narrow section, and Bernoulli says pressure must fall. The pressure difference gives the flow rate." },
    { s: 14, t: "The rotameter is different: it is a variable-area meter. A float rises in a tapered tube until drag plus buoyancy equals its weight, and the float height is read directly as flow rate." },
    { s: 16, t: "In the lab you will measure the manometer head, compute the theoretical discharge, time the rise in the measuring tank for the actual discharge, and find the coefficient of discharge for both meters." }
  ],
  podcast: [
    ["A","104Lite here. Today, chemical engineering and the art of measuring flow."],
    ["B","Professor Pani starts with the five process variables: level, pressure, flow, temperature, composition."],
    ["A","Then a whole zoo of pressure gauges. The ones to remember for vacuum are McLeod, Pirani and ionisation."],
    ["B","The heart of it is venturi versus orifice. Both are differential pressure meters."],
    ["A","Continuity, A1 V1 equals A2 V2, so the fluid speeds up in the narrow part, and Bernoulli says the pressure drops."],
    ["B","The difference is losses. The venturi is smooth, Cd around 0.97. The orifice has that vena contracta and big eddies, Cd around 0.62."],
    ["A","So why would anyone use an orifice? Because it's just a plate with a hole. Cheap and compact."],
    ["B","And the rotameter is the odd one out: variable area. The float sits where drag plus buoyancy equals weight."],
    ["A","Lab tip: the manometer head is h over 100 times thirteen point six minus one, which is 0.126 h metres of water."],
    ["B","And the classic safety question: never close the delivery and by-pass valves at the same time."],
    ["A","That's flow. Next, chemistry and analytical methods."]
  ],
  lab: {
    title: "Experiment 2: Flow Rate with a Venturimeter and an Orificemeter",
    aim: "Determine the flow rate of water in a pipe using a venturimeter and an orificemeter, and find the coefficient of discharge of each.",
    apparatus: ["Venturimeter and orificemeter in the pipe line (d₁ = 28 mm, d₂ = 14 mm)", "Mercury U-tube manometer", "Measuring tank (A = 0.1 m²), stopwatch", "Sump, pump, flow-control and by-pass valves"],
    principle: ["Continuity (A₁V₁ = A₂V₂) + Bernoulli → lower pressure at the throat/orifice.", "Head: H = (h/100)(ρm/ρw − 1) = 0.126 h m of water (ρm = 13 600, ρw = 1000 kg/m³).", "Qt = a₁a₂√(2gH)/√(a₁² − a₂²) with a₁ = 6.157 × 10⁻⁴ m², a₂ = 1.539 × 10⁻⁴ m².", "Qa = A·R/t ;  Cd = Qa/Qt."],
    procedure: ["Fill the sump ¾ with clean water; close flow-control valves and open the by-pass; close manometer taps.", "Switch on the pump; open manometer taps slowly and release trapped air with the air-release valve.", "Record the manometer reading h and time t for a rise R in the measuring tank.", "Repeat for several flow rates, for both meters.", "Closing: manometer taps first, then pump, then power."],
    precautions: ["Do not run the pump below 180 V.", "Never close the delivery and by-pass valves together.", "Open manometer taps slowly so mercury is not blown out.", "Keep the apparatus dust-free."],
    errors: ["Air bubbles in manometer lines", "Parallax reading the mercury column", "Reaction time on the stopwatch", "Unsteady flow when readings are taken"]
  },
  booklet: { calc: "venturi", cols: ["Run", "Manometer h (cm)", "Tank rise R (cm)", "Time t (s)", "Cd"], rows: 4,
    sample: "h = 10 cm → H = 1.26 m; Qt = 7.9 × 10⁻⁴ m³/s. Tank rises 4.6 cm in 6.0 s → Qa = 0.1 × 0.046/6.0 = 7.7 × 10⁻⁴ m³/s → Cd = 0.97 (venturi)." }
},
{
  id: "chemistry", no: 4, track: "Chemistry", icon: "science",
  title: "Analytical Chemistry: Measurement & Instruments",
  short: "Calibration, LOD/LOQ, spectroscopy, chromatography, thermal",
  prof: "Prof. Bibhas R. Sarkar", dept: "Chemistry", date: "13 Oct 2026", slides: 25,
  summary: "Analytical foundations (calibration curves, LOD and LOQ, classical vs instrumental methods, calibration strategies), spectroscopy (UV-Vis, FTIR, NMR, AAS, ICP-OES, MS), separation science (GC, HPLC, IC, SEC, TLC) and thermal & surface methods. Lab: build your own pH scale with turmeric.",
  formula: { eq: "A = log₁₀(I₀/I) = ε b c     LOD = 3σ/m,  LOQ = 10σ/m", where: "ε molar absorptivity (L mol⁻¹ cm⁻¹), b path length (1 cm), σ = SD of blank, m = slope" },
  notes: [
    { h: "Analytical foundations", p: [
      "Calibration is the foundation of quantitative analysis: known standards → calibration curve; respect its range.",
      "Signal response S = kC + S_b (k = sensitivity/slope, S_b = blank signal).",
      "LOD = 3σ/m (≈ 3 × noise), LOQ = 10σ/m (≈ 10 × noise).",
      "Classical: gravimetric (weigh a precipitate, e.g. BaSO₄, AgCl) and titrimetric (acid–base, redox, EDTA). Instrumental: spectroscopic, separations, electroanalysis (CV, potentiometry).",
      "Systematic (determinate) errors → removed with Certified Reference Materials; random (indeterminate) → quantified by SD and %RSD." ] },
    { h: "Calibration strategies", p: [
      "External standards: regression line from pure standards (R² > 0.999); sensitive to matrix effects.",
      "Standard addition: spike sample aliquots with known analyte – eliminates matrix interference.",
      "Internal standard: constant non-interfering reference compound; Ax/Ais = k(Cx/Cis) corrects signal fluctuations." ] },
    { h: "Spectroscopy", p: [
      "UV-Vis: Beer–Lambert A = εbc; π→π* and n→π* transitions, 200–800 nm.",
      "FTIR: bond vibrations (Hooke's law); Michelson interferometer (beam splitter, fixed and moving mirror) → interferogram → FFT.",
      "NMR: ¹H/¹³C spins precess at the Larmor frequency ν = γB₀/2π; chemical shift δ in ppm vs TMS, due to electron shielding.",
      "AAS: hollow cathode lamp, ground-state atoms in a flame (2500 K) or graphite furnace (3000 K, pg sensitivity). ICP-OES: argon plasma 6000–10 000 K, many elements at once, ppb.",
      "Mass spec: hard EI (70 eV, fragments) vs soft ESI/MALDI ([M+H]⁺); analysers quadrupole, TOF, Orbitrap (R > 100 000)." ] },
    { h: "Separation, thermal and surface", p: [
      "GC: fused-silica capillary columns; detectors FID, ECD, TCD. RP-HPLC: non-polar C18 + polar water/acetonitrile gradient; Rs = 2(tr₂ − tr₁)/(w₁ + w₂) ≥ 1.5 = baseline separation.",
      "Ion chromatography: ion-exchange + suppressor + conductivity. SEC/GPC: larger molecules elute first. TLC: Rf = d_analyte/d_solvent, best 0.2–0.8.",
      "TGA: mass vs temperature, DTG separates steps. DSC: Tg, Tc (exothermic), Tm (endothermic); peak area = ΔH.",
      "SEM (surface, ~1 nm), TEM (200 kV, sub-nm lattice), AFM (cantilever, van der Waals forces, 3D). BET: surface area from adsorption isotherms." ] }
  ],
  narration: [
    { s: 1, t: "This is the Chemistry lecture by Professor Bibhas R. Sarkar on analytical measurement." },
    { s: 2, t: "Calibration is the foundation of every quantitative analysis. Measure known standards, plot a calibration curve, and only read unknowns inside its range. The signal follows S equals k C plus the blank signal." },
    { s: 3, t: "The limit of detection is three sigma over the slope, roughly three times the noise. The limit of quantitation is ten sigma over the slope." },
    { s: 5, t: "Systematic errors bias results in one direction and are removed using certified reference materials. Random errors are quantified by the standard deviation and percent relative standard deviation." },
    { s: 6, t: "Three calibration strategies: external standards, standard addition which cancels matrix interference, and the internal standard which corrects for instrument fluctuations." },
    { s: 8, t: "In UV-visible spectroscopy, absorbance equals epsilon times path length times concentration. This is the Beer–Lambert law." },
    { s: 10, t: "In NMR, nuclear spins precess at the Larmor frequency, gamma B nought over two pi, and chemical shifts are reported in parts per million relative to TMS." },
    { s: 11, t: "Atomic absorption uses a hollow cathode lamp and atoms in a flame or graphite furnace. ICP optical emission uses an argon plasma at six to ten thousand kelvin to measure many elements at once." },
    { s: 16, t: "In reversed-phase HPLC, a non-polar C18 column is used with a polar mobile phase. A resolution of at least 1.5 means baseline separation." },
    { s: 18, t: "In thin layer chromatography, the retention factor is the distance moved by the analyte divided by the solvent front, ideally between 0.2 and 0.8." },
    { s: 21, t: "Differential scanning calorimetry shows the glass transition, exothermic crystallisation and endothermic melting. The area under a peak gives the enthalpy." },
    { s: 24, t: "Choosing a technique depends on the sample state, concentration range, matrix complexity, required precision and whether the method must be non-destructive. In the lab you'll build a pH scale using turmeric as a natural indicator." }
  ],
  podcast: [
    ["A","104Lite podcast, chemistry edition. This lecture packed in a huge range of instruments."],
    ["B","But it starts with the simplest idea: calibration. Signal equals k times concentration plus the blank."],
    ["A","LOD is three sigma over m, LOQ is ten sigma over m. Sigma is the standard deviation of the blank, m is the slope."],
    ["B","Standard addition is worth understanding. You spike the sample itself, so matrix effects cancel out."],
    ["A","Spectroscopy round: Beer–Lambert A equals epsilon b c. FTIR uses a Michelson interferometer and a Fourier transform."],
    ["B","NMR uses the Larmor frequency, chemical shift in ppm against TMS. AAS uses a hollow cathode lamp, ICP uses argon plasma."],
    ["A","Mass spec: EI is hard and fragments the molecule. ESI and MALDI are soft and keep it intact."],
    ["B","Chromatography numbers: resolution 1.5 or more is baseline separation. In size exclusion, big molecules come out first."],
    ["A","And in DSC, crystallisation is exothermic while melting is endothermic."],
    ["B","For the lab: turmeric's curcumin is yellow in acid and neutral solutions and turns orange-red in alkali."],
    ["A","Which is why it separates acids from bases but can't rank acids against each other. That's chemistry."]
  ],
  lab: {
    title: "Experiment 3: Build Your Own pH Scale",
    aim: "Make a simple pH scale using a natural indicator from turmeric and rank household substances from acidic to alkaline.",
    apparatus: ["Turmeric (~1 g in 100 mL warm water, filtered)", "Test tubes and rack, droppers", "Lemon juice, vinegar, soda water, Sprite, baking-soda solution, soap, detergent, tap water, soda ash", "Standard pH paper (validation)"],
    principle: ["pH = −log₁₀[H⁺]; acids < 7 < bases at 25 °C; one pH unit = ×10 in [H⁺].", "Curcumin is protonated and yellow in acid–neutral solutions.", "In alkali, phenolic deprotonation and keto–enol tautomerism change conjugation → bathochromic (red) shift → orange to red."],
    procedure: ["Prepare the turmeric indicator and filter it.", "Put equal volumes of indicator in each tube.", "Add a few drops of each substance.", "Compare colours against a white background.", "Arrange from acidic to alkaline; validate an unknown with pH paper."],
    precautions: ["Clean glassware to avoid contamination.", "Equal volumes of indicator in every tube.", "Safe disposal of solutions."],
    errors: ["Turmeric stays yellow over the whole acid–neutral range – cannot rank acids against each other", "Subjective colour judgement", "Unequal indicator volumes"]
  },
  booklet: { calc: "ph", cols: ["Substance", "Colour observed", "Acidic / Neutral / Basic", "pH paper value"], rows: 9,
    sample: "Lemon juice and vinegar stay yellow (acidic); tap water yellow (≈ neutral); baking soda, soap, detergent and soda ash turn orange to red (alkaline), red being most alkaline." }
},
{
  id: "physics", no: 5, track: "Physics", icon: "opacity",
  title: "Surface Tension by the Capillary Rise Method",
  short: "Force balance, γ = hρgr/2, graph paper vs web-app uncertainty",
  prof: "Prof. Raj Kumar Gupta", dept: "Physics", date: "16 Oct 2026", slides: 19,
  summary: "Where surface tension comes from, the capillary-rise force balance, why it matters in science and technology, the four liquids measured this semester, and how uncertainty is found for graph-paper and image-based measurements of h.",
  formula: { eq: "γ = h ρ g r / 2      (δγ/γ)² = (δh/h)² + (δr/r)²", where: "θ ≈ 0 (complete wetting); r = 0.275 mm, δr/r ≈ 1.3%; δρ negligible" },
  notes: [
    { h: "Origin of surface tension", p: [
      "A bulk molecule is pulled equally in all directions; a surface molecule has a net inward pull, so the surface behaves like a stretched membrane minimising its area.",
      "γ = work done per unit increase in area = force per unit length (J/m² = N/m).",
      "Applications: pulmonary surfactant (premature infants lacking it develop respiratory distress), water striders (γ_water ≈ 0.072 N/m), enhanced oil recovery, soil moisture, inkjet/3D printing, soldering, microfluidics, detergents." ] },
    { h: "Capillary rise derivation", p: [
      "Surface tension acts round the contact circle 2πr; its vertical component γcosθ supports the column.",
      "2πr γ cosθ = πr² h ρ g  ⇒  γ = hρgr/(2cosθ). For complete wetting θ ≈ 0 ⇒ γ = hρgr/2." ] },
    { h: "Liquids this semester", p: [
      "Water (ultrapure) 72.8 mN/m; 5 mM SDS ≈ 43 mN/m; 25% glycerol ≈ 71; 50% glycerol ≈ 66 mN/m.",
      "SDS is a surfactant – it collects at the surface and lowers γ (why detergents work).",
      "Density correction: ρ(T) ≈ ρ₂₀ − β(T − 20)." ] },
    { h: "Measuring h and its uncertainty", p: [
      "Method A – graph paper on the tube: δh = LC/2 ≈ 0.5 mm. Mind parallax!",
      "Method B – web app: photograph, calibrate with two taps on a known length, tap bulk level and meniscus. No least count can be defined, so repeat 5 times and take δh = σ_h (Type A uncertainty).",
      "Travelling microscope (on order): h = R_top − R_bottom so δh = LC/√2 ≈ 0.00707 mm.",
      "Bore verified: d = R_right − R_left, δd = LC/√2, δr = δd/2 ≈ 0.0035 mm → δr/r ≈ 1.3%." ] },
    { h: "Procedure and result", p: [
      "Dip capillary to a small fixed depth; let meniscus stabilise; read h; repeat for each liquid with a fresh dedicated capillary.",
      "Plot a bar chart: two bars per liquid (one per technique) with δγ error bars and compare overlap." ] }
  ],
  narration: [
    { s: 1, t: "This is the Physics experiment lecture by Professor Raj Kumar Gupta: measuring surface tension by the capillary rise method." },
    { s: 3, t: "The aim is to measure the surface tension of water, a five millimolar SDS solution, and 25 and 50 percent glycerol–water mixtures, using two techniques, and compare their accuracy, precision and propagated uncertainty." },
    { s: 4, t: "Surface tension matters everywhere: pulmonary surfactant keeps our lungs from collapsing, water striders walk on water, and it controls oil recovery and soil moisture." },
    { s: 6, t: "A molecule in the bulk is pulled equally in all directions, but a surface molecule feels a net inward pull. So the surface acts like a stretched membrane, and surface tension is the force per unit length, in newtons per metre." },
    { s: 8, t: "At equilibrium, the vertical surface tension force round the contact circle balances the weight of the risen column. For a completely wetting liquid this gives gamma equals h rho g r over two." },
    { s: 9, t: "Because gamma is a product of measured quantities, the fractional uncertainties of h and r add in quadrature. Density uncertainty is taken as negligible." },
    { s: 12, t: "The literature values are 72.8 millinewtons per metre for water, about 43 for SDS, about 71 for 25 percent glycerol and about 66 for 50 percent glycerol." },
    { s: 13, t: "With graph paper fixed on the tube, the uncertainty in h is half the least count, about half a millimetre. Take care with parallax." },
    { s: 15, t: "With the web app, no least count can be defined, so you repeat the full measurement five times and use the standard deviation as delta h. This is a Type A, statistical uncertainty." },
    { s: 16, t: "The bore radius was verified as 0.275 millimetres with an uncertainty of about 1.3 percent, which usually dominates the error budget." },
    { s: 19, t: "The take-home message: a simple force balance gives a quantitative measurement of a fundamental property that governs everything from breathing to microfluidic chip design." }
  ],
  podcast: [
    ["A","Welcome back to 104Lite. Today, physics: why does water climb up a thin glass tube?"],
    ["B","Because surface molecules feel a net inward pull. The surface acts like a stretched skin."],
    ["A","And the derivation is short. Two pi r gamma cos theta equals pi r squared h rho g."],
    ["B","With theta zero, gamma equals h rho g r over two. Memorise that."],
    ["A","This semester's liquids: water at 72.8, SDS around 43, and glycerol mixtures at about 71 and 66 millinewtons per metre."],
    ["B","SDS is the interesting one. It's a surfactant, so it sits at the surface and drops gamma. That's how detergents work."],
    ["A","The uncertainty part is examinable. Graph paper gives delta h of half a millimetre."],
    ["B","But the web app has no least count, so you repeat five times and use the standard deviation. Type A uncertainty."],
    ["A","And with a travelling microscope, h is a difference of two readings, so delta h is LC over root two, not LC over two."],
    ["B","Also the radius: 0.275 millimetres, 1.3 percent uncertainty. It often dominates."],
    ["A","Precaution to remember: keep the capillary vertical. Tilt is a systematic error. That's physics."]
  ],
  lab: {
    title: "Experiment 8: Surface Tension by Capillary Rise",
    aim: "Measure the surface tension of water, 5 mM SDS and 25%/50% glycerol–water by capillary rise using two techniques of different resolution, and compare accuracy, precision and propagated uncertainty.",
    apparatus: ["Glass capillaries (I.D. 0.55 ± 0.10 mm; verified r = 0.275 mm)", "Round-bottom test tubes with 1 mm graph paper", "Smartphone + web app (rajkguptabits.github.io/capillary_rise_method)", "Thermometer; liquids: water, 5 mM SDS, 25% and 50% glycerol"],
    principle: ["2πrγcosθ = πr²hρg ⇒ γ = hρgr/2 (θ ≈ 0).", "(δγ/γ)² = (δh/h)² + (δr/r)²; δρ negligible.", "Graph paper: δh = 0.5 mm. Web app: δh = σ_h of 5 repeats (Type A).", "ρ(T) ≈ ρ₂₀ − β(T − 20)."],
    procedure: ["Dip the capillary ~1 cm, without touching the walls; let the meniscus stabilise.", "Method A: read h directly against the graph paper at eye level.", "Method B: photograph, calibrate (2 taps on a known length), tap bulk level and meniscus; repeat 5 times.", "Repeat for all four liquids with a fresh dedicated capillary.", "Compute γ ± δγ and plot bars with error bars for both techniques."],
    precautions: ["Capillary clean and perfectly vertical (tilt is an uncovered systematic error).", "Read at eye level (parallax).", "Record the actual liquid temperature.", "Gloves for SDS; dedicated capillary per liquid."],
    errors: ["Incomplete wetting (θ > 0) gives low γ", "Dirty capillary", "Parallax", "Temperature change of ρ and γ"]
  },
  booklet: { calc: "capillary", cols: ["Liquid", "h (mm)", "ρ (kg/m³)", "γ (mN/m)", "δγ (mN/m)"], rows: 4,
    sample: "Water: h = 54.0 mm, ρ = 998 kg/m³, r = 0.275 mm → γ = 0.0540 × 998 × 9.81 × 2.75 × 10⁻⁴ / 2 = 72.7 mN/m. δγ/γ = √(0.93² + 1.3²)% = 1.6% → γ = 72.7 ± 1.2 mN/m." }
},
{
  id: "eee", no: 6, track: "EEE", icon: "sensors",
  title: "Basics of Measurement & the LVDT",
  short: "Measuring systems, static characteristics, hysteresis, LVDT",
  prof: "Dr. Sujan Yenuganti", dept: "Electrical & Electronics", date: "30 Oct 2026", slides: 41,
  summary: "Measurands, direct and indirect methods, the generalised measuring system, static characteristics with a worked hysteresis/non-linearity problem, smart sensors and the LVDT displacement transducer. Lab: sensitivity of an LVDT.",
  formula: { eq: "Hysteresis (%FSD) = H_max/(O_max − O_min) × 100     Sensitivity = ΔV₀/Δx", where: "LVDT output V₀ = V₁ − V₂; null at centre; amplitude = size, phase = direction" },
  notes: [
    { h: "Measurands and methods", p: [
      "Measurand = the unknown quantity measured. Physical (length, mass, time, temperature, V, A, Ω, force, pressure), chemical (concentration, pH, viscosity, density), biological/clinical (glucose, hormones, cell counts, enzyme activity).",
      "Error = difference between true and measured value. Calibration = adjusting/marking so readings agree with a certified standard.",
      "Direct method: compare with the standard, no calculation (graduated scale). Indirect: measure related quantities and calculate (density from mass and dimensions)." ] },
    { h: "Generalised measuring system", p: [
      "Measurand → primary sensing element → variable conversion element → variable manipulation (signal processing) → data transmission → presentation/storage → observer.",
      "Examples: mercury thermometer (primary sensing); strain gauge + bridge circuit (variable conversion: ΔR → ΔV); thermocouple amplifier, filters (manipulation); screened cable or wireless (transmission).",
      "Presentation may be omitted when the signal feeds an automatic control system." ] },
    { h: "Static characteristics", p: [
      "Accuracy: ±5% on a 0–200 °C thermometer = ±10 °C. Precision = repeatability; a precise instrument need not be accurate.",
      "Sensitivity = Δoutput/Δinput; constant sensitivity → linear system. Non-linearity = max deviation from the ideal line.",
      "Hysteresis = non-coincidence of loading and unloading curves. Threshold = minimum input from zero for detectable output. Resolution = smallest input change producing observable output.",
      "Dead zone = largest input change with no output (friction, backlash). Dead time = delay before response. Range (−40 to 100 °C). Repeatability vs reproducibility. Drift = slow change unrelated to input." ] },
    { h: "Worked numerical (load sensor)", p: [
      "Ideal line V = 0.2W mV (0 mV at 0 kg, 20 mV at 100 kg), FSD = 20 mV.",
      "At 60 kg: loading 11.01, unloading 12.94 mV → hysteresis = 1.93/20 × 100 = 9.65% FSD (maximum).",
      "At 30 kg: loading 4.48 mV vs ideal 6.00 → non-linearity = −1.52/20 × 100 = −7.6% FSD." ] },
    { h: "Smart sensors and the LVDT", p: [
      "Smart sensors: built-in compensation, self-calibration, self-diagnosis, non-linearity adjustment, energy harvesting.",
      "LVDT: inductive passive transducer. One primary (AC) and two identical secondaries in series opposition; movable soft-iron core.",
      "V₀ = V₁ − V₂; null at centre. Amplitude gives displacement size; phase (0° or 180°) gives direction.",
      "Advantages: wide range (~1.25–250 mm), frictionless, high output and sensitivity, low hysteresis, low power. Can be a secondary transducer (Bourdon tube → displacement → LVDT → voltage)." ] }
  ],
  narration: [
    { s: 1, t: "This is the EEE lecture by Dr. Sujan Yenuganti on the basics of measurement and the LVDT." },
    { s: 2, t: "Measurement is a quantitative comparison between a predefined standard and the unknown quantity, called the measurand. Measurands can be physical, chemical or biological." },
    { s: 6, t: "In a direct method we compare with the standard, like reading a scale. In an indirect method we measure related quantities and calculate, like density from mass and dimensions." },
    { s: 7, t: "A general measuring system has a primary sensing element, a variable conversion element, signal processing, data transmission and finally presentation to the observer." },
    { s: 9, t: "A strain gauge's resistance change is hard to read directly, so a bridge circuit converts it into a voltage. That bridge is a variable conversion element." },
    { s: 16, t: "Accuracy is closeness to the true value. Plus or minus five percent on a zero to two hundred degree thermometer means the reading could be ten degrees off anywhere on the scale." },
    { s: 20, t: "Hysteresis is the difference between the loading and unloading curves. Threshold is the minimum input to get any output, and resolution is the smallest change that produces a visible change." },
    { s: 24, t: "Here is the classic numerical. A load sensor should read zero millivolts at zero kilograms and twenty at a hundred. At sixty kilograms the loading and unloading readings differ by 1.93 millivolts, giving maximum hysteresis of 9.65 percent of full scale." },
    { s: 29, t: "For non-linearity, compare with the ideal line of 0.2 millivolts per kilogram. At thirty kilograms the reading is 4.48 instead of 6, a deviation of minus 7.6 percent of full scale." },
    { s: 32, t: "The LVDT, the linear variable differential transformer, converts linear displacement into voltage. It has one primary winding and two secondaries connected in series opposition around a movable iron core." },
    { s: 35, t: "At the centre the two secondary voltages cancel: this is the null position. Moving the core one way gives an output in phase with the primary, the other way gives an output 180 degrees out of phase." },
    { s: 41, t: "The LVDT has a wide range, no friction, high sensitivity, low hysteresis and low power use. In the lab you'll find its sensitivity as the slope of output voltage against displacement." }
  ],
  podcast: [
    ["A","104Lite, EEE episode. Today it's sensors and the LVDT."],
    ["B","Dr. Sujan starts with the general measuring system. Sensing element, conversion, processing, transmission, display."],
    ["A","The textbook example of conversion is the strain gauge plus bridge, turning resistance change into voltage."],
    ["B","Then a long list of static characteristics. People confuse threshold and resolution."],
    ["A","Threshold starts from zero: the minimum input to see anything. Resolution is the smallest change you can see from any point."],
    ["B","And dead zone is the largest change with no output, from friction or backlash."],
    ["A","The numerical is a must. Hysteresis at 60 kg: 12.94 minus 11.01 over 20, that's 9.65 percent FSD."],
    ["B","Non-linearity at 30 kg: 4.48 versus the ideal 6, minus 7.6 percent FSD."],
    ["A","Then the LVDT. Two secondaries in series opposition, so at the centre the output is zero."],
    ["B","The magnitude tells you how far, the phase tells you which direction. It flips 180 degrees as you cross null."],
    ["A","And in the lab, calibrate the CRO first with the 1 volt, 1 kilohertz CAL signal. That's EEE."]
  ],
  lab: {
    title: "Experiment 5: Sensitivity of an LVDT",
    aim: "Study the measurement protocol and find the sensitivity of a linear variable differential transformer.",
    apparatus: ["LVDT with cantilever plate and soft-iron core", "Screw gauge (displacement)", "Signal generator (1 kHz, 10 V)", "CRO / DSO"],
    principle: ["Primary fed with AC; secondaries S₁, S₂ in series opposition: V₀ = V₁ − V₂.", "Null position: V₁ = V₂ → V₀ ≈ 0.", "Output amplitude ∝ displacement; phase flips 180° across null.", "Sensitivity = slope ΔV₀/Δx (mV/mm)."],
    procedure: ["Calibrate the CRO: 1 V/div, 1 ms/div; connect Y-input to CAL – expect 1 V at 1 kHz.", "Wire the LVDT; feed 1 kHz, 10 V to the primary.", "Adjust the screw gauge until the CRO shows a flat line (null); note the reading.", "Move the core up and down in steps; record displacement from null and CRO output.", "Plot output vs displacement on both sides; slope = sensitivity."],
    precautions: ["Calibrate the CRO before measuring.", "Approach each setting from the same direction (backlash).", "Keep leads short and away from mains noise."],
    errors: ["Backlash in the screw gauge (dead zone)", "Residual voltage at null", "Reading the CRO trace (parallax, line thickness)"]
  },
  booklet: { calc: "lvdt", cols: ["Step", "Displacement x (mm)", "Output V₀ (mV)", "Phase (0°/180°)"], rows: 8,
    sample: "If V₀ rises from 0 to 240 mV as the core moves 0 → 2.0 mm, sensitivity = 240/2.0 = 120 mV/mm, with the same magnitude but 180° phase on the other side of null." }
},
{
  id: "mechanical", no: 7, track: "Mechanical", icon: "speed",
  title: "Uncertainty & the Ostwald Viscometer",
  short: "Poiseuille's law, relative viscosity, propagation & Monte Carlo",
  prof: "Dr. Biswadip Shome", dept: "Mechanical Engineering", date: "6 Nov 2026", slides: 32,
  summary: "Revisits error and uncertainty, then applies Poiseuille's law to the Ostwald viscometer, works through density and flow-time data for glycerol–water solutions, and estimates uncertainty both by propagation of error and by the Monte Carlo method.",
  formula: { eq: "μx = μw · (ρx tx)/(ρw tw)      ν = μ/ρ", where: "From Poiseuille: Q = πr⁴Δp/(8μL) ⇒ μ = Kρt" },
  notes: [
    { h: "Uncertainty recap", p: [
      "Statistics summarises data by the mean and variance and propagates measurement error into derived results.",
      "Error = measured − true; uncertainty = interval of confidence, e.g. 1.00 ± 0.01 m. This lecture treats random errors only.",
      "Kline–McClintock: δR = [Σ(∂R/∂xᵢ · δxᵢ)²]^½." ] },
    { h: "Ostwald viscometer theory", p: [
      "Poiseuille's law for laminar flow in a capillary: Q = πr⁴Δp/(8μL).",
      "Driving pressure is the liquid's own head Δp = ρgh and Q = V/t ⇒ μ = (πr⁴gh/8VL)ρt = Kρt (K = viscometer constant).",
      "Indirect, relative method: μ/μw = ρt/(ρw tw) – water is the reference." ] },
    { h: "Worked data (31 °C)", p: [
      "Pycnometer 50 mL: water ρ = 1000.0 ± 14.1, 20% glycerol 1024.0 ± 16.7, 40% glycerol 1128.0 ± 11.0 kg/m³ (5 trials).",
      "Flow times: water 95.6 ± 1.14 s, 20% glycerol 166 ± 1.58 s, 40% glycerol 338 ± 1.58 s.",
      "With μw = 0.7644 mPa·s: 20% glycerol μ ≈ 1.36 mPa·s, ν ≈ 1.33 mm²/s; 40% glycerol μ ≈ 3.05 mPa·s, ν ≈ 2.70 mm²/s." ] },
    { h: "Uncertainty: two approaches", p: [
      "Propagation: (δμ/μ)² = (δρ/ρ)² + (δt/t)² + (δρw/ρw)² + (δtw/tw)².",
      "Type A evaluation: from repeated observations, u = s/√n.",
      "Monte Carlo: assign each input a probability distribution, sample many times, compute μ for each sample and take the spread of the results as the uncertainty – no derivatives needed and it handles non-linear models." ] }
  ],
  narration: [
    { s: 1, t: "This is the second Mechanical Engineering lecture by Dr. Biswadip Shome, on uncertainty and the Ostwald viscometer." },
    { s: 5, t: "Error is measured minus true value. Uncertainty is the interval of confidence around the measured value, such as one metre plus or minus one centimetre." },
    { s: 7, t: "Kline and McClintock estimate the uncertainty of a calculated result by combining the partial derivatives times each input uncertainty in quadrature." },
    { s: 9, t: "The Ostwald viscometer uses Poiseuille's law: flow rate equals pi r to the fourth times the pressure drop, over eight mu L." },
    { s: 10, t: "Here the pressure drop is the liquid's own head, rho g h, and the flow rate is volume over time. So viscosity equals a constant K times density times flow time." },
    { s: 11, t: "Because K is the same for a given viscometer, we compare with water: the viscosity ratio equals the density ratio times the time ratio." },
    { s: 13, t: "Densities were found with a fifty millilitre pycnometer over five trials, giving means and standard deviations for water and both glycerol solutions." },
    { s: 16, t: "Flow times at 31 degrees were about 96 seconds for water, 166 for twenty percent glycerol and 338 for forty percent glycerol." },
    { s: 17, t: "Using water's viscosity of 0.7644 millipascal seconds, twenty percent glycerol comes out near 1.36 and forty percent near 3.05 millipascal seconds. Viscosity rises steeply with glycerol content." },
    { s: 18, t: "By propagation of error, the fractional uncertainty in viscosity is the root sum of squares of the fractional uncertainties of both densities and both times." },
    { s: 23, t: "The Monte Carlo method instead samples each input from a probability distribution thousands of times and looks at the spread of the computed viscosity." },
    { s: 31, t: "The lecture ends with code for both approaches, so you can check that propagation and Monte Carlo give consistent uncertainties." }
  ],
  podcast: [
    ["A","104Lite again. Today: honey, glycerol, and how to measure stickiness."],
    ["B","The Ostwald viscometer. It's built on Poiseuille's law: Q equals pi r to the four delta p over eight mu L."],
    ["A","The clever bit is that the liquid drives itself. Delta p is rho g h, Q is V over t, so mu equals K rho t."],
    ["B","And since K is the same tube every time, compare with water. Mu x equals mu water times rho x t x over rho water t water."],
    ["A","The class data: water took about 96 seconds, 20 percent glycerol 166, 40 percent glycerol 338."],
    ["B","So viscosity roughly 1.36 and 3.05 millipascal seconds. It climbs fast with concentration."],
    ["A","Then the uncertainty. Four inputs, both densities and both times, fractional errors in quadrature."],
    ["B","And the new idea, Monte Carlo. Instead of derivatives, you simulate thousands of possible measurements."],
    ["A","The spread of the answers is your uncertainty. It works even when the formula is messy."],
    ["B","Lab must-dos: viscometer vertical, constant temperature, at least five trials, and never suck by mouth."],
    ["A","That's viscosity. Next up, pharmacy."]
  ],
  lab: {
    title: "Experiment 6: Viscosity with an Ostwald Viscometer",
    aim: "Find the dynamic and kinematic viscosity of 20% and 40% v/v glycerol–water solutions using water as the reference, and evaluate repeatability and uncertainty.",
    apparatus: ["Ostwald viscometer", "Constant-temperature bath", "Stopwatch", "Pycnometer (50 mL) and balance", "Pipette bulb", "Water, 20% and 40% glycerol"],
    principle: ["Poiseuille: Q = πr⁴ΔP/(8μL) ⇒ μ = Kρt.", "Relative method: μx = μw(ρx tx)/(ρw tw); ν = μ/ρ.", "Density: ρ = (m_filled − m_empty)/V_pyc.", "u_A = s/√n; fractional uncertainties combine in quadrature."],
    procedure: ["Clean, bubble-free capillary; clamp vertically in the bath and wait for equilibrium.", "Draw liquid above the upper mark with a bulb (never by mouth).", "Start the stopwatch as the bottom of the meniscus passes the upper mark; stop at the lower mark.", "At least five trials per liquid; repeat for each solution.", "Measure densities with the pycnometer."],
    precautions: ["Viscometer exactly vertical; same instrument and marks for all liquids.", "Constant temperature (~25 °C) – viscosity falls with temperature.", "No particles or bubbles."],
    errors: ["Temperature drift", "Reaction time on the stopwatch", "Tilt of viscometer", "Residual liquid / contamination between solutions"]
  },
  booklet: { calc: "visc", cols: ["Liquid", "t₁ (s)", "t₂ (s)", "t₃ (s)", "t₄ (s)", "t₅ (s)", "ρ (kg/m³)"], rows: 3,
    sample: "Water tw = 60.0 s, ρw = 997, μw = 0.890 mPa·s; 20% glycerol tx = 96.0 s, ρx = 1050 → μx = 0.890 × (1050 × 96.0)/(997 × 60.0) = 1.50 mPa·s; ν = 1.43 × 10⁻⁶ m²/s." }
},
{
  id: "pharmacy", no: 8, track: "Pharmacy", icon: "medication",
  title: "Evaluation of Tablets: Hardness, Friability & Disintegration",
  short: "IPQC tests, Monsanto tester, Roche friabilator, disintegration",
  prof: "Dr. Jagpreet Singh Sidhu", dept: "Pharmacy", date: "13 Nov 2026", slides: 40,
  summary: "Why tablets are evaluated, in-process quality control, hardness testers and procedure, friability (principle, factors, Roche friabilator, acceptance) and disintegration (mechanism, factors, disintegrants, apparatus).",
  formula: { eq: "Friability (%) = (W₀ − W_f) / W₀ × 100", where: "Pass: ≤ 1.0% mean loss and no cracked/broken tablets; 1 kg/cm² ≈ 9.807 N" },
  notes: [
    { h: "Tablets and IPQC", p: [
      "Tablets are solid unit dosage forms with one or more APIs, made by compression or moulding. They need mechanical strength, physical integrity and proper drug release.",
      "Evaluation ensures integrity in handling and transport, resistance to abrasion, proper disintegration, batch consistency and reproducible quality.",
      "IPQC = tests during manufacturing to detect variations early and prevent defective batches." ] },
    { h: "Hardness", p: [
      "Force needed to fracture a tablet (diametral crushing strength); reported in N, or kg/kp in older testers.",
      "Too hard is not good either – it lowers porosity and slows disintegration.",
      "Testers: Monsanto (screw), Pfizer (lever, pliers-like), digital (load cell – accurate, less operator variability, needs power/calibration).",
      "Procedure: zero the tester; tablet along its diameter between the jaws; turn the screw slowly until it breaks; read the force; 6 tablets.",
      "Acceptance: conventional tablets typically 4–8 kg/cm² (≈ 40–78 N); varies for chewable, effervescent, sustained-release." ] },
    { h: "Friability", p: [
      "Tendency to lose mass by abrasion and shock; important for uncoated compressed tablets.",
      "Roche friabilator: transparent drum (287 ± 4 mm diameter, 38 ± 2 mm deep), curved projection, horizontal axis; 25 ± 1 rpm × 100 revolutions (≈ 4 min).",
      "Sample: ≈ 6.5 g of tablets if each ≤ 650 mg; 10 tablets if each > 650 mg. De-dust, weigh, tumble, de-dust, reweigh.",
      "Accept: mean weight loss ≤ 1.0%, no cracked or broken tablets. If doubtful, repeat twice and average three runs.",
      "Factors: binder, disintegrant, lubricant, moisture; granule size, strength, porosity; compression force and speed." ] },
    { h: "Disintegration", p: [
      "Disintegration = tablet breaks into smaller particles; dissolution = drug molecules enter solution (different!).",
      "Mechanism: wetting → liquid penetration into pores → swelling/capillary action/deformation → bonds break → fragments.",
      "Factors: formulation, manufacturing, and test conditions (medium composition and pH, temperature, agitation).",
      "Disintegrants act by swelling, wicking, repulsion, deformation/strain recovery; superdisintegrants (e.g. croscarmellose, crospovidone, sodium starch glycolate) work at low levels.",
      "Apparatus: basket-rack with 6 tubes in a 1 L beaker; dispersible tablets: water 24–26 °C, all six disintegrate within 3 min." ] }
  ],
  narration: [
    { s: 1, t: "This is the Pharmacy lecture by Dr. Jagpreet Singh Sidhu on evaluating tablets: hardness, friability and disintegration." },
    { s: 2, t: "Tablets are solid unit dosage forms containing one or more active pharmaceutical ingredients, made by compression or moulding. They must be strong, stay intact and release the drug properly." },
    { s: 4, t: "In-process quality control means testing during manufacturing, so variations are detected early and defective batches are prevented." },
    { s: 5, t: "Hardness is the force needed to break a tablet. It shows mechanical strength, but excessive hardness is not desirable because it can slow disintegration." },
    { s: 9, t: "The Monsanto tester squeezes the tablet between jaws with a screw until it fractures, and the breaking force is read from the scale. Pfizer testers use a lever, and digital testers use a load cell." },
    { s: 15, t: "Conventional compressed tablets should typically have a hardness of four to eight kilograms per square centimetre, about forty to seventy-eight newtons." },
    { s: 16, t: "Friability is the tendency of a tablet to lose mass through abrasion and shock during handling, packaging and transport." },
    { s: 24, t: "In the Roche friabilator, about 6.5 grams of tablets are tumbled at 25 rpm for 100 revolutions, about four minutes, in a drum 287 millimetres across." },
    { s: 25, t: "A mean weight loss of not more than one percent is acceptable, and any cracked or broken tablets mean failure. If the result is doubtful, repeat twice and average three runs." },
    { s: 26, t: "Disintegration is the tablet breaking into smaller particles. It is different from dissolution, where the drug molecules actually go into solution." },
    { s: 32, t: "Disintegrants help tablets break up by swelling, wicking water in, repulsion and strain recovery." },
    { s: 36, t: "The disintegration apparatus is a basket rack with six tubes moving up and down in a one litre beaker. For dispersible tablets in water at about 25 degrees, all six must disintegrate within three minutes." }
  ],
  podcast: [
    ["A","104Lite podcast. Today: what makes a good tablet? Pharmacy with Dr. Sidhu."],
    ["B","Three tests: hardness, friability, disintegration. Strong enough to survive, but able to fall apart in your body."],
    ["A","Hardness first. The Monsanto tester is basically a screw clamp. Target is 4 to 8 kg per square centimetre."],
    ["B","About 40 to 78 newtons. And remember 1 kg per square centimetre is about 9.8 newtons."],
    ["A","Friability is how much dust and chips a tablet loses when tumbled. The Roche friabilator runs 25 rpm, 100 revolutions."],
    ["B","Pass mark: no more than 1 percent mean weight loss, and no broken tablets."],
    ["A","Sample size trips people up: about 6.5 grams of tablets if each is 650 mg or less, otherwise 10 tablets."],
    ["B","Then disintegration. Not the same as dissolution! Disintegration is breaking into pieces; dissolution is the drug going into solution."],
    ["A","For dispersible tablets: six tubes, water at 24 to 26 degrees, all disintegrated within 3 minutes."],
    ["B","And there's a trade-off: harder tablets usually disintegrate more slowly."],
    ["A","That's pharmacy. Last stop, civil engineering and surveying."]
  ],
  lab: {
    title: "Experiment 7: Quality of Tablets",
    aim: "Judge tablet quality by hardness, friability and disintegration time.",
    apparatus: ["Monsanto hardness tester", "Roche friabilator (drum Ø 287 ± 4 mm, 38 ± 2 mm deep)", "Disintegration apparatus (basket-rack, 6 tubes, 1 L beaker)", "Analytical balance, thermometer"],
    principle: ["Hardness = diametral crushing force; 1 kg/cm² ≈ 9.807 N.", "Friability (%) = (W₀ − W_f)/W₀ × 100.", "Disintegration: liquid wets and penetrates the tablet, disintegrants swell, bonds break."],
    procedure: ["Hardness: zero the tester, place the tablet along its diameter, turn slowly until it breaks, read the force; 6 tablets.", "Friability: de-dust and weigh W₀ (~6.5 g); 100 revolutions at 25 ± 1 rpm (~4 min); de-dust and weigh W_f.", "Disintegration: one tablet per tube, water at 24–26 °C, run for 3 minutes and observe all six tubes."],
    precautions: ["Turn the hardness screw slowly and steadily.", "De-dust tablets carefully before both weighings.", "Check bath temperature before the disintegration test."],
    errors: ["Tablet not aligned along its diameter", "Dust not removed (friability)", "Temperature outside 24–26 °C"]
  },
  booklet: { calc: "friab", cols: ["Tablet", "Hardness (kg/cm²)", "Hardness (N)", "Disintegration time (s)"], rows: 6,
    sample: "W₀ = 6.512 g, W_f = 6.468 g → friability = 0.044/6.512 × 100 = 0.68% → passes (≤ 1%)." }
},
{
  id: "civil", no: 9, track: "Civil", icon: "architecture",
  title: "Introduction to Surveying",
  short: "Principles, plane vs geodetic, scale, levelling, theodolite",
  prof: "Dr. Saurabh Gupta", dept: "Civil Engineering", date: "20 Nov 2026", slides: 19,
  summary: "Surveying as measuring position: history, the two principles, maps and plans, plane vs geodetic surveying, classification, scale and RF, errors, distance and angle instruments, levelling, contours and modern drones/GNSS. Lab: height of a building with a theodolite.",
  formula: { eq: "H = h + D tan θ      D₁ = b tan θ₂ / (tan θ₁ − tan θ₂)", where: "h = instrument height, D = horizontal distance, θ = mean angle of elevation" },
  notes: [
    { h: "What surveying is", p: [
      "The art and science of measuring distances, directions and heights to fix the relative positions of points, and of setting out points from a plan onto the ground.",
      "History: Egyptian boundary registries, Greek diopter, Roman land surveyors, the Domesday Book (1086), Ramsden's theodolite (1787), triangulation, total stations, GNSS, drones.",
      "Phone GPS ≈ 3–5 m in open sky; survey-grade RTK ≈ 1–2 cm." ] },
    { h: "Principles and maps", p: [
      "1. Work from the whole to the part – fix a few control points accurately first so errors stay local.",
      "2. Fix a new point from two known ones (two distances, two angles, or one of each).",
      "Map vs plan: the difference is scale – small scale = map, large scale = plan. Maps: topographical, cadastral, engineering, contour.",
      "Scale/RF = distance on drawing ÷ actual distance on ground (1 cm = 10 m → RF 1/1000)." ] },
    { h: "Plane vs geodetic", p: [
      "Plane: Earth treated as flat, lines straight, plane triangles, areas < 250 km².",
      "Geodetic: curvature included, spherical triangles, areas > 250 km² (national maps, long routes, satellites).",
      "Curvature correction ≈ 0.0785 d² m (d in km) – about 8 cm at 1 km." ] },
    { h: "Classification and instruments", p: [
      "By instrument: chain, compass, plane table, theodolite, tacheometric, levelling, photogrammetric, EDM. By method: triangulation, traversing. By purpose/field: land, hydrographic, astronomical, aerial, geological, mine, archaeological, military.",
      "Distance precision: pacing ~1 in 50, chain ~1 in 1000, steel tape ~1 in 5000–10 000, EDM ±(2 mm + 2 ppm).",
      "Theodolite: telescope rotating about vertical and horizontal axes; vernier ~20″, digital ~1″. Errors: gross, systematic (tape 2 cm too long), random." ] },
    { h: "Levelling and contours", p: [
      "Levelling measures relative heights in the vertical plane. Benchmark (BM) = point of known RL; back sight = first reading on known RL; fore sight = last reading before moving.",
      "HI = RL + BS; RL = HI − FS. Example: BM 100.000 + BS 1.525 → HI 101.525; FS 0.865 → RL(A) = 100.660; FS 2.130 → RL(B) = 99.395 (lower than BM).",
      "Check: ΣBS − ΣFS = last RL − first RL.",
      "Contours join equal heights: close together = steep, never cross (except overhangs), always close." ] }
  ],
  narration: [
    { s: 1, t: "This is the Civil Engineering lecture by Dr. Saurabh Gupta: an introduction to surveying, or measuring the world." },
    { s: 2, t: "Surveying is around six thousand years old, from Egyptian boundary records and the Greek diopter to Roman land surveyors, Ramsden's theodolite in 1787, and today's total stations, GNSS and drones." },
    { s: 3, t: "Your phone's GPS is good to about three to five metres. A survey-grade receiver with RTK corrections gets one to two centimetres from the same satellites." },
    { s: 5, t: "Every survey follows two principles: work from the whole to the part, so errors stay local, and fix every new point from at least two known points." },
    { s: 6, t: "The difference between a map and a plan is only scale: a country is drawn as a small-scale map, a building as a large-scale plan." },
    { s: 8, t: "Plane surveying treats the earth as flat and is fine for areas under 250 square kilometres. Geodetic surveying accounts for curvature for larger areas." },
    { s: 11, t: "The representative fraction is the distance on the drawing divided by the actual ground distance. One centimetre representing ten metres is an RF of one in a thousand." },
    { s: 12, t: "Distances can be paced, chained, taped or measured with electronic distance meters. A theodolite measures horizontal and vertical angles, to about twenty seconds with a vernier." },
    { s: 13, t: "Levelling measures relative heights. The height of instrument equals the benchmark level plus the back sight, and each new reduced level equals the height of instrument minus the fore sight." },
    { s: 14, t: "Contours join points of equal height. Close together means steep, far apart means gentle, and they never cross." },
    { s: 15, t: "The Great Trigonometrical Survey of India used triangulation with theodolites to measure the height of Everest." },
    { s: 19, t: "In the lab you'll use a theodolite to find a building's height: H equals instrument height plus distance times the tangent of the elevation angle." }
  ],
  podcast: [
    ["A","Final 104Lite lecture episode: civil engineering and surveying."],
    ["B","Dr. Gupta opened with a fun question: how tall is the tallest building you can see? No apps."],
    ["A","The hint was the Sun. Measure a shadow you can reach to find a height you can't. That's surveying in one idea."],
    ["B","Two principles. Work from the whole to the part, and fix each new point from two known ones."],
    ["A","Plane versus geodetic: under 250 square kilometres you can pretend the Earth is flat."],
    ["B","Curvature correction is about 0.0785 d squared metres. Roughly 8 centimetres at one kilometre."],
    ["A","Then levelling. HI equals RL plus back sight, new RL equals HI minus fore sight."],
    ["B","In the example, B came out at 99.395, lower than the benchmark."],
    ["A","For the theodolite lab: H equals h plus D tan theta. Don't forget h, the instrument height. That's the commonest mistake."],
    ["B","And take face left and face right readings and average them. That cancels index error."],
    ["A","That's the full course. Now try the sample tests on the home page. Good luck!"]
  ],
  lab: {
    title: "Experiment 4: Height of a Building with a Theodolite",
    aim: "Find the height of a building by trigonometric levelling: measure the vertical angle to the top with a theodolite and the horizontal distance with a tape.",
    apparatus: ["Vernier theodolite (LC ~20″) on tripod", "Plumb bob", "Steel tape", "Ranging rods"],
    principle: ["Single station (base accessible): H = h + D tan θ.", "Two stations (base inaccessible), b apart, θ₁ > θ₂: D₁ = b tan θ₂/(tan θ₁ − tan θ₂), H = h + D₁ tan θ₁.", "Mean of Face Left and Face Right cancels index and collimation errors."],
    procedure: ["Temporary adjustments: set up tripod, centre with plumb bob, level with plate levels and foot screws, focus to remove parallax.", "Measure h (ground to trunnion axis) and D with the tape.", "Sight the top; read the vertical angle on Face Left and Face Right; take the mean.", "Take 2–3 sets and average; compute H."],
    precautions: ["Level carefully; bisect the same point each time.", "Keep the tape horizontal and taut (no sag).", "Do not forget to add h."],
    errors: ["Poor levelling, parallax, mis-bisection, index error", "Wrong D (sag, temperature) – grows as ΔD tan θ at steep angles", "Wrong h", "Refraction over long distances"]
  },
  booklet: { calc: "theo", cols: ["Set", "Face Left θ", "Face Right θ", "Mean θ", "H (m)"], rows: 3,
    sample: "D = 25.50 m, h = 1.45 m, θ = 32°15′ (tan θ = 0.6310) → H = 1.45 + 25.50 × 0.6310 = 17.54 m." }
}
];

window.GUIDES = [
  { file: "guide-ch1-measurement-fundamentals.pdf", title: "Ch. 1 — Measurement concepts, errors & data analysis", pages: 8, tag: "COMPRE GUIDE" },
  { file: "guide-ch2-instruments-methods.pdf", title: "Ch. 2 — Instruments & methods across the departments", pages: 5, tag: "COMPRE GUIDE" },
  { file: "guide-ch3-experiments.pdf", title: "Ch. 3 — The eight experiments (lab manual)", pages: 7, tag: "LAB MANUAL" }
];

/* Result & Observation Booklet layouts (Academic Year 2026-27), mirrored from the printed booklet.
   t = table title, c = columns, r = row labels (or a number of blank rows), note = text under the table. */
window.BOOKLETS = {
  fundamentals: [
    { t: "Repeated readings of one quantity", c: ["Trial", "Reading xᵢ", "xᵢ − x̄", "(xᵢ − x̄)²"], r: 5, note: "x̄ = Σxᵢ/N;  s = √[Σ(xᵢ − x̄)²/(N − 1)];  standard error = s/√N." }
  ],
  biology: [
    { t: "Table 1. Raw data from replicates and mean of replicates for the individual observation", c: ["Details", "Height (m)", "Weight (kg)", "SBP (mmHg)", "DBP (mmHg)"], r: ["1.", "2.", "3.", "Mean of replicates"], note: "BMI = Weight / (Height)²  →  category: Underweight < 18.5 · Normal 18.5–24.9 · Overweight 25–29.9 · Obese ≥ 30." },
    { t: "Table 2. Calculated BMI and SBP_avg from each group member, with other variables for correlation analysis", c: ["Sl.", "xᵢ (BMI)", "yᵢ (SBP_avg)", "Xᵢ = xᵢ − x̄", "Yᵢ = yᵢ − ȳ", "Xᵢ²", "Yᵢ²", "XᵢYᵢ"], r: ["1.", "2.", "3.", "4.", "5.", "6.", "7.", "8.", "9.", "10.", "Mean / Σ of group"], note: "Pearson correlation r = ΣXᵢYᵢ / √(ΣXᵢ² · ΣYᵢ²).  Inference: data categories of height, weight, BMI and BP, and the type of correlation between BMI and BP." }
  ],
  chemeng: [
    { t: "Observation table — Venturimeter and Orificemeter", c: ["S.No.", "Pressure difference h (cm)", "Rise of water level in measuring tank R (cm)", "Time taken for R, t (s)"], r: 3 },
    { t: "Result and discussion — Venturimeter and Orificemeter", c: ["S.No.", "Manometric height difference H (m)", "Flow rate from venturi/orifice Qt (m³/s)", "Actual flow rate Qa (m³/s)", "Cd = Qa/Qt"], r: 3, note: "H = (h/100)(ρm/ρw − 1) m of water; Qt = a₁a₂√(2gH)/√(a₁² − a₂²); A = 0.1 m²; ρm = 13 600, ρw = 1000 kg/m³; g = 9.81 m/s². d₁ = 28 mm (a₁ = 6.157 × 10⁻⁴ m²), d₂ = 14 mm (a₂ = 1.539 × 10⁻⁴ m²) for both meters." }
  ],
  chemistry: [
    { t: "Observations — colour of turmeric indicator", c: ["Substance", "Colour observed", "Acidic / Neutral / Basic", "pH paper value"], r: ["Lemon juice", "Vinegar", "Soda water", "Sprite", "Tap water", "Baking-soda solution", "Soap solution", "Detergent", "Soda ash", "Unknown sample"], note: "Arrange the substances from most acidic to most alkaline and validate the unknown with standard pH paper." }
  ],
  physics: [
    { t: "Table 8.1: Bore radius (calibrated), room temperature and liquid densities", c: ["Liquid", "ρ₂₀ (kg/m³)", "γ_lit (N/m)", "Calculated ρ(T) (kg/m³)"], r: ["Water", "25% glycerol", "50% glycerol", "5 mM SDS (aq.)"], note: "r = 0.275 mm, δr = 0.0035 mm. Room temperature T = ____ °C.  ρ_water(T) ≈ 998.2 − 0.20(T − 20);  ρ_SDS(T) ≈ ρ_water(T) (dilute)." },
    { t: "Table 8.2: Capillary rise — graph paper / scale (single reading, LC = 1 mm, δh = 0.05 cm)", c: ["Liquid", "h_scale (cm)", "δh_scale (cm)"], r: ["Water", "25% glycerol", "50% glycerol", "5 mM SDS (aq.)"] },
    { t: "Table 8.3: Capillary rise — second technique (web app: δh = σ of 5 repeats; microscope: δh = LC/√2)", c: ["Liquid", "R_top / reading 1", "R_bottom / reading 2", "h (cm)", "δh (cm)"], r: ["Water", "25% glycerol", "50% glycerol", "5 mM SDS (aq.)"] },
    { t: "Table 8.4: Surface tension — computed values, propagated uncertainty and comparison", c: ["Liquid", "γ_scale (N/m)", "δγ_scale (N/m)", "γ_2nd (N/m)", "δγ_2nd (N/m)", "% error (scale)", "% error (2nd)"], r: ["Water", "25% glycerol", "50% glycerol", "5 mM SDS (aq.)"], note: "γ = hρ(T)gr/2;  δγ = γ√[(δh/h)² + (δr/r)²]  (δρ neglected).  Convert all lengths to metres before substituting!  % error = |γ_measured − γ_lit| / γ_lit × 100." }
  ],
  eee: [
    { t: "Observation table", c: ["Parameter", "Value"], r: ["Least count of the screw gauge (mm)", "Sensitivity of the CRO (V/div)", "Null point reading (mm)"] },
    { t: "Table 1: Displacement of cantilever plate w.r.t. null and DSO reading", c: ["No.", "Displacement Up (mm)", "Displacement Down (mm)", "DSO RMS Up (mV)", "DSO RMS Down (mV)", "DC output (mV)"], r: 8, note: "Plot output (y) against displacement (x). Sensitivity = slope = ΔV/Δx, found separately for the up and down sides." }
  ],
  mechanical: [
    { t: "Experiment parameters", c: ["Parameter", "Value"], r: ["Reference liquid", "Target working temperature", "Accepted water viscosity used (μw)", "Pycnometer volume (V)", "Balance readability", "Stopwatch resolution", "Number of timing trials"], note: "Booklet defaults: water, μw = 0.890 mPa·s (25 °C), V = 25.00 mL, 0.001 g, 0.01 s, 5 per liquid." },
    { t: "Pycnometer: reference water", c: ["Trial", "Empty pycnometer m₀ (g)", "Filled m_w,bottle (g)", "Net water mass m_w (g)", "Density ρ_w (kg/m³)"], r: 5, note: "m = m_f − m₀;  ρ = m/V." },
    { t: "Pycnometer: test solutions", c: ["Solution · Trial", "Empty m₀ (g)", "Filled m_f (g)", "Net m (g)", "Density ρ (kg/m³)"], r: ["20% v/v · 1", "20% v/v · 2", "20% v/v · 3", "20% v/v · 4", "20% v/v · 5", "40% v/v · 1", "40% v/v · 2", "40% v/v · 3", "40% v/v · 4", "40% v/v · 5"] },
    { t: "Flow time", c: ["Solution", "Temperature (°C)", "Trial 1 (s)", "Trial 2 (s)", "Trial 3 (s)", "Trial 4 (s)", "Trial 5 (s)"], r: ["Water (reference)", "20% v/v glycerol–water", "40% v/v glycerol–water"] },
    { t: "Calculations", c: ["Test liquid", "ρx (kg/m³)", "tx (s)", "μw (mPa·s)", "ρw (kg/m³)", "tw (s)", "μx (mPa·s)", "νx (mm²/s)"], r: ["20% v/v glycerol–water", "40% v/v glycerol–water"], note: "μx = μw(ρx tx)/(ρw tw);  νx = μx/ρx. Attach plots." }
  ],
  pharmacy: [
    { t: "A. Determination of tablet hardness (Monsanto tester)", c: ["No.", "Tablet sample", "Hardness (kg/cm²)", "Hardness (N)", "Remark"], r: ["1", "2", "3", "4", "5", "6", "Average hardness"], note: "Average hardness = Σ readings / number of tablets.  1 kg/cm² ≈ 9.807 N;  1 kp = 1 kgf ≈ 9.807 N. Accept 4–8 kg/cm² for conventional compressed tablets." },
    { t: "B. Determination of tablet friability", c: ["Parameter", "Observation"], r: ["Name of tablet", "Tablet type", "Number of tablets taken", "Average tablet weight", "Apparatus used", "Rotation speed", "Number of revolutions", "Test duration", "Initial weight W₀ (g)", "Final weight after tumbling and de-dusting W_f (g)", "Weight loss W₀ − W_f (g)", "Friability (%)", "Tablets cracked / chipped / broken (Yes/No)"], note: "Complies with the USP criterion if mean weight loss ≤ 1.0% and no significant cracking, cleaving or breakage." },
    { t: "C. Disintegration time of dispersible tablets", c: ["Tablet No.", "Disintegrated within 3 min (Yes/No)", "Individual disintegration time"], r: 6, note: "Record name and type of tablet and number taken (6). Result: mean disintegration time; complies with the IP requirement if all six disintegrate within 3 min." }
  ],
  civil: [
    { t: "Observation table", c: ["Obs.", "Station", "Horizontal distance D (m)", "Instrument height h (m)", "Face", "Vertical angle θ", "Mean θ", "Calculated height H (m)"], r: ["1 · O₁", "", "2 · O₁", "", "3 · O₂", ""], note: "Rows in pairs: Face Left (FL) then Face Right (FR). Distance between stations O₁ and O₂ (two-station method, if used): b = ____ m.  Formula: H = h + D tan θ." }
  ]
};
