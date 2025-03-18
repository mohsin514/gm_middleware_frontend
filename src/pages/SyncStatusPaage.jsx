import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateStepStatus } from '../redux/syncSlice';

const SyncStatusPage = () => {
  const steps = useSelector((state) => state.sync.steps);
  const dispatch = useDispatch();

  const handleSync = (id) => {
    // Update the step status to "Syncing" when the Sync button is clicked
    dispatch(updateStepStatus({ id, status: 'Syncing' }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">NICE CXone Production to Failover Synchronization</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between mb-4 space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium mb-2">Name:</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Step" />
          </div>
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium mb-2">Status</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Status" />
          </div>
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium mb-2">Date Range</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Date Range" />
          </div>
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium mb-2">Time</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Time" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Filters</label>
          <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Filters" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Sort: Newest</label>
          <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Sort: Newest" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Signal: Synchronization by Step</label>
          <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Signal: Synchronization by Step" />
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-2">Step Type</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Status Last Execution</th>
              <th className="text-left py-2">Manual Synchronization by Step</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((step) => (
              <tr key={step.id} className="border-t">
                <td className="py-2">{step.type}</td>
                <td className="py-2">{step.status}</td>
                <td className="py-2">{step.date} {step.time}</td>
                <td className="py-2">
                  <button
                    onClick={() => handleSync(step.id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
                  >
                    Sync
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SyncStatusPage;