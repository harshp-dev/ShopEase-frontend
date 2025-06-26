export const ColumnTypes = {
  category: [
    { field: 'name', headerName: 'Category Name' },
    { field: 'image', headerName: 'Image' },
    { field: 'actions', headerName: 'Actions' },
  ],

  product: [
    { field: 'name', headerName: 'Product Name' },
    { field: 'price', headerName: 'Price' },
    { field: 'stock', headerName: 'Stock' },
    { field: 'category', headerName: 'Category' },
    { field: 'images', headerName: 'Image' },
    { field: 'actions', headerName: 'Actions' },
  ],

  orders: [
    { field: 'orderId', headerName: 'Order ID' },
    { field: 'customer', headerName: 'Customer' },
    { field: 'mobileNumber', headerName: 'Mobile' },
    { field: 'products', headerName: 'Products' },
    { field: 'totalQuantity', headerName: 'Total Items' },
    { field: 'totalAmount', headerName: 'Total Amount' },
    { field: 'address', headerName: 'Shipping Address' },
    { field: 'createdAt', headerName: 'Order Date' },
    { field: 'paymentId', headerName: 'Payment ID' },
  ],
};
