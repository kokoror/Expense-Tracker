//calculate all catogory 
// this part uses globle variable transactions and define a function to seperate income and expense
// and can used for creating charts

import {useContext} from 'react';
import {ExpenseTrackerContext} from './context/context';

import {incomeCategories, expenseCategories, resetCategories} from './constants/categories';

//use a custom hook/ used in Details.jsx and for charts
//function: (this function is called in the Details.jsx for creating charts)

const useTransactions = (title) => {
    resetCategories();
    const {transactions} = useContext(ExpenseTrackerContext); // access transactions(global varible) from the context
    const transactionsPerType = transactions.filter((t) => t.type === title); // get all transacations of a certain type (income/expense)
    const total = transactionsPerType.reduce((acc, currVal) => acc += currVal.amount, 0); // sum up all transactions under (income/expense) type
    const categories = title === 'Income' ? incomeCategories : expenseCategories; // the array imported from categories (set categories based on title)

    // console.log({transactionsPerType, total, categories});

    transactionsPerType.forEach((t) => {
        const category = categories.find((c) => c.type === t.category); // find the line in incomeCategories/expenseCategories 
        if (category) category.amount += t.amount; // we are updating the amount field in the constant file
    })

    const filteredCategories = categories.filter((c) => c.amount >0); // exclude all categories whose amount is 0 b/c we dont wanna display them

    //folow the format for creating chart
    const chartData = {
        labels: filteredCategories.map((c) => c.type),
        datasets: [{
            data: filteredCategories.map((c) => c.amount),
            backgroundColor: filteredCategories.map((c) => c.color) 
        }],
    }

    // console.log({filteredCategories, chartData});

    return {total, chartData};
}

export default useTransactions;