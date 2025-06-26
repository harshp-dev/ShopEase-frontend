// import React from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   Box,
// } from '@mui/material';
// import Button from './Button';
// import LoadingSpinner from './LoadingSpinner';

// const DataTable = ({
//   columns = [],
//   rows = [],
//   loading = false,
//   onEdit,
//   onDelete,
//   page,
//   rowsPerPage,
//   total,
//   setPage,
//   setRowsPerPage,
// }) => {
//   const handleChangePage = (_, newPage) => setPage(newPage);

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//   };

//   const renderCellContent = (row, col) => {
//     if (col.field === 'actions') {
//       return (
//         <Box sx={{ display: 'flex', gap: 1 }}>
//           <Button label="Edit" variant="outlined" onClick={() => onEdit && onEdit(row)} />
//           <Button label="Delete" variant="outlined" onClick={() => onDelete && onDelete(row)} />
//         </Box>
//       );
//     }

//     if (col.field === 'image' || col.field === 'images') {
//       const imageUrl = row.image || (row.images && row.images[0]?.url);
//       if (imageUrl) {
//         return (
//           <img
//             src={imageUrl}
//             alt={row.name || 'Image'}
//             width={50}
//             height={50}
//             style={{ borderRadius: '4px', objectFit: 'cover' }}
//           />
//         );
//       } else {
//         return (
//           <img
//             src="-IMAGE-"
//             alt="No Image"
//             width={50}
//             height={50}
//             style={{ borderRadius: '4px', objectFit: 'cover' }}
//           />
//         );
//       }
//     }

//     if (col.field === 'category') {
//       return row.category?.name || 'N/A';
//     }

//     if (col.renderCell) {
//       return col.renderCell(row, { onEdit, onDelete });
//     }

//     return row[col.field] ?? '-';
//   };

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <Paper elevation={2}>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {columns.map((col) => (
//                 <TableCell key={col.field}>{col.headerName}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row, rowIndex) => (
//               <TableRow key={row._id || rowIndex}>
//                 {columns.map((col) => (
//                   <TableCell key={col.field}>{renderCellContent(row, col)}</TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         component="div"
//         count={total}
//         page={page}
//         onPageChange={handleChangePage}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[5, 2, 1]}
//       />
//     </Paper>
//   );
// };

// export default DataTable;

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Typography,
} from '@mui/material';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';

const DataTable = ({
  columns = [],
  rows = [],
  loading = false,
  onEdit,
  onDelete,
  page,
  rowsPerPage,
  total,
  setPage,
  setRowsPerPage,
}) => {
  const handleChangePage = (_, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const renderCellContent = (row, col) => {
    if (col.field === 'actions') {
      return (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button label="Edit" variant="outlined" onClick={() => onEdit && onEdit(row)} />
          <Button label="Delete" variant="outlined" onClick={() => onDelete && onDelete(row)} />
        </Box>
      );
    }

    if (col.field === 'image' || col.field === 'images') {
      const imageUrl = row.image || (row.images && row.images[0]?.url);
      if (imageUrl) {
        return (
          <img
            src={imageUrl}
            alt={row.name || 'Image'}
            width={50}
            height={50}
            style={{ borderRadius: '4px', objectFit: 'cover' }}
          />
        );
      } else {
        return (
          <img
            src="-IMAGE-"
            alt="No Image"
            width={50}
            height={50}
            style={{ borderRadius: '4px', objectFit: 'cover' }}
          />
        );
      }
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
    return <LoadingSpinner />;
  }

  // Show "No categories to display" message when there are no rows
  const renderEmptyState = () => (
    <TableRow>
      <TableCell colSpan={columns.length} sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="textSecondary">
          No categories to display
        </Typography>
      </TableCell>
    </TableRow>
  );

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
            {rows.length === 0
              ? renderEmptyState()
              : rows.map((row, rowIndex) => (
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
        count={total}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 2, 1]}
      />
    </Paper>
  );
};

export default DataTable;
