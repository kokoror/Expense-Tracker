//Reducer - a function that takes in the old state, and an action => new state

const contextReducer = (state, action) => {
    // debugging: console.log("reducer gets called");
    // console.log(action);

    let transactions;
    switch (action.type) {
        case 'DELETE_TRANSACTION':
            transactions = state.filter((t) => t.id !== action.payload);
            localStorage.setItem('transactions', JSON.stringify(transactions)); // save it to local storage
            return transactions;

        case 'ADD_TRANSACTION':
            //debugging: console.log("add context reducer get called: ", state); // save it to local storage
            transactions = [...state, action.payload];
            localStorage.setItem('transactions', JSON.stringify(transactions));
            return transactions;
        default:
            return state;
    }
}

export default contextReducer;