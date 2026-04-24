import useGameStore from "./Zustand";

const Word = () => {
    const word = useGameStore((state) => state.word);

    return (
        <div className="flex items-center justify-center bg-slate-900/40 px-6 py-2 rounded-2xl border border-slate-700/50 shadow-inner">
            <h1 className="text-2xl md:text-3xl font-black tracking-[0.3em] text-white drop-shadow-md">
                {word || "WAITING..."}
            </h1>
        </div>
    );
};

export default Word;
