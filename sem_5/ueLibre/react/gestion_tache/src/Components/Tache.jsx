import React from "react";

function Tache({ tache, toggleComplete, deleteTache }) {
    return (
      <div className={tache ${tache.completed ? 'completed' : ''}}>
        <span onClick={() => toggleComplete(tache.id)}>{tache.text}</span>
        <button onClick={() => deleteTache(tache.id)}>🗑️</button>
      </div>
    );
  }
  export default Tache;