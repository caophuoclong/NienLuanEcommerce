import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link, useNavigate } from 'react-router-dom';
export default function Slider({
  height = 300,
  width = '100%',
}) {
  console.log(width);
  const navigate = useNavigate();
  const carousel = [
    {
      to: '/khuyen-mai/3-2',
      src: 'https://picsum.photos/300',
    },
    {
      to: '/khuyen-mai/3-3',
      src: 'https://picsum.photos/300',
    },
    {
      to: '/khuyen-mai/3-4',
      src: 'https://picsum.photos/300',
    },
    {
      to: '/khuyen-mai/3-5',
      src: 'https://picsum.photos/300',
    },
  ];
  const onClickItem = (index, item) => {
    const {
      props: { to },
    } = item;
    navigate(to);
  };

  return (
      <div className={`w-[${width}]`}>
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
            <img src={item.src} className={`h-[320px] rounded-lg w-[${width}]`} />
          </Link>
        ))}
      </Carousel>
      </div>
  );
}
