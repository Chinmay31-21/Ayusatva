import React from 'react';
import { useStore } from '../store/useStore';
import { getRoleConfig } from '../utils/roleConfig';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Sidebar() {
  const { sidebarOpen, toggleSidebar, currentRole } = useStore();
  const config = getRoleConfig(currentRole);

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Mobile overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed left-0 top-0 h-full w-72 glass-dark border-r ${config.color.border} z-50 lg:sticky lg:top-0 flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className={`p-6 bg-gradient-to-r ${config.color.gradient} border-b border-white/10`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-6 h-6 rounded-lg bg-white" />
                  </div>
                  <div>
                    <h2 className="text-white">MediCare</h2>
                    <p className="text-xs text-white/70">{config.label} Portal</p>
                  </div>
                </div>
                <button
                  onClick={toggleSidebar}
                  className="lg:hidden p-2 hover:bg-white/10 rounded-lg smooth-transition"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              {config.navigation.map((item) => (
                <button
                  key={item.id}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 smooth-transition text-left group relative"
                >
                  <item.icon className={`w-5 h-5 ${config.color.text} group-hover:scale-110 smooth-transition`} />
                  <span className="flex-1 text-white/90 group-hover:text-white">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className={`${config.color.bg} text-white text-xs px-2 py-0.5 rounded-full`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
              <button
                onClick={toggleSidebar}
                className="hidden lg:flex w-full items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 smooth-transition text-white/70 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm">Collapse</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
