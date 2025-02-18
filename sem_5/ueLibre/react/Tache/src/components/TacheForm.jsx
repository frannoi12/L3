import { useState }  from "react";


function TacheForm({addTache}){
    const [tache, setTache] = useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!tache.trim()) return;
            addTache(tache) 
            setTache("")
        
    };

    return ( 
        <>
    <form onSubmit={handleSubmit}>
        <input type="text" 
        value={tache}
         placeholder="Ajouter une tâche"
         onChange={(e)=>setTache(e.target.value)} />
        <button type="submit">Ajouter</button>
    </form>
    </>
    )

    
}


export default TacheForm