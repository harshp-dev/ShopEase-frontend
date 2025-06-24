import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/slices/category';
import DataTable from '../../components/common/DataTable';
import { ColumnTypes } from '../../constants/ColumnTypes';

function Categories() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { categories, loading, total } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchCategories({ page: page + 1, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleEdit = (row) => {
    console.log('Edit category:', row);
  };

  const handleDelete = (row) => {
    console.log('Delete category:', row);
  };

  return (
    <div className="p-4">
      <h2
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20vh',
          marginBottom: '32px',
        }}
      >
        Category List
      </h2>
      <DataTable
        columns={ColumnTypes.category}
        rows={categories}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        page={page}
        rowsPerPage={rowsPerPage}
        total={total}
        setPage={setPage}
        setRowsPerPage={(limit) => {
          setRowsPerPage(limit);
          setPage(0);
        }}
      />
    </div>
  );
}

export default Categories;
