import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from "@mui/material/Container";

import ImageList from "./ImageList";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Send image upload request to your backend API
      await axios.post("http://localhost:5000/api/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });
      window.location.reload();
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload failed:", error.message);
    }
  };

  useEffect(() => {
    // Check if the user is already logged in based on the token in local storage

    if (!token && !role) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <main>
        {localStorage.getItem("role") == "admin" && (
          <Container maxWidth="md">
            <input type="file" onChange={handleFileChange} />
            <Button variant="contained" onClick={handleUpload}>
              Upload Image
            </Button>
          </Container>
        )}
        <Container sx={{ py: 8 }} maxWidth="md">
          <ImageList />
        </Container>
      </main>
    </>
  );
}
