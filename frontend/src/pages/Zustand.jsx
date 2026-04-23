import { create } from 'zustand';

const useGameStore = create((set) => ({
    word: "???",
    time: 0,
    round: 0,
    setWord: (newWord) => {
        set({ word: newWord });
    },
    setTime: (newTime) => {
        set({ time: newTime });
    },
    setRound: (newRound) => {
        set({ round: newRound })
    }

}));

export default useGameStore;