import React from 'react';
import './ProcessItem.sass';
import PropTypes from 'prop-types';

const ProcessItem = props => {
  return <div className={'processItem hasAnimation'}>
    <div className='processItem__image-wrapper-outer'>
      <div className='processItem__image-wrapper-inner'>
        <div className='processItem__image'
             style={{ backgroundImage: `url(./imgs/${ props.img })` }} />
      </div>
    </div>
    <h4 className='processItem__title'>
          <span className={'processItem__title-num'}>
            { props.num }. &nbsp;
          </span>
      { props.title }
    </h4>
    <p className={'processItem__desc'}>
      { props.desc }
    </p>
  </div>
};

ProcessItem.propTypes = {
  img: PropTypes.string,
  num: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string
};

export default ProcessItem;