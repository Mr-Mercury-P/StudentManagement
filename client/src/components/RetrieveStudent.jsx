import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

const RetrieveStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/students") // API Endpoint
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch students: " + err.message);
        setLoading(false);
      });
  }, []);

  // Define columns using `createColumnHelper`
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("rollno", {
      header: "Roll No",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("department", {
      header: "Department",
      cell: (info) => info.getValue(),
    }),
  ];

  // Setup Table Instance
  const table = useReactTable({
    data: students,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Inline styles
  const styles = {
    container: {
      padding: '2rem',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '2rem',
    },
    tableContainer: {
      width: '100%',
      maxWidth: '800px',
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      textAlign: 'left',
    },
    thead: {
      backgroundColor: '#f0f0f0',
      color: '#333',
    },
    th: {
      border: '1px solid #ccc',
      padding: '12px',
      cursor: 'pointer',
    },
    tr: {
      textAlign: 'center',
      border: '1px solid #ccc',
      transition: 'background-color 0.2s',
    },
    td: {
      border: '1px solid #ccc',
      padding: '12px',
    },
    pagination: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#ccc',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    buttonDisabled: {
      backgroundColor: '#e0e0e0',
      cursor: 'not-allowed',
    },
    error: {
      color: 'red',
      backgroundColor: '#f8d7da',
      padding: '1rem',
      borderRadius: '4px',
      marginTop: '1rem',
    },
  };

  if (loading) {
    return <div style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '2rem' }}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Student List</h1>

      {/* Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={styles.th}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc" ? " ↑" : header.column.getIsSorted() === "desc" ? " ↓" : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} style={styles.tr}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={styles.td}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div style={styles.pagination}>
        <button
          style={{ ...styles.button, ...(table.getCanPreviousPage() ? {} : styles.buttonDisabled) }}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <button
          style={{ ...styles.button, ...(table.getCanNextPage() ? {} : styles.buttonDisabled) }}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RetrieveStudent;