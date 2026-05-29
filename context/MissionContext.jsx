import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { missionData, crewData, vitalsData, alertsData } from '../data/mockData';

const MissionContext = createContext();

export function MissionProvider({ children }) {
  const [mission] = useState(missionData);
  const [crew] = useState(crewData);
  const [vitals, setVitals] = useState(vitalsData);
  const [alerts, setAlerts] = useState(alertsData);
  const [consultations, setConsultations] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  // Simula atualização do batimento cardíaco a cada 3s
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

  // Carrega consultas e tema salvos no AsyncStorage
  useEffect(() => {
    loadStoredData();
  }, []);

  async function loadStoredData() {
    try {
      const storedConsultations = await AsyncStorage.getItem('@consultations');
      if (storedConsultations) {
        setConsultations(JSON.parse(storedConsultations));
      }

      const storedTheme = await AsyncStorage.getItem('@darkMode');
      if (storedTheme !== null) {
        setDarkMode(JSON.parse(storedTheme));
      }
    } catch (error) {
      console.log('Erro ao carregar dados:', error);
    }
  }

  async function addConsultation(consultation) {
    try {
      const newConsultation = {
        ...consultation,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('pt-BR'),
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      const updated = [newConsultation, ...consultations];
      setConsultations(updated);
      await AsyncStorage.setItem('@consultations', JSON.stringify(updated));
    } catch (error) {
      console.log('Erro ao salvar consulta:', error);
    }
  }

  async function toggleDarkMode() {
    try {
      const newValue = !darkMode;
      setDarkMode(newValue);
      await AsyncStorage.setItem('@darkMode', JSON.stringify(newValue));
    } catch (error) {
      console.log('Erro ao salvar tema:', error);
    }
  }

  function resolveAlert(id) {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, resolved: true } : alert
      )
    );
  }

  return (
    <MissionContext.Provider
      value={{
        mission,
        crew,
        vitals,
        alerts,
        consultations,
        darkMode,
        addConsultation,
        toggleDarkMode,
        resolveAlert,
      }}
    >
      {children}
    </MissionContext.Provider>
  );
}

export function useMission() {
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error('useMission deve ser usado dentro de MissionProvider');
  }
  return context;
}