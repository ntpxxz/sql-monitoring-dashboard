// ============================================================================
// FILE: nextjs-app/types/index.ts
// ============================================================================
export interface Server {
  id: string;
  name: string;
}

export interface KpiData {
  cpu_count?: number;
  cpu_sql_process_percent?: number;
  cpu_other_process_percent?: number;
  memory_total_mb?: number;
  memory_available_mb?: number;
  active_connections?: number;
}

export interface SlowQuery {
  DatabaseName: string;
  AvgDuration_ms: number;
  QueryText: string;
  [key: string]: any; // For other properties
}

export interface ServerOverview {
  kpis: KpiData;
  slowQueries: SlowQuery[];
}

export interface OptimizationSuggestion {
    optimized_sql: string;
    explanation: string;
}
