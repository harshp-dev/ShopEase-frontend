import { useRef, useState } from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Arrow from './Arrow';
import { useNavigate } from 'react-router-dom';

const Carousel = ({ items, imageKey, titleKey, slidesToShow }) => {
  const navigate = useNavigate();
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
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 3 },
      },
    ],
  };

  return (
    <Box sx={{ maxWidth: '100%', p: 2 }}>
      <Slider ref={sliderRef} {...settings}>
        {items.map((item) => (
          <Box
            onClick={() => navigate(`category/${item[titleKey]}`)}
            key={item._id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyItems: 'center',
              alignItems: 'center',
              width: 160,
              mx: 'auto',
              cursor: 'pointer',
            }}
          >
            <Box
              component="img"
              src={item[imageKey]}
              alt={item[titleKey]}
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid #ccc',
                mb: 1,
              }}
            />
            <Typography variant="subtitle2" fontWeight={700} letterSpacing={1}>
              {item[titleKey]}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Carousel;
