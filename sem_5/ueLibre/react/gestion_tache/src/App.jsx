import './App.css'
import TacheForm from './Components/TacheForm'
import React from 'react';
import { useState } from 'react';

// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     <TacheForm/>
//   )
// }

// export default App


function App() {
  const [taches, setTaches] = useState([]);

  const addTache = (text) => {
    const newTache = { id: Date.now(), text, completed: false };
    setTaches([...taches, newTache]);
  };

  const toggleComplete = (tacheId) => {
    setTaches(
      taches.map(tache =>
        tache.id === tacheId ? { ...tache, completed: !tache.completed } : tache
      )
    );
  };

  const deleteTask = (tacheId) => {
    setTaches(taches.filter(task => task.id !== tacheId));
  };

  return (
    <div className="app">
      <h1>📝 Gestion des Tâches</h1>
      <TacheForm addTache={addTache} />
      <TacheList taches={taches} toggleComplete={toggleComplete} deleteTache={deleteTask} />
    </div>
  );
}

export default App;