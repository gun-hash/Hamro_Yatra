import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function PassengerLayout() {
  const { userRole } = useStateContext();

  // Define inline styles for the layout container
  const layoutContainerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%", // Ensure the layout takes up the full height of its container
  };

  // Define inline styles for the Outlet content
  const outletContentStyle = {
    flex: 1, // This will make the Outlet content take up remaining space
  };

  if (!userRole) {
    return <Navigate to="/login" />;
  } else if (userRole === "driver") {
    return <Navigate to="/driver" />;
  } else if (userRole === "admin") {
    return <Navigate to="/admin" />;
  } else if (userRole === "passenger") {
    return (
      <div style={layoutContainerStyle}>
        <Outlet style={outletContentStyle} />
      </div>
    );
  }
}
