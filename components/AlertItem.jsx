import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../constants/theme';

export default function AlertItem({ alert, dark }) {
  const bg = dark ? colors.backgroundDark : colors.background;
  const border = dark ? colors.borderDark : '#E5E5E5';
  const text = dark ? colors.textPrimaryDark : colors.textPrimary;
  const muted = dark ? colors.textSecondaryDark : colors.textSecondary;

  const accentColor = {
    critical: colors.danger,
    warning: colors.warning,
    info: dark ? colors.textSecondaryDark : colors.textSecondary,
  }[alert.type] || colors.textSecondary;

  return (
    <View style={[styles.item, { backgroundColor: bg, borderBottomColor: border, borderLeftColor: accentColor }]}>
      <View style={styles.row}>
        <Text style={[styles.title, { color: text }]}>{alert.title}</Text>
        <Text style={[styles.time, { color: muted }]}>{alert.time}</Text>
      </View>
      <Text style={[styles.description, { color: muted }]}>{alert.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderLeftWidth: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: '800',
    letterSpacing: 0.5,
    flex: 1,
  },
  time: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  description: {
    fontSize: fontSize.sm,
    fontWeight: '400',
  },
});