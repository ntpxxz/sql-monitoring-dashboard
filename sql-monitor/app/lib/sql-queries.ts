// ============================================================================
// FILE: nextjs-app/lib/sql-queries.ts
// ============================================================================
<<<<<<< HEAD
const sqlQueries = {
    kpis: `
      DECLARE @ts_now BIGINT = (SELECT ms_ticks FROM sys.dm_os_sys_info);
      SELECT TOP(1)
        (SELECT cpu_count FROM sys.dm_os_sys_info) AS [cpu_count],
        SQLProcessUtilization AS [cpu_sql_process_percent],
        100 - SystemIdle - SQLProcessUtilization AS [cpu_other_process_percent],
        (SELECT physical_memory_kb / 1024 FROM sys.dm_os_sys_info) AS [memory_total_mb],
        (SELECT available_physical_memory_kb / 1024 FROM sys.dm_os_sys_info) AS [memory_available_mb],
        (SELECT COUNT(*) FROM sys.dm_exec_sessions WHERE is_user_process = 1) as [active_connections]
      FROM (SELECT record.value('(./Record/SchedulerMonitorEvent/SystemHealth/SystemIdle)[1]', 'int') AS [SystemIdle], record.value('(./Record/SchedulerMonitorEvent/SystemHealth/ProcessUtilization)[1]', 'int') AS [SQLProcessUtilization], timestamp FROM (SELECT timestamp, CONVERT(xml, record) AS [record] FROM sys.dm_os_ring_buffers WHERE ring_buffer_type = N'RING_BUFFER_SCHEDULER_MONITOR' AND record LIKE '%<SystemHealth>%') AS x ) AS y ORDER BY y.timestamp DESC;
    `,
    slowQueries: `
      SELECT TOP 10
          DB_NAME(st.dbid) as DatabaseName,
          (qs.total_elapsed_time / qs.execution_count) / 1000.0 AS [AvgDuration_ms],
          SUBSTRING(st.text, (qs.statement_start_offset/2) + 1, ((CASE qs.statement_end_offset WHEN -1 THEN DATALENGTH(st.text) ELSE qs.statement_end_offset END - qs.statement_start_offset)/2) + 1) AS [QueryText]
      FROM sys.dm_exec_query_stats AS qs
      CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) AS st
      WHERE st.dbid IS NOT NULL AND DB_NAME(st.dbid) IS NOT NULL
      ORDER BY [AvgDuration_ms] DESC;
    `,
    getSchema: (dbName: string) => `
      USE [${dbName}];
      SELECT t.name AS TABLE_NAME, c.name AS COLUMN_NAME, ty.name AS DATA_TYPE
      FROM sys.tables as t
      INNER JOIN sys.columns c ON t.object_id = c.object_id
      INNER JOIN sys.types ty ON c.user_type_id = ty.user_type_id
      ORDER BY t.name, c.column_id;
    `
  };
  export default sqlQueries;
  
=======
/**
 * Interface for SQL Query Results
 */
interface SQLKPIResult {
  cpu_count: number;
  memory_total_mb: number;
  memory_available_mb: number;
  active_connections: number;
  cpu_sql_process_percent: number;
}

interface SlowQueryResult {
  DatabaseName: string;
  AvgDuration_ms: number;
  QueryText: string;
  LastExecutionTime?: Date;
  ExecutionCount?: number;
}

const sqlQueries = {
  kpis: `
    WITH CPURingBuffer AS (
      SELECT TOP 1
        ISNULL(record.value('(./Record/SchedulerMonitorEvent/SystemHealth/ProcessUtilization)[1]', 'int'), 0) AS SQLProcessUtilization
      FROM (
        SELECT TOP 100 timestamp, CONVERT(xml, record) AS record
        FROM sys.dm_os_ring_buffers WITH (NOLOCK)
        WHERE ring_buffer_type = N'RING_BUFFER_SCHEDULER_MONITOR' 
        AND record LIKE N'%<SystemHealth>%'
        ORDER BY timestamp DESC
      ) AS x
      ORDER BY timestamp DESC
    )
    SELECT
      (SELECT cpu_count FROM sys.dm_os_sys_info WITH (NOLOCK)) AS cpu_count,
      (SELECT physical_memory_kb / 1024 FROM sys.dm_os_sys_info WITH (NOLOCK)) AS memory_total_mb,
      (SELECT cntr_value / 1024 FROM sys.dm_os_performance_counters WITH (NOLOCK) 
       WHERE counter_name = 'Free Memory (KB)') AS memory_available_mb,
      (SELECT COUNT_BIG(*) FROM sys.dm_exec_sessions WITH (NOLOCK) 
       WHERE is_user_process = 1) as active_connections,
      ISNULL((SELECT SQLProcessUtilization FROM CPURingBuffer), 0) AS cpu_sql_process_percent
    OPTION (MAXDOP 1);
  `,

  slowQueries: `
    SELECT TOP 10
        DB_NAME(st.dbid) as DatabaseName,
        (qs.total_elapsed_time / qs.execution_count) / 1000.0 AS AvgDuration_ms,
        SUBSTRING(st.text, (qs.statement_start_offset/2) + 1, 
          ((CASE qs.statement_end_offset WHEN -1 
            THEN DATALENGTH(st.text) 
            ELSE qs.statement_end_offset END - qs.statement_start_offset)/2) + 1) AS QueryText,
        qs.last_execution_time AS LastExecutionTime,
        qs.execution_count AS ExecutionCount,
        qs.total_logical_reads / qs.execution_count AS AvgLogicalReads,
        CAST(qp.query_plan AS NVARCHAR(MAX)) AS QueryPlan
    FROM sys.dm_exec_query_stats AS qs WITH (NOLOCK)
    CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) AS st
    OUTER APPLY sys.dm_exec_query_plan(qs.plan_handle) AS qp
    WHERE st.dbid IS NOT NULL 
      AND DB_NAME(st.dbid) IS NOT NULL
      AND qs.last_execution_time > DATEADD(HOUR, -24, GETDATE())
    ORDER BY AvgDuration_ms DESC
    OPTION (MAXDOP 1);
  `,

  /**
   * Gets the schema for a specified database
   * @param dbName - The name of the database
   * @returns SQL query string
   */
  getSchema: (dbName: string): string => `
    USE [${dbName}];
    SELECT 
      SCHEMA_NAME(t.schema_id) AS SCHEMA_NAME,
      t.name AS TABLE_NAME, 
      c.name AS COLUMN_NAME, 
      ty.name AS DATA_TYPE,
      c.max_length,
      c.is_nullable,
      ISNULL(i.is_primary_key, 0) as is_primary_key
    FROM sys.tables as t WITH (NOLOCK)
    INNER JOIN sys.columns c WITH (NOLOCK) ON t.object_id = c.object_id
    INNER JOIN sys.types ty WITH (NOLOCK) ON c.user_type_id = ty.user_type_id
    LEFT JOIN sys.index_columns ic WITH (NOLOCK) ON ic.object_id = c.object_id AND ic.column_id = c.column_id
    LEFT JOIN sys.indexes i WITH (NOLOCK) ON ic.object_id = i.object_id AND ic.index_id = i.index_id
    ORDER BY t.name, c.column_id;
  `
};

export default sqlQueries;
>>>>>>> parent of 91e4265 (Queri V1-Done)
