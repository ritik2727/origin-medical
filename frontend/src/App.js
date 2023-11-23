import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Labels from "./components/Dashboard/Labels";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./components/Dashboard/Header";


const defaultTheme = createTheme();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in based on the token in local storage
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setIsLoggedIn(true);
    }
  }, []); // Run this effect only once when the component mounts

  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/labels" element={<Labels />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
