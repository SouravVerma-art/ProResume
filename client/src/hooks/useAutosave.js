import { useEffect, useRef } from 'react';

const useAutosave = (callback, delay = 1000, dependencies = []) => {
    const timerRef = useRef(null);
    const initialRender = useRef(true);
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            callbackRef.current();
        }, delay);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencies, delay]);
};

export default useAutosave;
