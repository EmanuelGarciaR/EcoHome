export interface RawReading {
  id: number;
  device_id: string;
  recorded_at: string;
  voltage_v: number;
  current_a: number;
  power_w: number;
  power_factor: number | null;
  frequency_hz: number | null;
}

export interface TimeSeriesPoint {
  timestamp: string;
  label: string;
  avg_power_w: number;
  max_power_w: number;
  min_power_w: number;
  kwh: number;
}

export interface RangePoint {
  label: string;
  current_kwh: number;
  previous_kwh: number;
  cost_cop: number;
  savings_cop: number;
}

export interface StatsSummary {
  current_power_w: number;
  today_kwh: number;
  month_kwh: number;
  month_cost_cop: number;
  month_savings_cop: number;
  peak_power_w: number;
  peak_time: string;
  avg_daily_kwh: number;
  co2_kg_offset: number;
  trees_equivalent: number;
}

export interface AlertKpis {
  unreadAlerts: number;
  monthlyImpact: string;
  efficiencyScore: string;
  nextReportDays: number;
}

export interface Alert {
  id: string;
  type: 'savings' | 'peak' | 'carbon' | 'scheduling' | 'achievement';
  title: string;
  isNew: boolean;
  timeAgo: string;
  description: string;
  highlightText?: string;
  highlightType?: 'saving' | 'warning' | 'milestone' | 'tip';
}

export interface Achievement {
  id: string;
  icon: 'leaf' | 'zap' | 'cloud' | 'sun';
  value: string;
  label: string;
  subtext: string;
}

export interface Milestone {
  title: string;
  description: string;
  progressPercent: number;
}

export const mockLatestReading: RawReading = {
  id: 1,
  device_id: 'device_001',
  recorded_at: new Date().toISOString(),
  voltage_v: 120.5,
  current_a: 5.2,
  power_w: 620,
  power_factor: 0.98,
  frequency_hz: 60.0
};

export const mockHourlyData: TimeSeriesPoint[] = [
  { timestamp: '2026-05-19T00:00:00Z', label: '00:00', avg_power_w: 1200, max_power_w: 1500, min_power_w: 800, kwh: 1.2 },
  { timestamp: '2026-05-19T01:00:00Z', label: '01:00', avg_power_w: 1000, max_power_w: 1300, min_power_w: 700, kwh: 1.0 },
  { timestamp: '2026-05-19T02:00:00Z', label: '02:00', avg_power_w: 800, max_power_w: 1100, min_power_w: 600, kwh: 0.8 },
  { timestamp: '2026-05-19T03:00:00Z', label: '03:00', avg_power_w: 700, max_power_w: 900, min_power_w: 600, kwh: 0.7 },
  { timestamp: '2026-05-19T04:00:00Z', label: '04:00', avg_power_w: 700, max_power_w: 900, min_power_w: 600, kwh: 0.7 },
  { timestamp: '2026-05-19T05:00:00Z', label: '05:00', avg_power_w: 900, max_power_w: 1200, min_power_w: 700, kwh: 0.9 },
  { timestamp: '2026-05-19T06:00:00Z', label: '06:00', avg_power_w: 1500, max_power_w: 1800, min_power_w: 1000, kwh: 1.5 },
  { timestamp: '2026-05-19T07:00:00Z', label: '07:00', avg_power_w: 2200, max_power_w: 2800, min_power_w: 1500, kwh: 2.2 },
  { timestamp: '2026-05-19T08:00:00Z', label: '08:00', avg_power_w: 2400, max_power_w: 3200, min_power_w: 1800, kwh: 2.4 },
  { timestamp: '2026-05-19T09:00:00Z', label: '09:00', avg_power_w: 2000, max_power_w: 2500, min_power_w: 1500, kwh: 2.0 },
  { timestamp: '2026-05-19T10:00:00Z', label: '10:00', avg_power_w: 2800, max_power_w: 3500, min_power_w: 2000, kwh: 2.8 },
  { timestamp: '2026-05-19T11:00:00Z', label: '11:00', avg_power_w: 2600, max_power_w: 3200, min_power_w: 2000, kwh: 2.6 },
  { timestamp: '2026-05-19T12:00:00Z', label: '12:00', avg_power_w: 2400, max_power_w: 2800, min_power_w: 1800, kwh: 2.4 },
  { timestamp: '2026-05-19T13:00:00Z', label: '13:00', avg_power_w: 2450, max_power_w: 2900, min_power_w: 1900, kwh: 2.45 },
  { timestamp: '2026-05-19T14:00:00Z', label: '14:00', avg_power_w: 2500, max_power_w: 3000, min_power_w: 2000, kwh: 2.5 },
  { timestamp: '2026-05-19T15:00:00Z', label: '15:00', avg_power_w: 2900, max_power_w: 3400, min_power_w: 2200, kwh: 2.9 },
  { timestamp: '2026-05-19T16:00:00Z', label: '16:00', avg_power_w: 3400, max_power_w: 4000, min_power_w: 2500, kwh: 3.4 },
  { timestamp: '2026-05-19T17:00:00Z', label: '17:00', avg_power_w: 3800, max_power_w: 4500, min_power_w: 3000, kwh: 3.8 },
  { timestamp: '2026-05-19T18:00:00Z', label: '18:00', avg_power_w: 4500, max_power_w: 5200, min_power_w: 3500, kwh: 4.5 },
  { timestamp: '2026-05-19T19:00:00Z', label: '19:00', avg_power_w: 4300, max_power_w: 5000, min_power_w: 3200, kwh: 4.3 },
  { timestamp: '2026-05-19T20:00:00Z', label: '20:00', avg_power_w: 4100, max_power_w: 4800, min_power_w: 3100, kwh: 4.1 },
  { timestamp: '2026-05-19T21:00:00Z', label: '21:00', avg_power_w: 3000, max_power_w: 3800, min_power_w: 2500, kwh: 3.0 },
  { timestamp: '2026-05-19T22:00:00Z', label: '22:00', avg_power_w: 2000, max_power_w: 2500, min_power_w: 1500, kwh: 2.0 },
  { timestamp: '2026-05-19T23:00:00Z', label: '23:00', avg_power_w: 1500, max_power_w: 2000, min_power_w: 1000, kwh: 1.5 }
];

