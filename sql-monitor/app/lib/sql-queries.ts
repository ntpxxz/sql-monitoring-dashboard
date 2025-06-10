// ============================================================================
// FILE: nextjs-app/lib/sql-queries.ts
// ============================================================================
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
  