import { getDatabase, ref, set } from 'firebase/database';
import _ from 'lodash';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Answer from '../Answer';
import { AuthContext } from '../context/AuthProvider';
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
    const { currentUser } = useContext(AuthContext);
    const { loading, error, questions } = useQuestions(id);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [qna, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

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

    //handle when user clicks the next button to get the next question
    const nextQuestion = () => {
        if (currentQuestion <= questions.length) {
            setCurrentQuestion((prev) => prev + 1);
        }
    }
    //handle when user clicks the prev button to get back to the previous question
    const prevQuestion = () => {
        if (currentQuestion >= 1 && currentQuestion <= questions.length) {
            setCurrentQuestion((prev) => prev - 1);
        }
    }

    const submit = async () => {
        const { uid } = currentUser;

        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);

        await set(resultRef, {
            [id]: qna
        });

        navigate(`/result/${id}`, {
            state: {
                qna
            }
        });
    }

    //calculate progress
    const percentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>There was an error</div>}
            {!loading && !error && qna && qna.length && (
                <>
                    <h1>{qna[currentQuestion].title}</h1>
                    <h4>Question can have multiple answers</h4>
                    <Answer input={true} options={qna[currentQuestion].options} handleChange={handleAnswerChange} />
                    <ProgressBar next={nextQuestion} prev={prevQuestion} progress={percentage} submit={submit} />
                    <Miniplayer />
                </>
            )}
        </>
    );
};

export default Quiz;