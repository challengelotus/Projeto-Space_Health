export const missionData = {
  name: 'MISSÃO ARES-X',
  callsign: 'ORBITAL-MED-04',
  orbit: '402KM',
  crewCount: 6,
  sol: 142,
  status: 'OPERACIONAL',
};

export const crewData = [
  {
    id: '1',
    name: 'CMDR. ELENA VANCE',
    role: 'ESPECIALISTA DE MISSÃO',
    crewId: 'X-9002-B',
    age: 38,
    bloodType: 'O+',
    emergencyContact: '+1 555 0142',
    mission: 'ARES-X',
  },
];

export const physiciansData = [
  {
    id: '1',
    name: 'DR. ARIS THORNE',
    specialty: 'EXOBIOLOGIA / TRAUMA',
    station: 'ESTAÇÃO TERRA ALPHA',
    online: true,
  },
  {
    id: '2',
    name: 'DRA. MEI KAWASAKI',
    specialty: 'CARDIOLOGIA MICROGRAVIDADE',
    station: 'ESTAÇÃO TERRA BETA',
    online: true,
  },
  {
    id: '3',
    name: 'DR. LUKAS ORTIZ',
    specialty: 'MEDICINA DE RADIAÇÃO',
    station: 'ESTAÇÃO TERRA ALPHA',
    online: false,
  },
];

export const vitalsData = {
  heartRate: { value: 72, unit: 'BPM', min: 55, max: 95, label: 'FREQ. CARDÍACA' },
  oxygen: { value: 98, unit: '%', min: 95, max: 100, label: 'SPO2' },
  temperature: { value: 36.7, unit: '°C', min: 36, max: 37.5, label: 'TEMP. CORPORAL' },
  radiation: { value: 0.34, unit: 'MSV/H', min: 0, max: 0.5, label: 'RADIAÇÃO' },
};

export const vitalsHistory = [
  { time: '08:00', heartRate: 68, oxygen: 98, temperature: 36.5, radiation: 0.30 },
  { time: '09:00', heartRate: 72, oxygen: 97, temperature: 36.6, radiation: 0.31 },
  { time: '10:00', heartRate: 75, oxygen: 98, temperature: 36.7, radiation: 0.33 },
  { time: '11:00', heartRate: 70, oxygen: 99, temperature: 36.6, radiation: 0.34 },
  { time: '12:00', heartRate: 73, oxygen: 98, temperature: 36.8, radiation: 0.34 },
  { time: '13:00', heartRate: 78, oxygen: 97, temperature: 36.9, radiation: 0.35 },
  { time: '14:00', heartRate: 74, oxygen: 98, temperature: 36.7, radiation: 0.34 },
];

export const alertsData = [
  {
    id: '1',
    type: 'critical',
    title: 'DESVIO DE PRESSÃO NA CABINE',
    description: 'Verificar vedação secundária no Setor 4',
    time: '04:12',
  },
  {
    id: '2',
    type: 'warning',
    title: 'FLUXO DE RADIAÇÃO ELEVADO',
    description: 'Dose 0.42 mSv/h — aumentar blindagem T+04:00',
    time: '03:58',
  },
  {
    id: '3',
    type: 'info',
    title: 'HIDRATAÇÃO PROGRAMADA',
    description: '400ml Solução Eletrolítica B',
    time: '03:45',
  },
  {
    id: '4',
    type: 'info',
    title: 'VARREDURA AUTOMÁTICA DE VITAIS',
    description: 'Todos os parâmetros dentro do intervalo nominal',
    time: '03:12',
  },
];