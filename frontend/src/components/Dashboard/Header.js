import React from "react";
import AppBar from "@mui/material/AppBar";

import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return (
    <div>
      <CssBaseline />
      <AppBar position="relative" style={{ marginBottom: 20 }}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography variant="h6" color="inherit" noWrap >
            <Link to={token ? '/dashboard' : '/'}>Dashboard</Link> 
          </Typography>

          {token && role && (
            <div>
              <Button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("role");
                  navigate("/");
                }}
                style={{ color: "white", background: "red", marginRight: 20 }}
              >
                Logout
              </Button>
              {role == "admin" && (
                <Button
                  style={{ color: "white", background: "orange" }}
                  onClick={() => navigate("/labels")}
                >
                  Create Labels
                </Button>
              )}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
