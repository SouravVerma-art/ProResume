import { useEffect, useRef } from 'react';

const useAutosave = (callback, delay = 1000, dependencies = []) => {
    const timerRef = useRef(null);
    const initialRender = useRef(true);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            callback();
        }, delay);

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, dependencies);
};

export default useAutosave;
