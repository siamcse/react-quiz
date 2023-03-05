import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from 'react';

const useAnswers = (videoId) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchAnswers = async () => {
            // database related work 
            const db = getDatabase();
            const answerRef = ref(db, "answers/" + videoId + "/questions");
            const answerQuery = query(
                answerRef,
                orderByKey()
            )
            try {
                setError(false);
                setLoading(true);
                //request firebase database
                const snapshot = await get(answerQuery);
                setLoading(false);
                if (snapshot.exists()) {
                    setAnswers((prevAnswers) => {
                        return [...prevAnswers, ...Object.values(snapshot.val())]
                    });

                } else {

                }

            } catch (err) {
                console.log(err);
                setLoading(false);
                setError(true);
            }

        }
        fetchAnswers();

    }, [videoId])
    return {
        loading,
        error,
        answers
    };
};

export default useAnswers;