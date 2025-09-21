import { useEffect, useState } from "react";
import { readHistory, pushHistory as pushItem, checkHistory } from "./historyStorage";

export default function useHistory() {
    const [history, setHistory] = useState(() => {
        try {
            checkHistory();
            return readHistory();
        } catch {
            return [];
        }
    })

    useEffect(() => {
        function handleStorage(e) {
            if (e.key === 'history') setHistory(readHistory());
        }

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const pushHistory = (loc) => {
        const next = pushItem(loc);
        setHistory(next);
    }

    return { history, pushHistory }
}