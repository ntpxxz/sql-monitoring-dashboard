// ============================================================================
// FILE: client/src/services/api.ts
// ============================================================================
import axios from 'axios';
import { Server, ServerOverview, OptimizationSuggestion } from '../types';

const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api', // Your Node.js backend URL
});

export const getServers = async (): Promise<Server[]> => {
  const response = await apiClient.get('/servers');
  return response.data;
};

export const getServerOverview = async (serverId: string): Promise<ServerOverview> => {
  const response = await apiClient.get(`/servers/${serverId}/overview`);
  return response.data;
};

export const getAIOptimization = async (serverId: string, query_text: string, database_name: string): Promise<{ suggestion: OptimizationSuggestion }> => {
    const response = await apiClient.post(`/servers/${serverId}/optimize`, {
        query_text,
        database_name
    });
    // The Python response is nested under a 'suggestion' key which is a JSON string
    // We need to parse it.
    if (typeof response.data.suggestion === 'string') {
         response.data.suggestion = JSON.parse(response.data.suggestion);
    }
    return response.data;
};