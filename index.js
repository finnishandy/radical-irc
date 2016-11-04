import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import Reactotron from 'reactotron';
import App from './containers/App'
import configureStore from './store/configureStore'
import socketMiddleware from './redux/middleware/socket-middleware';
import { connected } from './actions/ws-actions'

//https://github.com/SalvationDevelopment/YGOPro-Salvation-Server/blob/master/http/js/irc/irc-ws.js

const ircStatus = (state = {}, action) => {
  console.log('reducer', action.type);
  switch (action.type) {
    case 'CONNECTED':
      return { 'CONNECTED': true}
    case 'TICK':
      return Object.assign({}, state, { elapsed: action.currentTime - state.startTime });
    case 'STOP_TIMER':
      return Object.assign({}, state, { interval: null });
  }
  return state;
};



const store = createStore(ircStatus, applyMiddleware(socketMiddleware, Reactotron.reduxMiddleware));
Reactotron.addReduxStore(store);
Reactotron.connect({ enabled: true });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

//store.subscribe(() => console.log(store.getState().elapsed));

store.dispatch({ type: 'CONNECT', url: 'ws://163.172.153.75:8080' });
window.store = store;

/*

const wsMiddleware = store => next => action => {
  console.log('middleware');
  switch (action.type) {
    case 'CONNECT':
      const webSocket = new WebSocket('ws://163.172.153.75:8080');
      store.dispatch({ type: 'CONNECTED', socket: webSocket });
      break;
    default:
      break;
  }
  next(action);
};
const timerMiddleware = store => next => action => {
  console.log('middleware');
  if (action.type === 'START_TIMER') {
    action.interval = setInterval(() => store.dispatch({ type: 'TICK', currentTime: Date.now() }), 1000);
  } else if (action.type === 'STOP_TIMER') {
    clearInterval(action.interval);
  }
  next(action);
};

function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch', action)
    switch(action.type) {
      case 'CONNECT':
        if (!socket) {
          webSocket = new WebSocket('ws://163.172.153.75:8080');
          webSocket.onopen = WebSocketOpen;
        }

        break;
      default:
        return next(action);
    }

    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action)

    console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}


const stopwatch = (state = {}, action) => {
  console.log('reducer');
  switch (action.type) {
    case 'START_TIMER':
      return Object.assign({}, state, {
        startTime: action.currentTime,
        elapsed: 0,
        interval: action.interval
      });
    case 'TICK':
      return Object.assign({}, state, { elapsed: action.currentTime - state.startTime });
    case 'STOP_TIMER':
      return Object.assign({}, state, { interval: null });
  }
  return state;
};*/
