// import React, { useEffect, useState } from "react";
// import StatsCard from "./StatsCard";
// import LineChart from "./LineChart";
// import PieChart from "./PieChart";

// // Import Lucide icons
// import { Home, Clock, MessageSquare, Users } from "lucide-react";

// const Dashboard = () => {
//   const [statsData, setStatsData] = useState({
//     totalProperties: 0,
//     pendingApprovals: 0,
//     activeRequests: 0,
//     communities: 0,
//   });

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/dashboardData");
//         if (!response.ok) {
//           throw new Error("Failed to fetch dashboard data");
//         }
//         const data = await response.json();

//         const result = data.result;
//         setStatsData({
//           totalProperties: result.total_properties,
//           pendingApprovals: result.pending_properties,
//           activeRequests: result.total_requests,
//           communities: result.total_communities,
//         });
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   return (
//     <div className="w-full">
//       <div className="flex gap-5">
//         <StatsCard
//           IconComponent={Home}
//           title="Total Properties"
//           value={statsData.totalProperties}
//         />
//         <StatsCard
//           IconComponent={Clock}
//           title="Pending Approvals"
//           value={statsData.pendingApprovals}
//         />
//         <StatsCard
//           IconComponent={MessageSquare}
//           title="Active Requests"
//           value={statsData.activeRequests}
//         />
//         <StatsCard
//           IconComponent={Users}
//           title="Communities"
//           value={statsData.communities}
//         />
//       </div>
//       <div className="flex gap-5 pt-5">
//         <div className="flex-1 w-[300px]">
//           <LineChart />
//         </div>
//         <div className="flex-1 w-[300px] ">
//           <PieChart />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

// Import Lucide icons
import { Home, Clock, MessageSquare, Users } from "lucide-react";

const Dashboard = () => {
  const [statsData, setStatsData] = useState({
    totalProperties: 0,
    pendingApprovals: 0,
    activeRequests: 0,
    communities: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dasboardData");
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const data = await response.json();

        const result = data.result;
        setStatsData({
          totalProperties: result.total_properties,
          pendingApprovals: result.pending_properties,
          activeRequests: result.total_requests,
          communities: result.total_communities,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="w-full">
      <ul className="flex flex-wrap gap-3 lg:justify-between">
        <StatsCard
          IconComponent={Home}
          title="Total Properties"
          value={statsData.totalProperties}
        />
        <StatsCard
          IconComponent={Clock}
          title="Pending Approvals"
          value={statsData.pendingApprovals}
        />
        <StatsCard
          IconComponent={MessageSquare}
          title="Active Requests"
          value={statsData.activeRequests}
        />
        <StatsCard
          IconComponent={Users}
          title="Communities"
          value={statsData.communities}
        />
      </ul>
      <div className="flex flex-col lg:flex-row gap-3 pt-5">
        <div className="min-w-[400px] max-w-[500px] lg:min-w-[300px] lg:max-w-[500px]">
          <LineChart />
        </div>
        <div className="min-w-[400px] max-w-[500px] lg:min-w-[300px] lg:max-w-[500px]">
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
