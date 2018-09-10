import React, { Component } from 'react';
import './Process.sass';
import SectionTitle from '../../../hoc/SectionTitle/SectionTitle';
import ProcessItem from '../../../components/HomePage/ProcessItem/ProcessItem';
import SliderWrapper from '../../../hoc/Slider/Slider';
import {SlideSettings} from '../../../config/slideSetting';
import {scrollAnimation} from '../../../config/animationFn';

class Process extends Component{
  state = {
    processes: [
      {
        img: 'warning.svg',
        num: '01',
        title: 'Brainstorming',
        desc: 'The first step is to take all the project’s data & start thinking about it!'
      },{
        img: 'printer.svg',
        num: '02',
        title: 'Prototype',
        desc: 'To know everything about the product, customers & the  competitors.'
      },{
        img: 'layers.svg',
        num: '03',
        title: 'Design',
        desc: 'Start to work on the design taking in mind all the data you have collected.'
      },{
        img: 'chart-bars.svg',
        num: '04',
        title: 'Evaluation',
        desc: 'Reach a conclusion from the investigations about the product you work on.'
      }
    ]
  };
  render() {

    scrollAnimation('.process','.processItem');

    const processesTamplate = () => {
      return this.state.processes.map((process,key) => {
        return <ProcessItem key={key}
                            img={process.img}
                            num={process.num}
                            title={process.title}
                            desc={process.desc}

        />
      })
    };
    return <section className={'process'}>
      <div className='container'>
        <SectionTitle
            subtitle={ 'How It Works?' }
            title={ 'Our Work Process' }
            description={
              `Follow our latest news and thoughts
              which focuses exclusively on design,
              art, vintage, and also our latest work updates.` } />

        <SliderWrapper
            classes={'process__slider custom-dots'}
            settings={SlideSettings}>
          { processesTamplate() }
        </SliderWrapper>

      </div>
    </section>
  }

}
export default Process;