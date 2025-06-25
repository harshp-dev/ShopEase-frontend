import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/slices/category';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import { ColumnTypes } from '../../constants/ColumnTypes';
import Button from '../../components/common/Button';

import {
  handleAddCategory,
  handleUpdateCategory,
  handleDeleteCategory,
} from '../../actions/categoryActions';

function Categories() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    categoryToDelete: null,
  });
  const [editModal, setEditModal] = useState({
    open: false,
    categoryToEdit: null,
  });
  const [addModal, setAddModal] = useState({
    open: false,
    categoryToAdd: null,
  });
  const { categories, loading, total } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories({ page: page + 1, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleDelete = (row) => {
    setDeleteModal({
      open: true,
      categoryToDelete: row,
    });
  };

  const handleEdit = (row) => {
    setEditModal({
      open: true,
      categoryToEdit: row,
    });
  };

  const handleAdd = () => {
    setAddModal({
      open: true,
      categoryToAdd: null,
    });
  };

  const handleUpdateCategorySubmit = (formData) => {
    if (editModal.categoryToEdit) {
      handleUpdateCategory(dispatch, formData, editModal.categoryToEdit._id, page, rowsPerPage);
      setEditModal({ open: false, categoryToEdit: null });
    }
  };

  const handleAddCategorySubmit = (formData) => {
    handleAddCategory(dispatch, formData, page, rowsPerPage);
    setAddModal({ open: false, categoryToAdd: null });
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.categoryToDelete) {
      handleDeleteCategory(dispatch, deleteModal.categoryToDelete._id);
      setDeleteModal({ open: false, categoryToDelete: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ open: false, categoryToDelete: null });
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
      <Button
        label="Add New Category"
        variant="contained"
        onClick={handleAdd}
        sx={{ marginBottom: '16px' }}
      />

      <DataTable
        columns={ColumnTypes.category}
        rows={categories}
        loading={loading}
        onDelete={handleDelete}
        onEdit={handleEdit}
        page={page}
        rowsPerPage={rowsPerPage}
        total={total}
        setPage={setPage}
        setRowsPerPage={(limit) => {
          setRowsPerPage(limit);
          setPage(0);
        }}
      />

      <Modal
        open={deleteModal.open}
        onClose={handleDeleteCancel}
        mode="confirm"
        title="Delete Category"
        confirmMessage={'Are you sure you want to delete the category'}
        confirmButtonLabel="Delete"
        onSubmit={handleDeleteConfirm}
      />
      <Modal
        open={editModal.open}
        onClose={() => setEditModal({ open: false, categoryToEdit: null })}
        mode="form"
        title="Edit Category"
        type="editCategory"
        initialData={{
          name: editModal.categoryToEdit?.name || '',
          image: editModal.categoryToEdit?.image || '',
        }}
        onSubmit={handleUpdateCategorySubmit}
      />
      <Modal
        open={addModal.open}
        onClose={() => setAddModal({ open: false, categoryToAdd: null })}
        mode="form"
        title="Add Category"
        type="addCategory"
        initialData={{
          name: '',
          image: '',
        }}
        onSubmit={handleAddCategorySubmit}
      />
    </div>
  );
}

export default Categories;
