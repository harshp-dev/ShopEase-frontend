const normalizeProduct = (product) => {
  if (!product) {
    return {};
  }

  return {
    name: product.name || '',
    description: product.description || '',
    price: product.price || '',
    stock: product.stock || '',
    category: product.category?._id || '',
    images: [],
  };
};

export default normalizeProduct;
