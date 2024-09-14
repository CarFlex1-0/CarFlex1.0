// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                        Forum
                    </Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
