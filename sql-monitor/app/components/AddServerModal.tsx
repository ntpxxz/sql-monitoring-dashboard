"use client";

import React from 'react';
import { X } from 'lucide-react';

interface AddServerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddServerModal: React.FC<AddServerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would gather form data and send it to an API endpoint
    // to persist the new server configuration.
    // For this demo, we just log it and close the modal.
    console.log("Simulating save... In a real app, this would trigger an API call.");
    alert("This is a demo. Saving new servers is not implemented in this version.");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-lg shadow-2xl w-full max-w-lg">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-200">Add New Server</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
                <label htmlFor="serverName" className="block text-sm font-medium text-slate-400">Server Name</label>
                <input type="text" id="serverName" className="mt-1 block w-full bg-slate-800 border-slate-600 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"/>
            </div>
             <div>
                <label htmlFor="serverZone" className="block text-sm font-medium text-slate-400">Zone</label>
                <input type="text" id="serverZone" placeholder="e.g., Production, Staging" className="mt-1 block w-full bg-slate-800 border-slate-600 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"/>
            </div>
            <div>
                <label htmlFor="serverHost" className="block text-sm font-medium text-slate-400">Host / IP Address</label>
                <input type="text" id="serverHost" className="mt-1 block w-full bg-slate-800 border-slate-600 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"/>
            </div>
            <div>
                <label htmlFor="serverUser" className="block text-sm font-medium text-slate-400">Username</label>
                <input type="text" id="serverUser" className="mt-1 block w-full bg-slate-800 border-slate-600 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"/>
            </div>
             <div>
                <label htmlFor="serverPassword" className="block text-sm font-medium text-slate-400">Password</label>
                <input type="password" id="serverPassword" className="mt-1 block w-full bg-slate-800 border-slate-600 rounded-md shadow-sm p-2 focus:ring-teal-500 focus:border-teal-500"/>
            </div>
            <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-md transition">Cancel</button>
                <button type="submit" className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-4 py-2 rounded-md transition">Save Server</button>
            </div>
        </form>
      </div>
    </div>
  );
};
