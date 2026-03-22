import React from "react";

export default function CacheHit() {
	return (
		<div className="flex flex-col">
			<div className="text-sm text-slate-400">Cache Hit Ratio</div>
			<div className="text-2xl font-bold text-white">84.2%</div>
			<div className="text-xs text-emerald-500">+1.5% improvement</div>
		</div>
	);
}
