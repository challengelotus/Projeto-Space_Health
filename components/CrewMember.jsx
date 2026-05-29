import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../constants/theme';

export default function CrewMember({ member, dark }) {
  const bg = dark ? colors.backgroundDark : colors.background;
  const border = dark ? colors.borderDark : '#E5E5E5';
  const text = dark ? colors.textPrimaryDark : colors.textPrimary;
  const muted = dark ? colors.textSecondaryDark : colors.textMuted;

  return (
    <View style={[styles.row, { borderBottomColor: border }]}>
      <Text style={[styles.label, { color: muted }]}>{member.label}</Text>
      <Text style={[styles.value, { color: text }]}>{member.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 1,
  },
  value: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    letterSpacing: 0.5,
    textAlign: 'right',
    flex: 1,
    marginLeft: spacing.md,
  },
});