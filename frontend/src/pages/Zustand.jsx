import { create } from 'zustand';

const useGameStore = create((set) => ({
    word: '???',
    setWord: (newWord) => {
        set({ word: newWord });
    }
}));

export default useGameStore;