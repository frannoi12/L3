// import {useState} from "react";
import React from "react";
import Tache from "./Tache";


function TaskList({ taches, toggleComplete, deleteTache }) {
    return (
      <div className="task-list">
        {taches.length > 0 ? (
          taches.map((tache) => (
            <Tache
              key={tache.id}
              task={tache}
              toggleComplete={toggleComplete}
              deleteTache={deleteTache}
            />
          ))
        ) : (
          <p>Aucune tâche pour le moment.</p>
        )}
      </div>
    );
  }
  
  export default TaskList;