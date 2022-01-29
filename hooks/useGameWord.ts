import { useMemo } from "react";
import { getRandomWord } from "../data/words";

export const useGameWord = () => {
    return useMemo(() => {
        return getRandomWord();
    }, []);
};
