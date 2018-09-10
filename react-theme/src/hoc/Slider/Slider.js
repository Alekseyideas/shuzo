import React from 'react';
import './Slider.css';
import Slider from 'react-slick';

const SliderWrapper = props => {
  return (
    <Slider { ...props.settings } className={ props.classes }>
      { props.children }
    </Slider>
  )
};

export default SliderWrapper;