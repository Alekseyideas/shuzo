import React from 'react';
import './Service.sass';
import PropTypes from 'prop-types';

const Service = props => {
  return(
      <div className='service hasAnimation'>
        <div className='service__image'>
          <img src={`./imgs/${props.img}`} alt='title'/>
        </div>
        <h3 className='service__title'>
          {props.title}
        </h3>
        <p className={'service__text'}>
          {props.text}
        </p>
      </div>
  )
};

Service.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
};
export default Service;