import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../store/actionTypes';
// import axios from 'axios';
// import domain from '../../config/domain';
import MainSlider from './MainSlider';
import {token} from '../../config/token';
import BtnControl from '../../components/Btns/BtnControl';
import Services from './Services/Services';
import Process from './Process/Process';

class Index extends Component {
  componentDidMount() {
    if(typeof token !== 'string')
      this.props.getAuth();
  }
  render() {
    return (
        <Fragment>
          <MainSlider
              authSettings = { this.props.authSettings } />
          <Services/>
          <Process/>
          <BtnControl/>
        </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    authSettings: {
      token: typeof token === 'string' ? state.getAuth.token : token,
      loading: state.getAuth.loading,
      auth: state.getAuth.auth,
      error: state.getAuth.error
    },
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getAuth: () => dispatch({ type: actionType.AUTH_LOADING }),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
