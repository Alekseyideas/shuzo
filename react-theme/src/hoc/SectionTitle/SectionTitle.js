import React from 'react';
import './SectionTitle.sass';
import PropTypes from 'prop-types';

const SectionTitle = props => {
  return <div className={'section-info'}>
    <h4 className={'section-info__subtitle'}>{ props.subtitle }</h4>
    <h2 className={'section-info__title'}>{ props.title }</h2>
    <p className={'section-info__description'}>{ props.description }</p>
  </div>
};

SectionTitle.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default SectionTitle;