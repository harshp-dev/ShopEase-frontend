import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';

const AdminLayout = () => {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
