import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color: string;
  trend?: 'up' | 'down' | 'stable';
}

export function StatCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon, 
  color,
  trend
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 smooth-transition group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-400 mb-2">{title}</p>
          <h3 className="text-3xl mb-2">{value}</h3>
          {change && (
            <div className="flex items-center gap-1">
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  changeType === 'positive'
                    ? 'bg-green-500/20 text-green-400'
                    : changeType === 'negative'
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-slate-500/20 text-slate-400'
                }`}
              >
                {change}
              </span>
              <span className="text-xs text-slate-500">vs last period</span>
            </div>
          )}
        </div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 smooth-transition ${color}`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {/* Trend indicator */}
      {trend && (
        <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '70%' }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={`h-full ${
              trend === 'up'
                ? 'bg-green-500'
                : trend === 'down'
                ? 'bg-red-500'
                : 'bg-slate-500'
            }`}
          />
        </div>
      )}
    </motion.div>
  );
}
