import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import logo from '../../images/memories.png';
import { useDispatch } from 'react-redux';
import './styles.scss'
import decode from 'jwt-decode'

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/')
        setUser(null)
    }

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            // log user out if token expired
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location])

    return (
        <AppBar className="navbar" position="static" color="inherit">
            <div className="navbar__brandContainer">
                <img className="navbar__image" src={logo} alt="Web Gallery 2.0" height="60" />
                <Typography component={Link} to="/" className="navbar__heading" variant="h2" align="center">Web Gallery 2.0</Typography>
            </div>
            <Toolbar className="navbar__toolbar">
                {user ? (
                    <div className="navbar__profile">
                        <Avatar className="profile__avatar" alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className="profile__username" variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className="logoutButton" color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
