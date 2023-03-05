import _ from 'lodash';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Analysis from '../Analysis';
import useAnswers from '../hooks/useAnswers';
import Summary from '../Summary';

const Result = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const { qna } = state;

    const { loading, error, answers } = useAnswers(id);

    const calculate = () => {
        let score = 0;

        answers.forEach((question, index1) => {
            let correctIndexes = [], checkedIndexed = [];

            question.options.forEach((option, index2) => {
                if (option.correct) correctIndexes.push(index2);
                if (qna[index1].options[index2].checked) {
                    checkedIndexed.push(index2);
                    option.checked = true;
                }
            })
            if (_.isEqual(correctIndexes, checkedIndexed)) {
                score = score + 5;
            }
        });
        return score;
    }
    const userScore = calculate();

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>There wan an error!</div>}
            {answers && answers.length > 0 && (
                <>
                    <Summary score={userScore} noq={answers.length} />
                    <Analysis answers={answers} />
                </>
            )}

        </>
    );
};

export default Result;