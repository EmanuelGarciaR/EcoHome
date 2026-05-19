import {
  RawReading,
  TimeSeriesPoint,
  RangePoint,
  StatsSummary,
  mockLatestReading,
  mockHourlyData,
  mockDailyData,
  mockRangeData,
  mockSummary
} from './mockData';

// Estas firmas NO cambian cuando llegue el backend real.
// Solo se reemplaza el cuerpo de cada función.

export async function getLatestReading(deviceId?: string): Promise<RawReading> {
  return Promise.resolve(mockLatestReading);
}

export async function getHourlyData(deviceId?: string): Promise<TimeSeriesPoint[]> {
  return Promise.resolve(mockHourlyData);
}

export async function getDailyData(deviceId?: string): Promise<TimeSeriesPoint[]> {
  return Promise.resolve(mockDailyData);
}

export async function getRangeData(period: 'mensual' | 'trimestral' | 'anual'): Promise<RangePoint[]> {
  return Promise.resolve(mockRangeData[period]);
}

export async function getSummary(deviceId?: string): Promise<StatsSummary> {
  return Promise.resolve(mockSummary);
}
