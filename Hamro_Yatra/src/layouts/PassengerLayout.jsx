import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
export default function PassengerLayout() {
  const { userRole } = useStateContext();

  const layoutContainerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  };

  const outletContentStyle = {
    flex: 1,
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
