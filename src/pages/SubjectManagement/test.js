import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const EditableDataGrid = () => {
  const [rows, setRows] = useState([
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Smith", age: 30 },
    { id: 3, name: "Alice Johnson", age: 35 },
  ]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      editable: true,
      width: 300,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", gap: "5px" }}>
            <div style={{ flex: 1 }}>{params.value}</div>
            <div style={{ flex: 1 }}>{params.value}</div>
          </div>
        );
      },
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 100,
      editable: true, // Makes this column editable
    },
  ];

  const processRowUpdate = (newRow) => {
    // Update the state with the new data
    const updatedRows = rows.map((row) =>
      row.id === newRow.id ? { ...row, ...newRow } : row
    );
    setRows(updatedRows);
    return newRow; // Required to finalize the edit
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }} // Enable new editing API
        components={{
          Toolbar: () => <div>Custom Toolbar</div>,
        }}
      />
    </div>
  );
};

export default EditableDataGrid;
