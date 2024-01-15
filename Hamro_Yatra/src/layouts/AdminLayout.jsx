import React from "react";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div>
      AdminLayout
      <Outlet />
    </div>
  );
}
