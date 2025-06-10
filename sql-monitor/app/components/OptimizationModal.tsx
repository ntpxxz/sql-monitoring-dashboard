// ============================================================================
// FILE: nextjs-app/app/components/OptimizationModal.tsx
// ============================================================================
"use client";

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { SlowQuery, OptimizationSuggestion } from '@/types';

// Local helper, as we don't need this in a global service
async function getAIOptimization(serverId: string, query_text: string, database_name: string): Promise<OptimizationSuggestion> {
    const response = await fetch(`/api/servers/${serverId}/optimize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query_text, database_name })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`AI service request failed: ${errorText}`);
    }
    // The Python response is a JSON object with `optimized_sql` and `explanation`
    return await response.json();
};

interface OptimizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: SlowQuery;
  serverId: string;
}

export const OptimizationModal: React.FC<OptimizationModalProps> = ({ isOpen, onClose, query, serverId }) => {
  const [suggestion, setSuggestion] = useState<OptimizationSuggestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError(null);
      setSuggestion(null);
      
      const fetchSuggestion = async () => {
        try {
          const result = await getAIOptimization(serverId, query.QueryText, query.DatabaseName);
          setSuggestion(result);
        } catch (err: any) {
          setError(err.message || 'Failed to get AI suggestion. Please check the AI service.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchSuggestion();
    }
  }, [isOpen, query, serverId]);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold">AI Optimization Suggestion</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Original Query</h3>
            <pre className="bg-gray-800 p-4 rounded-md text-sm text-gray-300 font-mono whitespace-pre-wrap">
              <code>{query.QueryText}</code>
            </pre>
          </div>
          
          {loading && <p className="text-lg text-center p-8">🧠 Analyzing with Gemini... Please wait.</p>}
          {error && <p className="text-red-500 p-4 bg-red-900/50 rounded-md">{error}</p>}
          
          {suggestion && (
            <div>
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-green-400 mb-2">Optimized SQL</h3>
                 <pre className="bg-gray-800 p-4 rounded-md text-sm text-green-300 font-mono whitespace-pre-wrap">
                  <code>{suggestion.optimized_sql}</code>
                </pre>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-blue-400 mb-2">Explanation & Recommendations</h3>
                <div className="bg-gray-800 p-4 rounded-md text-sm text-gray-300 whitespace-pre-wrap">
                  {suggestion.explanation}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
