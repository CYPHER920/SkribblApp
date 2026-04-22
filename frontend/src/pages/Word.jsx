import useGameStore from "./Zustand";

const Word = () => {
    const word = useGameStore((state) => state.word);

    return (
        <div>

            <h1>{word}</h1>

        </div>
    );
};

export default Word;
