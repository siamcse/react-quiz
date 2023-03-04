import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from 'react';

const useQuestions = (videoId) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            // database related work 
            const db = getDatabase();
            const quizRef = ref(db, "quiz/" + videoId + "/questions");
            const quizQuery = query(
                quizRef,
                orderByKey()
            )
            try {
                setError(false);
                setLoading(true);
                //request firebase database
                const snapshot = await get(quizQuery);
                setLoading(false);
                if (snapshot.exists()) {
                    console.log(snapshot.val())
                    setQuestions((prevQuestions) => {
                        return [...prevQuestions, ...Object.values(snapshot.val())]
                    });

                } else {

                }

            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }

        }
        fetchQuestions();

    }, [videoId])
    return {
        loading,
        error,
        questions
    };
};

export default useQuestions;