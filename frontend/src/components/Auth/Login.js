import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in based on the token in local storage
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      navigate("/dashboard");
    }
  }, []); // Run this effect only once when the component mounts
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // Send login request to your backend API
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { username, password }
      );

      // Store user token in localStorage or cookies
      console.log(response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      // Redirect to the appropriate dashboard based on user role
      //   history.push(response.data.isAdmin ? "/admin-dashboard" : "/dashboard");
      navigate("/dashboard");
    } catch (error) {
      // console.error("Login failed:", error);
      alert(`Invalid credentials`);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <Typography style={{ textAlign: "left", fontSize: 20 }}>
              Enter username
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              //   label="Email Address"
              name="username"
              //   autoComplete="email"
              //   autoFocus
              style={{ color: "white", background: "white", borderRadius: 10 }}
            />
            <Typography style={{ textAlign: "left", fontSize: 20 }}>
              Password
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              style={{ color: "white", background: "white", borderRadius: 10 }}
              //   label="Password"
              type="password"
              id="password"
              //   autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
