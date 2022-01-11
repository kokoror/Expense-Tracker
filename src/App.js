import React, {useEffect, useRef} from 'react';
import {Grid} from '@material-ui/core';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel} from '@speechly/react-ui'//add speechly button
import { SpeechState, useSpeechContext } from '@speechly/react-client';

import Details from './components/Details/Details';
import Main from './components/Main/Main';
import useStyles from './styles';

const App = () => {
    const classes = useStyles();

    //make the screen sroll back to main component while recording
    const {speechState} = useSpeechContext();
    const main = useRef(null); // ref is set at the component Main
    const executeScroll = () => main.current.scrollIntoView();

    useEffect(() => {
        if(speechState === SpeechState.Recording) {
            executeScroll();
        }
    }, [speechState])
    /////////

    return (
        <div>
            <Grid className={classes.grid} container spacing={0} alignItems="center" justify="center" style={{height: '100vh'}}>
                {/* take 12 grid on xs screen and 4 grid on small screen */}
                <Grid item xs={12} sm={3} className={classes.mobile}> 
                    <Details title="Income"/>
                </Grid>
                <Grid ref={main} item xs={12} sm={3} className={classes.main}>
                    <Main />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.desktop}> 
                    <Details title="Income"/>
                </Grid> 
                <Grid item xs={12} sm={3} className={classes.last}>
                    <Details title="Expense"/>
                </Grid>
            </Grid>
            <PushToTalkButtonContainer>
                <PushToTalkButton />
                <ErrorPanel />
            </PushToTalkButtonContainer>
        </div>
    )
}

export default App
