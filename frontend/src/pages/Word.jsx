import { useState } from "react";

const Word = () => {
    const []=useState(false);
    const Words = ["Apple", "Car", "Ice", "King", "Mango", "Bike", "Orange", "Table"];
    const idx = Math.floor((Math.random() * Words.length));

    return (
       <div>
        {
            <h1>{Words[idx]}</h1>
        }
        </div>
    );
};

export default Word;
