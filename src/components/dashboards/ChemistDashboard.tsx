import React from 'react';
import { useStore } from '../../store/useStore';
import { StatCard } from '../StatCard';
import { 
  FileText, 
  Package, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Pill
} from 'lucide-react';
import { motion } from 'motion/react';

export function ChemistDashboard() {
  const { prescriptions } = useStore();

  const pendingPrescriptions = prescriptions.filter(p => p.status === 'pending');
  const dispensedToday = prescriptions.filter(p => p.status === 'dispensed').length;
  const totalMedications = prescriptions.reduce((sum, p) => sum + p.medications.length, 0);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Pharmacy Dashboard</h1>
        <p className="text-slate-400">Prescription Management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pending Prescriptions"
          value={pendingPrescriptions.length}
          icon={FileText}
          color="bg-gradient-to-br from-amber-500 to-orange-600"
          trend="stable"
        />
        <StatCard
          title="Dispensed Today"
          value={dispensedToday}
          change="+12 filled"
          changeType="positive"
          icon={CheckCircle}
          color="bg-gradient-to-br from-green-500 to-emerald-600"
          trend="up"
        />
        <StatCard
          title="Low Stock Items"
          value={8}
          change="2 critical"
          changeType="negative"
          icon={AlertTriangle}
          color="bg-gradient-to-br from-red-500 to-pink-600"
          trend="up"
        />
        <StatCard
          title="Total Medications"
          value={totalMedications}
          icon={Package}
          color="bg-gradient-to-br from-purple-500 to-pink-600"
          trend="stable"
        />
      </div>

      {/* Pending Prescriptions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3>Pending Prescriptions</h3>
            <p className="text-sm text-slate-400 mt-1">{pendingPrescriptions.length} awaiting dispensing</p>
          </div>
          <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-xl smooth-transition text-white">
            Process Queue
          </button>
        </div>

        <div className="space-y-4">
          {pendingPrescriptions.map((prescription, index) => (
            <motion.div
              key={prescription.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-xl border border-white/10 hover:bg-white/5 smooth-transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4>{prescription.patientName}</h4>
                    <p className="text-sm text-slate-400">ID: {prescription.id}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Prescribed by {prescription.doctorName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(prescription.date).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Medications List */}
              <div className="space-y-2 mb-4">
                {prescription.medications.map((medication) => (
                  <div
                    key={medication.id}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Pill className="w-4 h-4 text-amber-400" />
                      <div>
                        <p className="text-sm">{medication.name}</p>
                        <p className="text-xs text-slate-400">
                          {medication.dosage} • {medication.frequency} • {medication.duration}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Qty: {medication.quantity}</p>
                      {medication.dispensed && (
                        <span className="text-xs text-green-400">✓ Dispensed</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Diagnosis & Instructions */}
              <div className="p-3 bg-white/5 rounded-lg mb-4">
                <p className="text-xs text-slate-400 mb-1">Diagnosis</p>
                <p className="text-sm">{prescription.diagnosis}</p>
                {prescription.instructions && (
                  <>
                    <p className="text-xs text-slate-400 mt-2 mb-1">Special Instructions</p>
                    <p className="text-sm">{prescription.instructions}</p>
                  </>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg smooth-transition text-white text-sm">
                  Dispense All
                </button>
                <button className="flex-1 px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg smooth-transition text-sm">
                  Partial Dispense
                </button>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg smooth-transition text-sm">
                  Print Label
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Low Stock Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 border border-red-500/30"
      >
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <div>
            <h3>Low Stock Alert</h3>
            <p className="text-sm text-slate-400">Items requiring reorder</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: 'Paracetamol 500mg', stock: 45, min: 100 },
            { name: 'Amoxicillin 250mg', stock: 28, min: 100 },
            { name: 'Ibuprofen 400mg', stock: 62, min: 100 },
            { name: 'Metformin 500mg', stock: 15, min: 100 },
          ].map((item, index) => (
            <div
              key={index}
              className="p-3 rounded-lg border border-red-500/20 bg-red-500/5"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm">{item.name}</p>
                <span className="text-xs text-red-400">
                  {item.stock < 30 ? 'Critical' : 'Low'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Current: {item.stock}</span>
                <span className="text-slate-400">Min: {item.min}</span>
              </div>
              <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500"
                  style={{ width: `${(item.stock / item.min) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
