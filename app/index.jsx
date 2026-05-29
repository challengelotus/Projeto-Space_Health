import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useMission } from '../context/MissionContext';
import { colors, spacing, fontSize } from '../constants/theme';

function SparkBar({ filled, color }) {
  return (
    <View style={{
      width: 8,
      height: filled ? 32 : Math.floor(Math.random() * 24) + 8,
      backgroundColor: filled ? color : color + '44',
      marginRight: 2,
    }} />
  );
}

function VitalBlock({ label, value, unit, dark, accentColor }) {
  const bg = dark ? '#1A1A1A' : '#FFFFFF';
  const border = dark ? colors.borderDark : colors.border;
  const text = dark ? colors.textPrimaryDark : colors.textPrimary;
  const muted = dark ? colors.textSecondaryDark : colors.textSecondary;
  const accent = accentColor || colors.danger;
  const bars = Array.from({ length: 14 }, (_, i) => i < 10);

  return (
    <View style={[styles.vitalBlock, { backgroundColor: bg, borderColor: border }]}>
      <Text style={[styles.vitalLabel, { color: muted }]}>{label}</Text>
      <View style={styles.vitalValueRow}>
        <Text style={[styles.vitalValue, { color: text }]}>{value}</Text>
        <Text style={[styles.vitalUnit, { color: muted }]}>{unit}</Text>
      </View>
      <View style={styles.sparkRow}>
        {bars.map((filled, i) => (
          <SparkBar key={i} filled={filled} color={accent} />
        ))}
      </View>
    </View>
  );
}

