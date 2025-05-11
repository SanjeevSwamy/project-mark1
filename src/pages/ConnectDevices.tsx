import React, { useState } from 'react';
import { Plus, Wifi, Watch, HeartPulse, Thermometer, Activity, X, LogOut } from 'lucide-react';

const DEVICE_LIST = [
  {
    name: "Apple Watch",
    type: "Wearable",
    icon: <Watch className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />,
    description: "Monitor heart rate, ECG, and activity from your Apple Watch.",
  },
  {
    name: "Fitbit Charge 5",
    type: "Wearable",
    icon: <Activity className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />,
    description: "Sync your Fitbit data for heart health and sleep analysis.",
  },
  {
    name: "Withings BPM Connect",
    type: "Blood Pressure Monitor",
    icon: <HeartPulse className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />,
    description: "Track blood pressure and sync readings automatically.",
  },
  {
    name: "Omron Smart BP Monitor",
    type: "Blood Pressure Monitor",
    icon: <HeartPulse className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />,
    description: "Connect your Omron device for easy BP tracking.",
  },
  {
    name: "Google Nest Hub",
    type: "Smart Home",
    icon: <Wifi className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />,
    description: "Integrate health reminders and routines with Google Home.",
  },
  {
    name: "Mi Body Composition Scale",
    type: "Smart Scale",
    icon: <Thermometer className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />,
    description: "Sync weight and body composition for a complete health view.",
  },
];

const MAX_CONNECTED = 5;

const ConnectDevices: React.FC = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [connected, setConnected] = useState<string[]>([]);

  const handleConnect = (name: string) => {
    if (!connected.includes(name) && connected.length < MAX_CONNECTED) {
      setConnected([...connected, name]);
    }
    setShowAdd(false);
  };

  const handleDisconnect = (name: string) => {
    setConnected(connected.filter((n) => n !== name));
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Connect Your Smart Devices</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Seamlessly sync your health data from wearables and smart devices.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center px-4 py-2 rounded-md bg-cyan-600 text-white hover:bg-cyan-700 shadow transition"
        >
          <Plus className="mr-2" size={18} />
          Add Device
        </button>
      </header>

      {/* Add Device Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400"
              onClick={() => setShowAdd(false)}
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Add a Smart Device</h2>
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {DEVICE_LIST.map((device) => {
                const isConnected = connected.includes(device.name);
                const isDisabled = connected.length >= MAX_CONNECTED && !isConnected;
                return (
                  <div
                    key={device.name}
                    className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-md p-4 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center">
                      {device.icon}
                      <div className="ml-4">
                        <div className="font-medium text-gray-900 dark:text-gray-100">{device.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{device.type}</div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">{device.description}</div>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col items-end">
                      {isConnected ? (
                        <>
                          <button
                            className="flex items-center px-4 py-2 rounded-md text-sm font-medium bg-green-100 text-green-700 cursor-default mb-2"
                            disabled
                          >
                            Connected
                          </button>
                          <button
                            className="flex items-center px-3 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200 transition"
                            onClick={() => handleDisconnect(device.name)}
                          >
                            <LogOut className="w-4 h-4 mr-1" />
                            Disconnect
                          </button>
                        </>
                      ) : (
                        <button
                          className={`px-4 py-2 rounded-md text-sm font-medium shadow ${
                            isDisabled
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-cyan-600 text-white hover:bg-cyan-700"
                          }`}
                          disabled={isDisabled}
                          onClick={() => handleConnect(device.name)}
                        >
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              className="mt-6 flex items-center text-gray-700 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium"
              onClick={() => setShowAdd(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Connected Devices List */}
      <section>
        <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Your Connected Devices</h2>
        {connected.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400">No devices connected yet.</div>
        ) : (
          <ul className="space-y-3">
            {connected.map((name) => {
              const device = DEVICE_LIST.find((d) => d.name === name);
              if (!device) return null;
              return (
                <li
                  key={name}
                  className="relative flex items-center bg-white dark:bg-gray-800 rounded-md p-4 border border-gray-200 dark:border-gray-700"
                >
                  {/* Top-left close button */}
                  <button
                    className="absolute top-2 left-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition"
                    onClick={() => handleDisconnect(name)}
                    aria-label="Disconnect"
                  >
                  </button>
                  <div className="ml-6 flex items-center">
                    {device.icon}
                    <div className="ml-4 flex-1">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{device.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{device.type}</div>
                    </div>
                  </div>
                  <button
                    className="ml-4 flex items-center px-3 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200 transition"
                    onClick={() => handleDisconnect(name)}
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Disconnect
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Custom scrollbar styling */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a7f3d0;
          border-radius: 6px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #22d3ee #f3f4f6;
        }
      `}</style>
    </div>
  );
};

export default ConnectDevices;
