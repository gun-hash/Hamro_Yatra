import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function DriverLayout() {
  const { userRole } = useStateContext();
  if (!userRole) {
    return <Navigate to="/login" />;
  } else if (userRole == "passenger") {
    return <Navigate to="/passenger" />;
  } else if (userRole == "admin") {
    return <Navigate to="/admin" />;
  } else if (userRole == "driver") {
    return (
      <>
        driver layout
        <Outlet />
      </>
    );
  }
}
