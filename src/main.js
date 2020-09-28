import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

/*
// --------------------------------------
const store = new Vuex.Store({
  state: {
    count:0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
store.commit('increment')
console.log(store.state.count)

// -------------flux-----四大元素

import { Dispatcher } from 'flux'
import {objectMerge} from "./utils";
export default new Dispatcher()

const counterValues = {
  'fisrt': 0,
  'second': 10,
  'Third': 30
}

const CounterStore = Object.assign({}, EventEmitter.prototype, {
  getCounterValues: function () {
    return counterValues;
  },
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function () {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function () {
    this.removeListener(CHANGE_EVENT, callback)
  }
})

CounterStore.dispatchToken = AppDispathcer.register((action) => {
  if(action.type === ActionTypes.INCREMENT) {
    // do increment
  } else if( action.type === ActionTypes.DECREMENT) {
    // do decrement

  }
})

// ---------redux-------------
import { createStore } from 'redux'
import reducer from './Reducer.js'

const conterValues = {
  'First': 0,
  'Second': 10,
  'Third': 20
}

const store = createStore(reducer, initValues);

export default store;

function reducer(state, action) {
  const {counterCaption} = action;
  switch(action.type) {
    case ActionTypes.INCREMENT:
      return {...state, [counterCaption]: state[counterCaption] + 1};
    case ActionTypes.DECREMENT:
      return {...state, [counterCaption]: state[counterCaption] - 1};
    default:
      return state
  }
}

export const increment = (counterCaption) => {
  return {
    type: ActionType.INCREMENT,
    counterCaption: counterCaption
  }
}

onIncrement() {
  // 通过dispatch派发 action
  store.dispatch(Actions.increment(this.props.caption))
}

render() {
  const value = this.state.value;
  const {caption}   = this.props
}

import store from './Store.js'
import Provider from './Provider.js';

ReactDOM.render(
  <Provider store= {store}>
  <ControlPannel />
  </Provider>,
  document.getElementById('root')
)

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

function mapStateToProps(state, ownProps) {
  return {
    value: state[ownProps.caption]
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onIncrement: () => {
      dispatch(Actions.increment(ownProps.caption));
    },
    onDecrement: () => {
      dispatch(Actions.decrement(ownProps.caption))
    }
  }
}
*/
/*
import React from 'react'
import { ChessType } from '../types/enms'
import './ChessComp.css'

imterface IProps {
  type: ChessType
  onClick ?: () => void
}

function ChessComp({type, onClick}: IProps) {
  let chsess = null;
  switch(type) {
    case ChessType.red:
      chess = <div className = "red chess-item"></div>;
      break;
    case ChessType.black:
      chess = <div className = "black chess-item"></div>;
      break;
    default:
      chess = null;
  }

  return (
    <div className = 'chess' onClick = { () => {
            if(type === ChessType.none && onClick) {
              onClick();
            }
       }

    }>
      {chess}
    </div>
  )

}
export default ChessComp

import React from 'react';
import {ChessType} from '../types/enums'
import ChessComp from './ChessComp'
import './BoardComp.scss'
interface IProps {
  chesses: ChessType[];
  isGameOver ?: boolean
  onClick ?: (index: number) => void
}

const BoardComp: React.FC<IProps> = function (props) {
  const isGameOver = props.isGameOver as boolean;

  const list = props.chesses.map( (type, index) => {
    return (
      <ChessComp
          type = {type}
          key = {index}
          onClick = {
          ()=> {
            if(props.onClick && !isGameOver) {
              props.onClick(index)
            }
    }

      }
      />
    )
  })

  return (
    <div className = "board">
    {list}
    </div>
  )
}*/
