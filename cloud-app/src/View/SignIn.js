import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import "./SignIn.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default class SignIn extends React.Component {
    state={
        username: "",
        password: "",
        dashboard: false
    }
    handleUserChange(e){
        this.setState({
            username: e.target.value
        })
    }
    handlePasswordChange(e){
        this.setState({
            password: e.target.value
        })
    }
    handleSubmit(){
        let data = {user_name:this.state.username, password: this.state.password}
        fetch('http://cloud-dev2.us-east-2.elasticbeanstalk.com/sign_in', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(error => alert("Invalid Username or Password"))
        .then(response => {
            localStorage.setItem("id", response.id);
            if (response){
                this.setState({
                    username: "",
                    password: "", 
                    dashboard: true
                })

            }
        });
    }
    render(){
        return (
            <Container component="main" maxWidth="xs">
            {this.state.dashboard?
                <Redirect to='/dashboard' /> : ""
            }
            <CssBaseline />
            <div className="paper">
                <Avatar className="avatar">
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign in
                </Typography>
                <form className="form" noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="userName"
                    label="Username"
                    name="userName"
                    autoComplete="lname"
                    value={this.state.username}
                    onChange={this.handleUserChange.bind(this)}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange.bind(this)}
                    autoComplete="current-password"
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="submit"
                    onClick={this.handleSubmit.bind(this)}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                    </Grid>
                    <Grid item>
                    <Link href="/sign-up" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
            </Container>
        )
    }
}