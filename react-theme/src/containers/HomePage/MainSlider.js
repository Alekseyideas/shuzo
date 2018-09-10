import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../store/actionTypes';
import HomeSlider from '../../components/HomePage/HomeSlider/HomeSlider';
// import axios from 'axios';
// import domain from '../../config/domain';

class MainSlider extends Component {

  componentDidMount() {
    this.props.getSliderSettings();
    this.props.getSlides();
  }

  render() {
    const { slides, sliderSettings, slidesLoading } = this.props;
    let uiSlides = [];
    if(slides.length > 0){
      uiSlides = slides;
    }

    return (
        <section className='mainSlider' style={{minHeight: '100vh',position: 'relative'}}>
          { !slidesLoading && !sliderSettings.settingsLoading ?
              <HomeSlider slides={ uiSlides }
                          authSettings = { this.props.authSettings }
                          delete = { (id) => this.props.deleteSlide(id) }
                          edit = { (id) => this.props.editSlide(id) }
                          settings={ sliderSettings }/> : null }

        </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    slides: state.getSlides.slides,
    slide: state.getSlides.slide,
    slidesLoading: state.getSlides.loading,
    sliderSettings: {
      autoplaySpeed: state.getSliderSettings.autoplaySpeed,
      speed: state.getSliderSettings.speed,
      fadeIn: state.getSliderSettings.fadeIn,
      animation: state.getSliderSettings.animation,
      settingsLoading: state.getSliderSettings.loading

    }
  }
};
const mapDispatchToProps = dispatch => {
  return {
    getSlides: () => dispatch({ type: actionType.GET_SLIDES_LOADING }),
    getSliderSettings: () => dispatch({ type: actionType.GET_SLIDER_SETTINGS_LOADING}),
    deleteSlide: (id) => dispatch({ type: actionType.DELETE_SLIDE_START, id }),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(MainSlider);
