// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useRoleStore } from "../store/roleStore";

// const ProtectedRoute = ({ component: Component, roles }) => {
//   // Get userData from the new store structure
//   const { userData } = useRoleStore();

//   // Check if user has a role
//   if (!userData?.role) {
//     return <Navigate to="/" replace />;
//   }

//   // Convert role to match your existing role checks
//   const userRole =
//     userData.role.toLowerCase() == "user"
//       ? "User"
//       : userData.role.toLowerCase() == "rm"
//         ? "RM"
//         : userData.role.toLowerCase() == "fm"
//           ? "FM"
//           : null;

//   console.log("Current Role:", userRole);

//   // Check if user has required role
//   if (!roles.includes(userRole)) {
//     return <Navigate to="/unauthorize" replace />;
//   }

//   // Render the protected component
//   return <Component />;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRoleStore } from "../store/roleStore";

const ProtectedRoute = ({ roles }) => {
  const { userData } = useRoleStore();

  // Redirect to home if no role
  if (!userData?.role) {
    return <Navigate to="/" replace />;
  }

  // Match user role with allowed roles
  const userRole =
    userData.role.toLowerCase() === "user"
      ? "User"
      : userData.role.toLowerCase() === "rm"
        ? "RM"
        : userData.role.toLowerCase() === "fm"
          ? "FM"
          : userData.role.toLowerCase() === "admin"
            ? "Admin"
            : null;

  console.log("Current Role:", userRole);

  if (!roles.includes(userRole)) {
    return <Navigate to="/unauthorize" replace />;
  }

  // Render nested routes or a specific component
  return <Outlet />;
};

export default ProtectedRoute;
