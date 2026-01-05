"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle2,
  Trash2,
  Eye,
  EyeOff,
  Filter,
  X,
} from "lucide-react";

// Mock alerts data
const mockAlerts = [
  {
    id: 1,
    title: "High Traffic Detected",
    description: "Requests exceeded 10,000 req/s threshold",
    severity: "critical",
    type: "traffic",
    status: "active",
    timestamp: new Date(Date.now() - 5 * 60000),
    endpoint: "/api/v1/cdn",
    affectedServices: "CDN Cache Layer",
  },
  {
    id: 2,
    title: "Cache Hit Ratio Low",
    description: "Cache hit ratio dropped to 45%, expected 75%+",
    severity: "warning",
    type: "cache",
    status: "active",
    timestamp: new Date(Date.now() - 15 * 60000),
    endpoint: "/api/v1/cache",
    affectedServices: "Cache Manager",
  },
  {
    id: 3,
    title: "DDoS Attack Detected",
    description: "Detected 50,000+ requests from single IP range",
    severity: "critical",
    type: "security",
    status: "resolved",
    timestamp: new Date(Date.now() - 1 * 60 * 60000),
    endpoint: "/api/v1/security",
    affectedServices: "WAF Protection",
  },
  {
    id: 4,
    title: "SSL Certificate Expiring",
    description: "SSL certificate expires in 7 days",
    severity: "high",
    type: "certificate",
    status: "active",
    timestamp: new Date(Date.now() - 2 * 60 * 60000),
    endpoint: "/api/v1/certs",
    affectedServices: "SSL/TLS Manager",
  },
  {
    id: 5,
    title: "Origin Server Slow Response",
    description: "Average response time 2500ms (threshold: 1000ms)",
    severity: "warning",
    type: "performance",
    status: "active",
    timestamp: new Date(Date.now() - 30 * 60000),
    endpoint: "/api/v1/origin",
    affectedServices: "Origin Health Monitor",
  },
  {
    id: 6,
    title: "Firewall Rule Updated",
    description: "Firewall rule #42 updated by admin",
    severity: "info",
    type: "configuration",
    status: "resolved",
    timestamp: new Date(Date.now() - 3 * 60 * 60000),
    endpoint: "/api/v1/firewall",
    affectedServices: "Security Config",
  },
  {
    id: 7,
    title: "Bandwidth Quota Reached",
    description: "Monthly bandwidth quota at 92%",
    severity: "high",
    type: "quota",
    status: "active",
    timestamp: new Date(Date.now() - 45 * 60000),
    endpoint: "/api/v1/billing",
    affectedServices: "Billing Manager",
  },
];

// Severity icon mapping
const getSeverityIcon = (severity) => {
  switch (severity) {
    case "critical":
      return <AlertCircle className="text-red-500" size={18} />;
    case "high":
      return <AlertTriangle className="text-orange-500" size={18} />;
    case "warning":
      return <AlertTriangle className="text-yellow-500" size={18} />;
    case "info":
      return <Info className="text-blue-500" size={18} />;
    default:
      return <CheckCircle2 className="text-green-500" size={18} />;
  }
};

// Severity badge color
const getSeverityBadgeColor = (severity) => {
  switch (severity) {
    case "critical":
      return "destructive";
    case "high":
      return "outline";
    case "warning":
      return "secondary";
    case "info":
      return "default";
    default:
      return "default";
  }
};

// Status badge color
const getStatusColor = (status) => {
  switch (status) {
    case "active":
      return "bg-red-500/20 text-red-300 border-red-500/30";
    case "resolved":
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
    default:
      return "bg-slate-500/20 text-slate-300 border-slate-500/30";
  }
};

