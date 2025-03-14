import { useEffect, useState } from "react";

function Compteur() {
    const [compteur, setCompteur] = useState(0);
    useEffect(() => {
        console.log(`Le compteur est maintenant : ${compteur}`);
    }, [compteur]);

    
    return (
        <div>
            <p>Valeur : {compteur} </p>
            <button onClick={()=>setCompteur(compteur +1)} >Incrémenter</button>
            <button onClick={()=>setCompteur(compteur -1)} >Décrémenter</button>
        </div>
    );
}


export default Compteur