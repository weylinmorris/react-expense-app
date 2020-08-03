import { createStore } from 'redux'

const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: "INCREMENT",
    incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: "DECREMENT",
    decrementBy
})

const resetCount = () => ({
    type: "RESET"
})

const setCount = ({ count }) => ({
    type: "SET",
    count
})

// Reducer function must be a pure function, must not change the state or action directly.

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + action.incrementBy }
        case 'DECREMENT':
            return { count: state.count - action.decrementBy }
        case 'RESET':
            return { count: 0 }
        case 'SET':
            return { count: action.count }
        default:
            return state
    }
}

const store = createStore(countReducer)

const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch(incrementCount({ incrementBy: 5 }))

store.dispatch(decrementCount({ decrementBy: 12 }))

store.dispatch(incrementCount())

store.dispatch(incrementCount())

store.dispatch(incrementCount())

store.dispatch(setCount({ count: 12 }))

store.dispatch(resetCount())