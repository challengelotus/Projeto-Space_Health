import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MissionProvider } from '../context/MissionContext';
import { colors } from '../constants/theme';

function TabIcon({ icon, focused }) {
  return (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.4 }}>{icon}</Text>
  );
}

export default function Layout() {
  return (
    <SafeAreaProvider>
      <MissionProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.backgroundDark,
              borderTopColor: colors.borderDark,
              height: 60,
              paddingBottom: 8,
            },
            tabBarActiveTintColor: colors.background,
            tabBarInactiveTintColor: '#555555',
            tabBarLabelStyle: {
              fontSize: 10,
              fontWeight: '800',
              letterSpacing: 1,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'HOME',
              tabBarIcon: ({ focused }) => <TabIcon icon="⌂" focused={focused} />,
            }}
          />
          <Tabs.Screen
            name="vitais"
            options={{
              title: 'VITAIS',
              tabBarIcon: ({ focused }) => <TabIcon icon="♥" focused={focused} />,
            }}
          />
          <Tabs.Screen
            name="consulta"
            options={{
              title: 'MED',
              tabBarIcon: ({ focused }) => <TabIcon icon="✚" focused={focused} />,
            }}
          />
          <Tabs.Screen
            name="alertas"
            options={{
              title: 'ALERTAS',
              tabBarIcon: ({ focused }) => <TabIcon icon="⚠" focused={focused} />,
            }}
          />
          <Tabs.Screen
            name="perfil"
            options={{
              title: 'EQUIPE',
              tabBarIcon: ({ focused }) => <TabIcon icon="◉" focused={focused} />,
            }}
          />
        </Tabs>
      </MissionProvider>
    </SafeAreaProvider>
  );
}