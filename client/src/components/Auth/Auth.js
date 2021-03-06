import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import Input from './Input';
import Icon from './icon';
import './styles.scss';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const Auth = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [isSignUp, setIsSignUp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            dispatch(signup(formData, history)) 
            // "history" allows us to navigate after the logic is executed
        } else {
            dispatch(signin(formData, history)) 
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () => setShowPassword((prevState) => !prevState)

    const switchMode = () => {
        setIsSignUp((prevState) => !prevState);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj; // .? ensures we don't get an error if the object (res) doesn't exist
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token }})
            history.push('/');
        } catch (err) {
            console.log(err)
        }
    }

    const googleFailure = () => {
        console.log('Google Sign In was unsuccessful. Try again later.')
    }

    return (
        <Container className="auth" component="main" maxWidth="xs">
            <Paper className="paper" elevation={3}>
                <Avatar className="avatar">
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignUp && 
                            <Input name="confirmPassword" label="Re-enter Password" handleChange={handleChange} type="password" />
                        }
                        
                        <Button type="submit" fullWidth variant="contained" color="primary" className="submitButton">
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <GoogleLogin 
                            clientId="271983167356-hviil5t1qdu62mve7tf0ok3llccej6cu.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button 
                                    className="googleButton" 
                                    color="primary" 
                                    fullWidth 
                                    onClick={renderProps.onClick} 
                                    disabled={renderProps.disabled} 
                                    startIcon={<Icon />} 
                                    variant="contained">
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                        <Grid container justify="flex-end" >
                            <Grid item>
                                <Button onClick={switchMode} >{isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
