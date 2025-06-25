import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';

const initialProducts = [
  {
    id: 1,
    name: 'Apple iPhone 15',
    description: 'Latest Apple phone',
    price: 1200,
    category: 'smartphones',
    stock: 5,
    images: '',
  },
  {
    id: 2,
    name: 'Samsung TV',
    description: 'Smart 4K UHD',
    price: 799,
    category: 'tv',
    stock: 2,
    images: '',
  },
];

const EditProductPage = () => {
  const [products, setProducts] = useState(initialProducts);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Open modals
  const openEditModal = (product) => {
    setEditData(product);
    setShowEditModal(true);
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  // Handlers
  const handleEditProduct = (updatedData) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === editData.id ? { ...product, ...updatedData } : product,
      ),
    );
    setShowEditModal(false);
  };

  const handleAddProduct = (newData) => {
    const newProduct = {
      ...newData,
      id: products.length + 1, // Simple unique ID generation
    };
    setProducts((prev) => [...prev, newProduct]);
    setShowAddProductModal(false);
  };

  const handleDeleteProduct = () => {
    setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
    setShowDeleteModal(false);
  };

  const handleAddCategory = (categoryData) => {
    console.log('New Category Added:', categoryData);
    setShowCategoryModal(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      {products.map((product) => (
        <div key={product.id} style={{ marginBottom: 16 }}>
          <Typography variant="body1">
            <strong>{product.name}</strong> - ${product.price}
          </Typography>
          <Button
            label="Edit"
            variant="outlined"
            onClick={() => openEditModal(product)}
            style={{ marginTop: 6, marginRight: 8 }}
          />
          <Button
            label="Delete"
            variant="outlined"
            onClick={() => openDeleteModal(product)}
            style={{ marginTop: 6 }}
          />
        </div>
      ))}

      <Button
        label="Add Product"
        variant="contained"
        onClick={() => setShowAddProductModal(true)}
        style={{ marginTop: 24, marginRight: 10 }}
      />
      <Button
        label="Add Category"
        variant="contained"
        onClick={() => setShowCategoryModal(true)}
        style={{ marginTop: 24 }}
      />

      {/* Add Product Modal */}
      <Modal
        open={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        mode="form"
        type="addProduct"
        initialData={editData}
        title="Add New Product"
        onSubmit={handleAddProduct}
      />

      {/* Edit Product Modal */}
      <Modal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        mode="form"
        type="editProduct"
        title="Edit Product"
        initialData={editData}
        onSubmit={handleEditProduct}
      />

      {/* Add Category Modal */}
      <Modal
        open={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        mode="form"
        type="addCategory"
        title="Add New Category"
        onSubmit={handleAddCategory}
      />

      {/* Delete Product Confirmation Modal */}
      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        mode="confirm"
        title="Delete Product"
        confirmMessage={`Are you sure you want to delete "${productToDelete?.name}"?`}
        onSubmit={handleDeleteProduct}
      />
    </Container>
  );
};

export default EditProductPage;
