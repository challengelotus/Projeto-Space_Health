import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MissionProvider } from '../context/MissionContext';
import { colors } from '../constants/theme';

function TabIcon({ icon, label, focused, dark }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 18, opacity: focused ? 1 : 0.4 }}>{icon}</Text>
    </View>
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
                borderTopColor: '#333333',
                borderTopWidth: 1,
                height: 70,
                paddingBottom: 10,
                paddingTop: 8,
            },
            tabBarActiveTintColor: '#FFFFFF',
            tabBarInactiveTintColor: '#555555',
            tabBarLabelStyle: {
                fontSize: 10,
                fontWeight: '800',
                letterSpacing: 1,
                marginTop: 2,
            },
            tabBarStyle: {
                backgroundColor: colors.backgroundDark,
                borderTopColor: '#333333',
                borderTopWidth: 1,
                height: 52,
                paddingBottom: 0,
                paddingTop: 0,
                },
                tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: '800',
                letterSpacing: 1.5,
                },
                tabBarItemStyle: {
                borderRightWidth: 1,
                borderRightColor: '#333333',
                height: 52,
                justifyContent: 'center',
                alignItems: 'center',
                },
            }}
        >
          <Tabs.Screen
  name="index"
  options={{
    title: 'HOME',
    tabBarIcon: () => null,
  }}
/>
<Tabs.Screen
  name="vitais"
  options={{
    title: 'VITAIS',
    tabBarIcon: () => null,
  }}
/>
<Tabs.Screen
  name="consulta"
  options={{
    title: 'MED',
    tabBarIcon: () => null,
  }}
/>
<Tabs.Screen
  name="alertas"
  options={{
    title: 'ALERTAS',
    tabBarIcon: () => null,
  }}
/>
<Tabs.Screen
  name="perfil"
  options={{
    title: 'EQUIPE',
    tabBarIcon: () => null,
  }}
/>
          
        </Tabs>
      </MissionProvider>
    </SafeAreaProvider>
  );
}