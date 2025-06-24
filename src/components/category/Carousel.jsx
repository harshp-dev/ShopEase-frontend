import { useRef, useState } from 'react';
import Slider from 'react-slick';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Arrow from './Arrow';

const Carousel = ({ items, imageKey, titleKey, slidesToShow }) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    beforeChange: (_, next) => setCurrentSlide(next),
    nextArrow: (
      <Arrow
        onClick={() => sliderRef.current?.slickNext()}
        disabled={currentSlide >= items.length - slidesToShow}
        icon={<ArrowForwardIosIcon fontSize="small" />}
        position="right"
      />
    ),
    prevArrow: (
      <Arrow
        onClick={() => sliderRef.current?.slickPrev()}
        disabled={currentSlide === 0}
        icon={<ArrowBackIosNewIcon fontSize="small" />}
        position="left"
      />
    ),
    responsive: [
      {
        breakpoint: 960,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box sx={{ maxWidth: '100%', p: 2, position: 'relative' }}>
      <Slider ref={sliderRef} {...settings}>
        {items.map((item) => (
          <Card
            key={item._id}
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              width: 160,
              height: 250,
              mx: 'auto',
            }}
          >
            <CardMedia
              component="img"
              image={item[imageKey]}
              alt={item[titleKey]}
              sx={{ height: 180, width: '100%', objectFit: 'cover' }}
            />
            <CardContent sx={{ textAlign: 'center', py: 0.5 }}>
              <Typography variant="subtitle2" fontWeight={500}>
                {item[titleKey]}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
