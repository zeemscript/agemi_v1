"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Plus, Search, Edit, Trash2, ToggleLeft } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function Policies() {
    const [policies, setPolicies] = useState([
        { id: 1, name: "Block Bad Bots", rule: "ua contains bot -> block", status: "enabled", createdAt: "2d ago", hits: 12430 },
    { id: 2, name: "Rate Limit API", rule: "api/* -> 100rpm", status: "enabled", createdAt: "5d ago", hits: 873 },
    { id: 3, name: "Allow Healthcheck", rule: "health -> allow", status: "disabled", createdAt: "10d ago", hits: 0 },
    ]);

    const [query, setQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selected, setSelected] = useState(null);
    const [newName, setNewName] = useState("");
    const [newRule, setNewRule] = useState("");

    const counts = useMemo(() => {
        const total = policies.length;
        const enabled = policies.filter((p) => p.status === "enabled").length;
        const disabled = total - enabled;
        return { total, enabled, disabled };
    }, [policies]);

    const filtered = useMemo(() => {
        return policies.filter((p) => {
            if (statusFilter !== "all" && p.status !== statusFilter) return false;
            if (!query) return true;
            const q = query.toLowerCase();
            return (
                p.name.toLowerCase().includes(q) ||
                p.rule.toLowerCase().includes(q) ||
                (p.createdAt || "").toLowerCase().includes(q)
            );
        });
    }, [policies, query, statusFilter]);

    const selectedPolicy = policies.find((x) => x.id === selected);

    function addPolicy() {
        if (!newName.trim() || !newRule.trim()) return;
        const next = { id: Date.now(), name: newName.trim(), rule: newRule.trim(), status: "enabled", createdAt: "just now", hits: 0 };
        setPolicies((p) => [next, ...p]);
        setNewName("");
        setNewRule("");
        setSelected(next.id);
    }

    function removePolicy(id) {
        setPolicies((p) => p.filter((x) => x.id !== id));
        if (selected === id) setSelected(null);
    }

    function toggleStatus(id) {
        setPolicies((p) => p.map((x) => (x.id === id ? { ...x, status: x.status === "enabled" ? "disabled" : "enabled" } : x)));
    }

        return (
            <div className="p-2 sm:p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Policies</h1>
                        <p className="text-slate-400 mt-1">Design, manage and monitor traffic/security policies applied across your stack.</p>
                    </div>
                    <div className="flex items-center gap-3">
                    <div className="hidden sm:flex gap-3">
                            <Card className="bg-gradient-to-br from-[#071024] to-[#0b1220] border border-slate-800 rounded-2xl p-3">
                                <CardContent className="p-2">
                                    <div className="text-sm text-slate-400">Total</div>
                                    <div className="text-2xl font-bold text-white"><CountUp end={counts.total} duration={0.8} /></div>
                                </CardContent>
                            </Card>
                            <Card className="bg-gradient-to-br from-[#071024] to-[#0b1220] border border-slate-800 rounded-2xl p-3">
                                <CardContent className="p-2">
                                    <div className="text-sm text-slate-400">Enabled</div>
                                    <div className="text-2xl font-bold text-white"><CountUp end={counts.enabled} duration={0.8} /></div>
                                </CardContent>
                            </Card>
                            <Card className="bg-gradient-to-br from-[#071024] to-[#0b1220] border border-slate-800 rounded-2xl p-3">
                                <CardContent className="p-2">
                                    <div className="text-sm text-slate-400">Disabled</div>
                                    <div className="text-2xl font-bold text-white"><CountUp end={counts.disabled} duration={0.8} /></div>
                                </CardContent>
                            </Card>
                        </div>
                                    <Button variant="default" className="flex items-center gap-2 rounded-full px-4 h-10" onClick={() => { setNewName(""); setNewRule(""); setSelected(null); }}>
                                        <Plus /> New Policy
                                    </Button>
                    </div>
                </div>
            </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="lg:col-span-2 space-y-4">
                                <Card className="bg-slate-900/40 border border-slate-700/30 rounded-2xl">
                                    <CardContent>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                            <div className="flex items-center gap-2 flex-1">
                                                <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search policies, rules or dates" className="bg-slate-900/40 rounded-full h-10 px-4" />
                                                <Search className="text-slate-400" />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                                    <SelectTrigger className="bg-slate-900/40 border-slate-700 text-white rounded-2xl">
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-slate-900 border-slate-700 rounded-2xl">
                                                        <SelectItem value="all">All</SelectItem>
                                                        <SelectItem value="enabled">Enabled</SelectItem>
                                                        <SelectItem value="disabled">Disabled</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <motion.div layout className="space-y-3">
                                    {filtered.length === 0 ? (
                                        <Card className="bg-gradient-to-br from-[#071024] to-[#0b1220] border border-slate-800 rounded-2xl p-6 text-center">
                                            <CardContent>
                                                <div className="text-white font-semibold">No policies found</div>
                                                <div className="text-slate-400 text-sm">Try a different search or add a new policy.</div>
                                            </CardContent>
                                        </Card>
                                    ) : (
                                        filtered.map((p) => (
                                            <motion.div key={p.id} whileHover={{ scale: 1.01 }} className="bg-gradient-to-br from-[#071024] to-[#0b1220] border border-slate-800 rounded-xl p-3">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between gap-3">
                                                            <div className="truncate">
                                                                <h4 className="text-white font-semibold truncate">{p.name}</h4>
                                                                <div className="text-slate-400 text-sm mt-1 truncate">{p.rule}</div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Badge variant={p.status === "enabled" ? "default" : "outline"} className="capitalize">{p.status}</Badge>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                                                            <div>Created: {p.createdAt}</div>
                                                            <div>Hits: <span className="text-white font-medium">{p.hits}</span></div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col gap-2 items-end">
                                                        <div className="flex gap-2">
                                                            <Button size="sm" variant="outline" onClick={() => { setSelected(p.id); }} className="rounded-full h-8 w-8 p-0 flex items-center justify-center">
                                                                <Edit />
                                                            </Button>
                                                            <Button size="sm" variant="ghost" onClick={() => removePolicy(p.id)} className="rounded-full h-8 w-8 p-0 flex items-center justify-center">
                                                                <Trash2 />
                                                            </Button>
                                                            <Button size="sm" variant="default" onClick={() => toggleStatus(p.id)} className="rounded-full h-8 w-8 p-0 flex items-center justify-center">
                                                                <ToggleLeft />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </motion.div>
                            </div>

                            <div className="lg:col-span-1">
                                <Card className="bg-slate-900/40 border border-slate-700/30 rounded-2xl">
                                    <CardContent>
                                        <h3 className="text-white font-semibold mb-3">Policy Designer</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-sm text-slate-400">Name</label>
                                                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Policy name" className="rounded-full h-10 px-4" />
                                            </div>
                                            <div>
                                                <label className="text-sm text-slate-400">Rule</label>
                                                <Input value={newRule} onChange={(e) => setNewRule(e.target.value)} placeholder="e.g. path contains api -> limit" className="rounded-full h-10 px-4" />
                                            </div>
                                            <div className="flex gap-2">
                                                <Button onClick={addPolicy} className="flex-1 rounded-full h-10" variant="default">Save Policy</Button>
                                                <Button onClick={() => { setNewName(""); setNewRule(""); }} variant="ghost" className="rounded-full h-10">Reset</Button>
                                            </div>
                                            {selected && (
                                                <div className="pt-3 border-t border-slate-700">
                                                    <h4 className="text-sm text-slate-400 mb-1">Selected</h4>
                                                    {selectedPolicy ? (
                                                        <div className="space-y-2">
                                                            <div className="text-white font-medium">{selectedPolicy.name}</div>
                                                            <div className="text-slate-400 text-sm">{selectedPolicy.rule}</div>
                                                            <div className="flex items-center gap-2 mt-2">
                                                                <Badge variant={selectedPolicy.status === "enabled" ? "default" : "outline"} className="capitalize">{selectedPolicy.status}</Badge>
                                                                <div className="text-xs text-slate-500">{selectedPolicy.createdAt}</div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="text-slate-400">No selection</div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
    );
}