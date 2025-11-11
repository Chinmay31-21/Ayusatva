import React from 'react';
import { useStore } from '../../store/useStore';
import { StatCard } from '../StatCard';
import { 
  FlaskConical, 
  Clock, 
  CheckCircle, 
  FileText,
  Upload,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export function LabDashboard() {
  const { labTests } = useStore();

  const pendingTests = labTests.filter(t => t.status === 'pending');
  const inProgressTests = labTests.filter(t => t.status === 'in-progress');
  const completedToday = labTests.filter(t => t.status === 'completed').length;
  const urgentTests = labTests.filter(t => t.priority === 'stat' || t.priority === 'urgent');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'stat':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'urgent':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getTestTypeIcon = (type: string) => {
    return FlaskConical; // In a real app, you'd have different icons for different test types
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Laboratory Dashboard</h1>
        <p className="text-slate-400">Test Management & Results</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pending Tests"
          value={pendingTests.length}
          change={`${urgentTests.length} urgent`}
          changeType="negative"
          icon={Clock}
          color="bg-gradient-to-br from-teal-500 to-cyan-600"
          trend="up"
        />
        <StatCard
          title="In Progress"
          value={inProgressTests.length}
          icon={FlaskConical}
          color="bg-gradient-to-br from-blue-500 to-cyan-600"
          trend="stable"
        />
        <StatCard
          title="Completed Today"
          value={completedToday}
          change="+8 tests"
          changeType="positive"
          icon={CheckCircle}
          color="bg-gradient-to-br from-green-500 to-emerald-600"
          trend="up"
        />
        <StatCard
          title="Awaiting Results"
          value={inProgressTests.length}
          icon={FileText}
          color="bg-gradient-to-br from-purple-500 to-pink-600"
          trend="down"
        />
      </div>

      {/* Test Queue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3>Test Queue</h3>
            <p className="text-sm text-slate-400 mt-1">{labTests.length} total tests</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg smooth-transition text-sm">
              Filter
            </button>
            <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-xl smooth-transition text-white">
              Process Next
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {labTests.map((test, index) => {
            const TestIcon = getTestTypeIcon(test.testType);
            return (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-xl border border-white/10 hover:bg-white/5 smooth-transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      test.priority === 'stat'
                        ? 'bg-red-500/20'
                        : test.priority === 'urgent'
                        ? 'bg-orange-500/20'
                        : 'bg-teal-500/20'
                    }`}>
                      <TestIcon className={`w-6 h-6 ${
                        test.priority === 'stat'
                          ? 'text-red-400 pulse-glow'
                          : test.priority === 'urgent'
                          ? 'text-orange-400'
                          : 'text-teal-400'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4>{test.patientName}</h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(
                            test.priority
                          )}`}
                        >
                          {test.priority}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300 mb-1">{test.testName}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span>ID: {test.id}</span>
                        <span>Patient: {test.patientId}</span>
                        <span>Requested by: {test.requestedByName}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      test.status === 'completed'
                        ? 'bg-green-500/20 text-green-400'
                        : test.status === 'in-progress'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-slate-500/20 text-slate-400'
                    }`}
                  >
                    {test.status}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs mb-3">
                  <div className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>Requested: {new Date(test.requestDate).toLocaleString()}</span>
                  </div>
                  {test.completionDate && (
                    <div className="flex items-center gap-1 text-green-400">
                      <CheckCircle className="w-3 h-3" />
                      <span>Completed: {new Date(test.completionDate).toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {test.notes && (
                  <div className="p-3 bg-amber-500/10 rounded-lg mb-3 border border-amber-500/20">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-amber-400 mb-1">Special Notes</p>
                        <p className="text-sm text-slate-300">{test.notes}</p>
                      </div>
                    </div>
                  </div>
                )}

                {test.results && (
                  <div className="p-3 bg-white/5 rounded-lg mb-3">
                    <p className="text-xs text-slate-400 mb-1">Results</p>
                    <p className="text-sm text-slate-300">{test.results}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  {test.status === 'pending' && (
                    <button className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg smooth-transition text-white text-sm">
                      Start Processing
                    </button>
                  )}
                  {test.status === 'in-progress' && (
                    <button className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg smooth-transition text-white text-sm flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Results
                    </button>
                  )}
                  {test.status === 'completed' && (
                    <button className="flex-1 px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 rounded-lg smooth-transition text-sm">
                      View Report
                    </button>
                  )}
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg smooth-transition text-sm">
                    Details
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Equipment Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3>Equipment Status</h3>
            <p className="text-sm text-slate-400 mt-1">Laboratory equipment monitoring</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Hematology Analyzer', status: 'operational', usage: 78 },
            { name: 'Chemistry Analyzer', status: 'operational', usage: 65 },
            { name: 'Microscope #1', status: 'maintenance', usage: 0 },
            { name: 'Centrifuge', status: 'operational', usage: 45 },
          ].map((equipment, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border ${
                equipment.status === 'operational'
                  ? 'border-green-500/20 bg-green-500/5'
                  : 'border-amber-500/20 bg-amber-500/5'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm">{equipment.name}</p>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    equipment.status === 'operational'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {equipment.status}
                </span>
              </div>
              {equipment.status === 'operational' && (
                <>
                  <p className="text-xs text-slate-400 mb-2">Usage: {equipment.usage}%</p>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500"
                      style={{ width: `${equipment.usage}%` }}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
