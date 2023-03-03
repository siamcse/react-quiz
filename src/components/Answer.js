import React from 'react';
import Checkbox from './Checkbox';
import classes from './styles/Answers.module.css';

const Answer = () => {
    return (
        <div className={classes.answers}>
            <Checkbox className={classes.answer} text='test answer' />
        </div>
    );
};

export default Answer;