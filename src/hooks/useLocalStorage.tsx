import { useState, useEffect } from "react";

export function useLocalStorage<T>(key: string, fallbackValue: T) {
    const [value, setValue] = useState(fallbackValue);

    useEffect(() => {
        const storedValue = localStorage.getItem(key);
        setValue(storedValue ? JSON.parse(storedValue) : fallbackValue);
    }, [key, fallbackValue]);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}
