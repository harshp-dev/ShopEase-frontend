import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, fetchProductsForAdmin, updateProduct } from '../../redux/slices/product';
import { ColumnTypes } from '../../constants/ColumnTypes';
import DataTable from '../../components/common/DataTable';
import { Box, Button, Typography } from '@mui/material';
import Modal from '../../components/common/Modal';
import { fetchCategories } from '../../redux/slices/category';
import normalizeProduct from '../../helpers/normalizeProduct ';

function Products() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { products, loading, total } = useSelector((state) => state.product);
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    productToDelete: null,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    dispatch(fetchCategories({ page: 1, limit: 100 }));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchProductsForAdmin({ page: page + 1, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleEdit = (row) => {
    setSelectedProduct(row);
    setIsEditModalOpen(true);
  };

  const handleDelete = (row) => {
    setDeleteModal({
      open: true,
      productToDelete: row,
    });
  };

  const handleAddProduct = () => {};

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleFormSubmit = async (data) => {
    if (selectedProduct) {
      try {
        await dispatch(updateProduct({ id: selectedProduct._id, data }))
          .unwrap()
          .then(() => dispatch(fetchProductsForAdmin({ page: page + 1, limit: rowsPerPage })));
      } catch (error) {
        console.error('9. Update failed:', error);
        throw error;
      }
    }
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
        <Typography variant="h4" component="h2" width="100%">
          Product List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: 'auto', px: 3 }}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
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
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        title="Edit Product"
        mode="form"
        type="editProduct"
        initialData={normalizeProduct(selectedProduct)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default Products;
