import React, {useContext} from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider} from '@material-ui/core';
import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';

import {ExpenseTrackerContext} from '../../context/context';

const Main = () => {
    const classes = useStyles();
    const {balance} = useContext(ExpenseTrackerContext);

    return (
        <div>
            <Card className={classes.root}>
               <CardHeader title="Expense Tracker" subheader="Support Voice Command"/> 
               <CardContent>
                   <Typography align="center" varient="h5">TOTAL BALANCE ${balance}</Typography>
                   <Typography varient="subtitle1" style={{lineHeight: '1.5em', marginTop: '20px', color: 'grey'}}>
                       try saying: add income for $100 in category salary for monday
                   </Typography>
                   <Divider className={classes.divider}/>

                   <Form />
                   
               </CardContent>

               <CardContent>
                   <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <List />
                        </Grid>
                   </Grid>
               </CardContent>
            </Card>
        </div>
    )
}

export default Main;
