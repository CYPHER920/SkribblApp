import { create } from 'zustand';

const useGameStore = create((set) => ({
    word: "???",
    time: 0,
    round: 0,
    winner: "",
    winnerScore: 0,
    currentDrawer: "",
    currentUser: "",
    setWinnerScore: (newScore) => {
        set({ winnerScore: newScore })
    },
    setWinner: (newWinner) => {
        set({ winner: newWinner })
    },
    setWord: (newWord) => {
        set({ word: newWord });
    },
    setTime: (newTime) => {
        set({ time: newTime });
    },
    setRound: (newRound) => {
        set({ round: newRound })
    },
    setCurrentDrawer: (newDrawer) => {
        set({ currentDrawer: newDrawer })
    },
    setCurrentUser: (newUser) => {
        set({ currentUser: newUser })
    }

}));

export default useGameStore;