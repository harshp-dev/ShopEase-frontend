import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/auth';
import { logoutUser } from '../../services/AuthService';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    navigate('/login');
    handleMenuClose();
  };

  const handleChangePassword = () => {
    navigate('/change-password');
    handleMenuClose();
  };

  const navItems =
    user?.role === 'ADMIN'
      ? [
          { name: 'Stats', path: '/admin' },
          { name: 'Products', path: '/admin/products' },
          { name: 'Orders', path: '/admin/orders' },
          { name: 'Category', path: '/admin/categories' },
        ]
      : [
          { name: 'Home', path: '/user' },
          { name: 'Shop', path: '/user/shop' },
          { name: 'Orders', path: '/user/orders' },
          { name: 'Cart', path: '/user/cart' },
        ];

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#070142' }} elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          {user?.role === 'ADMIN' ? 'Admin Panel' : 'ShopEase'}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {navItems.map(({ name, path }) => (
            <Button
              key={name}
              component={Link}
              to={path}
              variant={pathname === path ? 'contained' : 'text'}
              color="inherit"
              sx={{
                backgroundColor: pathname === path ? 'rgba(255,255,255,0.1)' : 'transparent',
                fontWeight: pathname === path ? 'bold' : 'normal',
              }}
            >
              {name}
            </Button>
          ))}
          {user && (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
