import { useState } from 'react';
import TacheForm from './components/TacheForm';
import TacheListe from './components/TacheList';
//import './index.css'; 

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

  const deleteTache = (tacheId) => {
    setTaches(taches.filter(tache => tache.id !== tacheId));
  };

  return (
    <div className="app">
      <h1>📝 Gestion des Tâches</h1>
      <TacheForm addTache={addTache} />
      <TacheListe taches={taches} toggleComplete={toggleComplete} deleteTache={deleteTache} />
    </div>
  );
}

export default App;