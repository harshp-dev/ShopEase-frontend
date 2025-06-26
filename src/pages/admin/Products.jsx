import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProductThunk,
  deleteProduct,
  fetchProductsForAdmin,
  updateProduct,
} from '../../redux/slices/product';
import { ColumnTypes } from '../../constants/ColumnTypes';
import DataTable from '../../components/common/DataTable';
import { Box, Typography } from '@mui/material';
import Modal from '../../components/common/Modal';
import { fetchCategories } from '../../redux/slices/category';
import normalizeProduct from '../../helpers/normalizeProduct ';
import Button from '../../components/common/Button';

function Products() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { products, loading, total } = useSelector((state) => state.product);
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    productToDelete: null,
  });
  const [editModal, setEditModal] = useState({
    open: false,
    productToEdit: null,
  });

  const [addModal, setAddModal] = useState({
    open: false,
    productToAdd: null,
  });

  useEffect(() => {
    dispatch(fetchCategories({ page: 1, limit: 100 }));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchProductsForAdmin({ page: page + 1, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleEdit = (row) => {
    setEditModal({
      open: true,
      productToEdit: row,
    });
  };

  const handleDelete = (row) => {
    setDeleteModal({
      open: true,
      productToDelete: row,
    });
  };

  const handleAddProduct = () => {
    setAddModal({
      open: true,
      productToAdd: null,
    });
  };

  const handleCloseEditModal = () => {
    setEditModal({
      open: false,
      productToEdit: null,
    });
  };

  const handleFormSubmit = async (data) => {
    if (editModal.productToEdit) {
      try {
        await dispatch(updateProduct({ id: editModal.productToEdit._id, data })).then(() => {
          dispatch(fetchProductsForAdmin({ page: page + 1, limit: rowsPerPage }));
        });
      } catch (error) {
        console.error('9. Update failed:', error);
        throw error;
      }
    }
  };

  const handleAddProductSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== 'images') {
        formData.append(key, data[key]);
      }
    });
    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) => {
        if (file instanceof File) {
          formData.append('images', file);
        }
      });
    }

    dispatch(addProductThunk(formData))
      .then(() => {
        dispatch(fetchProductsForAdmin({ page: page + 1, limit: rowsPerPage }));
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });

    setAddModal({ open: false, productToAdd: null });
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal.productToDelete) {
      try {
        dispatch(deleteProduct(deleteModal.productToDelete._id));
      } catch (error) {
        console.error('Delete failed:', error);
      } finally {
        setDeleteModal({
          open: false,
          productToDelete: null,
        });
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({
      open: false,
      productToDelete: null,
    });
  };

  return (
    <div className="p-4">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        sx={{ height: '20vh' }}
      >
        <Typography variant="h4" component="h2" width="50%">
          Product List
        </Typography>
        <Button label="Add New Product" variant="contained" onClick={handleAddProduct} />
      </Box>
      <DataTable
        columns={ColumnTypes.product}
        rows={products}
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
        title="Delete product"
        confirmMessage={`Are you sure you want to delete the product "${deleteModal.productToDelete?.name || 'this product'}"? This action cannot be undone.`}
        confirmButtonLabel="Delete"
        onSubmit={handleDeleteConfirm}
      />
      <Modal
        open={editModal.open}
        onClose={handleCloseEditModal}
        title="Edit Product"
        mode="form"
        type="editProduct"
        initialData={normalizeProduct(editModal.productToEdit)}
        onSubmit={handleFormSubmit}
      />
      <Modal
        open={addModal.open}
        onClose={() => setAddModal({ open: false, productToAdd: null })}
        mode="form"
        title="Add Product"
        type="addProduct"
        onSubmit={handleAddProductSubmit}
      />
    </div>
  );
}

export default Products;
