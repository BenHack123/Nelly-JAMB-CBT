import { Question } from '../types';

export const physicsQuestions: Question[] = [
  {
    id: 'phy-1', subject: 'Physics',
    text: 'The SI unit of force is:',
    options: { A: 'Joule', B: 'Newton', C: 'Watt', D: 'Pascal' },
    correctAnswer: 'B',
    explanation: 'The Newton (N) is the SI unit of force. 1 N = 1 kg·m/s². It is named after Sir Isaac Newton.'
  },
  {
    id: 'phy-2', subject: 'Physics',
    text: 'A car accelerates uniformly from rest to 20 m/s in 5 seconds. What is its acceleration?',
    options: { A: '2 m/s²', B: '4 m/s²', C: '5 m/s²', D: '10 m/s²' },
    correctAnswer: 'B',
    explanation: 'Acceleration = (v - u)/t = (20 - 0)/5 = 4 m/s².'
  },
  {
    id: 'phy-3', subject: 'Physics',
    text: 'Which of the following is a vector quantity?',
    options: { A: 'Speed', B: 'Mass', C: 'Temperature', D: 'Velocity' },
    correctAnswer: 'D',
    explanation: 'Velocity is a vector quantity because it has both magnitude and direction. Speed, mass, and temperature are scalars.'
  },
  {
    id: 'phy-4', subject: 'Physics',
    text: 'The energy stored in a stretched spring is:',
    options: { A: 'Kinetic energy', B: 'Elastic potential energy', C: 'Gravitational potential energy', D: 'Thermal energy' },
    correctAnswer: 'B',
    explanation: 'When a spring is stretched or compressed, it stores elastic potential energy, given by E = ½kx².'
  },
  {
    id: 'phy-5', subject: 'Physics',
    text: 'Which law states that the current through a conductor is directly proportional to the voltage across it?',
    options: { A: "Newton's Law", B: "Ohm's Law", C: "Faraday's Law", D: "Coulomb's Law" },
    correctAnswer: 'B',
    explanation: "Ohm's Law states V = IR, where V is voltage, I is current, and R is resistance."
  },
  {
    id: 'phy-6', subject: 'Physics',
    text: 'A body of mass 5 kg is lifted through a height of 10 m. Calculate the work done against gravity. (g = 10 m/s²)',
    options: { A: '50 J', B: '100 J', C: '500 J', D: '250 J' },
    correctAnswer: 'C',
    explanation: 'Work done = mgh = 5 × 10 × 10 = 500 J.'
  },
  {
    id: 'phy-7', subject: 'Physics',
    text: 'The phenomenon of light bending around obstacles is called:',
    options: { A: 'Reflection', B: 'Refraction', C: 'Diffraction', D: 'Polarization' },
    correctAnswer: 'C',
    explanation: 'Diffraction is the bending of waves around obstacles or through narrow openings.'
  },
  {
    id: 'phy-8', subject: 'Physics',
    text: 'What is the resistance of a wire if a potential difference of 12V drives a current of 3A through it?',
    options: { A: '2 Ω', B: '4 Ω', C: '6 Ω', D: '36 Ω' },
    correctAnswer: 'B',
    explanation: 'Using Ohm\'s Law: R = V/I = 12/3 = 4 Ω.'
  },
  {
    id: 'phy-9', subject: 'Physics',
    text: 'The angle of incidence equals the angle of reflection. This is the law of:',
    options: { A: 'Refraction', B: 'Reflection', C: 'Diffraction', D: 'Interference' },
    correctAnswer: 'B',
    explanation: 'The law of reflection states that the angle of incidence equals the angle of reflection, measured from the normal.'
  },
  {
    id: 'phy-10', subject: 'Physics',
    text: 'The speed of light in a vacuum is approximately:',
    options: { A: '3 × 10⁶ m/s', B: '3 × 10⁸ m/s', C: '3 × 10¹⁰ m/s', D: '3 × 10⁴ m/s' },
    correctAnswer: 'B',
    explanation: 'The speed of light in a vacuum is approximately 3 × 10⁸ m/s (300,000,000 m/s).'
  },
  {
    id: 'phy-11', subject: 'Physics',
    text: 'A transformer is used to:',
    options: { A: 'Convert AC to DC', B: 'Store electrical energy', C: 'Step up or step down voltage', D: 'Measure current' },
    correctAnswer: 'C',
    explanation: 'A transformer is used to step up (increase) or step down (decrease) AC voltage levels.'
  },
  {
    id: 'phy-12', subject: 'Physics',
    text: 'The unit of electrical power is:',
    options: { A: 'Volt', B: 'Ampere', C: 'Watt', D: 'Ohm' },
    correctAnswer: 'C',
    explanation: 'The Watt (W) is the SI unit of power. P = IV = I²R = V²/R.'
  },
  {
    id: 'phy-13', subject: 'Physics',
    text: 'Which type of wave requires a medium for propagation?',
    options: { A: 'Electromagnetic wave', B: 'Light wave', C: 'Mechanical wave', D: 'Radio wave' },
    correctAnswer: 'C',
    explanation: 'Mechanical waves (like sound waves) require a material medium for propagation, unlike electromagnetic waves.'
  },
  {
    id: 'phy-14', subject: 'Physics',
    text: 'The principle of conservation of energy states that energy:',
    options: { A: 'Can be created', B: 'Can be destroyed', C: 'Can neither be created nor destroyed', D: 'Only exists as kinetic energy' },
    correctAnswer: 'C',
    explanation: 'The law of conservation of energy states that energy cannot be created or destroyed, only transformed from one form to another.'
  },
  {
    id: 'phy-15', subject: 'Physics',
    text: 'What is the period of a wave with frequency 50 Hz?',
    options: { A: '0.02 s', B: '0.2 s', C: '50 s', D: '0.5 s' },
    correctAnswer: 'A',
    explanation: 'Period T = 1/f = 1/50 = 0.02 seconds.'
  },
  {
    id: 'phy-16', subject: 'Physics',
    text: 'The instrument used to measure atmospheric pressure is:',
    options: { A: 'Thermometer', B: 'Barometer', C: 'Ammeter', D: 'Voltmeter' },
    correctAnswer: 'B',
    explanation: 'A barometer measures atmospheric pressure. Mercury barometers and aneroid barometers are common types.'
  },
  {
    id: 'phy-17', subject: 'Physics',
    text: 'Which of these is NOT a type of electromagnetic radiation?',
    options: { A: 'X-rays', B: 'Sound waves', C: 'Gamma rays', D: 'Microwaves' },
    correctAnswer: 'B',
    explanation: 'Sound waves are mechanical waves, not electromagnetic. They require a medium to travel through.'
  },
  {
    id: 'phy-18', subject: 'Physics',
    text: 'The momentum of a 4 kg object moving at 3 m/s is:',
    options: { A: '7 kg·m/s', B: '12 kg·m/s', C: '1.33 kg·m/s', D: '0.75 kg·m/s' },
    correctAnswer: 'B',
    explanation: 'Momentum = mass × velocity = 4 × 3 = 12 kg·m/s.'
  },
  {
    id: 'phy-19', subject: 'Physics',
    text: 'Nuclear fission involves:',
    options: { A: 'Combining light nuclei', B: 'Splitting heavy nuclei', C: 'Converting matter to antimatter', D: 'Electron capture' },
    correctAnswer: 'B',
    explanation: 'Nuclear fission is the process of splitting a heavy atomic nucleus into smaller nuclei, releasing large amounts of energy.'
  },
  {
    id: 'phy-20', subject: 'Physics',
    text: 'A concave mirror produces a _____ image when the object is beyond the center of curvature.',
    options: { A: 'Virtual and enlarged', B: 'Real and diminished', C: 'Virtual and diminished', D: 'Real and enlarged' },
    correctAnswer: 'B',
    explanation: 'When an object is beyond C (center of curvature) of a concave mirror, the image formed is real, inverted, and diminished.'
  },
  {
    id: 'phy-21', subject: 'Physics',
    text: 'The specific heat capacity of water is approximately:',
    options: { A: '4200 J/kg°C', B: '2100 J/kg°C', C: '420 J/kg°C', D: '42000 J/kg°C' },
    correctAnswer: 'A',
    explanation: 'The specific heat capacity of water is approximately 4200 J/kg°C or 4.2 kJ/kg°C.'
  },
  {
    id: 'phy-22', subject: 'Physics',
    text: 'Archimedes\' principle relates to:',
    options: { A: 'Gravitational force', B: 'Upthrust in fluids', C: 'Electromagnetic induction', D: 'Nuclear energy' },
    correctAnswer: 'B',
    explanation: 'Archimedes\' principle states that an object immersed in a fluid experiences an upthrust equal to the weight of fluid displaced.'
  },
  {
    id: 'phy-23', subject: 'Physics',
    text: 'The velocity of a body moving in a circle changes continuously because:',
    options: { A: 'Its speed changes', B: 'Its direction changes', C: 'It decelerates', D: 'It accelerates linearly' },
    correctAnswer: 'B',
    explanation: 'In circular motion, even if speed is constant, the direction of motion continuously changes, so velocity (a vector) changes.'
  },
  {
    id: 'phy-24', subject: 'Physics',
    text: 'The refractive index of a medium is 1.5. What is the speed of light in this medium? (c = 3 × 10⁸ m/s)',
    options: { A: '4.5 × 10⁸ m/s', B: '2 × 10⁸ m/s', C: '1.5 × 10⁸ m/s', D: '3 × 10⁸ m/s' },
    correctAnswer: 'B',
    explanation: 'Refractive index n = c/v, so v = c/n = 3 × 10⁸ / 1.5 = 2 × 10⁸ m/s.'
  },
  {
    id: 'phy-25', subject: 'Physics',
    text: 'The dimension of pressure is:',
    options: { A: 'MLT⁻²', B: 'ML⁻¹T⁻²', C: 'ML²T⁻²', D: 'ML⁻²T⁻²' },
    correctAnswer: 'B',
    explanation: 'Pressure = Force/Area = (MLT⁻²)/(L²) = ML⁻¹T⁻².'
  },
  {
    id: 'phy-26', subject: 'Physics',
    text: 'In a series circuit, the total resistance is:',
    options: { A: 'Less than the smallest resistance', B: 'Equal to the largest resistance', C: 'The sum of all resistances', D: 'The product divided by sum' },
    correctAnswer: 'C',
    explanation: 'In a series circuit, total resistance R = R₁ + R₂ + R₃ + ... The resistances add up directly.'
  },
  {
    id: 'phy-27', subject: 'Physics',
    text: 'The half-life of a radioactive substance is 4 days. What fraction remains after 12 days?',
    options: { A: '1/4', B: '1/8', C: '1/16', D: '1/2' },
    correctAnswer: 'B',
    explanation: 'Number of half-lives = 12/4 = 3. Fraction remaining = (1/2)³ = 1/8.'
  },
  {
    id: 'phy-28', subject: 'Physics',
    text: 'An object is in equilibrium when:',
    options: { A: 'It moves with constant velocity', B: 'Net force on it is zero', C: 'Both A and B', D: 'It has maximum acceleration' },
    correctAnswer: 'C',
    explanation: 'An object is in equilibrium when the net force is zero. It can be stationary or moving with constant velocity (no acceleration).'
  },
  {
    id: 'phy-29', subject: 'Physics',
    text: 'The phenomenon where a nucleus emits an alpha particle is called:',
    options: { A: 'Alpha decay', B: 'Beta decay', C: 'Gamma radiation', D: 'Nuclear fusion' },
    correctAnswer: 'A',
    explanation: 'Alpha decay is a type of radioactive decay where an atomic nucleus emits an alpha particle (2 protons + 2 neutrons).'
  },
  {
    id: 'phy-30', subject: 'Physics',
    text: 'What is the kinetic energy of a 2 kg body moving at 10 m/s?',
    options: { A: '20 J', B: '100 J', C: '200 J', D: '50 J' },
    correctAnswer: 'B',
    explanation: 'KE = ½mv² = ½ × 2 × 10² = ½ × 2 × 100 = 100 J.'
  },
  {
    id: 'phy-31', subject: 'Physics',
    text: 'Total internal reflection occurs when light travels from:',
    options: { A: 'A less dense to a denser medium', B: 'A denser to a less dense medium', C: 'Vacuum to glass', D: 'Air to water' },
    correctAnswer: 'B',
    explanation: 'Total internal reflection occurs when light travels from a denser to a less dense medium at an angle greater than the critical angle.'
  },
  {
    id: 'phy-32', subject: 'Physics',
    text: "Lenz's law is a consequence of the conservation of:",
    options: { A: 'Charge', B: 'Momentum', C: 'Energy', D: 'Mass' },
    correctAnswer: 'C',
    explanation: "Lenz's law states that induced current opposes the change causing it, which is a consequence of the conservation of energy."
  },
  {
    id: 'phy-33', subject: 'Physics',
    text: 'The escape velocity of a body from the earth depends on:',
    options: { A: 'Mass of the body', B: 'Mass of the earth', C: 'Direction of projection', D: 'Shape of the body' },
    correctAnswer: 'B',
    explanation: 'Escape velocity depends on the mass and radius of the planet, not on the mass of the escaping body. v = √(2GM/R).'
  },
  {
    id: 'phy-34', subject: 'Physics',
    text: 'The efficiency of a machine is always:',
    options: { A: 'Greater than 100%', B: 'Equal to 100%', C: 'Less than 100%', D: 'Zero' },
    correctAnswer: 'C',
    explanation: 'Due to friction and other losses, the efficiency of a real machine is always less than 100%.'
  },
  {
    id: 'phy-35', subject: 'Physics',
    text: 'The image formed by a plane mirror is:',
    options: { A: 'Real and inverted', B: 'Virtual and erect', C: 'Real and erect', D: 'Virtual and inverted' },
    correctAnswer: 'B',
    explanation: 'A plane mirror always forms a virtual, erect, and laterally inverted image of the same size as the object.'
  },
  {
    id: 'phy-36', subject: 'Physics',
    text: 'The phenomenon of splitting white light into its component colors is called:',
    options: { A: 'Reflection', B: 'Refraction', C: 'Dispersion', D: 'Diffraction' },
    correctAnswer: 'C',
    explanation: 'Dispersion is the separation of white light into its constituent colors (spectrum) when it passes through a prism.'
  },
  {
    id: 'phy-37', subject: 'Physics',
    text: 'A body weighs 100 N on Earth. On the Moon (g_moon = g/6), it would weigh approximately:',
    options: { A: '600 N', B: '100 N', C: '16.67 N', D: '50 N' },
    correctAnswer: 'C',
    explanation: 'Weight on Moon = Weight on Earth / 6 = 100 / 6 ≈ 16.67 N. Mass remains constant, but weight depends on gravity.'
  },
  {
    id: 'phy-38', subject: 'Physics',
    text: 'The frequency of the fundamental note produced by a vibrating string depends on:',
    options: { A: 'Length, tension, and mass per unit length', B: 'Color of the string', C: 'Temperature only', D: 'Humidity only' },
    correctAnswer: 'A',
    explanation: 'The fundamental frequency f = (1/2L)√(T/μ), where L is length, T is tension, and μ is mass per unit length.'
  },
  {
    id: 'phy-39', subject: 'Physics',
    text: 'The process by which heat is transferred through a solid is called:',
    options: { A: 'Convection', B: 'Radiation', C: 'Conduction', D: 'Evaporation' },
    correctAnswer: 'C',
    explanation: 'Conduction is the transfer of heat through a solid material from particle to particle without bulk movement of the material.'
  },
  {
    id: 'phy-40', subject: 'Physics',
    text: "Coulomb's law states that the force between two point charges is:",
    options: { A: 'Directly proportional to the distance between them', B: 'Inversely proportional to the square of the distance', C: 'Independent of the charges', D: 'Always repulsive' },
    correctAnswer: 'B',
    explanation: "Coulomb's law: F = kq₁q₂/r². The force is inversely proportional to the square of the distance between the charges."
  }
];
