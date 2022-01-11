import React, {useState, useEffect, useContext} from 'react';
import {TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import useStyles from './styles';
import {ExpenseTrackerContext} from '../../../context/context'; 
import {v4 as uuidv4} from 'uuid';
import {useSpeechContext} from '@speechly/react-client'; //this is a hook, similiar to useContext, show text

import {incomeCategories, expenseCategories} from '../../../constants/categories';
import formatDate from '../../../utils/formatDate';
import CustomizedSnackbar from '../../Snackbar/Snackbar'

const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date()),
}

const Form = () => {
    const classes = useStyles();
    const [FormData, setFormData] = useState(initialState);
    const [open, setOpen] = useState(false); // set state used by alert on top right cornor

    // const globalState =useContext(ExpenseTrackerContext);
    // console.log(globalState); 

    const { addTransaction} = useContext(ExpenseTrackerContext); 
    const {segment} = useSpeechContext();

    const createTransaction = () => {
        //handle case when the amount or date is not valid (not create transaction)
        if(Number.isNaN(Number(FormData.amount)) || !FormData.date.includes('-')) return;

        const transaction = {...FormData, amount:Number(FormData.amount), id: uuidv4()};
        setOpen(true); // change state for alert bar
        addTransaction(transaction);
        setFormData(initialState); // after adding transaction, reset the state to initialState
    }
    
    // console.log(FormData)
    // console.log(transactions);

    //useEffect specify when you run this function(we call this effect)
    // in this case, we print hello world whenever the FormData gets updated.
    //note FormData updates onChange
    //eg.
    //  useEffect(() => {
    //     console.log("hello!")
    // }, [FormData]   
    
    //we wanna run the function every time we update the voice content(segment)
    useEffect(() => {
        if (segment) {
            if (segment.intent.intent === 'add_expense') {
                setFormData({ ...FormData, type: 'Expense'})
            } else if (segment.intent.intent === 'add_income') {
                setFormData({ ...FormData, type: 'Income'})
            } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
                return createTransaction();
            } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
                return setFormData(initialState);
            }

            // ways to access all the entities created in Speechly
            // segment.entities.type/value. type includes amount, category, date
            segment.entities.forEach((e) => {
                // console.log(e.value) 
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`;
                switch (e.type) {
                    case 'amount':
                        setFormData({ ...FormData, amount: e.value});
                        break;
                    case 'category': // it will update the type to matcg with the money cagegory 
                        if(incomeCategories.map((c) => c.type).includes(category)) {
                            setFormData({ ...FormData, type: 'Income', category});
                        } else if (expenseCategories.map((c) => c.type).includes(category)) {
                            setFormData({ ...FormData, type: 'Expense', category});
                        }
                        break;
                    case 'date':
                        setFormData({ ...FormData, date: e.value});
                        break;
                    default:
                        break;
                }
            })
            // when all field is filled, automatically create transaction
            if(segment.isFinal && FormData.amount && FormData.category && FormData.type && FormData.date) {
                createTransaction();
            }
        }
    }, [segment])

    const selectedCategories = FormData.type === 'Income'? incomeCategories: expenseCategories;



    return (
        <div>
            <Grid container spacing={2}>
                <CustomizedSnackbar open={open} setOpen={setOpen} />
                <Grid item xs={12}>
                    <Typography align="center" varient="subtitle1" style={{color:'green'}} gutterBottom>
                        {/* speechly : display the words said*/}
                        {segment ? (
                            <>{segment.words.map((word) => word.value).join(" ")}</>
                        ) : <>WHAT YOU SAID WILL BE DISPLAYED HERE!</> }
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select value={FormData.type} onChange={(e)=>setFormData( {...FormData, type: e.target.value} )}>
                            <MenuItem value="Income">Income</MenuItem>
                            <MenuItem value="Expense">Expense</MenuItem> 
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select value={FormData.category} onChange={(e)=>setFormData( {...FormData, category: e.target.value} )}>
                            {selectedCategories.map( (c) => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem> )}  
                        </Select>
                    </FormControl>
                </Grid>  

                <Grid item xs={6}>
                    <TextField type="number" label="Amount" fullWidth value={FormData.amount} onChange={(e)=>setFormData( {...FormData, amount: e.target.value} )}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField type="date" label="Date" fullWidth value={FormData.date} onChange={(e)=>setFormData( {...FormData, date: formatDate(e.target.value)} )}/>
                </Grid>
                <Grid item xs={12}>
                    <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Form;
