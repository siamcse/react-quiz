import _ from 'lodash';
import React, { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import Answer from '../Answer';
import useQuestions from '../hooks/useQuestions';
import Miniplayer from '../Miniplayer';
import ProgressBar from '../ProgressBar';

const initialState = null;

const reducer = (state, action) => {
    switch (action.type) {
        case 'questions':
            action.value.forEach((question) => {
                question.options.forEach((option) => {
                    option.checked = false;
                });
            });
            return action.value;
        case "answer":
            const questions = _.cloneDeep(state);
            questions[action.questionId].options[action.optionIndex].checked = action.value;

            return questions;
        default:
            return state;
    }
}

const Quiz = () => {
    const { id } = useParams();
    const { loading, error, questions } = useQuestions(id);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [qna, dispatch] = useReducer(reducer, initialState);
    console.log(qna);

    useEffect(() => {
        dispatch({
            type: "questions",
            value: questions,
        })
    }, [questions])

    const handleAnswerChange = (e, index) => {
        dispatch({
            type: "answer",
            questionId: currentQuestion,
            optionIndex: index,
            value: e.target.checked
        })
    }

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>There was an error</div>}
            {!loading && !error && qna && qna.length && (
                <>
                    <h1>{qna[currentQuestion].title}</h1>
                    <h4>Question can have multiple answers</h4>
                    <Answer options={qna[currentQuestion].options} handleChange={handleAnswerChange} />
                    <ProgressBar />
                    <Miniplayer />
                </>
            )}
        </>
    );
};

export default Quiz;