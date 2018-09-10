import React, { Component } from 'react';
import {Btn} from '../../hoc/Btns/Btns';
import { connect } from 'react-redux';
import * as actionType from '../../store/actionTypes';

class BtnControl extends Component{
  render() {
    return <Btn classes='btn-control'
                click={  this.props.fnControl }>
      { this.props.controls ? 'Hide' : 'Show' } controls </Btn>
  }
}

const mapStateToProps = state => {
  return {
    controls: state.mainController.control
  }
};
const mapDispatchToProps = dispatch => {
  return {
    fnControl: () => dispatch({ type: actionType.CONTROL_TOGGLE })
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(BtnControl);

