import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link, useNavigate } from 'react-router-dom';
export default function Slider({
  height = 300,
  width = '100%',
  carousel = []
}) {
  const navigate = useNavigate();

  const onClickItem = (index, item) => {
    const {
      props: { to },
    } = item;
    navigate(to);
  };

  return (
        <Carousel
        showArrows={true}
        onClickItem={onClickItem}
        showThumbs={false}
        showStatus={false}
        autoPlay
        duration={2000}
        infiniteLoop
        width={width}
      >
        {carousel.map((item, index) => (
          <Link to={item.to}>
            <img src={item.src} className={`h-[320px] rounded-lg`} />
          </Link>
        ))}
      </Carousel>
  );
}
