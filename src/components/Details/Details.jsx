import React from 'react'
import { Card, CardHeader, CardContent, Typography} from '@material-ui/core';
import {Doughnut} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

import useTransactions from '../../useTransactions';

import useStyles from './styles'; //default exported variable can have any names

// note {title} in the argument is a prop
const Details = ({title}) => {
    Chart.register(...registerables);

    const classes = useStyles();
    const {total, chartData} = useTransactions(title);
    // console.log({chartData});
    return (
        <div>
            <Card className={title==="Income" ? classes.income : classes.expense}>
                <CardHeader title={title} />
                <CardContent>
                    <Typography varient="h5">${total}</Typography>
                    <Doughnut data={chartData} />
                </CardContent>
            </Card>
        </div>
    )
}

export default Details;
