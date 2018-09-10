import React, { Component } from 'react';
import Service from '../../../components/HomePage/Service/Service';
import './Services.sass'
import SliderWrapper from '../../../hoc/Slider/Slider';
import {SlideSettings} from '../../../config/slideSetting';

class Services extends Component {
  state = {
    services: [
      {
        img: 'diam.svg',
        title: 'Creative Design',
        text: 'Your logo is the very heart of  identity, let our designers deliver the perfect dreamy design for your business.',
      },
      {
        img: 'monitor.svg',
        title: 'Web Development',
        text: 'What separates us from all other web design agencies is the ability to offer the most User Friendly Experience.',
      },
      {
        img: 'rocket.svg',
        title: 'Digital Marketing',
        text: 'Photography is the core of everything we do, photography equipment, camera and reviews, photography.',
      },
      {
        img: 'video-player.png',
        title: 'Production',
        text: 'Graphic design is a process of visual and problem solving through the use of type, space, image & color.',
      }
    ]
  };

  render() {
    const servicesTemplate = () => {
      return this.state.services.map((service, key) => {
        return <Service key={ key }
            img={ service.img }
            title={ service.title }
            text={ service.text } />
      })
    };


    (function scrollAnimation() {
      const services = document.querySelector('.services');
      if(services){
        const startAnimation = services.offsetTop - window.innerHeight/2;
        const slides = services.querySelectorAll('.service');

        window.addEventListener('scroll', () => {
          if(window.scrollY > startAnimation && !services.classList.contains('animated')){
            services.classList.add('animated');
            let duration = 500;
            if (window.innerWidth < 1024)
              duration = 0
            slides.forEach( (slide, i) => {
              setTimeout( () => {
                slide.classList.add('animated', 'fadeIn');
              }, i * duration);
            });
          }
        })
      }
    })();

    return (
        <section className='services'>
          <div className='container'>
            <SliderWrapper settings={ SlideSettings } classes={"services__slider custom-dots"}>
              { servicesTemplate() }
            </SliderWrapper>
          </div>
        </section>
    )
  }
}

export default Services;