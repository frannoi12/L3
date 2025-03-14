"use client";

import { useState } from "react";

export default function IncrementPage() {
    const [counter, setCounter] = useState(0);
    return (
        <div className="flex space-x-4 text-align-center">
            <h1>Page d'incrémentation</h1>
            <button onClick={() => setCounter(counter - 1)}>Décrémenter</button>
            <button onClick={() => setCounter(0)}>Réinitialiser</button>
            <button onClick={() => setCounter(counter + 1)}>Incrémenter</button>
            <p>{counter}</p>
        </div>
    );
}