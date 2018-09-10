import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootReducer} from './reducers/index';
import sagas from './sagas/index';

const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = compose(
    applyMiddleware(sagaMiddleware)
)(createStore);

const store = createStoreWithMiddleware(rootReducer,compose(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(sagas);

export default store;