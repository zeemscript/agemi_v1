import React from "react";

export default function TotalReq() {
	// Minimal metric component used by reports/dashboard pages
	return (
		<div className="flex flex-col">
			<div className="text-sm text-slate-400">Total Requests</div>
			<div className="text-2xl font-bold text-white">1.24M</div>
			<div className="text-xs text-slate-500">+3.2% vs last 24h</div>
		</div>
	);
}
