import React from 'react';
import { useStore } from '../../store/useStore';
import { StatCard } from '../StatCard';
import { 
  Users, 
  Bed, 
  CheckCircle, 
  ClipboardList,
  BedDouble
} from 'lucide-react';
import { motion } from 'motion/react';

export function AttendantDashboard() {
  const { patients, rooms } = useStore();

  const activePatients = patients.filter(p => p.status === 'admitted' || p.status === 'critical');
  const roomsToClean = rooms.filter(r => r.status === 'maintenance').length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Attendant Dashboard</h1>
        <p className="text-slate-400">Patient Care & Room Management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Patients to Attend"
          value={activePatients.length}
          icon={Users}
          color="bg-gradient-to-br from-emerald-500 to-green-600"
          trend="stable"
        />
        <StatCard
          title="Rooms to Service"
          value={roomsToClean}
          icon={Bed}
          color="bg-gradient-to-br from-blue-500 to-cyan-600"
          trend="down"
        />
        <StatCard
          title="Tasks Completed"
          value={12}
          change="+4 today"
          changeType="positive"
          icon={CheckCircle}
          color="bg-gradient-to-br from-green-500 to-emerald-600"
          trend="up"
        />
        <StatCard
          title="Pending Tasks"
          value={8}
          icon={ClipboardList}
          color="bg-gradient-to-br from-amber-500 to-orange-600"
          trend="stable"
        />
      </div>

      {/* Room Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3>Room Status</h3>
            <p className="text-sm text-slate-400 mt-1">Manage room assignments and maintenance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-xl border ${
                room.status === 'occupied'
                  ? 'border-blue-500/20 bg-blue-500/5'
                  : room.status === 'available'
                  ? 'border-green-500/20 bg-green-500/5'
                  : 'border-amber-500/20 bg-amber-500/5'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BedDouble className="w-5 h-5 text-emerald-400" />
                  <h4>{room.roomNumber}</h4>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    room.status === 'occupied'
                      ? 'bg-blue-500/20 text-blue-400'
                      : room.status === 'available'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {room.status}
                </span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Type</span>
                  <span className="uppercase">{room.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Floor</span>
                  <span>{room.floor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Occupancy</span>
                  <span>{room.occupied}/{room.capacity}</span>
                </div>
              </div>
              {room.status === 'maintenance' && (
                <button className="w-full mt-3 px-3 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg smooth-transition text-white text-xs">
                  Mark as Clean
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Patient Care Tasks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3>Patient Care Tasks</h3>
            <p className="text-sm text-slate-400 mt-1">Daily assistance schedule</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { patient: 'John Doe', room: 'ICU-101', task: 'Meal assistance', time: '12:00 PM', status: 'pending' },
            { patient: 'Mary Smith', room: 'GEN-205', task: 'Room cleaning', time: '02:00 PM', status: 'pending' },
            { patient: 'Robert Taylor', room: 'ICU-103', task: 'Linen change', time: '03:00 PM', status: 'completed' },
            { patient: 'Lisa Anderson', room: 'PVT-301', task: 'Mobility assistance', time: '04:00 PM', status: 'pending' },
          ].map((task, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border border-white/10 ${
                task.status === 'completed' ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm">{task.patient}</h4>
                <span className="text-xs text-slate-400">{task.room}</span>
              </div>
              <p className="text-sm text-slate-300 mb-2">{task.task}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">{task.time}</span>
                {task.status === 'pending' ? (
                  <button className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg smooth-transition text-xs">
                    Complete
                  </button>
                ) : (
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Done
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
