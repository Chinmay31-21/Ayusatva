import React from 'react';
import { Patient } from '../utils/types';
import { motion } from 'motion/react';
import { Eye, Edit, MoreVertical, Activity } from 'lucide-react';

interface PatientTableProps {
  patients: Patient[];
  onPatientClick?: (patient: Patient) => void;
}

export function PatientTable({ patients, onPatientClick }: PatientTableProps) {
  const getStatusColor = (status: Patient['status']) => {
    switch (status) {
      case 'critical':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'admitted':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'stable':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'discharged':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      case 'outpatient':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="glass rounded-2xl border border-white/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400">
                Patient ID
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400">
                Age/Gender
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400">
                Room
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400">
                Doctor
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-wider text-slate-400">
                Diagnosis
              </th>
              <th className="px-6 py-4 text-right text-xs uppercase tracking-wider text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {patients.map((patient, index) => (
              <motion.tr
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-white/5 smooth-transition cursor-pointer"
                onClick={() => onPatientClick?.(patient)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-slate-400">{patient.id}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm">{patient.name}</p>
                      <p className="text-xs text-slate-400">{patient.contact}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm">{patient.age}Y / {patient.gender}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border ${getStatusColor(
                      patient.status
                    )}`}
                  >
                    {patient.status === 'critical' && (
                      <Activity className="w-3 h-3 pulse-glow" />
                    )}
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm">{patient.roomNumber || '-'}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm">{patient.assignedDoctor || '-'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-300">{patient.diagnosis || '-'}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPatientClick?.(patient);
                      }}
                      className="p-2 hover:bg-white/10 rounded-lg smooth-transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 hover:bg-white/10 rounded-lg smooth-transition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 hover:bg-white/10 rounded-lg smooth-transition"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
