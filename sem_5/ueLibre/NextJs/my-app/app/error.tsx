"use client"

export default function ErrorPage({ error, reset } : { 
    error: Error 
    reset: () => void
}){
    return(
        <div>
            <h2>Une erreur s'est produite</h2>
            <p>{error.message}</p>
            <button
                onClick={reset}
            >Reesayer</button>
        </div>
    );
}