export const mockDailyData: TimeSeriesPoint[] = [
  { timestamp: '2026-05-13T00:00:00Z', label: 'Lun', avg_power_w: 2000, max_power_w: 4500, min_power_w: 700, kwh: 48.0 },
  { timestamp: '2026-05-14T00:00:00Z', label: 'Mar', avg_power_w: 2100, max_power_w: 4800, min_power_w: 750, kwh: 50.4 },
  { timestamp: '2026-05-15T00:00:00Z', label: 'Mié', avg_power_w: 1950, max_power_w: 4600, min_power_w: 680, kwh: 46.8 },
  { timestamp: '2026-05-16T00:00:00Z', label: 'Jue', avg_power_w: 2050, max_power_w: 4700, min_power_w: 720, kwh: 49.2 },
  { timestamp: '2026-05-17T00:00:00Z', label: 'Vie', avg_power_w: 2200, max_power_w: 5000, min_power_w: 800, kwh: 52.8 },
  { timestamp: '2026-05-18T00:00:00Z', label: 'Sáb', avg_power_w: 2500, max_power_w: 5500, min_power_w: 900, kwh: 60.0 },
  { timestamp: '2026-05-19T00:00:00Z', label: 'Dom', avg_power_w: 2400, max_power_w: 5200, min_power_w: 850, kwh: 57.6 }
];

export const mockRangeData: Record<'mensual' | 'trimestral' | 'anual', RangePoint[]> = {
  mensual: [
    { label: 'Sem 1', current_kwh: 110, previous_kwh: 125, cost_cop: 66000, savings_cop: 9000 },
    { label: 'Sem 2', current_kwh: 135, previous_kwh: 140, cost_cop: 81000, savings_cop: 3000 },
    { label: 'Sem 3', current_kwh: 120, previous_kwh: 115, cost_cop: 72000, savings_cop: -3000 },
    { label: 'Sem 4', current_kwh: 145, previous_kwh: 150, cost_cop: 87000, savings_cop: 3000 },
  ],
  trimestral: [
    { label: 'Ene', current_kwh: 420, previous_kwh: 450, cost_cop: 252000, savings_cop: 18000 },
    { label: 'Feb', current_kwh: 390, previous_kwh: 410, cost_cop: 234000, savings_cop: 12000 },
    { label: 'Mar', current_kwh: 428.5, previous_kwh: 460, cost_cop: 257100, savings_cop: 18900 },
  ],
  anual: [
    { label: 'Ene', current_kwh: 420, previous_kwh: 450, cost_cop: 252000, savings_cop: 18000 },
    { label: 'Feb', current_kwh: 390, previous_kwh: 410, cost_cop: 234000, savings_cop: 12000 },
    { label: 'Mar', current_kwh: 428, previous_kwh: 460, cost_cop: 256800, savings_cop: 19200 },
    { label: 'Abr', current_kwh: 410, previous_kwh: 440, cost_cop: 246000, savings_cop: 18000 },
    { label: 'May', current_kwh: 450, previous_kwh: 480, cost_cop: 270000, savings_cop: 18000 },
    { label: 'Jun', current_kwh: 510, previous_kwh: 530, cost_cop: 306000, savings_cop: 12000 },
    { label: 'Jul', current_kwh: 540, previous_kwh: 550, cost_cop: 324000, savings_cop: 6000 },
    { label: 'Ago', current_kwh: 520, previous_kwh: 510, cost_cop: 312000, savings_cop: -6000 },
    { label: 'Sep', current_kwh: 480, previous_kwh: 490, cost_cop: 288000, savings_cop: 6000 },
    { label: 'Oct', current_kwh: 430, previous_kwh: 460, cost_cop: 258000, savings_cop: 18000 },
    { label: 'Nov', current_kwh: 410, previous_kwh: 430, cost_cop: 246000, savings_cop: 12000 },
    { label: 'Dic', current_kwh: 460, previous_kwh: 490, cost_cop: 276000, savings_cop: 18000 },
  ]
};

