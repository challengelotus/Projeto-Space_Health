import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { missionData, crewData, vitalsData, alertsData, physiciansData } from '../data/mockData';

const MissionContext = createContext();

export function MissionProvider({ children }) {
  const [mission] = useState(missionData);
  const [crew] = useState(crewData);
  const [physicians] = useState(physiciansData);
  const [vitals, setVitals] = useState(vitalsData);
  const [alerts] = useState(alertsData);
  const [consultations, setConsultations] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => ({
        ...prev,
        heartRate: {
          ...prev.heartRate,
          value: Math.floor(Math.random() * (95 - 60 + 1)) + 60,
        },
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadStoredData();
  }, []);

  async function loadStoredData() {
    try {
      const storedConsultations = await AsyncStorage.getItem('@consultations');
      if (storedConsultations) setConsultations(JSON.parse(storedConsultations));

      const storedTheme = await AsyncStorage.getItem('@darkMode');
      if (storedTheme !== null) setDarkMode(JSON.parse(storedTheme));
    } catch (e) {
      console.log('Erro ao carregar dados:', e);
    }
  }

  async function addConsultation(consultation) {
    try {
      const newItem = {
        ...consultation,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('pt-BR'),
        time: new Date().toLocaleTimeString('pt-BR'),
      };
      const updated = [newItem, ...consultations];
      setConsultations(updated);
      await AsyncStorage.setItem('@consultations', JSON.stringify(updated));
    } catch (e) {
      console.log('Erro ao salvar consulta:', e);
    }
  }

  async function removeConsultation(id) {
    try {
      const updated = consultations.filter(c => c.id !== id);
      setConsultations(updated);
      await AsyncStorage.setItem('@consultations', JSON.stringify(updated));
    } catch (e) {
      console.log('Erro ao remover consulta:', e);
    }
  }

  async function toggleDarkMode() {
    try {
      const newValue = !darkMode;
      setDarkMode(newValue);
      await AsyncStorage.setItem('@darkMode', JSON.stringify(newValue));
    } catch (e) {
      console.log('Erro ao salvar tema:', e);
    }
  }

  return (
    <MissionContext.Provider value={{
      mission,
      crew,
      physicians,
      vitals,
      alerts,
      consultations,
      darkMode,
      addConsultation,
      removeConsultation,
      toggleDarkMode,
    }}>
      {children}
    </MissionContext.Provider>
  );
}

export function useMission() {
  const context = useContext(MissionContext);
  if (!context) throw new Error('useMission deve ser usado dentro de MissionProvider');
  return context;
}