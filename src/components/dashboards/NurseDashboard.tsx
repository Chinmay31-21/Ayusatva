import React from 'react';
import { useStore } from '../../store/useStore';
import { StatCard } from '../StatCard';
import { 
  Users, 
  ClipboardList, 
  HeartPulse, 
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

export function NurseDashboard() {
  const { patients, nurseInstructions } = useStore();

  const assignedPatients = patients.filter(p => p.assignedNurse?.includes('Emma'));
  const pendingInstructions = nurseInstructions.filter(i => i.status === 'pending' || i.status === 'in-progress');
  const criticalInstructions = pendingInstructions.filter(i => i.priority === 'critical' || i.priority === 'high');
  const completedToday = nurseInstructions.filter(i => i.status === 'completed').length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default:
        return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Nurse Dashboard</h1>
        <p className="text-slate-400">Welcome back, Nurse Emma Wilson</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Assigned Patients"
          value={assignedPatients.length}
          icon={Users}
          color="bg-gradient-to-br from-pink-500 to-rose-600"
          trend="stable"
        />
        <StatCard
          title="Pending Tasks"
          value={pendingInstructions.length}
          change={`${criticalInstructions.length} urgent`}
          changeType="negative"
          icon={ClipboardList}
          color="bg-gradient-to-br from-purple-500 to-pink-600"
          trend="up"
        />
        <StatCard
          title="Vitals to Record"
          value={assignedPatients.length}
          icon={HeartPulse}
          color="bg-gradient-to-br from-cyan-500 to-blue-600"
          trend="stable"
        />
        <StatCard
          title="Completed Today"
          value={completedToday}
          change="+5 tasks"
          changeType="positive"
          icon={CheckCircle}
          color="bg-gradient-to-br from-green-500 to-emerald-600"
          trend="up"
        />
      </div>

      {/* Priority Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3>Priority Instructions</h3>
            <p className="text-sm text-slate-400 mt-1">{criticalInstructions.length} urgent tasks</p>
          </div>
          <button className="px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-xl smooth-transition text-white">
            View All Tasks
          </button>
        </div>

        <div className="space-y-3">
          {pendingInstructions.map((instruction, index) => (
            <motion.div
              key={instruction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 smooth-transition border border-white/10"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                instruction.priority === 'critical'
                  ? 'bg-red-500/20'
                  : instruction.priority === 'high'
                  ? 'bg-orange-500/20'
                  : 'bg-amber-500/20'
              }`}>
                {instruction.priority === 'critical' ? (
                  <AlertCircle className="w-6 h-6 text-red-400 pulse-glow" />
                ) : (
                  <ClipboardList className="w-6 h-6 text-amber-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h4>{instruction.patientName}</h4>
                  <span
                    className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(
                      instruction.priority
                    )}`}
                  >
                    {instruction.priority}
                  </span>
                </div>
                <p className="text-sm text-slate-300 mb-2">{instruction.instructions}</p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(instruction.createdAt).toLocaleTimeString()}
                  </span>
                  <span>Dr. {instruction.doctorName.split(' ')[1]}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg smooth-transition text-sm">
                  Complete
                </button>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg smooth-transition text-sm">
                  Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Assigned Patients */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3>Assigned Patients</h3>
            <p className="text-sm text-slate-400 mt-1">{assignedPatients.length} patients under care</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assignedPatients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-xl border border-white/10 hover:bg-white/5 smooth-transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white">
                    {patient.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm">{patient.name}</h4>
                    <p className="text-xs text-slate-400">{patient.roomNumber}</p>
                  </div>
                </div>
                {patient.status === 'critical' && (
                  <AlertCircle className="w-4 h-4 text-red-400 pulse-glow" />
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Status</span>
                  <span
                    className={`px-2 py-0.5 rounded-full ${
                      patient.status === 'critical'
                        ? 'bg-red-500/20 text-red-400'
                        : patient.status === 'stable'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {patient.status}
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Age/Gender</span>
                  <span>{patient.age}Y / {patient.gender}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Blood Group</span>
                  <span>{patient.bloodGroup}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 px-3 py-2 bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 rounded-lg smooth-transition text-xs">
                  Record Vitals
                </button>
                <button className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg smooth-transition text-xs">
                  View Chart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
