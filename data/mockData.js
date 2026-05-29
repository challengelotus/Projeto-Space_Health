export const missionData = {
  name: 'Missão Artemis VII',
  destination: 'Estação Lunar Gateway',
  dayInMission: 12,
  totalDays: 180,
  status: 'Em órbita',
};

export const crewData = [
  {
    id: '1',
    name: 'Dra. Ana Souza',
    role: 'Comandante',
    initials: 'AS',
    status: 'Normal',
  },
  {
    id: '2',
    name: 'Dr. Carlos Lima',
    role: 'Médico de bordo',
    initials: 'CL',
    status: 'Normal',
  },
  {
    id: '3',
    name: 'Eng. Pedro Costa',
    role: 'Engenheiro',
    initials: 'PC',
    status: 'Atenção',
  },
  {
    id: '4',
    name: 'Dra. Julia Ferreira',
    role: 'Cientista',
    initials: 'JF',
    status: 'Normal',
  },
];

export const vitalsData = {
  heartRate: { value: 72, unit: 'bpm', min: 55, max: 95, label: 'Freq. Cardíaca' },
  oxygen: { value: 98, unit: '%', min: 95, max: 100, label: 'Saturação O₂' },
  pressure: { value: 120, unit: 'mmHg', min: 90, max: 140, label: 'Pressão Arterial' },
  temperature: { value: 36.7, unit: '°C', min: 36, max: 37.5, label: 'Temperatura' },
};

export const vitalsHistory = [
  { time: '08:00', heartRate: 68, oxygen: 98, pressure: 118, temperature: 36.5 },
  { time: '09:00', heartRate: 72, oxygen: 97, pressure: 120, temperature: 36.6 },
  { time: '10:00', heartRate: 75, oxygen: 98, pressure: 122, temperature: 36.7 },
  { time: '11:00', heartRate: 70, oxygen: 99, pressure: 119, temperature: 36.6 },
  { time: '12:00', heartRate: 73, oxygen: 98, pressure: 121, temperature: 36.8 },
  { time: '13:00', heartRate: 78, oxygen: 97, pressure: 125, temperature: 36.9 },
  { time: '14:00', heartRate: 74, oxygen: 98, pressure: 120, temperature: 36.7 },
];

export const alertsData = [
  {
    id: '1',
    type: 'danger',
    title: 'Freq. cardíaca elevada',
    description: 'Pedro Costa registrou 102 bpm por mais de 5 minutos.',
    time: '14:32',
    crew: 'Pedro Costa',
    resolved: false,
  },
  {
    id: '2',
    type: 'warning',
    title: 'Saturação O₂ abaixo do ideal',
    description: 'Julia Ferreira com 95% de saturação. Monitorar.',
    time: '13:15',
    crew: 'Julia Ferreira',
    resolved: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'Consulta agendada',
    description: 'Revisão médica de rotina — Ana Souza às 16:00.',
    time: '12:00',
    crew: 'Ana Souza',
    resolved: true,
  },
  {
    id: '4',
    type: 'success',
    title: 'Vitais normalizados',
    description: 'Carlos Lima com todos os indicadores dentro do esperado.',
    time: '11:45',
    crew: 'Carlos Lima',
    resolved: true,
  },
];