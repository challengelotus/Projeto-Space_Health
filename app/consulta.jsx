import { View, Text } from 'react-native';
import { colors } from '../constants/theme';

export default function Home() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: colors.textPrimary }}>Home</Text>
    </View>
  );
}