import { ButtonStyleType, ButtonTypes } from "../types.d";

interface ButtonStyle {
    [key: string]: ButtonStyleType;
}

export const buttonStyles: ButtonStyle = {
    [ButtonTypes.primary]: {
        backgroundColor: "#00bcd4",
        color: "#fff",
    },
    [ButtonTypes.light]: {
        backgroundColor: "#fff",
        color: "#000",
    },
    [ButtonTypes.dark]: {
        backgroundColor: "#000",
        color: "#fff",
    },
    [ButtonTypes.warning]: {
        backgroundColor: "#ff9800",
        color: "#000",
    },
    [ButtonTypes.danger]: {
        backgroundColor: "#f44336",
        color: "#fff",
    },
    [ButtonTypes.success]: {
        backgroundColor: "#4caf50",
        color: "#fff",
    },
    [ButtonTypes.info]: {
        backgroundColor: "#2196f3",
        color: "#fff",
    },
    [ButtonTypes.secondary]: {
        backgroundColor: "#eee",
        color: "#000",
    },
};
