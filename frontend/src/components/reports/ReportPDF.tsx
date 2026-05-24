'use client';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { MonthlyReport, calcFunFacts } from '@/src/lib/mockData';

interface ReportPDFProps {
  report: MonthlyReport;
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    paddingVertical: 32,
    fontFamily: 'Helvetica',
  },
  // Header
  header: {
    backgroundColor: '#1D9E75',
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 10,
    marginBottom: 4,
  },
  headerId: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 9,
    marginBottom: 4,
  },
  headerPeriod: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Seccion 2
  sectionResumen: {
    backgroundColor: '#F8FFFE',
    borderWidth: 1,
    borderColor: '#1D9E75',
    padding: 16,
  },
  sectionTitle: {
    color: '#1D9E75',
    fontSize: 9,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  grid4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    alignItems: 'flex-start',
  },
  colValue: {
    color: '#111827',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  colLabel: {
    color: '#6B7280',
    fontSize: 8,
  },
  // Seccion 3
  sectionTendencia: {
    marginTop: 16,
  },
  trendTable: {
    borderWidth: 1,
    borderColor: '#D1FAE5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  trendHeader: {
    flexDirection: 'row',
    backgroundColor: '#1D9E75',
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  trendHeaderCell: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  trendRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#D1FAE5',
  },
  trendRowEven: {
    backgroundColor: '#F0FDF4',
  },
  trendRowOdd: {
    backgroundColor: '#FFFFFF',
  },
  trendRowHighlight: {
    backgroundColor: '#DCFCE7',
  },
  trendCell: {
    fontSize: 9,
    color: '#374151',
  },
  trendCellGreen: {
    fontSize: 9,
    color: '#1D9E75',
    fontWeight: 'bold',
  },
  trendCellRed: {
    fontSize: 9,
    color: '#DC2626',
  },
  colW25: { width: '25%' },
  colW35: { width: '35%' },
  colW40: { width: '40%' },
  // Seccion 4
  sectionImpacto: {
    marginTop: 16,
    backgroundColor: '#F0FDF4',
    padding: 14,
    borderRadius: 6,
  },
  impactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  bullet: {
    color: '#1D9E75',
    fontSize: 10,
    marginRight: 6,
  },
  impactText: {
    fontSize: 10,
    color: '#374151',
  },
  // Seccion 5
  sectionFunFacts: {
    marginTop: 16,
  },
  grid2x2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  funFactCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  funFactValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  funFactDesc: {
    fontSize: 8,
    color: '#6B7280',
  },
  // Seccion 6
  sectionTecnicos: {
    marginTop: 16,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCellKey: {
    width: '30%',
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontSize: 9,
    color: '#374151',
  },
  tableCellValue: {
    width: '70%',
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontSize: 9,
    color: '#111827',
  },
  rowOdd: {
    backgroundColor: '#FFFFFF',
  },
  rowEven: {
    backgroundColor: '#F9FAFB',
  },
  // Seccion 7
  sectionIA: {
    marginTop: 12,
    backgroundColor: '#E8FAF0',
    padding: 12,
    borderRadius: 6,
    flexDirection: 'row',
  },
  aiText: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#065F46',
    flex: 1,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
  },
  footerText: {
    fontSize: 8,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default function ReportPDF({ report }: ReportPDFProps) {
  const facts = calcFunFacts(report.savingsCop);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* SECCIÓN 1 — Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image src="/icono_ecohome.png" style={styles.logoImage} />
            <Text style={styles.logoText}>EcoHome</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerTitle}>Reporte de Consumo Energético</Text>
            <Text style={styles.headerId}>ID: ECO-{report.id}</Text>
            <Text style={styles.headerPeriod}>{report.period}</Text>
          </View>
        </View>

        {/* SECCIÓN 2 — Resumen del mes */}
        <View style={styles.sectionResumen}>
          <Text style={styles.sectionTitle}>Resumen del Mes</Text>
          <View style={styles.grid4}>
            <View style={styles.col}>
              <Text style={styles.colValue}>{report.consumptionKwh} kWh</Text>
              <Text style={styles.colLabel}>Consumo Total</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.colValue}>${report.savingsCop.toLocaleString('es-CO')} COP</Text>
              <Text style={styles.colLabel}>Ahorro Logrado</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.colValue}>{report.treesSaved} árboles</Text>
              <Text style={styles.colLabel}>Impacto Natural</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.colValue}>{report.co2OffsetKg} kg</Text>
              <Text style={styles.colLabel}>CO₂ Compensado</Text>
            </View>
          </View>
        </View>

        {/* SECCIÓN 3 — Tendencia 6 meses */}
        <View style={styles.sectionTendencia}>
          <Text style={styles.sectionTitle}>Tendencia últimos 6 meses</Text>
          <View style={styles.trendTable}>
            {/* Encabezado */}
            <View style={styles.trendHeader}>
              <Text style={[styles.trendHeaderCell, styles.colW25]}>Mes</Text>
              <Text style={[styles.trendHeaderCell, styles.colW35]}>Consumo (kWh)</Text>
              <Text style={[styles.trendHeaderCell, styles.colW40]}>Vs. mes anterior</Text>
            </View>
            {/* Filas */}
            {report.monthlyTrend.map((t, idx) => {
              const isLast = idx === report.monthlyTrend.length - 1;
              const prev = report.monthlyTrend[idx - 1];
              const diff = prev ? t.kwh - prev.kwh : null;
              const rowStyle = isLast
                ? styles.trendRowHighlight
                : idx % 2 === 0 ? styles.trendRowOdd : styles.trendRowEven;
              return (
                <View key={idx} style={[styles.trendRow, rowStyle]}>
                  <Text style={[styles.trendCell, styles.colW25, isLast ? { fontWeight: 'bold' } : {}]}>
                    {t.month}{isLast ? ' (actual)' : ''}
                  </Text>
                  <Text style={[styles.trendCell, styles.colW35, isLast ? { fontWeight: 'bold', color: '#1D9E75' } : {}]}>
                    {t.kwh} kWh
                  </Text>
                  <Text style={[
                    diff === null ? styles.trendCell :
                    diff < 0 ? styles.trendCellGreen : styles.trendCellRed,
                    styles.colW40
                  ]}>
                    {diff === null
                      ? '-'
                      : diff < 0
                        ? `Bajo ${Math.abs(diff)} kWh`
                        : `Subio ${diff} kWh`}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* SECCIÓN 4 — Impacto ambiental */}
        <View style={styles.sectionImpacto}>
          <Text style={styles.sectionTitle}>Impacto Ambiental</Text>
          <View style={styles.impactRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.impactText}>{report.treesSaved} árboles equivalentes salvados</Text>
          </View>
          <View style={styles.impactRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.impactText}>{facts.metroTrips} viajes en metro compensados</Text>
          </View>
          <View style={styles.impactRow}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.impactText}>{report.co2OffsetKg} kg de CO₂ prevenidos</Text>
          </View>
        </View>

        {/* SECCIÓN 5 — Fun facts */}
        <View style={styles.sectionFunFacts}>
          <Text style={styles.sectionTitle}>¿Qué puedes hacer con tu ahorro?</Text>
          <View style={styles.grid2x2}>
            <View style={styles.funFactCard}>
              <Text style={styles.funFactValue}>{facts.chocoramos}</Text>
              <Text style={styles.funFactDesc}>Chocoramos ($1,200 c/u)</Text>
            </View>
            <View style={styles.funFactCard}>
              <Text style={styles.funFactValue}>{facts.netflixMonths} meses</Text>
              <Text style={styles.funFactDesc}>de Netflix Colombia</Text>
            </View>
            <View style={styles.funFactCard}>
              <Text style={styles.funFactValue}>{facts.coffeeCups}</Text>
              <Text style={styles.funFactDesc}>Cafés artesanales</Text>
            </View>
            <View style={styles.funFactCard}>
              <Text style={styles.funFactValue}>{facts.metroTrips}</Text>
              <Text style={styles.funFactDesc}>Viajes en Metro de Medellín</Text>
            </View>
          </View>
        </View>

        {/* SECCIÓN 6 — Datos técnicos */}
        <View style={styles.sectionTecnicos}>
          <Text style={styles.sectionTitle}>Datos Técnicos</Text>
          <View>
            <View style={[styles.tableRow, styles.rowOdd]}>
              <Text style={styles.tableCellKey}>Pico máximo</Text>
              <Text style={styles.tableCellValue}>{report.peakPowerW.toLocaleString()} W a las {report.peakTime}</Text>
            </View>
            <View style={[styles.tableRow, styles.rowEven]}>
              <Text style={styles.tableCellKey}>Promedio diario</Text>
              <Text style={styles.tableCellValue}>{report.avgDailyKwh} kWh</Text>
            </View>
            <View style={[styles.tableRow, styles.rowOdd]}>
              <Text style={styles.tableCellKey}>Factor de potencia</Text>
              <Text style={styles.tableCellValue}>{report.powerFactor}</Text>
            </View>
            <View style={[styles.tableRow, styles.rowEven]}>
              <Text style={styles.tableCellKey}>Completitud de datos</Text>
              <Text style={styles.tableCellValue}>{report.dataCompleteness}%</Text>
            </View>
            <View style={[styles.tableRow, styles.rowOdd]}>
              <Text style={styles.tableCellKey}>Recomendación IA</Text>
              <Text style={styles.tableCellValue}>{report.aiRecommendations[0]?.title} — {report.aiRecommendations[0]?.estimatedSavings}</Text>
            </View>
          </View>
        </View>

        {/* SECCIÓN 7 — Resumen IA */}
        <View style={styles.sectionIA}>
          <Text style={styles.aiText}>IA: {report.aiSummary}</Text>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>EcoHome · Generado el {new Date().toLocaleDateString('es-CO')} · ecohome.co</Text>
        </View>
      </Page>
    </Document>
  );
}
