import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMission } from '../context/MissionContext';
import { colors, spacing, fontSize } from '../constants/theme';

const SEVERITIES = ['ROTINA', 'URGENTE', 'CRÍTICO'];

export default function Consulta() {
  const { physicians, consultations, addConsultation, removeConsultation, darkMode, mission } = useMission();
  const [selectedPhysician, setSelectedPhysician] = useState(physicians[0]);
  const [selectedSeverity, setSelectedSeverity] = useState('ROTINA');
  const [submitted, setSubmitted] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  const { control, handleSubmit, reset, formState: { errors } } = useForm();

  const bg = darkMode ? colors.backgroundDark : colors.background;
  const border = darkMode ? colors.borderDark : colors.border;
  const text = darkMode ? colors.textPrimaryDark : colors.textPrimary;
  const muted = darkMode ? colors.textSecondaryDark : colors.textSecondary;
  const surface = darkMode ? '#1A1A1A' : colors.surface;

  function onSubmit(data) {
    addConsultation({
      physician: selectedPhysician.name,
      severity: selectedSeverity,
      symptoms: data.symptoms,
    });
    reset();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  function handleRemove(id) {
  setConfirmId(id);
}

function confirmRemove() {
  removeConsultation(confirmId);
  setConfirmId(null);
}

  return (
<View style={{ flex: 1 }}>

    {/* Modal brutalista */}
    {confirmId && (
      <View style={styles.modalOverlay}>
        <View style={[styles.modalBox, { backgroundColor: bg, borderColor: text }]}>
          <Text style={[styles.modalTitle, { color: text }]}>REMOVER CONSULTA</Text>
          <Text style={[styles.modalDesc, { color: muted }]}>
            CONFIRMAR REMOÇÃO DO REGISTRO? ESTA AÇÃO NÃO PODE SER DESFEITA.
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalBtn, { borderColor: border }]}
              onPress={() => setConfirmId(null)}
            >
              <Text style={[styles.modalBtnText, { color: muted }]}>CANCELAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: colors.danger, borderColor: colors.danger }]}
              onPress={confirmRemove}
            >
              <Text style={[styles.modalBtnText, { color: '#FFFFFF' }]}>REMOVER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )}



    <ScrollView style={[styles.container, { backgroundColor: bg }]}>

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: border }]}>
        <View style={styles.headerTop}>
          <View style={[styles.badge, { backgroundColor: text }]}>
            <Text style={[styles.badgeText, { color: bg }]}>TELEMEDICINA</Text>
          </View>
          <Text style={[styles.sol, { color: muted }]}>SOL {mission.sol}</Text>
        </View>
        <Text style={[styles.title, { color: text }]}>SOLICITAR MÉDICO</Text>
        <Text style={[styles.subtitle, { color: muted }]}>MÉDICOS EARTH-LINK</Text>
      </View>

      {/* Physicians */}
      <View style={[styles.section, { borderBottomColor: border }]}>
        <Text style={[styles.sectionLabel, { color: muted }]}>MÉDICOS DISPONÍVEIS</Text>
        <View style={[styles.physiciansList, { borderColor: border }]}>
          {physicians.map((doc, index) => {
            const isSelected = selectedPhysician.id === doc.id;
            return (
              <TouchableOpacity
                key={doc.id}
                style={[
                  styles.physicianItem,
                  {
                    borderBottomWidth: index < physicians.length - 1 ? 1 : 0,
                    borderBottomColor: border,
                    backgroundColor: isSelected ? (darkMode ? '#1A1A1A' : '#F5F5F5') : 'transparent',
                  },
                ]}
                onPress={() => setSelectedPhysician(doc)}
              >
                <View style={styles.physicianInfo}>
                  <Text style={[styles.physicianName, { color: text }]}>{doc.name}</Text>
                  <Text style={[styles.physicianSpec, { color: muted }]}>
                    {doc.specialty} • {doc.station}
                  </Text>
                </View>
                <View style={[
                  styles.onlineBadge,
                  { backgroundColor: doc.online ? text : 'transparent', borderColor: border },
                ]}>
                  <Text style={[
                    styles.onlineBadgeText,
                    { color: doc.online ? bg : muted },
                  ]}>
                    {doc.online ? 'ONLINE' : 'OFFLINE'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Form */}
      <View style={[styles.section, { borderBottomColor: border }]}>
        <Text style={[styles.sectionLabel, { color: muted }]}>NOVA SOLICITAÇÃO</Text>

        {/* Physician display */}
        <Text style={[styles.fieldLabel, { color: muted }]}>MÉDICO DESIGNADO</Text>
        <View style={[styles.selectBox, { borderColor: border }]}>
          <Text style={[styles.selectText, { color: text }]}>
            {selectedPhysician.name} — {selectedPhysician.specialty}
          </Text>
        </View>

        {/* Severity */}
        <Text style={[styles.fieldLabel, { color: muted }]}>SEVERIDADE</Text>
        <View style={[styles.severityRow, { borderColor: border }]}>
          {SEVERITIES.map((sev, index) => {
            const isSelected = selectedSeverity === sev;
            return (
              <TouchableOpacity
                key={sev}
                style={[
                  styles.severityBtn,
                  {
                    backgroundColor: isSelected ? text : 'transparent',
                    borderRightWidth: index < SEVERITIES.length - 1 ? 1 : 0,
                    borderRightColor: border,
                  },
                ]}
                onPress={() => setSelectedSeverity(sev)}
              >
                <Text style={[
                  styles.severityText,
                  { color: isSelected ? bg : muted },
                ]}>
                  {sev}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Symptoms */}
        <Text style={[styles.fieldLabel, { color: muted }]}>SINTOMAS (10–500 CHARS)</Text>
        <Controller
          control={control}
          name="symptoms"
          rules={{
            required: 'Campo obrigatório',
            minLength: { value: 10, message: 'Mínimo 10 caracteres' },
            maxLength: { value: 500, message: 'Máximo 500 caracteres' },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[
                styles.textArea,
                {
                  borderColor: errors.symptoms ? colors.danger : border,
                  color: text,
                  backgroundColor: bg,
                },
              ]}
              placeholder="DESCREVER ANOMALIA..."
              placeholderTextColor={muted}
              multiline
              numberOfLines={5}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.symptoms && (
          <Text style={styles.errorText}>{errors.symptoms.message}</Text>
        )}

        {/* Submit */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.submitText}>ENVIAR SOLICITAÇÃO →</Text>
        </TouchableOpacity>

        {/* Success toast */}
        {submitted && (
          <View style={styles.toast}>
            <Text style={styles.toastText}>✓ Solicitação transmitida — {selectedPhysician.name}</Text>
          </View>
        )}
      </View>

      {/* Request log */}
      <View style={[styles.section, { borderBottomColor: border }]}>
        <Text style={[styles.sectionLabel, { color: muted }]}>
          LOG DE SOLICITAÇÕES ({consultations.length})
        </Text>

        {consultations.length === 0 ? (
          <View style={[styles.emptyBox, { borderColor: border }]}>
            <Text style={[styles.emptyText, { color: muted }]}>NENHUMA CONSULTA TRANSMITIDA</Text>
          </View>
        ) : (
          <View style={[styles.logList, { borderColor: border }]}>
            {consultations.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.logItem,
                  {
                    borderBottomWidth: index < consultations.length - 1 ? 1 : 0,
                    borderBottomColor: border,
                    borderLeftColor: item.severity === 'CRÍTICO'
                      ? colors.danger
                      : item.severity === 'URGENTE'
                      ? colors.warning
                      : border,
                  },
                ]}
              >
                <View style={styles.logHeader}>
                  <Text style={[styles.logDoctor, { color: text }]}>{item.physician}</Text>
                  <TouchableOpacity onPress={() => handleRemove(item.id)}>
                    <View style={[styles.deleteBtn, { borderColor: border }]}>
                      <Text style={[styles.deleteText, { color: muted }]}>✕</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <Text style={[styles.logSeverity, { color: muted }]}>{item.severity}</Text>
                <Text style={[styles.logSymptoms, { color: text }]}>{item.symptoms}</Text>
                <Text style={[styles.logDate, { color: muted }]}>{item.date}, {item.time}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

    </ScrollView>

  </View>
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
  section: { padding: spacing.md, borderBottomWidth: 1 },
  sectionLabel: { fontSize: fontSize.xs, fontWeight: '800', letterSpacing: 1.5, marginBottom: spacing.md },
  physiciansList: { borderWidth: 1 },
  physicianItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  physicianInfo: { flex: 1 },
  physicianName: { fontSize: fontSize.sm, fontWeight: '800', letterSpacing: 0.5, marginBottom: 2 },
  physicianSpec: { fontSize: fontSize.xs, fontWeight: '600', letterSpacing: 0.5 },
  onlineBadge: { borderWidth: 1, paddingHorizontal: spacing.sm, paddingVertical: 3 },
  onlineBadgeText: { fontSize: fontSize.xs, fontWeight: '800', letterSpacing: 1 },
  fieldLabel: { fontSize: fontSize.xs, fontWeight: '700', letterSpacing: 1, marginBottom: spacing.xs, marginTop: spacing.md },
  selectBox: { borderWidth: 1, padding: spacing.md },
  selectText: { fontSize: fontSize.sm, fontWeight: '700' },
  severityRow: { flexDirection: 'row', borderWidth: 1 },
  severityBtn: { flex: 1, padding: spacing.md, alignItems: 'center' },
  severityText: { fontSize: fontSize.xs, fontWeight: '800', letterSpacing: 1 },
  textArea: { borderWidth: 1, padding: spacing.md, minHeight: 100, textAlignVertical: 'top', fontSize: fontSize.sm, fontWeight: '600' },
  errorText: { color: colors.danger, fontSize: fontSize.xs, fontWeight: '700', marginTop: 4 },
  submitBtn: { backgroundColor: colors.danger, padding: spacing.md, alignItems: 'center', marginTop: spacing.md },
  submitText: { color: '#FFFFFF', fontSize: fontSize.sm, fontWeight: '800', letterSpacing: 1 },
  toast: { backgroundColor: '#000000', padding: spacing.md, marginTop: spacing.md, flexDirection: 'row', alignItems: 'center' },
  toastText: { color: '#FFFFFF', fontSize: fontSize.xs, fontWeight: '700' },
  emptyBox: { borderWidth: 1, borderStyle: 'dashed', padding: spacing.xl, alignItems: 'center' },
  emptyText: { fontSize: fontSize.xs, fontWeight: '700', letterSpacing: 1 },
  logList: { borderWidth: 1 },
  logItem: { padding: spacing.md, borderLeftWidth: 3 },
  logHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  logDoctor: { fontSize: fontSize.sm, fontWeight: '800', letterSpacing: 0.5 },
  deleteBtn: { borderWidth: 1, width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  deleteText: { fontSize: fontSize.xs, fontWeight: '700' },
  logSeverity: { fontSize: fontSize.xs, fontWeight: '700', letterSpacing: 1, marginBottom: 4 },
  logSymptoms: { fontSize: fontSize.sm, marginBottom: 4 },
  logDate: { fontSize: fontSize.xs, fontWeight: '600' },
  modalOverlay: {
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.7)',
  zIndex: 99,
  alignItems: 'center',
  justifyContent: 'center',
  padding: spacing.lg,
},
modalBox: {
  width: '100%',
  borderWidth: 2,
  padding: spacing.lg,
},
modalTitle: {
  fontSize: fontSize.lg,
  fontWeight: '900',
  letterSpacing: 1,
  marginBottom: spacing.sm,
},
modalDesc: {
  fontSize: fontSize.sm,
  fontWeight: '600',
  letterSpacing: 0.5,
  lineHeight: 20,
  marginBottom: spacing.lg,
},
modalButtons: {
  flexDirection: 'row',
  gap: spacing.sm,
},
modalBtn: {
  flex: 1,
  borderWidth: 1,
  padding: spacing.md,
  alignItems: 'center',
},
modalBtnText: {
  fontSize: fontSize.xs,
  fontWeight: '800',
  letterSpacing: 1,
},
});