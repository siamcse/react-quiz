import React from 'react';
import Checkbox from './Checkbox';
import classes from './styles/Answers.module.css';

const Answer = ({ options = [], handleChange }) => {
    return (
        <div className={classes.answers}>
            {
                options.map((option, index) => (
                    <Checkbox
                        className={classes.answer}
                        text={option.title}
                        value={index}
                        onChange={(e) => handleChange(e, index)}
                        checked={option.checked}
                    />
                ))
            }

        </div>
    );
};

export default Answer;