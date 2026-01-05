"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, AlertTriangle, Info, CheckCircle2, Trash2, Eye, EyeOff, Filter, X, Zap } from "lucide-react";

const mockAlerts = [
  { id: 1, title: "High Traffic Detected", description: "Requests exceeded 10,000 req/s threshold", severity: "critical", type: "traffic", status: "active", timestamp: new Date(Date.now() - 5 * 60000), endpoint: "/api/v1/cdn", affectedServices: "CDN Cache Layer" },
  { id: 2, title: "Cache Hit Ratio Low", description: "Cache hit ratio dropped to 45%, expected 75%+", severity: "warning", type: "cache", status: "active", timestamp: new Date(Date.now() - 15 * 60000), endpoint: "/api/v1/cache", affectedServices: "Cache Manager" },
  { id: 3, title: "DDoS Attack Detected", description: "Detected 50,000+ requests from single IP range", severity: "critical", type: "security", status: "resolved", timestamp: new Date(Date.now() - 1 * 60 * 60000), endpoint: "/api/v1/security", affectedServices: "WAF Protection" },
  { id: 4, title: "SSL Certificate Expiring", description: "SSL certificate expires in 7 days", severity: "high", type: "certificate", status: "active", timestamp: new Date(Date.now() - 2 * 60 * 60000), endpoint: "/api/v1/certs", affectedServices: "SSL/TLS Manager" },
  { id: 5, title: "Origin Server Slow Response", description: "Average response time 2500ms (threshold: 1000ms)", severity: "warning", type: "performance", status: "active", timestamp: new Date(Date.now() - 30 * 60000), endpoint: "/api/v1/origin", affectedServices: "Origin Health Monitor" },
  { id: 6, title: "Firewall Rule Updated", description: "Firewall rule #42 updated by admin", severity: "info", type: "configuration", status: "resolved", timestamp: new Date(Date.now() - 3 * 60 * 60000), endpoint: "/api/v1/firewall", affectedServices: "Security Config" },
  { id: 7, title: "Bandwidth Quota Reached", description: "Monthly bandwidth quota at 92%", severity: "high", type: "quota", status: "active", timestamp: new Date(Date.now() - 45 * 60000), endpoint: "/api/v1/billing", affectedServices: "Billing Manager" },
];

const getSeverityIcon = (severity) => {
  switch (severity) {
    case "critical": return <AlertCircle className="text-[#fca5a5]" size={18} />;
    case "high": return <AlertTriangle className="text-[#fed7aa]" size={18} />;
    case "warning": return <AlertTriangle className="text-[#fef08a]" size={18} />;
    case "info": return <Info className="text-[#a5f3fc]" size={18} />;
    default: return <CheckCircle2 className="text-[#a7f3d0]" size={18} />;
  }
};

const getSeverityBadgeColor = (severity) => {
  switch (severity) {
    case "critical": return "bg-[#ef4444]/15 text-[#fca5a5] border-[#fca5a5]/40";
    case "high": return "bg-[#f97316]/15 text-[#fed7aa] border-[#fed7aa]/40";
    case "warning": return "bg-[#eab308]/15 text-[#fef08a] border-[#fef08a]/40";
    case "info": return "bg-[#0ea5e9]/15 text-[#a5f3fc] border-[#a5f3fc]/40";
    default: return "bg-[#0ea5e9]/15 text-[#a5f3fc] border-[#a5f3fc]/40";
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "active": return "bg-[#ef4444]/10 text-[#fca5a5] border-[#fca5a5]/30";
    case "resolved": return "bg-[#10b981]/10 text-[#a7f3d0] border-[#a7f3d0]/30";
    default: return "bg-[#6b7280]/10 text-[#d1d5db] border-[#d1d5db]/30";
  }
};

