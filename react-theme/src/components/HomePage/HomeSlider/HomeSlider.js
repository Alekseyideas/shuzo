import React, { Component, Fragment } from 'react';
import './HomeSlider.sass';
import SliderWrapper from '../../../hoc/Slider/Slider';
import {Btn} from '../../../hoc/Btns/Btns';
import FormSlide from '../../forms/formSlide';
import { connect } from 'react-redux';

class HomeSlider extends Component {

  state = {
    showEditPopUp: false,
    showCreatePopUp: false,
    slide: null
  };

  fnShowEditPopUp = (id) => {
    this.getSlide(id);
    this.setState({ showEditPopUp: true });
  };
  fnShowCreatePopUp = () => {
    this.getSlide();
    this.setState({ showCreatePopUp: true });
  };
  fnCloseCreatePopUp = () => {
    this.setState({ showCreatePopUp: false });
  };
  fnCloseEditPopUp = () => {
    this.setState({ showEditPopUp: false });
  };
  getSlide = id => {
    const slide = this.props.slides.filter(slide => slide.id === id ? slide : null);
    this.setState({ slide: slide[0] });
  };


  render() {
    const settings = {
       dots: true,
       infinite: true,
       speed: this.props.settings.speed,
       autoplaySpeed: this.props.settings.autoplaySpeed,
       fade: this.props.settings.fadeIn === 1,
       autoplay: false,
       slidesToShow: 1,
       slidesToScroll: 1,
       useTransform: false,
      onInit: () => {
         setTimeout(() => {
           document.querySelector('.mainSlider .slick-current .homeSlideTitle').classList.add('active');
           setTimeout(function () {
             document.querySelector('.mainSlider .slick-current .homeSlideText').classList.add('active')},500)
         },100)
      },
      beforeChange: ()=>{
        document.querySelectorAll('.mainSlider .homeSlideTitle').forEach(item=>{
          item.classList.remove('active');
        });
        document.querySelectorAll('.mainSlider .homeSlideText').forEach(item=>{
          item.classList.remove('active');
        });
      },
      afterChange: () =>{
       document.querySelector('.mainSlider .slick-current .homeSlideTitle').classList.add('active');
       setTimeout(function () {
         document.querySelector('.mainSlider .slick-current .homeSlideText').classList.add('active')
       },500)
      }


       //prevArrow: () => 'bef',
       //customPaging: () => <button />

    };
    const { slides } = this.props;

    const auth = this.props.authSettings.auth;

    const authControls = (id)=> {
      return (
          <Fragment>
            <Btn click={() => this.props.delete(id)} classes='btn-delete'> Delete </Btn>
            <Btn click={() => this.fnShowEditPopUp(id)} classes='btn-edit'> Edit </Btn>
          </Fragment>
      );
    };

    const slide = () => {
       if(slides.length > 0) {
         return slides.map((slide, key) => {
           const img = slide.better_featured_image ? slide.better_featured_image.source_url : '';
           const slideStyles = {
             textAlign: 'center',
             backgroundImage: `url(${img})`
           };

           return (
               <Fragment key={key}>
                 <div className='homeSlide'  style={slideStyles}>
                   <div className='homeSlideInner'>
                     <h2 className='homeSlideTitle'>{ slide.title.rendered }</h2>
                     <div className='homeSlideText' dangerouslySetInnerHTML={{ __html: slide.content.rendered}} />
                     { auth && this.props.control ? authControls(slide.id) : null }
                   </div>
                 </div>
               </Fragment>
           )
         });
       }
     };
    return (
        <Fragment>
          <SliderWrapper settings ={ settings } >
            { slide() }
          </SliderWrapper>
          {this.props.control ?
              <Btn
                  classes='btn btn-create'
                  click={this.fnShowCreatePopUp}>
                Create new slide</Btn> : null}


          {this.state.slide !== null && this.state.slide !== undefined ?
              <FormSlide
                  title= 'Edit Slide'
                  slideTitle = { this.state.slide.title.rendered }
                  slideText = { this.state.slide.content.rendered }
                  slideImage = { this.state.slide.better_featured_image }
                  id={ this.state.slide.id }
                  show={ this.state.showEditPopUp }
                  edit={true}
                  close = { this.fnCloseEditPopUp }/> : null}

          <FormSlide
              title= 'Create Slide'
              show={ this.state.showCreatePopUp }
              close = { this.fnCloseCreatePopUp }/>
        </Fragment>

    )
  };
};

const mapStateToProps = state => {
  return {
    control: state.mainController.control
  }
};

export default connect(mapStateToProps)(HomeSlider);