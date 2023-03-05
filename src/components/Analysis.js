import React from 'react';
import Questions from './Questions';
import classes from './styles/Analysis.module.css';

const Analysis = ({answers}) => {
    return (
        <div className={classes.analysis}>
            <h1>Question Analysis</h1>
            <h4>Your answered questions</h4>
            <Questions answers={answers} />
        </div>
    );
};

export default Analysis;