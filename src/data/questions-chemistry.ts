import { Question } from '../types';

export const chemistryQuestions: Question[] = [
  {
    id: 'chem-1', subject: 'Chemistry',
    text: 'The atomic number of an element is determined by the number of:',
    options: { A: 'Neutrons', B: 'Protons', C: 'Electrons in the outer shell', D: 'Nucleons' },
    correctAnswer: 'B',
    explanation: 'The atomic number (Z) is the number of protons in the nucleus of an atom. It defines the element.'
  },
  {
    id: 'chem-2', subject: 'Chemistry',
    text: 'Which of the following is a noble gas?',
    options: { A: 'Nitrogen', B: 'Oxygen', C: 'Neon', D: 'Chlorine' },
    correctAnswer: 'C',
    explanation: 'Neon is a noble gas (Group 18). Noble gases have a complete outer electron shell, making them very stable and unreactive.'
  },
  {
    id: 'chem-3', subject: 'Chemistry',
    text: 'The pH of a neutral solution at 25°C is:',
    options: { A: '0', B: '7', C: '14', D: '1' },
    correctAnswer: 'B',
    explanation: 'At 25°C, a neutral solution has a pH of 7. Below 7 is acidic, above 7 is alkaline/basic.'
  },
  {
    id: 'chem-4', subject: 'Chemistry',
    text: 'An isotope of an element has the same number of _____ but different number of _____.',
    options: { A: 'Neutrons, protons', B: 'Protons, neutrons', C: 'Electrons, protons', D: 'Protons, electrons' },
    correctAnswer: 'B',
    explanation: 'Isotopes have the same number of protons (same element) but different numbers of neutrons (different mass numbers).'
  },
  {
    id: 'chem-5', subject: 'Chemistry',
    text: 'The IUPAC name of CH₃CH₂OH is:',
    options: { A: 'Methanol', B: 'Ethanol', C: 'Propanol', D: 'Butanol' },
    correctAnswer: 'B',
    explanation: 'CH₃CH₂OH has 2 carbon atoms with an -OH group, making it ethanol (ethyl alcohol).'
  },
  {
    id: 'chem-6', subject: 'Chemistry',
    text: 'Which gas is produced when an acid reacts with a metal?',
    options: { A: 'Oxygen', B: 'Carbon dioxide', C: 'Hydrogen', D: 'Nitrogen' },
    correctAnswer: 'C',
    explanation: 'When an acid reacts with a reactive metal: Metal + Acid → Salt + Hydrogen gas. E.g., Zn + H₂SO₄ → ZnSO₄ + H₂'
  },
  {
    id: 'chem-7', subject: 'Chemistry',
    text: 'The process of converting a solid directly to gas without passing through the liquid state is called:',
    options: { A: 'Evaporation', B: 'Condensation', C: 'Sublimation', D: 'Deposition' },
    correctAnswer: 'C',
    explanation: 'Sublimation is the phase transition from solid directly to gas. Examples include dry ice (solid CO₂) and iodine crystals.'
  },
  {
    id: 'chem-8', subject: 'Chemistry',
    text: 'What is the molecular formula of glucose?',
    options: { A: 'C₆H₁₂O₆', B: 'C₁₂H₂₂O₁₁', C: 'CH₃COOH', D: 'C₂H₅OH' },
    correctAnswer: 'A',
    explanation: 'Glucose has the molecular formula C₆H₁₂O₆. It is a simple monosaccharide sugar and a primary energy source for cells.'
  },
  {
    id: 'chem-9', subject: 'Chemistry',
    text: 'The type of bond formed between sodium and chlorine in NaCl is:',
    options: { A: 'Covalent bond', B: 'Ionic bond', C: 'Metallic bond', D: 'Hydrogen bond' },
    correctAnswer: 'B',
    explanation: 'NaCl is formed by ionic bonding — sodium (metal) transfers an electron to chlorine (non-metal), creating Na⁺ and Cl⁻ ions.'
  },
  {
    id: 'chem-10', subject: 'Chemistry',
    text: 'Which of the following is an alkali metal?',
    options: { A: 'Calcium', B: 'Sodium', C: 'Aluminium', D: 'Iron' },
    correctAnswer: 'B',
    explanation: 'Sodium (Na) is an alkali metal (Group 1). Alkali metals are highly reactive, have one valence electron, and form +1 ions.'
  },
  {
    id: 'chem-11', subject: 'Chemistry',
    text: "Avogadro's number is approximately:",
    options: { A: '6.02 × 10²³', B: '6.02 × 10²²', C: '3.14 × 10²³', D: '6.02 × 10²⁰' },
    correctAnswer: 'A',
    explanation: "Avogadro's number (Nₐ) = 6.022 × 10²³. It represents the number of particles in one mole of a substance."
  },
  {
    id: 'chem-12', subject: 'Chemistry',
    text: 'Rust is chemically known as:',
    options: { A: 'Iron(II) oxide', B: 'Iron(III) oxide hydrated', C: 'Iron chloride', D: 'Iron sulphide' },
    correctAnswer: 'B',
    explanation: 'Rust is hydrated iron(III) oxide (Fe₂O₃·xH₂O), formed when iron reacts with oxygen and water.'
  },
  {
    id: 'chem-13', subject: 'Chemistry',
    text: 'The number of electrons in the outermost shell of Group 17 elements is:',
    options: { A: '1', B: '5', C: '7', D: '8' },
    correctAnswer: 'C',
    explanation: 'Group 17 elements (halogens) have 7 electrons in their outermost shell, making them highly reactive non-metals.'
  },
  {
    id: 'chem-14', subject: 'Chemistry',
    text: 'Which indicator turns pink in alkaline solution?',
    options: { A: 'Methyl orange', B: 'Phenolphthalein', C: 'Litmus', D: 'Universal indicator' },
    correctAnswer: 'B',
    explanation: 'Phenolphthalein is colorless in acidic solutions and turns pink/magenta in alkaline (basic) solutions.'
  },
  {
    id: 'chem-15', subject: 'Chemistry',
    text: 'The first element in the periodic table is:',
    options: { A: 'Helium', B: 'Oxygen', C: 'Hydrogen', D: 'Carbon' },
    correctAnswer: 'C',
    explanation: 'Hydrogen (H) is the first element with atomic number 1. It is the lightest and most abundant element in the universe.'
  },
  {
    id: 'chem-16', subject: 'Chemistry',
    text: 'An exothermic reaction:',
    options: { A: 'Absorbs heat', B: 'Releases heat', C: 'Has no energy change', D: 'Only occurs at high temperatures' },
    correctAnswer: 'B',
    explanation: 'An exothermic reaction releases heat to the surroundings, resulting in a negative enthalpy change (ΔH < 0).'
  },
  {
    id: 'chem-17', subject: 'Chemistry',
    text: 'The law of conservation of mass states that:',
    options: { A: 'Mass can be created', B: 'Mass can be destroyed', C: 'Mass is neither created nor destroyed in a chemical reaction', D: 'Mass increases in reactions' },
    correctAnswer: 'C',
    explanation: 'The law of conservation of mass states that in a chemical reaction, matter is neither created nor destroyed — total mass is conserved.'
  },
  {
    id: 'chem-18', subject: 'Chemistry',
    text: 'What is the oxidation state of manganese in KMnO₄?',
    options: { A: '+5', B: '+6', C: '+7', D: '+4' },
    correctAnswer: 'C',
    explanation: 'In KMnO₄: K = +1, O = -2. So 1 + Mn + 4(-2) = 0, giving Mn = +7.'
  },
  {
    id: 'chem-19', subject: 'Chemistry',
    text: 'Ethene (C₂H₄) is an example of:',
    options: { A: 'Alkane', B: 'Alkene', C: 'Alkyne', D: 'Alcohol' },
    correctAnswer: 'B',
    explanation: 'Ethene (C₂H₄) contains a carbon-carbon double bond (C=C), making it an alkene. Alkenes have the general formula CₙH₂ₙ.'
  },
  {
    id: 'chem-20', subject: 'Chemistry',
    text: 'Which of the following is used in the laboratory preparation of oxygen gas?',
    options: { A: 'Zinc and HCl', B: 'Hydrogen peroxide and MnO₂', C: 'Calcium carbonate and HCl', D: 'Ammonium chloride and NaOH' },
    correctAnswer: 'B',
    explanation: 'Oxygen is prepared by decomposing hydrogen peroxide (H₂O₂) using manganese dioxide (MnO₂) as a catalyst: 2H₂O₂ → 2H₂O + O₂'
  },
  {
    id: 'chem-21', subject: 'Chemistry',
    text: 'Hardness in water is caused by the presence of:',
    options: { A: 'Sodium ions', B: 'Calcium and magnesium ions', C: 'Potassium ions', D: 'Iron ions only' },
    correctAnswer: 'B',
    explanation: 'Hard water contains dissolved calcium (Ca²⁺) and magnesium (Mg²⁺) ions, which prevent soap from lathering easily.'
  },
  {
    id: 'chem-22', subject: 'Chemistry',
    text: 'The general formula for alkanes is:',
    options: { A: 'CₙH₂ₙ', B: 'CₙH₂ₙ₊₂', C: 'CₙH₂ₙ₋₂', D: 'CₙHₙ' },
    correctAnswer: 'B',
    explanation: 'Alkanes are saturated hydrocarbons with the general formula CₙH₂ₙ₊₂. E.g., methane CH₄ (n=1), ethane C₂H₆ (n=2).'
  },
  {
    id: 'chem-23', subject: 'Chemistry',
    text: 'Which gas is responsible for the depletion of the ozone layer?',
    options: { A: 'Carbon dioxide', B: 'Methane', C: 'Chlorofluorocarbons (CFCs)', D: 'Nitrogen oxide' },
    correctAnswer: 'C',
    explanation: 'CFCs release chlorine atoms in the stratosphere, which catalyze the breakdown of ozone (O₃) molecules.'
  },
  {
    id: 'chem-24', subject: 'Chemistry',
    text: 'A substance that speeds up a chemical reaction without being consumed is called a:',
    options: { A: 'Reactant', B: 'Product', C: 'Catalyst', D: 'Inhibitor' },
    correctAnswer: 'C',
    explanation: 'A catalyst increases the rate of a chemical reaction by providing an alternative pathway with lower activation energy.'
  },
  {
    id: 'chem-25', subject: 'Chemistry',
    text: 'The electronic configuration of sodium (Na, Z=11) is:',
    options: { A: '2,8,2', B: '2,8,1', C: '2,9', D: '2,7,2' },
    correctAnswer: 'B',
    explanation: 'Sodium has 11 electrons: 2 in the first shell, 8 in the second shell, and 1 in the third shell (2,8,1).'
  },
  {
    id: 'chem-26', subject: 'Chemistry',
    text: 'Le Chatelier\'s principle deals with:',
    options: { A: 'Atomic structure', B: 'Chemical equilibrium', C: 'Nuclear reactions', D: 'Organic chemistry' },
    correctAnswer: 'B',
    explanation: 'Le Chatelier\'s principle states that when a system at equilibrium is disturbed, it shifts to counteract the disturbance.'
  },
  {
    id: 'chem-27', subject: 'Chemistry',
    text: 'The molar mass of water (H₂O) is:',
    options: { A: '16 g/mol', B: '18 g/mol', C: '20 g/mol', D: '2 g/mol' },
    correctAnswer: 'B',
    explanation: 'H₂O: 2(1) + 16 = 18 g/mol. Hydrogen has atomic mass 1, and oxygen has atomic mass 16.'
  },
  {
    id: 'chem-28', subject: 'Chemistry',
    text: 'Which of the following metals is the most reactive?',
    options: { A: 'Gold', B: 'Iron', C: 'Potassium', D: 'Copper' },
    correctAnswer: 'C',
    explanation: 'Potassium (K) is the most reactive metal among the options. In the reactivity series, K > Na > Ca > Mg > Al > Zn > Fe > Cu > Ag > Au.'
  },
  {
    id: 'chem-29', subject: 'Chemistry',
    text: 'Crude oil is separated into its components by:',
    options: { A: 'Simple distillation', B: 'Fractional distillation', C: 'Crystallization', D: 'Filtration' },
    correctAnswer: 'B',
    explanation: 'Fractional distillation separates crude oil into fractions based on different boiling points of the hydrocarbon components.'
  },
  {
    id: 'chem-30', subject: 'Chemistry',
    text: 'The test for hydrogen gas is:',
    options: { A: 'It relights a glowing splint', B: 'It turns limewater milky', C: 'It produces a "pop" sound with a burning splint', D: 'It bleaches litmus paper' },
    correctAnswer: 'C',
    explanation: 'Hydrogen gas is tested by bringing a lit/burning splint near it — it burns with a characteristic "pop" sound.'
  },
  {
    id: 'chem-31', subject: 'Chemistry',
    text: 'An allotrope of carbon is:',
    options: { A: 'Ozone', B: 'Diamond', C: 'Rust', D: 'Brass' },
    correctAnswer: 'B',
    explanation: 'Diamond is an allotrope of carbon, along with graphite, fullerene (C₆₀), and graphene. They differ in structural arrangement.'
  },
  {
    id: 'chem-32', subject: 'Chemistry',
    text: 'The reaction between an acid and a base to produce salt and water is called:',
    options: { A: 'Oxidation', B: 'Reduction', C: 'Neutralization', D: 'Decomposition' },
    correctAnswer: 'C',
    explanation: 'Neutralization: Acid + Base → Salt + Water. E.g., HCl + NaOH → NaCl + H₂O.'
  },
  {
    id: 'chem-33', subject: 'Chemistry',
    text: 'Which of the following compounds is an ester?',
    options: { A: 'CH₃COOH', B: 'CH₃COOCH₃', C: 'CH₃CHO', D: 'CH₃OH' },
    correctAnswer: 'B',
    explanation: 'CH₃COOCH₃ (methyl ethanoate) is an ester. Esters are formed from the reaction of a carboxylic acid with an alcohol.'
  },
  {
    id: 'chem-34', subject: 'Chemistry',
    text: 'The gas produced when calcium carbonate reacts with hydrochloric acid is:',
    options: { A: 'Hydrogen', B: 'Oxygen', C: 'Carbon dioxide', D: 'Chlorine' },
    correctAnswer: 'C',
    explanation: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. Carbon dioxide gas is released, which turns limewater milky.'
  },
  {
    id: 'chem-35', subject: 'Chemistry',
    text: 'Electrolysis involves the use of:',
    options: { A: 'Heat to decompose compounds', B: 'Electricity to decompose compounds', C: 'Light to decompose compounds', D: 'Pressure to decompose compounds' },
    correctAnswer: 'B',
    explanation: 'Electrolysis is the process of using electrical energy to drive a non-spontaneous chemical reaction (decomposition).'
  },
  {
    id: 'chem-36', subject: 'Chemistry',
    text: 'Which of the following is a strong acid?',
    options: { A: 'Ethanoic acid', B: 'Citric acid', C: 'Hydrochloric acid', D: 'Carbonic acid' },
    correctAnswer: 'C',
    explanation: 'Hydrochloric acid (HCl) is a strong acid — it completely dissociates into H⁺ and Cl⁻ ions in aqueous solution.'
  },
  {
    id: 'chem-37', subject: 'Chemistry',
    text: 'The process of adding a solute to a solvent to form a solution is called:',
    options: { A: 'Filtration', B: 'Dissolution', C: 'Evaporation', D: 'Distillation' },
    correctAnswer: 'B',
    explanation: 'Dissolution is the process of dissolving a solute in a solvent to form a homogeneous solution.'
  },
  {
    id: 'chem-38', subject: 'Chemistry',
    text: 'The relative molecular mass of sulphuric acid (H₂SO₄) is:',
    options: { A: '96', B: '98', C: '49', D: '100' },
    correctAnswer: 'B',
    explanation: 'H₂SO₄: 2(1) + 32 + 4(16) = 2 + 32 + 64 = 98 g/mol.'
  },
  {
    id: 'chem-39', subject: 'Chemistry',
    text: 'A saturated solution is one that:',
    options: { A: 'Can dissolve more solute at that temperature', B: 'Cannot dissolve any more solute at that temperature', C: 'Has no solute', D: 'Is always hot' },
    correctAnswer: 'B',
    explanation: 'A saturated solution contains the maximum amount of solute that can be dissolved at a given temperature.'
  },
  {
    id: 'chem-40', subject: 'Chemistry',
    text: 'The bond angle in a methane (CH₄) molecule is approximately:',
    options: { A: '90°', B: '109.5°', C: '120°', D: '180°' },
    correctAnswer: 'B',
    explanation: 'Methane has a tetrahedral geometry with bond angles of approximately 109.5°, as predicted by VSEPR theory.'
  }
];
