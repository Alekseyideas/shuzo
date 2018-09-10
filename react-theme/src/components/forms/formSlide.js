import React, { Component } from 'react';
import PopUp from '../../hoc/PopUp/PopUp';
import MediaImgs from '../MediaImgs/MediaImgs';
import './formSlide.css';
import * as actionType from '../../store/actionTypes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FormSlide extends Component {
  state = {
    showMedia: false,
    edit: this.props.edit,
    updateImage: false,
    slide: {
      title: this.props.slideTitle !== undefined ? this.props.slideTitle : '',
      text: this.props.slideText !== undefined ? this.props.slideText : '',
      img: this.props.slideImage !== undefined ? this.props.slideImage : '',
      id: this.props.id !== undefined ? this.props.id : null,
      imgId: null
      //imgId: this.props.slideImage !== undefined ? this.props.slideImage.id : null
    },
  };

  onChangeInput(e) {
    const newState = { ...this.state };
    const name = e.target.name;
    let val = e.target.value;
    if (name === 'img'){
      val = e.target.files[0];
      newState.updateImage = true;
    }
    newState.slide[name] = val;
    this.setState({ ...newState });
  }

  onClickShowMedia = () => {
    const newState = { ...this.state };
    newState.showMedia = true;
    this.setState({ showMedia: newState.showMedia})
  };

  getIdImg = id => {
    const newState = {...this.state};
    newState.slide.imgId = id;
    newState.updateImage = false;
    this.setState({ ...newState })
  };

  clickSubmit = (id, img, imgId, title, text) => {
    if(this.state.edit){
      this.props.editSlide(id, img, imgId, title, text, this.state.updateImage );
    }
    else{
      this.props.addSlide(img, imgId, title, text, this.state.updateImage);
    }
    this.props.close();
  };
  render() {
    const { img, id, title, text, imgId} = this.state.slide;
    return (
        <PopUp show = {this.props.show} closePopUp = {this.props.close}>
          <h2>{ this.props.title }</h2>
          <div className='form-group'>
            <label htmlFor='slideBg'>Slide background</label>
            <p className='subText'>Upload image (only jpg)</p>
            <input type='file'
                   id='slideBg'
                   onChange={ (e) => this.onChangeInput(e) }
                   name='img' />
            <p className='subText'>or show uploaded images</p>
            <button onClick={ this.onClickShowMedia }>Show</button>
            {this.state.showMedia ? <MediaImgs getId={(id)=>this.getIdImg(id)}/> : null}
          </div>
          <div className='form-group'>
            <label htmlFor='slideTitle'>Title slide</label>
            <input type='text'
                   id='slideTitle'
                   name='title'
                   value={this.state.slide.title}
                   onChange={ (e) => this.onChangeInput(e) }/>
          </div>
          <div className='form-group'>
            <label htmlFor='slideText'>Text slide</label>
            <textarea
                   id='slideText'
                   onChange={ (e) => this.onChangeInput(e) }
                   name='text'
                   value={this.state.slide.text}
            />

          </div>
          <button type='button'
                  className='btn btn-success'
                  onClick={() => this.clickSubmit(id, img, imgId, title, text)}>
            {this.state.edit ? 'Edit Slide' : 'Add Slide'}
          </button>

        </PopUp>
    );
  }
};


FormSlide.propTypes = {
  slide: PropTypes.object.isRequired,
  slidesLoading: PropTypes.bool.isRequired,
  getSlides: PropTypes.func,
  addSlide: PropTypes.func,
  editSlide: PropTypes.func
};
const mapStateToProps = state => {
  return {
    slide: state.getSlides.slide,
    slidesLoading: state.getSlides.loading,
  }
};
const mapDispatchToProps = dispatch => {
  return {
    getSlides: () => dispatch({ type: actionType.GET_SLIDES_LOADING }),
    addSlide: (img, imgId, title, text, updateImage) => dispatch({ type: actionType.CREATE_SLIDE_START, img, imgId, title, text, updateImage}),
    editSlide: (id, img, imgId, title, text, updateImage ) => dispatch({ type: actionType.EDIT_SLIDE_START, id, img, imgId, title, text, updateImage })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FormSlide);