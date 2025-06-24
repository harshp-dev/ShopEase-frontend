import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 300, borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
