import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory } from '../../redux/slices/category';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import { ColumnTypes } from '../../constants/ColumnTypes';

function Categories() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    categoryToDelete: null,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { categories, loading, total } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories({ page: page + 1, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleEdit = (row) => {
    console.log('Edit category:', row);
    setSelectedCategory(row);
    setIsEditModalOpen(true);
  };

  const handleDelete = (row) => {
    setDeleteModal({
      open: true,
      categoryToDelete: row,
    });
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCategory(null);
  };
  // const handleFormSubmit = (formData) => {
  //   console.log(`[Categories.jsx] Form data received:`, formData);

  //   const data = new FormData();
  //   data.append('name', formData.name);
  //   if (formData.image) {
  //     data.append('image', formData.image);
  //     console.log(`[Categories.jsx] Image attached:`, formData.image);
  //   }

  //   try {
  //     const result = dispatch(
  //       updateCategory({
  //         id: selectedCategory._id,
  //         data,
  //       }),
  //     );

  //     console.log(`[Categories.jsx] Dispatch result:`, result);

  //     if (updateCategory.fulfilled.match(result)) {
  //       handleCloseEditModal();
  //       console.log('[Categories.jsx] Category updated successfully');
  //     } else {
  //       console.error('[Categories.jsx] Failed to update category:', result.payload);
  //     }
  //   } catch (error) {
  //     console.error('[Categories.jsx] Error during update:', error);
  //   }
  // };
  const handleFormSubmit = () => {
    console.log('button clicked');
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

      <Modal
        open={deleteModal.open}
        onClose={handleDeleteCancel}
        mode="confirm"
        title="Delete Category"
        confirmMessage={`Are you sure you want to delete the category "${deleteModal.categoryToDelete?.name || 'this category'}"? This action cannot be undone.`}
        confirmButtonLabel="Delete"
        onSubmit={handleDeleteConfirm}
      />
      <Modal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        title="Edit Category"
        mode="form"
        type="editCategory"
        initialData={selectedCategory}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default Categories;
