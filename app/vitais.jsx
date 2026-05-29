import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';
import Svg, { Polyline, Line, Text as SvgText, Rect } from 'react-native-svg';
import { useMission } from '../context/MissionContext';
import { colors, spacing, fontSize } from '../constants/theme';
import { vitalsHistory } from '../data/mockData';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CHART_WIDTH = SCREEN_WIDTH - spacing.md * 2;
const CHART_HEIGHT = 200;
const PAD = { top: 16, bottom: 36, left: 40, right: 12 };

const METRICS = [
  { key: 'heartRate', label: 'FREQ. CARDÍACA', unit: 'BPM' },
  { key: 'oxygen', label: 'SPO2', unit: '%' },
  { key: 'temperature', label: 'TEMP. CORPORAL', unit: '°C' },
  { key: 'radiation', label: 'RADIAÇÃO', unit: 'MSV/H' },
];

function LineGraph({ data, color, darkMode }) {
  const values = data.map(d => d.y);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;

  const w = CHART_WIDTH - PAD.left - PAD.right;
  const h = CHART_HEIGHT - PAD.top - PAD.bottom;

  const toX = i => PAD.left + (i / (data.length - 1)) * w;
  const toY = v => PAD.top + h - ((v - minVal) / range) * h;

  const points = data.map((d, i) => `${toX(i)},${toY(d.y)}`).join(' ');

  const gridLines = 4;
  const gridColor = darkMode ? '#222222' : '#F0F0F0';
  const labelColor = darkMode ? '#666666' : '#999999';
  const bgColor = darkMode ? '#000000' : '#FFFFFF';

  return (
    <Svg width={CHART_WIDTH} height={CHART_HEIGHT} style={{ backgroundColor: bgColor }}>
      {/* Grid lines */}
      {Array.from({ length: gridLines }).map((_, i) => {
        const y = PAD.top + (i / (gridLines - 1)) * h;
        const val = (maxVal - (i / (gridLines - 1)) * range).toFixed(1);
        return (
          <Line
            key={i}
            x1={PAD.left}
            y1={y}
            x2={CHART_WIDTH - PAD.right}
            y2={y}
            stroke={gridColor}
            strokeWidth={1}
          />
        );
      })}

      {/* Y axis labels */}
      {Array.from({ length: gridLines }).map((_, i) => {
        const y = PAD.top + (i / (gridLines - 1)) * h;
        const val = (maxVal - (i / (gridLines - 1)) * range).toFixed(1);
        return (
          <SvgText
            key={i}
            x={PAD.left - 4}
            y={y + 4}
            fontSize={9}
            fill={labelColor}
            textAnchor="end"
            fontWeight="600"
          >
            {val}
          </SvgText>
        );
      })}

      {/* X axis labels */}
      {data.map((d, i) => {
        if (i % 2 !== 0) return null;
        return (
          <SvgText
            key={i}
            x={toX(i)}
            y={CHART_HEIGHT - 6}
            fontSize={9}
            fill={labelColor}
            textAnchor="middle"
            fontWeight="600"
          >
            {d.label}
          </SvgText>
        );
      })}

      {/* Line */}
      <Polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2}
      />

      {/* Dots */}
      {data.map((d, i) => (
        <Rect
          key={i}
          x={toX(i) - 3}
          y={toY(d.y) - 3}
          width={6}
          height={6}
          fill={color}
        />
      ))}
    </Svg>
  );
}

