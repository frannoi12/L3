-- CreateTable
CREATE TABLE "Personne" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'élève',

    CONSTRAINT "Personne_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Livre" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "auteur" TEXT NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Livre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emprunt" (
    "id" SERIAL NOT NULL,
    "personneId" INTEGER NOT NULL,
    "livreId" INTEGER NOT NULL,
    "dateEmprunt" TIMESTAMP(3) NOT NULL,
    "dateRetour" TIMESTAMP(3),

    CONSTRAINT "Emprunt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Emprunt" ADD CONSTRAINT "Emprunt_personneId_fkey" FOREIGN KEY ("personneId") REFERENCES "Personne"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprunt" ADD CONSTRAINT "Emprunt_livreId_fkey" FOREIGN KEY ("livreId") REFERENCES "Livre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
