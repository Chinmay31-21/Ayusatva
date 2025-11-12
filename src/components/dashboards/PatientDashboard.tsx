import React from 'react';
import { useStore } from '../../store/useStore';
import { StatCard } from '../StatCard';
import { 
  Calendar, 
  FileText, 
  Pill, 
  FlaskConical,
  CreditCard,
  Heart
} from 'lucide-react';
import { motion } from 'motion/react';

export function PatientDashboard() {
  const { appointments, prescriptions, labTests, billingRecords } = useStore();

  // For demo, we'll show data for patient P001
  const myAppointments = appointments.filter(a => a.patientId === 'P001');
  const myPrescriptions = prescriptions.filter(p => p.patientId === 'P001');
  const myLabTests = labTests.filter(t => t.patientId === 'P001');
  const myBilling = billingRecords.filter(b => b.patientId === 'P001')[0];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Patient Portal</h1>
        <p className="text-slate-400">Welcome, Shravani Harel</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Upcoming Appointments"
          value={myAppointments.length}
          icon={Calendar}
          color="bg-gradient-to-br from-indigo-500 to-blue-600"
          trend="stable"
        />
        <StatCard
          title="Active Prescriptions"
          value={myPrescriptions.length}
          icon={Pill}
          color="bg-gradient-to-br from-purple-500 to-pink-600"
          trend="stable"
        />
        <StatCard
          title="Lab Results"
          value={myLabTests.filter(t => t.status === 'completed').length}
          change={`${myLabTests.filter(t => t.status === 'pending').length} pending`}
          changeType="neutral"
          icon={FlaskConical}
          color="bg-gradient-to-br from-teal-500 to-cyan-600"
          trend="stable"
        />
        <StatCard
          title="Outstanding Bill"
          value={`$${(myBilling?.pendingAmount || 0).toLocaleString()}`}
          icon={CreditCard}
          color="bg-gradient-to-br from-amber-500 to-orange-600"
          trend="stable"
        />
      </div>

      {/* Health Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3>Health Summary</h3>
            <p className="text-sm text-slate-400">Current status & vitals</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-slate-400 mb-1">Current Status</p>
            <p className="text-lg">Admitted - ICU</p>
            <p className="text-xs text-slate-500 mt-1">Room: ICU-101</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-slate-400 mb-1">Primary Doctor</p>
            <p className="text-lg">Dr. Sarah Johnson</p>
            <p className="text-xs text-slate-500 mt-1">Cardiology</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-slate-400 mb-1">Admission Date</p>
            <p className="text-lg">Jan 10, 2025</p>
            <p className="text-xs text-slate-500 mt-1">10 days ago</p>
          </div>
        </div>
      </motion.div>

      {/* Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6 border border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3>My Appointments</h3>
            <p className="text-sm text-slate-400 mt-1">{myAppointments.length} scheduled</p>
          </div>
          <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl smooth-transition text-white text-sm">
            Book Appointment
          </button>
        </div>

        <div className="space-y-3">
          {myAppointments.map((appointment, index) => (
            <div
              key={appointment.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:bg-white/5 smooth-transition"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm">{appointment.doctorName}</p>
                <p className="text-xs text-slate-400">
                  {new Date(appointment.dateTime).toLocaleString()} • {appointment.type}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                {appointment.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Prescriptions & Lab Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prescriptions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3>My Prescriptions</h3>
              <p className="text-sm text-slate-400 mt-1">{myPrescriptions.length} active</p>
            </div>
          </div>

          <div className="space-y-3">
            {myPrescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="p-4 rounded-xl border border-white/10"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Pill className="w-4 h-4 text-purple-400" />
                  <p className="text-sm">{prescription.diagnosis}</p>
                </div>
                <div className="space-y-2">
                  {prescription.medications.map((med) => (
                    <div key={med.id} className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">{med.name}</span>
                      <span className="text-slate-400">{med.dosage} • {med.frequency}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Prescribed: {new Date(prescription.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Lab Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3>Lab Results</h3>
              <p className="text-sm text-slate-400 mt-1">{myLabTests.length} tests</p>
            </div>
          </div>

          <div className="space-y-3">
            {myLabTests.map((test) => (
              <div
                key={test.id}
                className="p-4 rounded-xl border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-teal-400" />
                    <p className="text-sm">{test.testName}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      test.status === 'completed'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {test.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-2">
                  Requested: {new Date(test.requestDate).toLocaleDateString()}
                </p>
                {test.results && (
                  <div className="p-2 bg-white/5 rounded text-xs text-slate-300">
                    {test.results}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Billing */}
      {myBilling && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3>Billing Summary</h3>
              <p className="text-sm text-slate-400 mt-1">Current hospitalization</p>
            </div>
            <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-xl smooth-transition text-white text-sm">
              Make Payment
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm text-slate-400 mb-1">Total Amount</p>
              <p className="text-2xl">${myBilling.totalAmount.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm text-slate-400 mb-1">Paid</p>
              <p className="text-2xl text-green-400">${myBilling.paidAmount.toLocaleString()}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm text-slate-400 mb-1">Outstanding</p>
              <p className="text-2xl text-amber-400">${myBilling.pendingAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="space-y-2">
            {myBilling.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5"
              >
                <div>
                  <p className="text-sm">{item.description}</p>
                  <p className="text-xs text-slate-400">
                    {item.quantity} × ${item.unitPrice}
                  </p>
                </div>
                <p className="text-sm">${item.totalPrice.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
