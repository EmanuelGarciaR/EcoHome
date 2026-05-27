import {
  RawReading,
  TimeSeriesPoint,
  RangePoint,
  StatsSummary,
  MonthlyReport,
  mockLatestReading,
  mockHourlyData,
  mockDailyData,
  mockRangeData,
  mockSummary,
  mockReports
} from './mockData';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Fallback helper to safely fetch from API or return mock on error
async function fetchFromApi<T>(endpoint: string, mockFallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_URL}/api/v1${endpoint}`, {
      credentials: "include"
    });
    if (!res.ok) {
      console.warn(`API returned ${res.status} for ${endpoint}, falling back to mock.`);
      return mockFallback;
    }
    const json = await res.json();
    if (json.success && json.data) {
      return json.data;
    }
    return mockFallback;
  } catch (error) {
    console.warn(`Error fetching ${endpoint}, falling back to mock:`, error);
    return mockFallback;
  }
}

export async function getLatestReading(deviceId?: string): Promise<RawReading> {
  return fetchFromApi<RawReading>(`/readings/latest${deviceId ? `?deviceId=${deviceId}` : ''}`, mockLatestReading);
}

export async function getHourlyData(deviceId?: string): Promise<TimeSeriesPoint[]> {
  return fetchFromApi<TimeSeriesPoint[]>(`/readings/hourly${deviceId ? `?deviceId=${deviceId}` : ''}`, mockHourlyData);
}

export async function getDailyData(deviceId?: string): Promise<TimeSeriesPoint[]> {
  return fetchFromApi<TimeSeriesPoint[]>(`/readings/daily${deviceId ? `?deviceId=${deviceId}` : ''}`, mockDailyData);
}

export async function getRangeData(period: 'mensual' | 'trimestral' | 'anual'): Promise<RangePoint[]> {
  return fetchFromApi<RangePoint[]>(`/readings/range?period=${period}`, mockRangeData[period]);
}

export async function getSummary(deviceId?: string): Promise<StatsSummary> {
  return fetchFromApi<StatsSummary>(`/readings/summary${deviceId ? `?deviceId=${deviceId}` : ''}`, mockSummary);
}

// ── Reports ────────────────────────────────────────────────────────

export async function getReports(): Promise<MonthlyReport[]> {
  return Promise.resolve(mockReports);
}

export async function getLatestReport(): Promise<MonthlyReport | null> {
  const completed = mockReports.filter(r => r.status === 'complete');
  return Promise.resolve(completed[0] ?? null);
}

export async function getReportById(id: string): Promise<MonthlyReport | null> {
  const found = mockReports.find(r => r.id === id);
  return Promise.resolve(found ?? null);
}