export default function Vitais() {
  const { vitals, darkMode, mission } = useMission();
  const [selectedMetric, setSelectedMetric] = useState('heartRate');

  const bg = darkMode ? colors.backgroundDark : colors.background;
  const border = darkMode ? colors.borderDark : colors.border;
  const text = darkMode ? colors.textPrimaryDark : colors.textPrimary;
  const muted = darkMode ? colors.textSecondaryDark : colors.textSecondary;

  const currentMetric = METRICS.find(m => m.key === selectedMetric);
  const values = vitalsHistory.map(item => item[selectedMetric]);
  const chartData = vitalsHistory.map(item => ({
    y: item[selectedMetric],
    label: item.time,
  }));

  const min = Math.min(...values).toFixed(1);
  const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  const max = Math.max(...values).toFixed(1);
  const latest = vitals[selectedMetric]?.value ?? values[values.length - 1];

  const isRed = selectedMetric === 'heartRate' || selectedMetric === 'radiation';
  const lineColor = isRed ? colors.danger : (darkMode ? '#FFFFFF' : '#000000');

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]}>

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: border }]}>
        <View style={styles.headerTop}>
          <View style={[styles.badge, { backgroundColor: text }]}>
            <Text style={[styles.badgeText, { color: bg }]}>TELEMETRIA</Text>
          </View>
          <Text style={[styles.sol, { color: muted }]}>SOL {mission.sol}</Text>
        </View>
        <Text style={[styles.title, { color: text }]}>VITAIS / 24H</Text>
        <Text style={[styles.subtitle, { color: muted }]}>FLUXO BIOMÉTRICO CONTÍNUO</Text>
      </View>

      {/* Metrics selector */}
      <View style={[styles.metricsRow, { borderBottomColor: border }]}>
        {METRICS.map((metric, index) => {
          const isSelected = selectedMetric === metric.key;
          const val = vitals[metric.key]?.value ?? '—';
          return (
            <TouchableOpacity
              key={metric.key}
              style={[
                styles.metricCell,
                {
                  borderRightWidth: index < METRICS.length - 1 ? 1 : 0,
                  borderRightColor: border,
                  backgroundColor: isSelected ? text : 'transparent',
                },
              ]}
              onPress={() => setSelectedMetric(metric.key)}
            >
              <Text style={[styles.metricLabel, { color: isSelected ? bg : muted }]}>
                {metric.label}
              </Text>
              <Text style={[
                styles.metricValue,
                { color: isSelected ? bg : (metric.key === 'radiation' ? colors.danger : text) },
              ]}>
                {val}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Chart */}
      <View style={[styles.chartSection, { borderBottomColor: border }]}>
        <View style={styles.chartHeader}>
          <Text style={[styles.chartTitle, { color: text }]}>
            {currentMetric.label} STREAM
          </Text>
          <Text style={[styles.chartLatest, { color: muted }]}>
            último: {latest} {currentMetric.unit}
          </Text>
        </View>
        <View style={[styles.chartBox, { borderColor: border }]}>
          <LineGraph data={chartData} color={lineColor} darkMode={darkMode} />
        </View>
      </View>

      {/* Stats */}
      <View style={[styles.statsRow, { borderBottomColor: border }]}>
        {[
          { label: 'MÍN', value: min },
          { label: 'MÉD', value: avg },
          { label: 'MÁX', value: max },
        ].map((stat, index) => (
          <View
            key={stat.label}
            style={[
              styles.statCell,
              { borderRightWidth: index < 2 ? 1 : 0, borderRightColor: border },
            ]}
          >
            <Text style={[styles.statLabel, { color: muted }]}>{stat.label}</Text>
            <Text style={[styles.statValue, { color: text }]}>{stat.value}</Text>
          </View>
        ))}
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
  metricsRow: { flexDirection: 'row', borderBottomWidth: 1 },
  metricCell: { flex: 1, padding: spacing.sm },
  metricLabel: { fontSize: 9, fontWeight: '700', letterSpacing: 0.5, marginBottom: 4 },
  metricValue: { fontSize: fontSize.lg, fontWeight: '900' },
  chartSection: { borderBottomWidth: 1, padding: spacing.md },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  chartTitle: { fontSize: fontSize.xs, fontWeight: '800', letterSpacing: 1 },
  chartLatest: { fontSize: fontSize.xs, fontWeight: '600' },
  chartBox: { borderWidth: 1, overflow: 'hidden' },
  statsRow: { flexDirection: 'row', borderBottomWidth: 1 },
  statCell: { flex: 1, padding: spacing.md },
  statLabel: { fontSize: fontSize.xs, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
  statValue: { fontSize: fontSize.xl, fontWeight: '900' },
});