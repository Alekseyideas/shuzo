import React, {Component, Fragment} from 'react';
import { Provider } from 'react-redux';
import './App.css';
import HomePage from './containers/HomePage/index';
import store from './store/store';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Fragment>
          <HomePage/>
        </Fragment>
      </Provider>
    );
  }
}

export default App;

