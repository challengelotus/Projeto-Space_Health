import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../constants/theme';

export default function VitalCard({ label, value, unit, dark }) {
  const bg = dark ? colors.surfaceDark : colors.surface;
  const border = dark ? colors.borderDark : colors.border;
  const text = dark ? colors.textPrimaryDark : colors.textPrimary;
  const muted = dark ? colors.textSecondaryDark : colors.textSecondary;

  return (
    <View style={[styles.card, { backgroundColor: bg, borderColor: border }]}>
      <Text style={[styles.label, { color: muted }]}>{label}</Text>
      <View style={styles.valueRow}>
        <Text style={[styles.value, { color: text }]}>{value}</Text>
        <Text style={[styles.unit, { color: muted }]}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderWidth: 1,
    padding: spacing.sm,
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },
  value: {
    fontSize: fontSize.xl,
    fontWeight: '900',
  },
  unit: {
    fontSize: fontSize.xs,
    fontWeight: '700',
  },
});