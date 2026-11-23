/* 104Lite topics: Lecture 1 + the eight U104 experiments */
window.TOPICS = [
  { id: "l1", code: "L1", name: "Measurement Fundamentals", sub: "Lecture 1 · units, errors, uncertainty, statistics", icon: "straighten", dept: "Core",
    f: [["Standard error", "SE = s/√N,  s = √[Σ(xᵢ − x̄)²/(N − 1)]"], ["Sum / difference", "δQ = √(δx² + δy²)"], ["Product / quotient", "δQ/Q = √[(δx/x)² + (δy/y)²]"], ["Power", "δQ/Q = |n|·δx/x  for Q = xⁿ"], ["Difference of two readings", "δ = LC/√2"], ["Accuracy (% of FS)", "error = (±p%)·(full scale)"], ["Least squares", "m = [NΣxy − ΣxΣy]/[NΣx² − (Σx)²]"]] },
  { id: "bio", code: "E1", name: "BMI & Blood Pressure", sub: "Biological Sciences · replicates, BMI, Pearson r", icon: "biotech", dept: "Bio",
    f: [["BMI", "BMI = mass (kg) / height² (m²);  18.5 / 25 / 30 boundaries"], ["Pearson r", "r = ΣXᵢYᵢ / √(ΣXᵢ²·ΣYᵢ²),  Xᵢ = xᵢ − x̄"], ["Viable count", "CFU/mL = colonies × dilution factor ÷ volume plated"], ["Nucleic acids", "A₂₆₀ = 1 ↔ 50 (dsDNA), 40 (RNA), 33 (ssDNA) µg/mL"]] },
  { id: "chemeng", code: "E2", name: "Venturi & Orifice Meters", sub: "Chemical Engineering · flow rate, Cd", icon: "water_drop", dept: "Chem Engg",
    f: [["Head", "H = (h/100)(ρm/ρw − 1) = 0.126 h  m of water"], ["Theoretical flow", "Qt = a₁a₂√(2gH) / √(a₁² − a₂²)"], ["Actual flow", "Qa = A·R/t  (A = 0.1 m²)"], ["Coefficient of discharge", "Cd = Qa/Qt  (venturi ≈ 0.97, orifice ≈ 0.62)"], ["Continuity", "A₁V₁ = A₂V₂ → V₂/V₁ = (d₁/d₂)²"], ["Lab areas", "a₁ = 6.157 × 10⁻⁴ m², a₂ = 1.539 × 10⁻⁴ m²"]] },
  { id: "chem", code: "E3", name: "pH Scale & Analytical Chemistry", sub: "Chemistry · pH, Beer–Lambert, LOD, chromatography", icon: "science", dept: "Chemistry",
    f: [["pH", "pH = −log₁₀[H⁺];  ΔpH = 1 ↔ ×10 in [H⁺]"], ["Beer–Lambert", "A = εbc"], ["Detection limits", "LOD = 3σ/m,  LOQ = 10σ/m"], ["TLC", "Rf = d_analyte / d_solvent"], ["Resolution", "Rs = 2(tr₂ − tr₁)/(w₁ + w₂) ≥ 1.5"]] },
  { id: "civil", code: "E4", name: "Theodolite & Surveying", sub: "Civil Engineering · heights, levelling, scale", icon: "architecture", dept: "Civil",
    f: [["Single station", "H = h + D tan θ"], ["Two stations", "D₁ = b tan θ₂/(tan θ₁ − tan θ₂),  H = h + D₁ tan θ₁"], ["Levelling", "HI = RL + BS;  RL = HI − FS"], ["Scale", "RF = drawing distance / ground distance"], ["Curvature", "c ≈ 0.0785 d² m (d in km)"], ["Height error", "ΔH ≈ ΔD·tan θ"]] },
  { id: "eee", code: "E5", name: "LVDT & Sensor Characteristics", sub: "EEE · sensitivity, hysteresis, non-linearity", icon: "sensors", dept: "EEE",
    f: [["Sensitivity", "S = ΔV₀/Δx (mV/mm)"], ["Hysteresis", "H = (V_unload − V_load)/FSD × 100 % FSD"], ["Non-linearity", "N = (V_actual − V_ideal)/FSD × 100 % FSD"], ["LVDT output", "V₀ = V₁ − V₂; null at centre; phase → direction"], ["CRO", "V = divisions × V/div;  peak = Vpp/2"]] },
  { id: "mech", code: "E6", name: "Ostwald Viscometer", sub: "Mechanical · relative viscosity, uncertainty", icon: "speed", dept: "Mechanical",
    f: [["Poiseuille", "Q = πr⁴Δp/(8μL) → μ = Kρt"], ["Relative viscosity", "μx = μw(ρx tx)/(ρw tw)"], ["Kinematic", "ν = μ/ρ"], ["Pycnometer", "ρ = (m_f − m₀)/V"], ["Type A", "u = s/√n"], ["Propagation", "(δμ/μ)² = Σ(fractional uncertainties)²"]] },
  { id: "pharm", code: "E7", name: "Tablet Quality Tests", sub: "Pharmacy · hardness, friability, disintegration", icon: "medication", dept: "Pharmacy",
    f: [["Friability", "F = (W₀ − W_f)/W₀ × 100;  pass ≤ 1.0%"], ["Hardness", "1 kg/cm² ≈ 9.807 N;  typical 4–8 kg/cm²"], ["Friabilator", "25 ± 1 rpm × 100 rev (~4 min)"], ["Sample", "≤ 650 mg each → ~6.5 g; > 650 mg → 10 tablets"], ["Disintegration", "dispersible: all 6 within 3 min, water 24–26 °C"]] },
  { id: "phys", code: "E8", name: "Surface Tension (Capillary Rise)", sub: "Physics · γ = hρgr/2, uncertainty", icon: "opacity", dept: "Physics",
    f: [["Capillary rise", "γ = hρgr/2 (θ ≈ 0);  h = 2γ/(ρgr)"], ["Uncertainty", "(δγ/γ)² = (δh/h)² + (δr/r)²"], ["Density", "ρ(T) ≈ ρ₂₀ − β(T − 20)"], ["Microscope", "δh = LC/√2"], ["Literature", "water 72.8, SDS ≈ 43, 25% gly ≈ 71, 50% gly ≈ 66 mN/m"]] }
];
