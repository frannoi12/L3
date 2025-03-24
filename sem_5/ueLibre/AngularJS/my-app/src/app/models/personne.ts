export interface Personne {
    id?: number;
    nom: string;
    prenom: string;
    statut: 'étudiant' | 'enseignant';
}