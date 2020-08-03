import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'

// Add expense
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount, 
        createdAt
    }
})

// Remove expense
const removeExpense = ({ id }) => ({
    type: 'REMOVE_EXPENSE',
    id
})

// Edit expense
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id, 
    updates
}) 

// Set text filter
const setTextFilter = (filter = '') => ({
    type: 'SET_TEXT_FILTER',
    filter
})

// Sort by date
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

// Sort by amount
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

// Set start date
const setStartDate = (date) => ({
    type: 'SET_START_DATE',
    date
})

// Set end date
const setEndDate = (date) => ({
    type: 'SET_END_DATE',
    date
})

// Expenses Reducer

const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense]
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_EXPENSE':
            return state.map(expense => {
                if (expense.id === action.id) return { ...expense, ...action.updates }
                else return expense
            })
        default:
            return state
    }
}

// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return { ...state, text: action.filter }
        case 'SORT_BY_DATE':
            return { ...state, sortBy: 'date' }
        case 'SORT_BY_AMOUNT':
            return { ...state, sortBy: 'amount' }
        case 'SET_START_DATE':
            return { ...state, startDate: action.date }
        case 'SET_END_DATE':
            return { ...state, endDate: action.date }
        default:
            return state
    }
}

// Get Visible Expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter(expense => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startdate
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if (sortBy === "date") {
            return a.createdAt < b.createdAt ? 1 : -1
        } else {
            return a.amount < b.amount ? 1 : -1
        }
    })
}

// Store Creation

const store = createStore(combineReducers({ expenses: expensesReducer, filters: filtersReducer }))

store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)

    console.log(visibleExpenses)
})

store.dispatch(addExpense({ description: 'Car', amount: 56371 }))
store.dispatch(addExpense({ description: 'Rent', amount: 115000 }))

store.dispatch(sortByAmount())
store.dispatch(sortByDate())

const demoState = {
    expenses: [{
        id: '123abc',
        description: 'Sample Description',
        note: 'Sample Note',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'sample filter',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
}