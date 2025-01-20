// // App.js
// import React from "react";
// import { Routes, Route } from "react-router-dom";

// // Importing Components
// import InitialLandingPage from "./components/InitialLandingView";
// import UserLandingView from "./components/UserLandingView";
// import FullDetailCard from "./components/FullDetailView";
// import PostPropertiesView from "./components/PostPropertyView";
// import MyListingsView from "./components/MyListingsView";
// import RecentlyViewedView from "./components/RecentlyViewedView";
// import FavoritesPage from "./components/FovouritesView";
// import NotificationsView from "./components/NotificationsView";
// import ProfileView from "./components/ProfileView";
// import NotfoundView from "./components/CommonViews/NotfoundView";
// import UnauthorizeView from "./components/CommonViews/UnauthorizeView";

// // Protected Route and Route Config
// import ProtectedRoute from "./routes/ProtectedRoute";
// import routes from "./routes/routeConfig";

// import UserLayout from "./UserView/layout/UserLayout";
// // Admin Layout
// import AdminLayout from "./AdminView/layout/AdminLayout";

// import "./App.css";

// const App = () => {
//   return (
//     <Routes>
//       {/* Dynamic Protected Routes */}
//       {routes.map(({ path, component: Component, roles }) => (
//         <Route
//           key={path}
//           path={path}
//           element={<ProtectedRoute component={Component} roles={roles} />}
//         />
//       ))}

//       {/* Public Routes */}
//       <Route path="/" element={<InitialLandingPage />} />

//       <Route path="/user" element={<UserLayout />}>
//         <Route index element={<UserLandingView />} />
//         <Route
//           path="getAllProperties/:propertyId"
//           element={<FullDetailCard />}
//         />
//         <Route path="mylistings" element={<MyListingsView />} />
//         <Route path="favorites" element={<FavoritesPage />} />
//         <Route path="postProperties" element={<PostPropertiesView />} />
//         <Route path="recentlyViewed" element={<RecentlyViewedView />} />
//         <Route path="profile" element={<ProfileView />} />
//         <Route path="notifications" element={<NotificationsView />} />
//       </Route>

//       {/* Admin Routes */}
//       <Route path="/admin" element={<AdminLayout />}>
//         <Route index element={<div>Dashboard View</div>} />
//         <Route path="properties" element={<div>Property Listings View</div>} />
//         <Route path="requests" element={<div>Requests View</div>} />
//         <Route
//           path="assign-managers"
//           element={<div>Assign Managers View</div>}
//         />
//         <Route path="communities" element={<div>Communities View</div>} />
//         <Route
//           path="user-management"
//           element={<div>User Management View</div>}
//         />
//         <Route path="db-tables" element={<div>DB Tables View</div>} />
//         <Route path="reports" element={<div>Reports View</div>} />
//         <Route path="profile" element={<ProfileView />} />
//       </Route>

//       {/* Catch-All Route */}
//       <Route path="*" element={<NotfoundView />} />
//     </Routes>
//   );
// };

// export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";

import InitialLandingPage from "./components/InitialLandingView";
import NotfoundView from "./components/CommonViews/NotfoundView";
import UnauthorizeView from "./components/CommonViews/UnauthorizeView";

// Main Layouts
import UserLayout from "./UserView/layout/UserLayout";
import AdminLayout from "./AdminView/layout/AdminLayout";

// Import User Components
import UserLandingView from "./components/UserLandingView";
import FullDetailCard from "./components/FullDetailView";
import MyListingsView from "./components/MyListingsView";
import FavoritesPage from "./components/FovouritesView";
import PostPropertiesView from "./components/PostPropertyView";
import RecentlyViewedView from "./components/RecentlyViewedView";
import ProfileView from "./components/ProfileView";
import NotificationsView from "./components/NotificationsView";

// Import Admin Components
import Dashboard from "./AdminView/components/DashboardView";
import { PropertyListings } from "./AdminView/components/PropertyListingsView";

// Protected Route
import ProtectedRoute from "./routes/ProtectedRoute";

import "./App.css";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<InitialLandingPage />} />
      <Route path="user-landing" element={<UserLandingView />} />

      {/* User Routes */}
      <Route element={<ProtectedRoute roles={["User"]} />}>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserLandingView />} />
          <Route
            path="getAllProperties/:propertyId"
            element={<FullDetailCard />}
          />
          <Route path="mylistings" element={<MyListingsView />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="postProperties" element={<PostPropertiesView />} />
          <Route path="recentlyViewed" element={<RecentlyViewedView />} />
          <Route path="profile" element={<ProfileView />} />
          <Route path="notifications" element={<NotificationsView />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute roles={["Admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="properties" element={<PropertyListings />} />
          <Route path="requests" element={<div>Requests View</div>} />
          <Route
            path="assign-managers"
            element={<div>Assign Managers View</div>}
          />
          <Route path="communities" element={<div>Communities View</div>} />
          <Route
            path="user-management"
            element={<div>User Management View</div>}
          />
          <Route path="db-tables" element={<div>DB Tables View</div>} />
          <Route path="reports" element={<div>Reports View</div>} />
          <Route path="profile" element={<ProfileView />} />
        </Route>
      </Route>

      {/* Unauthorized Route */}
      <Route path="/unauthorize" element={<UnauthorizeView />} />

      {/* Catch-All Route */}
      <Route path="*" element={<NotfoundView />} />
    </Routes>
  );
};

export default App;
