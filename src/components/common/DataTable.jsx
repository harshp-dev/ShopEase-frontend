import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Box,
} from '@mui/material';
import Button from './Button';
const DataTable = ({ columns = [], rows = [], onEdit, onDelete, loading = false }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const renderCellContent = (row, col) => {
    if (col.field === 'actions') {
      return (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button label="Edit" variant="outlined" onClick={() => onEdit && onEdit(row)} />
          <Button label="Delete" variant="outlined" onClick={() => onDelete && onDelete(row)} />
        </Box>
      );
    }

    if (col.field === 'image') {
      return (
        <img
          src={row.image}
          alt={row.name || 'Image'}
          width={50}
          height={50}
          style={{ borderRadius: '4px', objectFit: 'cover' }}
        />
      );
    }

    if (col.field === 'images') {
      return (
        <img
          src={row.images?.[0]}
          alt="product"
          width={50}
          height={50}
          style={{ borderRadius: '4px', objectFit: 'cover' }}
        />
      );
    }

    if (col.field === 'category') {
      return row.category?.name || 'N/A';
    }

    if (col.renderCell) {
      return col.renderCell(row, { onEdit, onDelete });
    }

    return row[col.field] ?? '-';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Paper elevation={2}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.field}>{col.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, rowIndex) => (
              <TableRow key={row._id || rowIndex}>
                {columns.map((col) => (
                  <TableCell key={col.field}>{renderCellContent(row, col)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

export default DataTable;
