// ============================================================================
// FILE: client/src/components/KPIWidget.tsx
// ============================================================================
import React from 'react';

interface KPIWidgetProps {
  title: string;
  value: string;
  total?: string;
}

export const KPIWidget: React.FC<KPIWidgetProps> = ({ title, value, total }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
      {total && <p className="text-xs text-gray-500 mt-1">{total}</p>}
    </div>
  );
};