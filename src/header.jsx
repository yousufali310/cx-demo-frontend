import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import StoreIcon from '@mui/icons-material/Store';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header>
      <div className='left_holder'>
        <img src='https://www.codelogicx.com/assets/images/logo.svg' width={150} />
      </div>

      <div className='right_holder'>
        <ul className='menu_holder'>
          <li>
            <Link 
              to='/films' 
              style={{ 
                color: isActive('/films') ? '#1976d2' : '#666',
                borderBottom: isActive('/films') ? '2px solid #1976d2' : 'none',
                paddingBottom: '4px'
              }}
            >
              <MovieIcon />
              Films
            </Link>
          </li>
          <li>
            <Link 
              to='/stores'
              style={{ 
                color: isActive('/stores') ? '#1976d2' : '#666',
                borderBottom: isActive('/stores') ? '2px solid #1976d2' : 'none',
                paddingBottom: '4px'
              }}
            >
              <StoreIcon />
              Stores
            </Link>
          </li>
          <li>
            <Link 
              to='/rentals'
              style={{ 
                color: isActive('/rentals') ? '#1976d2' : '#666',
                borderBottom: isActive('/rentals') ? '2px solid #1976d2' : 'none',
                paddingBottom: '4px'
              }}
            >
              <LocalMoviesIcon />
              Rental
            </Link>
          </li>
        </ul>
        <div className='user_profile_holder'>
          CX
        </div>
      </div>
    </header>
  );
}
