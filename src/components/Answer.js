import React, { Fragment } from 'react';
import Checkbox from './Checkbox';
import classes from './styles/Answers.module.css';

const Answer = ({ options = [], handleChange, input }) => {
    return (
        <div className={classes.answers}>
            {
                options.map((option, index) => (
                    <Fragment key={index}>
                        {input ?
                            (
                                <Checkbox
                                    className={classes.answer}
                                    key={index}
                                    text={option.title}
                                    value={index}
                                    onChange={(e) => handleChange(e, index)}
                                    checked={option.checked}
                                />
                            )
                            :
                            (
                                <Checkbox
                                    className={`${classes.answer} ${option.correct ? classes.correct : option.checked ?
                                        classes.wrong : null
                                        }`}
                                    key={index}
                                    text={option.title}
                                    value={index}
                                    onChange={(e) => handleChange(e, index)}
                                    defaultChecked={option.checked}
                                    disabled
                                />
                            )
                        }
                    </Fragment>
                ))
            }

        </div>
    );
};

export default Answer;