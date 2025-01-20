// // src/routes/routeConfig.js
// import RMView from "../RmView/RmView";
// import FMView from "../FmView/FmView";

// const routes = [
//   // {
//   //   path: "/user",
//   //   component: UserLandingView,
//   //   roles: ["User"],
//   // },
//   {
//     path: "/rm",
//     component: RMView,
//     roles: ["RM"],
//   },
//   {
//     path: "/fm",
//     component: FMView,
//     roles: ["FM"],
//   },
//   // {
//   //   path: "/admin-dashboard",
//   //   component: AdminDashboard,
//   //   roles: ["Admin"],
//   // },
//   // {
//   //   path: "/common-page",
//   //   component: CommonPage,
//   //   roles: ["User", "RelationshipManager", "FieldManager", "Admin"],
//   // },
// ];

// export default routes;

import UserLayout from "../UserView/layout/UserLayout";
import RMView from "../RmView/RmView";
import FMView from "../FmView/FmView";
import AdminLayout from "../AdminView/layout/AdminLayout";
import ProfileView from "../components/ProfileView";

// Define routes for each role
const routes = [
  // User Routes
  {
    path: "/user",
    component: UserLayout,
    roles: ["User"],
  },
  {
    path: "/user/profile",
    component: ProfileView,
    roles: ["User"],
  },

  // RM Routes
  {
    path: "/rm",
    component: RMView,
    roles: ["RM"],
  },

  // FM Routes
  {
    path: "/fm",
    component: FMView,
    roles: ["FM"],
  },

  // Admin Routes
  {
    path: "/admin",
    component: AdminLayout,
    roles: ["Admin"],
  },
  {
    path: "/admin/reports",
    component: () => <div>Admin Reports View</div>, // Example sub-route
    roles: ["Admin"],
  },
];

export default routes;
