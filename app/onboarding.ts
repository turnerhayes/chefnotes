"use client";

export const isOnboardingComplete = () => {
    if (typeof window !== "undefined") {
        const isComplete = window.localStorage.getItem("isOnboardingComplete");
        if (isComplete) {
            return true;
        }
    }

    return false;
};

export const setOnboardingComplete = (isComplete: boolean = true) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem("isOnboardingComplete", `${!!isComplete}`);
    }
};
