import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import AdminNav from "../components/admin/AdminNav";


export default function AdminLayout() {
  const { userRole } = useStateContext();
  console.log(userRole);
  if (!userRole) {
    return <Navigate to="/login" />;
  } else if (userRole == "driver") {
    return <Navigate to="/driver" />;
  } else if (userRole == "passenger") {
    return <Navigate to="/passenger" />;
  } else if (userRole == "admin") {
    return (
      <>
        <Outlet />
        <AdminNav />
      </>
    );
  }
}
