import {makeStyles} from '@material-ui/core';

export default makeStyles(() => ({
    //pass the object name: income, expense
    //return an object containing the following styles
    income: {
        borderBottom: '10px solid rgba(0,255,0,0.5)',
    },
    expense: {
        borderBottom: '10px solid rgba(255,0,0,0.5)',
    }, 
}))