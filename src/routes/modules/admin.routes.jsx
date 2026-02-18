import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import Dashboard from '../../pages/admin/Dashboard';
import ManageRooms from '../../pages/admin/ManageRooms';

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />, 
    children: [
      { path: "", element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "rooms", element: <ManageRooms /> },
      
    ]
  }
];