import React, {useReducer, createContext} from 'react';
import contextReducer from './contextReducer';

// const initialState = []; // init transactions is an empty object
const initialState = JSON.parse(localStorage.getItem('transactions')) || [];// using localstorage
export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({children}) => {
    // [state, dispatch] 
    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    // action creators
    const deleteTransaction = (id) => dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    const addTransaction = (transaction) => dispatch({type: 'ADD_TRANSACTION', payload: transaction});

    
    console.log(transactions);
    const balance = transactions.reduce((acc, currVal) => currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount, 0);
    // console.log(`balance is ${balance}`);

    return (
        //pass the functions down to whole app
        <ExpenseTrackerContext.Provider value={{
            transactions,
            balance,
            deleteTransaction,
            addTransaction
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}

// in short, in context we define global varibles, functions that can be used everywhere

//In a typical React application, data is passed top-down (parent to child) via props, 
//but such usage can be cumbersome for certain types of props (e.g. locale preference, UI theme) 
//that are required by many components within an application. Context provides a way to 
//share values like these between components without having to explicitly pass a prop through
// every level of the tree.