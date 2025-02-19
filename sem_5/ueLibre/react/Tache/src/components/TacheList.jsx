import Tache from "./Tache"; 

function TacheListe({taches,deleteTache }){
     
    return (
    <div className="class-list">
        {taches.length > 0 ?(
            taches.map((tache)=>(
                <Tache
                key={tache.id}
                tache={tache}
                deleteTache={deleteTache}
                />
            ))
        ):(
            <p>Aucune tâche pour le moment</p>
        )}
    </div>
    )
}


export default TacheListe