const formatTime = (date) => {
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filteredAlerts, setFilteredAlerts] = useState(mockAlerts);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());
  const [expandedAlert, setExpandedAlert] = useState(null);

  useEffect(() => {
    let filtered = alerts.filter((alert) => !dismissedAlerts.has(alert.id));
    if (searchTerm) {
      filtered = filtered.filter(
        (alert) =>
          alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.affectedServices.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (severityFilter !== "all") {
      filtered = filtered.filter((alert) => alert.severity === severityFilter);
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((alert) => alert.status === statusFilter);
    }
    setFilteredAlerts(filtered);
  }, [searchTerm, severityFilter, statusFilter, alerts, dismissedAlerts]);

  const resolveAlert = (id) => {
    setAlerts((prev) => prev.map((alert) => alert.id === id ? { ...alert, status: "resolved" } : alert));
  };

  const deleteAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const toggleExpand = (id) => {
    setExpandedAlert(expandedAlert === id ? null : id);
  };

  const criticalCount = alerts.filter((a) => a.severity === "critical" && !dismissedAlerts.has(a.id)).length;
  const activeCount = alerts.filter((a) => a.status === "active" && !dismissedAlerts.has(a.id)).length;
  const totalCount = alerts.filter((a) => !dismissedAlerts.has(a.id)).length;

  return (
    <div className="p-2 sm:p-6 space-y-6 bg-gradient-to-b from-[#0B1120] via-[#0f172a] to-[#0B1120] min-h-screen">
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Alerts</h1>
            <p className="text-slate-400 mt-2 text-sm sm:text-base">Monitor and manage system alerts in real-time</p>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex gap-3 sm:gap-4">
            <div className="bg-gradient-to-br from-[#1e293b]/60 to-[#0f172a]/60 border border-[#0ea5e9]/30 rounded-full px-4 py-2 flex items-center gap-2 backdrop-blur-sm">
              <Zap size={16} className="text-[#0ea5e9]" />
              <div>
                <div className="text-lg sm:text-xl font-bold text-white">{activeCount}</div>
                <div className="text-xs text-slate-400">Active</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1e293b]/60 to-[#0f172a]/60 border border-[#fca5a5]/30 rounded-full px-4 py-2 flex items-center gap-2 backdrop-blur-sm">
              <AlertCircle size={16} className="text-[#fca5a5]" />
              <div>
                <div className="text-lg sm:text-xl font-bold text-white">{criticalCount}</div>
                <div className="text-xs text-slate-400">Critical</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total", value: totalCount, borderColor: "border-[#0ea5e9]/30", iconColor: "text-[#0ea5e9]", bgGradient: "from-[#0ea5e9]/5 to-[#06b6d4]/5" },
          { label: "Critical", value: criticalCount, borderColor: "border-[#fca5a5]/30", iconColor: "text-[#fca5a5]", bgGradient: "from-[#fca5a5]/5 to-[#f87171]/5" },
          { label: "Active", value: activeCount, borderColor: "border-[#fed7aa]/30", iconColor: "text-[#fed7aa]", bgGradient: "from-[#fed7aa]/5 to-[#fdba74]/5" },
          { label: "Resolved", value: alerts.filter((a) => a.status === "resolved").length, borderColor: "border-[#a7f3d0]/30", iconColor: "text-[#a7f3d0]", bgGradient: "from-[#a7f3d0]/5 to-[#6ee7b7]/5" },
        ].map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 + idx * 0.05 }} whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(14, 165, 233, 0.1)" }}>
            <Card className={`bg-gradient-to-br ${stat.bgGradient} border ${stat.borderColor} backdrop-blur-md rounded-2xl text-white overflow-hidden hover:border-opacity-60 transition-all duration-300`}>
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs sm:text-sm text-slate-400 font-medium">{stat.label}</div>
                    <div className="text-2xl sm:text-3xl font-bold mt-1">{stat.value}</div>
                  </div>
                  <Zap size={24} className={stat.iconColor} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-gradient-to-br from-[#0f172a]/40 to-[#1e293b]/40 border border-[#0ea5e9]/20 rounded-2xl p-4 sm:p-5 space-y-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-white">
          <Filter size={20} className="text-[#0ea5e9]" />
          <span className="font-semibold">Filters</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div whileFocus={{ scale: 1.02 }}>
            <Input placeholder="Search alerts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-[#0f172a]/60 border-[#0ea5e9]/20 text-white placeholder-slate-500 rounded-xl focus:border-[#0ea5e9]/50 focus:ring-0 transition-colors" />
          </motion.div>
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="bg-[#0f172a]/60 border-[#0ea5e9]/20 text-white rounded-xl focus:border-[#0ea5e9]/50">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f172a] border-[#0ea5e9]/20 rounded-xl">
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-[#0f172a]/60 border-[#0ea5e9]/20 text-white rounded-xl focus:border-[#0ea5e9]/50">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f172a] border-[#0ea5e9]/20 rounded-xl">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {(searchTerm || severityFilter !== "all" || statusFilter !== "all") && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex flex-wrap gap-2 pt-3 border-t border-[#0ea5e9]/10">
            {searchTerm && (
              <motion.div whileHover={{ scale: 1.05 }} className="bg-[#0ea5e9]/20 text-[#a5f3fc] border border-[#0ea5e9]/30 rounded-full px-3 py-1 flex items-center gap-2 text-sm">
                🔍 {searchTerm}
                <X size={14} className="cursor-pointer hover:text-white" onClick={() => setSearchTerm("")} />
              </motion.div>
            )}
            {severityFilter !== "all" && (
              <motion.div whileHover={{ scale: 1.05 }} className="bg-[#0ea5e9]/20 text-[#a5f3fc] border border-[#0ea5e9]/30 rounded-full px-3 py-1 flex items-center gap-2 text-sm">
                📊 {severityFilter}
                <X size={14} className="cursor-pointer hover:text-white" onClick={() => setSeverityFilter("all")} />
              </motion.div>
            )}
            {statusFilter !== "all" && (
              <motion.div whileHover={{ scale: 1.05 }} className="bg-[#0ea5e9]/20 text-[#a5f3fc] border border-[#0ea5e9]/30 rounded-full px-3 py-1 flex items-center gap-2 text-sm">
                ✓ {statusFilter}
                <X size={14} className="cursor-pointer hover:text-white" onClick={() => setStatusFilter("all")} />
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }} className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert, index) => (
              <motion.div key={alert.id} layoutId={`alert-${alert.id}`} initial={{ opacity: 0, x: -30, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 30, scale: 0.95 }} transition={{ duration: 0.3, delay: index * 0.05, type: "spring", stiffness: 300, damping: 30 }} whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(14, 165, 233, 0.1)" }}>
                <Card className="bg-gradient-to-br from-[#0f172a]/50 to-[#1e293b]/50 border border-[#0ea5e9]/20 hover:border-[#0ea5e9]/40 backdrop-blur-md rounded-2xl text-white overflow-hidden transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex gap-4 p-4 sm:p-5">
                      <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }} className="flex-shrink-0 flex items-start justify-center pt-1">
                        {getSeverityIcon(alert.severity)}
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-base sm:text-lg leading-tight">{alert.title}</h3>
                            <p className="text-slate-400 text-sm mt-1.5 line-clamp-2">{alert.description}</p>
                          </div>
                          <div className="flex gap-2 flex-wrap justify-end flex-shrink-0">
                            <motion.div whileHover={{ scale: 1.05 }} className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border capitalize ${getSeverityBadgeColor(alert.severity)}`}>
                              {alert.severity}
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border capitalize ${getStatusColor(alert.status)}`}>
                              {alert.status}
                            </motion.div>
                          </div>
                        </div>
                        <AnimatePresence>
                          {expandedAlert === alert.id && (
                            <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: "auto", marginTop: 16 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} transition={{ duration: 0.3 }} className="pt-4 border-t border-[#0ea5e9]/10 space-y-3">
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                                  <span className="text-slate-500 text-xs">Type</span>
                                  <p className="text-[#a5f3fc] font-medium capitalize mt-1">{alert.type}</p>
                                </motion.div>
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                  <span className="text-slate-500 text-xs">Service</span>
                                  <p className="text-white font-medium mt-1">{alert.affectedServices}</p>
                                </motion.div>
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                                  <span className="text-slate-500 text-xs">Endpoint</span>
                                  <p className="text-[#a5f3fc] font-mono text-xs mt-1 break-all">{alert.endpoint}</p>
                                </motion.div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                          <span className="font-medium">{formatTime(alert.timestamp)}</span>
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => toggleExpand(alert.id)} className="text-[#a5f3fc] hover:text-[#0ea5e9] flex items-center gap-1 transition-colors">
                            {expandedAlert === alert.id ? (
                              <><EyeOff size={14} /> Hide</>
                            ) : (
                              <><Eye size={14} /> Show</>
                            )}
                          </motion.button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        {alert.status === "active" && (
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => resolveAlert(alert.id)} className="border border-[#a7f3d0]/40 bg-[#10b981]/10 text-[#a7f3d0] hover:bg-[#10b981]/20 text-xs h-8 px-3 rounded-lg font-medium transition-colors flex items-center gap-1 justify-center">
                            <CheckCircle2 size={14} />
                            <span className="hidden sm:inline">Resolve</span>
                          </motion.button>
                        )}
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => deleteAlert(alert.id)} className="border border-[#fca5a5]/40 bg-[#ef4444]/10 text-[#fca5a5] hover:bg-[#ef4444]/20 text-xs h-8 px-3 rounded-lg font-medium transition-colors flex items-center gap-1 justify-center">
                          <Trash2 size={14} />
                          <span className="hidden sm:inline">Delete</span>
                        </motion.button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="flex flex-col items-center justify-center py-12 sm:py-16 bg-gradient-to-br from-[#0f172a]/40 to-[#1e293b]/40 border border-[#0ea5e9]/20 rounded-2xl backdrop-blur-sm">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <CheckCircle2 className="text-[#a7f3d0] mb-4" size={48} />
              </motion.div>
              <h3 className="text-white font-semibold text-lg">All clear!</h3>
              <p className="text-slate-400 mt-1 text-sm">No alerts to display</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
