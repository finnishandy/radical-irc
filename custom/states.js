import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

export default {}

var reducer_3 = function (state = {}, action) {
    console.log('reducer_3 was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SAY_SOMETHING':
            return {
                ...state,
                message: action.value
            }
        default:
            return state;
    }
}

var store_3 = createStore(reducer_3)
// Output: reducer_3 was called with state {} and action { type: '@@redux/INIT' }

console.log('store_3 state after initialization:', store_3.getState())
// Output: redux state after initialization: {}


/**************************************************/


var square = (foo) => foo * foo
var add = (foo) => foo + foo
var squareAdd = compose(add, square)
console.log(squareAdd(5))