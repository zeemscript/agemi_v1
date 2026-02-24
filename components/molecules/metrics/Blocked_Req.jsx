import React from "react";

export default function BlockedReq() {
	return (
		<div className="flex flex-col">
			<div className="text-sm text-slate-400">Blocked Requests</div>
			<div className="text-2xl font-bold text-white">18.4K</div>
			<div className="text-xs text-slate-500">-1.1% vs last 24h</div>
		</div>
	);
}
