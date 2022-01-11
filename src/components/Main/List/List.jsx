import React, {useContext} from 'react';
import {List as MUIList, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide} from '@material-ui/core';
import {Delete, MoneyOff} from '@material-ui/icons';

import {ExpenseTrackerContext} from '../../../context/context';  //example how to access context varibles
import useStyles from './Styles';

const List = () => {
    const classes = useStyles();
    // const globalState = useContext(ExpenseTrackerContext);
    // console.log(globalState);
    const { deleteTransaction, transactions } = useContext(ExpenseTrackerContext);

    // const transactions = [
    //     {id:1, type: "Income", category: 'Salary', amount: 50, date: "Tue Dec 07"},
    //     {id:2, type: "Expense", category: 'Food', amount: 100, date: "Tue Dec 08"},
    //     {id:3, type: "Expense", category: 'Rental', amount: 800, date: "Tue Dec 09"}
    // ];

    return (
        <div>
            <MUIList dense={false} className={classes.list}>
                {transactions.map((transaction) => (
                    <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar className={transaction.type==='Income' ? classes.avatarIncome : classes.avatarExpense}>
                                    <MoneyOff />
                                </Avatar>
                            </ListItemAvatar>
                        <ListItemText primary={transaction.category} secondary={`$${transaction.amount} - ${transaction.date}`}></ListItemText>
                        
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={()=>deleteTransaction(transaction.id)}>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                        </ListItem>
                    </Slide>
                ))}




            </MUIList>
        </div>
    )
}

export default List;
