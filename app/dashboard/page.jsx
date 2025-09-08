import React from "react";
import StatsOverview from "@/components/organisms/dashboard/StatsOverview";
import SecurityAreaChart from "@/components/organisms/dashboard/Chart";
import LiveLogs from "@/components/organisms/dashboard/LiveLogs";
const Page = () => {
    return (
        <div className="p-2 sm:p-5">
            <StatsOverview />
            <SecurityAreaChart />
            <LiveLogs />
        </div>
    );
}
export default Page;





