import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