export default function Home() {
  const { mission, vitals, alerts, darkMode } = useMission();

  const bg = darkMode ? colors.backgroundDark : colors.background;
  const border = darkMode ? colors.borderDark : colors.border;
  const text = darkMode ? colors.textPrimaryDark : colors.textPrimary;
  const muted = darkMode ? colors.textSecondaryDark : colors.textSecondary;
  const surface = darkMode ? '#1A1A1A' : colors.surface;

  const criticalAlerts = alerts.filter(a => a.type === 'critical' || a.type === 'warning');

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]}>

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: border }]}>
        <View style={styles.headerTop}>
          <View style={[styles.badge, { backgroundColor: text }]}>
            <Text style={[styles.badgeText, { color: bg }]}>{mission.status}</Text>
          </View>
          <Text style={[styles.sol, { color: muted }]}>SOL {mission.sol}</Text>
        </View>
        <Text style={[styles.missionName, { color: text }]}>{mission.name}</Text>
        <Text style={[styles.missionSub, { color: muted }]}>
          {mission.callsign} • ÓRBITA {mission.orbit} • TRIPULAÇÃO {mission.crewCount}
        </Text>
      </View>

      {/* Live Telemetry */}
      <View style={[styles.section, { borderBottomColor: border }]}>
        <View style={styles.sectionHeader}>
          <View style={styles.liveRow}>
            <View style={styles.liveDot} />
            <Text style={[styles.sectionTitle, { color: muted }]}>TELEMETRIA AO VIVO</Text>
          </View>
        </View>

        <View style={[styles.vitalsGrid, { borderColor: border }]}>
          <View style={styles.vitalsRow}>
            <VitalBlock
              label="FREQ. CARDÍACA"
              value={vitals.heartRate.value}
              unit="BPM"
              dark={darkMode}
              accentColor={colors.danger}
            />
            <VitalBlock
              label="SPO2"
              value={vitals.oxygen.value}
              unit="%"
              dark={darkMode}
              accentColor={darkMode ? '#FFFFFF' : '#000000'}
            />
          </View>
          <View style={[styles.vitalsRow, { borderTopWidth: 1, borderTopColor: border }]}>
            <VitalBlock
              label="TEMP. CORPORAL"
              value={vitals.temperature.value}
              unit="°C"
              dark={darkMode}
              accentColor={darkMode ? '#FFFFFF' : '#000000'}
            />
            <VitalBlock
              label="RADIAÇÃO AMB."
              value={vitals.radiation.value}
              unit="MSV/H"
              dark={darkMode}
              accentColor={colors.danger}
            />
          </View>

          {/* Radiation bar */}
          <View style={[styles.radiationBlock, { borderTopWidth: 1, borderTopColor: border }]}>
            <Text style={[styles.vitalLabel, { color: muted }]}>RADIAÇÃO AMBIENTE</Text>
            <View style={styles.vitalValueRow}>
              <Text style={[styles.vitalValue, { color: text }]}>{vitals.radiation.value}</Text>
              <Text style={[styles.vitalUnit, { color: muted }]}>MSV/H</Text>
            </View>
            <View style={[styles.radBar, { backgroundColor: darkMode ? '#333' : '#E5E5E5' }]}>
              <View style={[styles.radFill, { width: `${(vitals.radiation.value / 0.5) * 100}%` }]} />
            </View>
            <Text style={[styles.threshold, { color: muted }]}>LIMITE DE CAUTELA: 0.50 MSV/H</Text>
          </View>
        </View>
      </View>

      {/* Critical Alerts */}
      <View style={[styles.section, { borderBottomColor: border }]}>
        <View style={styles.alertsHeader}>
          <View style={styles.alertsTitleRow}>
            <View style={styles.redSquare} />
            <Text style={[styles.sectionTitle, { color: text }]}>ALERTAS CRÍTICOS</Text>
          </View>
          <Text style={[styles.viewAll, { color: muted }]}>VER TODOS</Text>
        </View>

        {criticalAlerts.map(alert => {
          const accent = alert.type === 'critical' ? colors.danger : colors.warning;
          return (
            <View key={alert.id} style={[styles.alertItem, { borderBottomColor: border, borderLeftColor: accent }]}>
              <View style={styles.alertRow}>
                <Text style={[styles.alertTitle, { color: text }]}>{alert.title}</Text>
                <Text style={[styles.alertTime, { color: muted }]}>{alert.time}</Text>
              </View>
              <Text style={[styles.alertDesc, { color: muted }]}>{alert.description}</Text>
            </View>
          );
        })}
      </View>

      {/* Next Consult */}
      <View style={[styles.consultCard, { backgroundColor: darkMode ? '#0A0A0A' : '#000000' }]}>
        <Text style={styles.consultLabel}>PRÓXIMA CONSULTA MÉDICA</Text>
        <Text style={styles.consultTime}>HOJE / 14:30 UTC</Text>
        <View style={styles.doctorRow}>
          <View style={styles.doctorBadge}>
            <Text style={styles.doctorBadgeText}>MD</Text>
          </View>
          <View>
            <Text style={styles.doctorName}>Dr. Aris Thorne</Text>
            <Text style={styles.doctorSpec}>EXOBIOLOGIA / TRAUMA</Text>
          </View>
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: spacing.md,
    paddingTop: 48,
    borderBottomColor: 1,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: fontSize.xs,
    fontWeight: '800',
    letterSpacing: 1,
  },
  sol: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    letterSpacing: 1,
  },
  missionName: {
    fontSize: fontSize.xxl,
    fontWeight: '900',
    letterSpacing: -1,
    marginBottom: 4,
  },
  missionSub: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    letterSpacing: 1,
  },
  section: {
    borderBottomWidth: 1,
  },
  sectionHeader: {
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  liveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
  },
  sectionTitle: {
    fontSize: fontSize.xs,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  vitalsGrid: {
    borderWidth: 1,
    margin: spacing.md,
    marginTop: 0,
  },
  vitalsRow: {
    flexDirection: 'row',
  },
  vitalBlock: {
    flex: 1,
    padding: spacing.sm,
    borderRightWidth: 1,
  },
  vitalLabel: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  vitalValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
    marginBottom: spacing.sm,
  },
  vitalValue: {
    fontSize: fontSize.xl,
    fontWeight: '900',
  },
  vitalUnit: {
    fontSize: fontSize.xs,
    fontWeight: '700',
  },
  sparkRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 36,
  },
  radiationBlock: {
    padding: spacing.sm,
  },
  radBar: {
    height: 8,
    marginTop: spacing.sm,
    marginBottom: 4,
  },
  radFill: {
    height: '100%',
    backgroundColor: colors.danger,
  },
  threshold: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  alertsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  alertsTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  redSquare: {
    width: 10,
    height: 10,
    backgroundColor: colors.danger,
  },
  viewAll: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 1,
    textDecorationLine: 'underline',
  },
  alertItem: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderLeftWidth: 3,
  },
  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  alertTitle: {
    fontSize: fontSize.sm,
    fontWeight: '800',
    letterSpacing: 0.5,
    flex: 1,
  },
  alertTime: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  alertDesc: {
    fontSize: fontSize.sm,
  },
  consultCard: {
    margin: spacing.md,
    padding: spacing.md,
  },
  consultLabel: {
    color: '#666',
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  consultTime: {
    color: '#FFFFFF',
    fontSize: fontSize.xl,
    fontWeight: '900',
    letterSpacing: -1,
    marginBottom: spacing.md,
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  doctorBadge: {
    width: 48,
    height: 48,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorBadgeText: {
    color: '#FFFFFF',
    fontSize: fontSize.sm,
    fontWeight: '800',
  },
  doctorName: {
    color: '#FFFFFF',
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  doctorSpec: {
    color: '#666',
    fontSize: fontSize.xs,
    fontWeight: '600',
    letterSpacing: 1,
  },
});