export const mockSummary: StatsSummary = {
  current_power_w: 1240,
  today_kwh: 14.5,
  month_kwh: 280,
  month_cost_cop: 168000,
  month_savings_cop: 32000,
  peak_power_w: 4500,
  peak_time: '18:00',
  avg_daily_kwh: 12.2,
  co2_kg_offset: 25,
  trees_equivalent: 4
};

export const mockAlertKpis: AlertKpis = {
  unreadAlerts: 2,
  monthlyImpact: '4 Árboles Salvados',
  efficiencyScore: '92/100',
  nextReportDays: 5
};

export const mockAlerts: Alert[] = [
  {
    id: 'a1',
    type: 'savings',
    title: 'Grandes Ahorros Detectados',
    isNew: true,
    timeAgo: 'hace 2 horas',
    description: 'Tu consumo de energía bajó un 15% ayer en comparación con tu lunes promedio. Ahorraste aproximadamente $12,500 COP.',
    highlightText: '$12,500 Ahorrados',
    highlightType: 'saving'
  },
  {
    id: 'a2',
    type: 'peak',
    title: 'Pico de Uso Inesperado',
    isNew: true,
    timeAgo: 'hace 5 horas',
    description: 'Notamos un pico en el uso de electricidad entre las 2 PM y las 4 PM. Tu unidad de aire acondicionado podría estar funcionando con menos eficiencia de lo habitual.',
    highlightText: 'advertencia',
    highlightType: 'warning'
  },
  {
    id: 'a3',
    type: 'carbon',
    title: 'Huella de Carbono Reducida',
    isNew: false,
    timeAgo: 'Ayer',
    description: "¡Felicidades! Tus hábitos ecológicos consistentes este mes han evitado 25kg de emisiones de CO2. Eso equivale a plantar un nuevo árbol.",
    highlightText: '25kg CO2 Ahorrados',
    highlightType: 'milestone'
  },
  {
    id: 'a4',
    type: 'scheduling',
    title: 'Programación Inteligente',
    isNew: false,
    timeAgo: 'Ayer',
    description: 'Cambiar los ciclos de tu lavavajillas y lavadora para después de las 10 PM podría ahorrarte un 8% adicional en tu factura mensual debido a las tarifas de menor demanda.',
    highlightText: 'consejo',
    highlightType: 'tip'
  },
  {
    id: 'a5',
    type: 'achievement',
    title: 'Meta Semanal Alcanzada',
    isNew: false,
    timeAgo: 'hace 2 días',
    description: 'Te mantuviste por debajo de tu "Eco-Presupuesto" durante 7 días consecutivos. ¡Has ganado la insignia de "Ahorrador Constante"!',
    highlightText: 'Nueva Insignia',
    highlightType: 'saving'
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: 'ach1',
    icon: 'leaf',
    value: '12',
    label: 'Árboles Salvados',
    subtext: 'Impacto ambiental total'
  },
  {
    id: 'ach2',
    icon: 'zap',
    value: '14 Días',
    label: 'Racha de Energía',
    subtext: 'Por debajo del uso diario objetivo'
  },
  {
    id: 'ach3',
    icon: 'cloud',
    value: '84kg',
    label: 'CO2 Compensado',
    subtext: 'Emisiones evitadas'
  },
  {
    id: 'ach4',
    icon: 'sun',
    value: '85%',
    label: 'Alma Solar',
    subtext: 'Mezcla de energía renovable'
  }
];

export const mockNextMilestone: Milestone = {
  title: '"El Guardián del Bosque"',
  description: '¡Salva 3 árboles más para desbloquear el siguiente nivel y obtener una consulta exclusiva sobre ahorro de energía!',
  progressPercent: 75
};
