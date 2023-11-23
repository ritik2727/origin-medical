import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
} from "@mui/material";

export default function ImageList() {
  const [images, setImages] = useState([]);
  const [labels, setLabels] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPages] = useState();


  useEffect(() => {
    // Fetch images from your backend API
    fetchImages();
    fetchLabels();
  }, [filter, page]);

  const fetchLabels = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/images/label"
      );
      setLabels(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("errr", error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/images?labelId=${filter}&page=${page}`
      );
      // setImages((prevImages) => [...prevImages, ...response.data]);
      console.log(response.data);
      setImages(response.data.paginatedImages);
      setTotalPages(response.data.totalPages);
    
    } catch (error) {
      console.error("Error fetching images:", error.message);
    }
  };

  // imageId, labelId
  const handleAssignLabel = async (imageId, labelId) => {
    try {
      console.log("ddd", imageId, labelId);
      const response = await axios.post(
        "http://localhost:5000/api/images/assign",
        { imageId, labelId }
      );
      console.log(response.data);
      // Update your state here
    } catch (error) {
      console.error(error);
    }
  };
  const handleRemoveLabel = async (imageId, labelId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/images/assign/${imageId}/label/${labelId}`
      );
      console.log(response.data);
      // Update your state here
    } catch (error) {
      console.error(error);
    }
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  return (
    <div>
      <Grid container spacing={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">filter by label</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="filter by label"
            onChange={(event) => {
              setFilter(event.target.value);
            }}
          >
            <MenuItem value={""}>ALL</MenuItem>
            {labels.map((label, id) => (
              <MenuItem key={id} value={label.id}>
                {label.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {images.map((image) => (
          <Grid item key={image.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  // 16:9
                  pt: "56.25%",
                }}
                image={`http://localhost:5000/${image.url}`}
              />

              <CardContent sx={{ flexGrow: 1 }}>
                <Autocomplete
                  multiple
                  // limitTags={2}
                  style={{ color: "black" }}
                  id="multiple-limit-tags"
                  options={labels}
                  onChange={(event, newValue) => {
                    newValue.forEach((label) => {
                      if (!image.labels.includes(label)) {
                        handleAssignLabel(image.id, label.id);
                      }
                    });
                    image.labels.forEach((label) => {
                      if (!newValue.includes(label)) {
                        handleRemoveLabel(image.id, label.id);
                      }
                    });
                  }}
                  getOptionLabel={(option) => option.name}
                  defaultValue={image.labels}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Labels"
                      placeholder="Labels"
                    />
                  )}
                  // sx={{ width: "500px" }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div style={{marginTop:30}}>
        <Stack spacing={2}>
          <Pagination
            count={totalPage} // Assuming totalPages is in your API response
            color="primary"
            page={page}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </div>
  );
}