// Format time
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

  // Filter alerts
  useEffect(() => {
    let filtered = alerts.filter((alert) => !dismissedAlerts.has(alert.id));

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (alert) =>
          alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          alert.affectedServices.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Severity filter
    if (severityFilter !== "all") {
      filtered = filtered.filter((alert) => alert.severity === severityFilter);
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((alert) => alert.status === statusFilter);
    }

    setFilteredAlerts(filtered);
  }, [searchTerm, severityFilter, statusFilter, alerts, dismissedAlerts]);

  // Dismiss alert
  const dismissAlert = (id) => {
    setDismissedAlerts((prev) => new Set(prev).add(id));
  };

  // Resolve alert
  const resolveAlert = (id) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === id ? { ...alert, status: "resolved" } : alert
      )
    );
  };

  // Delete alert permanently
  const deleteAlert = (id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  // Toggle expand
  const toggleExpand = (id) => {
    setExpandedAlert(expandedAlert === id ? null : id);
  };

  const criticalCount = alerts.filter(
    (a) => a.severity === "critical" && !dismissedAlerts.has(a.id)
  ).length;
  const activeCount = alerts.filter(
    (a) => a.status === "active" && !dismissedAlerts.has(a.id)
  ).length;
  const totalCount = alerts.filter((a) => !dismissedAlerts.has(a.id)).length;

  return (
    <div className="p-2 sm:p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Alerts
            </h1>
            <p className="text-slate-400 mt-2">
              Monitor and manage system alerts in real-time
            </p>
          </div>
          <div className="flex gap-3">
            <div className="text-right">
              <div className="text-2xl font-bold text-red-400">{activeCount}</div>
              <div className="text-xs text-slate-400">Active</div>
            </div>
            <div className="w-px bg-slate-700" />
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-400">
                {criticalCount}
              </div>
              <div className="text-xs text-slate-400">Critical</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
      >
        {[
          {
            label: "Total Alerts",
            value: totalCount,
            color: "from-blue-500 to-cyan-500",
          },
          {
            label: "Critical",
            value: criticalCount,
            color: "from-red-500 to-orange-500",
          },
          {
            label: "Active",
            value: activeCount,
            color: "from-orange-500 to-yellow-500",
          },
          {
            label: "Resolved",
            value: alerts.filter((a) => a.status === "resolved").length,
            color: "from-emerald-500 to-teal-500",
          },
        ].map((stat, idx) => (
          <Card
            key={idx}
            className="bg-gradient-to-br border-0 text-white overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
            }}
          >
            <div className={`bg-gradient-to-br ${stat.color} p-4`}>
              <div className="text-sm text-white/80">{stat.label}</div>
              <div className="text-2xl font-bold mt-1">{stat.value}</div>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-[#0A0F1C] border border-cyan-500/30 rounded-lg p-4 space-y-4"
      >
        <div className="flex items-center gap-2 text-white">
          <Filter size={20} />
          <span className="font-semibold">Filters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Search */}
          <Input
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-500"
          />

          {/* Severity Filter */}
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || severityFilter !== "all" || statusFilter !== "all") && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-700">
            {searchTerm && (
              <Badge variant="secondary" className="gap-2">
                Search: {searchTerm}
                <X
                  size={14}
                  className="cursor-pointer"
                  onClick={() => setSearchTerm("")}
                />
              </Badge>
            )}
            {severityFilter !== "all" && (
              <Badge variant="secondary" className="gap-2">
                Severity: {severityFilter}
                <X
                  size={14}
                  className="cursor-pointer"
                  onClick={() => setSeverityFilter("all")}
                />
              </Badge>
            )}
            {statusFilter !== "all" && (
              <Badge variant="secondary" className="gap-2">
                Status: {statusFilter}
                <X
                  size={14}
                  className="cursor-pointer"
                  onClick={() => setStatusFilter("all")}
                />
              </Badge>
            )}
          </div>
        )}
      </motion.div>

      {/* Alerts List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="space-y-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                layoutId={`alert-${alert.id}`}
              >
                <Card className="bg-gradient-to-r from-[#0A0F1C] to-[#151B2C] border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex gap-4 p-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 flex items-start justify-center pt-1">
                        {getSeverityIcon(alert.severity)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-base sm:text-lg">
                              {alert.title}
                            </h3>
                            <p className="text-slate-400 text-sm mt-1">
                              {alert.description}
                            </p>
                          </div>

                          {/* Badges */}
                          <div className="flex gap-2 flex-wrap justify-end">
                            <Badge
                              variant={getSeverityBadgeColor(alert.severity)}
                              className="capitalize"
                            >
                              {alert.severity}
                            </Badge>
                            <Badge
                              className={`capitalize border ${getStatusColor(
                                alert.status
                              )}`}
                              variant="outline"
                            >
                              {alert.status}
                            </Badge>
                          </div>
                        </div>

                        {/* Additional Info - Expanded */}
                        <AnimatePresence>
                          {expandedAlert === alert.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-4 pt-4 border-t border-slate-700 space-y-2"
                            >
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                                <div>
                                  <span className="text-slate-500">Type:</span>
                                  <p className="text-white font-medium capitalize">
                                    {alert.type}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-slate-500">
                                    Affected Service:
                                  </span>
                                  <p className="text-white font-medium">
                                    {alert.affectedServices}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-slate-500">Endpoint:</span>
                                  <p className="text-cyan-400 font-mono text-xs">
                                    {alert.endpoint}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                          <span>{formatTime(alert.timestamp)}</span>
                          <button
                            onClick={() => toggleExpand(alert.id)}
                            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                          >
                            {expandedAlert === alert.id ? (
                              <>
                                <EyeOff size={14} /> Hide details
                              </>
                            ) : (
                              <>
                                <Eye size={14} /> Show details
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        {alert.status === "active" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => resolveAlert(alert.id)}
                            className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-xs h-8"
                          >
                            <CheckCircle2 size={14} className="mr-1" />
                            Resolve
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteAlert(alert.id)}
                          className="text-red-400 hover:bg-red-500/10 text-xs h-8"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 bg-[#0A0F1C] border border-slate-700/50 rounded-lg"
            >
              <CheckCircle2 className="text-emerald-500 mb-4" size={48} />
              <h3 className="text-white font-semibold text-lg">All clear!</h3>
              <p className="text-slate-400 mt-1">No alerts to display</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}