import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const SmallProductCard = ({ product }) => {
  return (
    <Card
      component={Link}
      to={`/user/product/${product._id}`}
      sx={{
        width: 160,
        mx: 1,
        textDecoration: 'none',
        borderRadius: '8px',
        '&:hover': { boxShadow: 4 },
      }}
    >
      <CardMedia
        component="img"
        height="150"
        image={product.images[0]?.url || '/placeholder.png'}
        alt={product.name}
      />
      <CardContent sx={{ py: 1.5 }}>
        <Typography variant="body2" noWrap>
          {product.name}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          ₹{product.price.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SmallProductCard;
