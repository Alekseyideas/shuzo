import React, { Component } from 'react';
import './PopUp.css';
import {Btn} from '../Btns/Btns';

class PopUp extends Component{
  state = {
    show: false,
  };



  render() {
    const body = document.getElementById('root');
    if(this.props.show){
      body.style.overflow = 'hidden';
      body.style.maxHeight = '100vh';
    } else {
      body.style.overflow = null;
      body.style.maxHeight = null;
    }

    const contant = () => {
      return this.props.show ? <div className='popUpWrapper' onClick={this.props.click}>
        <div className='popUpContainer'>
          <Btn classes='btn-close' click={this.props.closePopUp}>&times;</Btn>
          { this.props.children }
        </div>
      </div> : null;
    };

    return contant();
  }
};

export default PopUp;