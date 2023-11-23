import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 400 },
  { field: "name", headerName: "Label name", width: 230 },
];

export default function Labels() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [labels, setLabels] = React.useState([]);
  const [labelName, setLabelName] = React.useState("");
  const [selectedLabelIds, setSelectedLabelIds] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const navigate = useNavigate();

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

  React.useEffect(() => {
    if (!token && !role) {
      navigate("/");
    } else if (role != "admin") {
      navigate("/dashboard");
    }
    fetchLabels();
  }, []);

  const handleCreateLabel = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/images/label",
        {
          name: labelName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTimeout(() => {
        // Refresh labels after deletion
        fetchLabels();
        // Clear the selectedLabelIds array
        setLabelName("");
      }, 1000);
    } catch (error) {
      console.error("Label creation failed:", error.message);
    }
  };
  const handleDeleteLabels = async () => {
    try {
      await axios.delete("http://localhost:5000/api/images/delete-labels", {
        data: { labelIds: selectedRows },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTimeout(() => {
        // Refresh labels after deletion
        fetchLabels();
        // Clear the selectedLabelIds array
        setSelectedLabelIds([]);
      }, 1000); // You can adjust the delay time as needed
    } catch (error) {
      console.error("Label deletion failed:", error.message);
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="label"
          value={labelName}
          onChange={(e) => setLabelName(e.target.value)}
          label="create label"
          name="username"
          style={{
            color: "white",
            background: "white",
            borderRadius: 10,
            marginTop: 50,
          }}
        />
        <Button variant="contained" onClick={handleCreateLabel}>
          Add Label
        </Button>
      </Grid>
      <Grid item>
        <div style={{ height: 500, width: "100%", margin: 20 }}>
          <DataGrid
            rows={labels}
            columns={columns}
            pageSize={20}
            checkboxSelection
            onRowSelectionModelChange={(ids) => {
              setSelectedRows(ids);
            }}
          />
        </div>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteLabels}
          disabled={selectedRows.length === 0}
        >
          Delete Selected Labels
        </Button>
      </Grid>
    </Grid>
  );
}
