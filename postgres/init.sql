 This script initializes the database for storing monitored server configurations.
-- It will be executed automatically when the PostgreSQL container starts for the first time.

CREATE TABLE monitored_servers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    zone TEXT NOT NULL,
    host TEXT NOT NULL,
    database_name TEXT NOT NULL,
    db_user TEXT NOT NULL,
    -- In a real production system, this should store a reference
    -- to a secret in a vault, not the password itself.
    db_password TEXT NOT NULL, 
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE monitored_servers IS 'Stores connection configurations for monitored SQL servers.';

-- Insert the initial demo data
-- IMPORTANT: Replace 'your_user' and 'your_password' with the actual credentials for your local SQL Server.
-- 'host.docker.internal' is a special DNS name that resolves to the host machine's IP address from within a Docker container.
-- This allows the Next.js app running inside Docker to connect to the SQL Server instance running on your local machine.

INSERT INTO monitored_servers (display_id, name, zone, host, database_name, db_user, db_password) VALUES
('monitoring-demo', 'E-commerce Demo', 'Demo Databases', 'host.docker.internal', 'MonitoringDemoDB', 'your_user', 'your_password'),
('hr-system-demo', 'HR System Demo', 'Demo Databases', 'host.docker.internal', 'HR_SystemDB', 'your_user', 'your_password'),
('sales-analytics-demo', 'Sales Analytics Demo', 'Production', 'host.docker.internal', 'SalesAnalyticsDB', 'your_user', 'your_password'),
('inventory-demo', 'Inventory (Slow Trigger)', 'Production', 'host.docker.internal', 'InventoryDB', 'your_user', 'your_password'),
('logging-demo', 'Logging (No Index)', 'Internal Tools', 'host.docker.internal', 'LoggingDB', 'your_user', 'your_password');