import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useMission } from '../context/MissionContext';
import { colors, spacing, fontSize } from '../constants/theme';

export default function Perfil() {
  const { crew, consultations, darkMode, toggleDarkMode, mission } = useMission();

  const member = crew[0];

  const bg = darkMode ? colors.backgroundDark : colors.background;
  const border = darkMode ? colors.borderDark : colors.border;
  const text = darkMode ? colors.textPrimaryDark : colors.textPrimary;
  const muted = darkMode ? colors.textSecondaryDark : colors.textSecondary;

  const rows = [
    { label: 'ID DA TRIPULAÇÃO', value: member.crewId },
    { label: 'FUNÇÃO', value: member.role },
    { label: 'IDADE', value: String(member.age) },
    { label: 'TIPO SANGUÍNEO', value: member.bloodType },
    { label: 'CONTATO EMERGÊNCIA', value: member.emergencyContact },
    { label: 'MISSÃO ATIVA', value: member.mission },
    { label: 'SINAL DE CHAMADA', value: mission.callsign },
    { label: 'SOL', value: String(mission.sol) },
    { label: 'CONSULTAS REGISTRADAS', value: String(consultations.length) },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]}>

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: border }]}>
        <View style={styles.headerTop}>
          <View style={[styles.badge, { backgroundColor: text }]}>
            <Text style={[styles.badgeText, { color: bg }]}>PESSOAL</Text>
          </View>
          <Text style={[styles.sol, { color: muted }]}>SOL {mission.sol}</Text>
        </View>
        <Text style={[styles.title, { color: text }]}>{member.name}</Text>
        <Text style={[styles.subtitle, { color: muted }]}>{member.role}</Text>
      </View>

      {/* Data rows */}
      <View style={[styles.dataBlock, { borderColor: border }]}>
        {rows.map((row, index) => (
          <View
            key={row.label}
            style={[
              styles.dataRow,
              {
                borderBottomWidth: index < rows.length - 1 ? 1 : 0,
                borderBottomColor: border,
              },
            ]}
          >
            <Text style={[styles.dataLabel, { color: muted }]}>{row.label}</Text>
            <Text style={[styles.dataValue, { color: text }]}>{row.value}</Text>
          </View>
        ))}
      </View>

      {/* Theme toggle */}
      <View style={[styles.themeBlock, { borderColor: border }]}>
        <View style={styles.themeInfo}>
          <Text style={[styles.themeTitle, { color: text }]}>MODO DE EXIBIÇÃO</Text>
          <Text style={[styles.themeSub, { color: muted }]}>
            SALVO LOCALMENTE — ASYNCSTORAGE
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.themeBtn, { backgroundColor: text }]}
          onPress={toggleDarkMode}
        >
          <Text style={[styles.themeBtnText, { color: bg }]}>
            {darkMode ? 'MODO CLARO' : 'MODO ESCURO'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Mission statement */}
      <View style={[styles.statementBlock, { backgroundColor: darkMode ? '#0A0A0A' : '#000000' }]}>
        <Text style={styles.statementLabel}>DECLARAÇÃO DA MISSÃO</Text>
        <Text style={styles.statementText}>
          Orbital Med integra biossensores, dosímetros de radiação e uplink médico
          em uma única interface para turistas e tripulação em missões orbitais e
          lunares — alinhada aos ODS 3 (Saúde e Bem-Estar) e 9 (Indústria,
          Inovação e Infraestrutura) da ONU.
        </Text>
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
  dataBlock: { borderWidth: 1, margin: spacing.md },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  dataLabel: { fontSize: fontSize.xs, fontWeight: '700', letterSpacing: 1 },
  dataValue: { fontSize: fontSize.sm, fontWeight: '700', letterSpacing: 0.5, textAlign: 'right', flex: 1, marginLeft: spacing.md },
  themeBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  themeInfo: { flex: 1 },
  themeTitle: { fontSize: fontSize.sm, fontWeight: '800', letterSpacing: 0.5, marginBottom: 4 },
  themeSub: { fontSize: fontSize.xs, fontWeight: '600', letterSpacing: 0.5 },
  themeBtn: { padding: spacing.md, marginLeft: spacing.md },
  themeBtnText: { fontSize: fontSize.xs, fontWeight: '800', letterSpacing: 1 },
  statementBlock: { margin: spacing.md, padding: spacing.md },
  statementLabel: { color: '#666666', fontSize: fontSize.xs, fontWeight: '700', letterSpacing: 1, marginBottom: spacing.sm },
  statementText: { color: '#FFFFFF', fontSize: fontSize.sm, lineHeight: 22 },
});