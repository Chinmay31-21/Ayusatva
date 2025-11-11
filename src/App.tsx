import React, { useEffect } from 'react';
import { useStore } from './store/useStore';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { DoctorDashboard } from './components/dashboards/DoctorDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { NurseDashboard } from './components/dashboards/NurseDashboard';
import { ChemistDashboard } from './components/dashboards/ChemistDashboard';
import { LabDashboard } from './components/dashboards/LabDashboard';
import { PatientDashboard } from './components/dashboards/PatientDashboard';
import { AttendantDashboard } from './components/dashboards/AttendantDashboard';
import { Toaster } from './components/ui/sonner';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { currentRole, sidebarOpen, darkMode } = useStore();

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Render appropriate dashboard based on role
  const renderDashboard = () => {
    switch (currentRole) {
      case 'admin':
        return <AdminDashboard key="admin" />;
      case 'doctor':
        return <DoctorDashboard key="doctor" />;
      case 'nurse':
        return <NurseDashboard key="nurse" />;
      case 'chemist':
        return <ChemistDashboard key="chemist" />;
      case 'lab':
        return <LabDashboard key="lab" />;
      case 'patient':
        return <PatientDashboard key="patient" />;
      case 'attendant':
        return <AttendantDashboard key="attendant" />;
      default:
        return <DoctorDashboard key="default" />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderDashboard()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="glass border-t border-white/10 px-6 py-4">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <p>© 2025 MediCare Hospital Management System</p>
            <div className="flex items-center gap-4">
              <button className="hover:text-slate-200 smooth-transition">Help</button>
              <button className="hover:text-slate-200 smooth-transition">Privacy</button>
              <button className="hover:text-slate-200 smooth-transition">Terms</button>
            </div>
          </div>
        </footer>
      </div>

      {/* Toast Notifications */}
      <Toaster position="top-right" />
    </div>
  );
}
