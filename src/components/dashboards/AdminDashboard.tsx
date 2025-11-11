import React from 'react';
import { useStore } from '../../store/useStore';
import { StatCard } from '../StatCard';
import { 
  Users, 
  Activity, 
  DollarSign, 
  Bed,
  TrendingUp,
  Building2,
  UserCheck,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 125000 },
  { month: 'Feb', revenue: 142000 },
  { month: 'Mar', revenue: 138000 },
  { month: 'Apr', revenue: 156000 },
  { month: 'May', revenue: 163000 },
  { month: 'Jun', revenue: 175000 }
];

const departmentData = [
  { name: 'Cardiology', patients: 45, color: '#06b6d4' },
  { name: 'Neurology', patients: 32, color: '#8b5cf6' },
  { name: 'Orthopedics', patients: 28, color: '#ec4899' },
  { name: 'Pediatrics', patients: 38, color: '#f59e0b' },
  { name: 'ICU', patients: 12, color: '#14b8a6' }
];

export function AdminDashboard() {
  const { patients, dashboardStats, departments, rooms } = useStore();

  const totalBeds = rooms.reduce((sum, room) => sum + room.capacity, 0);
  const occupiedBeds = rooms.reduce((sum, room) => sum + room.occupied, 0);
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Admin Dashboard</h1>
        <p className="text-slate-400">Hospital Management Overview</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value={dashboardStats.totalPatients}
          change="+12.5%"
          changeType="positive"
          icon={Users}
          color="bg-gradient-to-br from-violet-500 to-purple-600"
          trend="up"
        />
        <StatCard
          title="Active Patients"
          value={dashboardStats.activePatients}
          change="+8.3%"
          changeType="positive"
          icon={Activity}
          color="bg-gradient-to-br from-cyan-500 to-blue-600"
          trend="up"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${(dashboardStats.revenueMonth / 1000).toFixed(0)}K`}
          change="+15.2%"
          changeType="positive"
          icon={DollarSign}
          color="bg-gradient-to-br from-green-500 to-emerald-600"
          trend="up"
        />
        <StatCard
          title="Bed Occupancy"
          value={`${occupancyRate}%`}
          change="-3.1%"
          changeType="negative"
          icon={Bed}
          color="bg-gradient-to-br from-amber-500 to-orange-600"
          trend="down"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3>Revenue Trends</h3>
              <p className="text-sm text-slate-400 mt-1">Last 6 months</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="revenue" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3>Patient Distribution</h3>
              <p className="text-sm text-slate-400 mt-1">By department</p>
            </div>
            <Building2 className="w-5 h-5 text-violet-400" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="patients"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Departments Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3>Departments Overview</h3>
            <p className="text-sm text-slate-400 mt-1">{departments.length} active departments</p>
          </div>
          <button className="px-4 py-2 bg-violet-500 hover:bg-violet-600 rounded-xl smooth-transition text-white">
            Manage Departments
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-xl border border-white/10 hover:bg-white/5 smooth-transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-violet-400" />
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    (dept.occupiedBeds / dept.totalBeds) > 0.8
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}
                >
                  {Math.round((dept.occupiedBeds / dept.totalBeds) * 100)}% occupied
                </span>
              </div>
              <h4 className="mb-1">{dept.name}</h4>
              <p className="text-xs text-slate-400 mb-3">Head: {dept.head}</p>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-slate-500">Doctors</p>
                  <p className="text-sm">{dept.totalDoctors}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Nurses</p>
                  <p className="text-sm">{dept.totalNurses}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Beds</p>
                  <p className="text-sm">{dept.totalBeds}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Floor</p>
                  <p className="text-sm">{dept.floor}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Today's Appointments</p>
              <h3 className="text-2xl">{dashboardStats.todayAppointments}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Staff on Duty</p>
              <h3 className="text-2xl">
                {departments.reduce((sum, d) => sum + d.totalDoctors + d.totalNurses, 0)}
              </h3>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Critical Patients</p>
              <h3 className="text-2xl">{dashboardStats.criticalPatients}</h3>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
