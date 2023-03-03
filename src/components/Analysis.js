import React from 'react';
import Question from './Question';
import classes from './styles/Analysis.module.css';

const Analysis = () => {
    return (
        <div class={classes.analysis}>
            <h1>Question Analysis</h1>
            <h4>You answerd 5 out of 10 questions correctly</h4>
            <Question />
        </div>
    );
};

export default Analysis;