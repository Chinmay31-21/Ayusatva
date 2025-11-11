import React from 'react';
import { useStore } from '../store/useStore';
import { getRoleConfig, roleLabels } from '../utils/roleConfig';
import { 
  Menu, 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  ChevronDown,
  UserCircle,
  LogOut,
  Settings,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserRole } from '../utils/types';

export function TopNavbar() {
  const { 
    sidebarOpen, 
    toggleSidebar, 
    currentRole, 
    setCurrentRole,
    currentUser,
    notifications,
    darkMode,
    toggleDarkMode,
    commandPaletteOpen,
    toggleCommandPalette
  } = useStore();

  const [roleDropdownOpen, setRoleDropdownOpen] = React.useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = React.useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);

  const config = getRoleConfig(currentRole);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleRoleSwitch = (role: UserRole) => {
    setCurrentRole(role);
    setRoleDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 glass border-b border-white/10 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-white/5 rounded-lg smooth-transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <button
            onClick={toggleCommandPalette}
            className="hidden md:flex items-center gap-2 px-4 py-2 glass rounded-xl hover:bg-white/5 smooth-transition min-w-[300px]"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400">Search patients, records...</span>
            <kbd className="ml-auto px-2 py-0.5 text-xs bg-white/10 rounded">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl glass hover:bg-white/5 smooth-transition border ${config.color.border}`}
            >
              <div className={`w-2 h-2 rounded-full ${config.color.bg}`} />
              <span className="text-sm hidden sm:inline">{config.label}</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {roleDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 glass border border-white/10 rounded-xl shadow-xl overflow-hidden"
                >
                  {(Object.keys(roleLabels) as UserRole[]).map((role) => {
                    const roleConfig = getRoleConfig(role);
                    return (
                      <button
                        key={role}
                        onClick={() => handleRoleSwitch(role)}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 smooth-transition text-left ${
                          role === currentRole ? 'bg-white/10' : ''
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${roleConfig.color.bg}`} />
                        <span className="text-sm">{roleConfig.label}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 hover:bg-white/5 rounded-lg smooth-transition"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
              className="relative p-2 hover:bg-white/5 rounded-lg smooth-transition"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full pulse-glow" />
              )}
            </button>

            <AnimatePresence>
              {notificationDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-96 glass border border-white/10 rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <h3>Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-slate-400 text-sm">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-white/5 hover:bg-white/5 smooth-transition ${
                            !notification.read ? 'bg-white/5' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-1.5 ${
                                notification.type === 'error'
                                  ? 'bg-red-500'
                                  : notification.type === 'warning'
                                  ? 'bg-amber-500'
                                  : notification.type === 'success'
                                  ? 'bg-green-500'
                                  : 'bg-blue-500'
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm">{notification.title}</p>
                              <p className="text-xs text-slate-400 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-slate-500 mt-1">
                                {new Date(notification.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1.5 hover:bg-white/5 rounded-lg smooth-transition"
            >
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className={`w-8 h-8 rounded-full ${config.color.bg} flex items-center justify-center`}>
                  <UserCircle className="w-5 h-5 text-white" />
                </div>
              )}
            </button>

            <AnimatePresence>
              {profileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 glass border border-white/10 rounded-xl shadow-xl overflow-hidden"
                >
                  <div className="p-4 border-b border-white/10">
                    <p className="text-sm">{currentUser?.name || 'User'}</p>
                    <p className="text-xs text-slate-400">{currentUser?.email}</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg smooth-transition text-left">
                      <User className="w-4 h-4" />
                      <span className="text-sm">Profile</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg smooth-transition text-left">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Settings</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg smooth-transition text-left text-red-400">
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
