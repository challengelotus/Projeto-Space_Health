import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useMission } from '../context/MissionContext';
import { colors, spacing, fontSize } from '../constants/theme';

const FILTERS = ['TODOS', 'CRÍTICO', 'ALERTA', 'INFO'];

export default function Alertas() {
  const { alerts, darkMode, mission } = useMission();
  const [activeFilter, setActiveFilter] = useState('TODOS');

  const bg = darkMode ? colors.backgroundDark : colors.background;
  const border = darkMode ? colors.borderDark : colors.border;
  const text = darkMode ? colors.textPrimaryDark : colors.textPrimary;
  const muted = darkMode ? colors.textSecondaryDark : colors.textSecondary;

  const typeMap = {
    'TODOS': null,
    'CRÍTICO': 'critical',
    'ALERTA': 'warning',
    'INFO': 'info',
  };

  const filtered = activeFilter === 'TODOS'
    ? alerts
    : alerts.filter(a => a.type === typeMap[activeFilter]);

  const counts = {
    'TODOS': alerts.length,
    'CRÍTICO': alerts.filter(a => a.type === 'critical').length,
    'ALERTA': alerts.filter(a => a.type === 'warning').length,
    'INFO': alerts.filter(a => a.type === 'info').length,
  };

  const accentColor = {
    critical: colors.danger,
    warning: colors.warning,
    info: darkMode ? '#555555' : '#CCCCCC',
    success: colors.success,
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]}>

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: border }]}>
        <View style={styles.headerTop}>
          <View style={[styles.badge, { backgroundColor: text }]}>
            <Text style={[styles.badgeText, { color: bg }]}>FEED DO SISTEMA</Text>
          </View>
          <Text style={[styles.sol, { color: muted }]}>SOL {mission.sol}</Text>
        </View>
        <Text style={[styles.title, { color: text }]}>ALERTAS DA MISSÃO</Text>
        <Text style={[styles.subtitle, { color: muted }]}>ORDENADO POR RECÊNCIA</Text>
      </View>

      {/* Filter tabs */}
      <View style={[styles.filterRow, { borderBottomColor: border }]}>
        {FILTERS.map((filter, index) => {
          const isActive = activeFilter === filter;
          return (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterCell,
                {
                  borderRightWidth: index < FILTERS.length - 1 ? 1 : 0,
                  borderRightColor: border,
                  backgroundColor: isActive ? text : 'transparent',
                },
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text style={[styles.filterLabel, { color: isActive ? bg : muted }]}>
                {filter}
              </Text>
              <Text style={[styles.filterCount, { color: isActive ? bg : text }]}>
                {counts[filter]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Alerts list */}
      <View style={[styles.list, { borderColor: border }]}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: muted }]}>NENHUM ALERTA NESTA CATEGORIA</Text>
          </View>
        ) : (
          filtered.map((alert, index) => (
            <View
              key={alert.id}
              style={[
                styles.alertItem,
                {
                  borderBottomWidth: index < filtered.length - 1 ? 1 : 0,
                  borderBottomColor: border,
                  borderLeftColor: accentColor[alert.type] || border,
                },
              ]}
            >
              <View style={styles.alertRow}>
                <Text style={[styles.alertTitle, { color: text }]}>{alert.title}</Text>
                <Text style={[styles.alertTime, { color: muted }]}>{alert.time}</Text>
              </View>
              <Text style={[styles.alertDesc, { color: muted }]}>{alert.description}</Text>
            </View>
          ))
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: spacing.md, paddingTop: 48, borderBottomWidth: 1 },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  badge: { paddingHorizontal: spacing.sm, paddingVertical: 3 },
  badgeText: { fontSize: fontSize.xs, fontWeight: '800', letterSpacing: 1 },
  sol: { fontSize: fontSize.sm, fontWeight: '700', letterSpacing: 1 },
  title: { fontSize: fontSize.xxl, fontWeight: '900', letterSpacing: -1, marginBottom: 4 },
  subtitle: { fontSize: fontSize.xs, fontWeight: '600', letterSpacing: 1.5 },
  filterRow: { flexDirection: 'row', borderBottomWidth: 1 },
  filterCell: { flex: 1, padding: spacing.sm, alignItems: 'center' },
  filterLabel: { fontSize: 9, fontWeight: '700', letterSpacing: 0.5, marginBottom: 4 },
  filterCount: { fontSize: fontSize.xl, fontWeight: '900' },
  list: { borderBottomWidth: 1 },
  alertItem: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderLeftWidth: 3,
  },
  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  alertTitle: { fontSize: fontSize.sm, fontWeight: '800', letterSpacing: 0.5, flex: 1 },
  alertTime: { fontSize: fontSize.sm, fontWeight: '600', marginLeft: spacing.sm },
  alertDesc: { fontSize: fontSize.sm, fontWeight: '400', lineHeight: 18 },
  empty: { padding: spacing.xl, alignItems: 'center' },
  emptyText: { fontSize: fontSize.xs, fontWeight: '700', letterSpacing: 1 },
});