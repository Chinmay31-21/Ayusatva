import React from 'react';
import { useStore } from '../../store/useStore';
import { StatCard } from '../StatCard';
import { PatientTable } from '../PatientTable';
import { 
  Users, 
  Calendar, 
  FileText, 
  Activity,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const appointmentTrendData = [
  { name: 'Mon', appointments: 8 },
  { name: 'Tue', appointments: 12 },
  { name: 'Wed', appointments: 10 },
  { name: 'Thu', appointments: 15 },
  { name: 'Fri', appointments: 11 },
  { name: 'Sat', appointments: 6 },
  { name: 'Sun', appointments: 3 }
];

export function DoctorDashboard() {
  const { patients, appointments, prescriptions, labTests } = useStore();

  const myPatients = patients.filter(p => p.assignedDoctor?.includes('Sarah'));
  const todayAppointments = appointments.filter(a => a.status !== 'completed');
  const pendingPrescriptions = prescriptions.filter(p => p.status === 'pending');
  const pendingLabTests = labTests.filter(t => t.status === 'pending' || t.status === 'in-progress');
  const criticalPatients = myPatients.filter(p => p.status === 'critical');

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Doctor Dashboard</h1>
        <p className="text-slate-400">Welcome back, Dr. Sarah Johnson</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="My Patients"
          value={myPatients.length}
          change="+3 new"
          changeType="positive"
          icon={Users}
          color="bg-gradient-to-br from-cyan-500 to-blue-600"
          trend="up"
        />
        <StatCard
          title="Today's Appointments"
          value={todayAppointments.length}
          change="2 in progress"
          changeType="neutral"
          icon={Calendar}
          color="bg-gradient-to-br from-purple-500 to-pink-600"
          trend="stable"
        />
        <StatCard
          title="Pending Prescriptions"
          value={pendingPrescriptions.length}
          icon={FileText}
          color="bg-gradient-to-br from-amber-500 to-orange-600"
          trend="down"
        />
        <StatCard
          title="Critical Patients"
          value={criticalPatients.length}
          icon={AlertCircle}
          color="bg-gradient-to-br from-red-500 to-pink-600"
          trend="stable"
        />
      </div>

      {/* Charts & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointment Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3>Appointment Trends</h3>
              <p className="text-sm text-slate-400 mt-1">Last 7 days</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={appointmentTrendData}>
              <defs>
                <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="appointments"
                stroke="#06b6d4"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAppointments)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <h3 className="mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 smooth-transition border border-white/10 hover:border-cyan-500/50">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm">Add Patient</p>
                <p className="text-xs text-slate-400">Register new patient</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 smooth-transition border border-white/10 hover:border-purple-500/50">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm">Write Prescription</p>
                <p className="text-xs text-slate-400">Create new prescription</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 smooth-transition border border-white/10 hover:border-teal-500/50">
              <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-teal-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm">Request Lab Test</p>
                <p className="text-xs text-slate-400">Order laboratory tests</p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Today's Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3>Today's Appointments</h3>
            <p className="text-sm text-slate-400 mt-1">{todayAppointments.length} scheduled</p>
          </div>
          <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-xl smooth-transition text-white">
            View All
          </button>
        </div>

        <div className="space-y-3">
          {todayAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 smooth-transition border border-white/10"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm">{appointment.patientName}</p>
                <p className="text-xs text-slate-400">
                  {new Date(appointment.dateTime).toLocaleTimeString()} • {appointment.type}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    appointment.status === 'in-progress'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}
                >
                  {appointment.status}
                </span>
                <button className="p-2 hover:bg-white/10 rounded-lg smooth-transition">
                  <CheckCircle className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* My Patients */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3>My Patients</h3>
            <p className="text-sm text-slate-400 mt-1">Currently under your care</p>
          </div>
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl smooth-transition border border-white/10">
            View All
          </button>
        </div>
        <PatientTable patients={myPatients} />
      </motion.div>
    </div>
  );
}
