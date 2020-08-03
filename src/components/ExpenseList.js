import React from 'react';
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses'

const ExpenseList = (props) => {
    return (
        <div>
            <h1>Expense List</h1>
            {props.expenses.map((expense, index) => {
                return (
                    <ExpenseListItem key={index} {...expense}></ExpenseListItem>
                )
            })}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters),
        filters: state.filters
    }
}

export default connect(mapStateToProps)(ExpenseList)