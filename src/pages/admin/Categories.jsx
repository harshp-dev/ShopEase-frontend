import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  deleteCategory,
  updateCategory,
  addCategoryThunk,
} from '../../redux/slices/category';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import { ColumnTypes } from '../../constants/ColumnTypes';
import Button from '../../components/common/Button';
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
  const handleAddCategory = () => {
    setAddModal({
      open: true,
      categoryToAdd: null,
    });

  };

  const handleUpdateCategory = (formData) => {
    if (editModal.categoryToEdit) {
      const data = new FormData();
      data.append('name', formData.name);

      if (formData.image) {
        let fileToUpload = null;

        if (formData.image instanceof FileList && formData.image.length > 0) {
          fileToUpload = formData.image[0];
        } else if (formData.image instanceof File) {
          fileToUpload = formData.image;
        }

        if (fileToUpload) {
          data.append('image', fileToUpload);
        }
      }

      dispatch(
        updateCategory({
          id: editModal.categoryToEdit._id,
          data,
        }),
      );

      setEditModal({
        open: false,
        categoryToEdit: null,
      });
    }
  };
  const handleDeleteConfirm = async () => {
    if (deleteModal.categoryToDelete) {
      try {
        dispatch(deleteCategory(deleteModal.categoryToDelete._id));
        console.log('Category deleted successfully');
      } catch (error) {
        console.error('Delete failed:', error);
      } finally {
        setDeleteModal({
          open: false,
          categoryToDelete: null,
        });
      }
    }
  };
  const handleAddCategorySubmit = (formData) => {
    const data = new FormData();
    data.append('name', formData.name);

    if (formData.image) {
      let fileToUpload = null;
      if (formData.image instanceof FileList && formData.image.length > 0) {
        fileToUpload = formData.image[0];
      } else if (formData.image instanceof File) {
        fileToUpload = formData.image;
      }

      if (fileToUpload) {
        data.append('image', fileToUpload);
      }
    }

    dispatch(addCategoryThunk(data))
      .then(() => {
        dispatch(fetchCategories({ page: page + 1, limit: rowsPerPage }));
      })
      .catch((error) => {
        console.error('Error adding category:', error);
      });

    setAddModal({ open: false, categoryToAdd: null });
  };

  const handleDeleteCancel = () => {
    setDeleteModal({
      open: false,
      categoryToDelete: null,
    });
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
        onClick={handleAddCategory}
        sx={{ marginBottom: '16px' }} // Styling the button for spacing
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
        onSubmit={handleUpdateCategory}
      />
      <Modal
        open={addModal.open}
        onClose={() => setAddModal({ open: false, categoryToAdd: null })}
        mode="form"
        title="Add Category"
        type="addCategory" // This will refer to the 'addCategory' in FormTypes
        initialData={{
          name: '',
          image: '',
        }}
        onSubmit={handleAddCategorySubmit} // Handle submission for adding category
      />
    </div>
  );
}

export default Categories;
