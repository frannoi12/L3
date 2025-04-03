import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const contactResolvers = {
  Query: {
    contacts: async (_, args, context) => {
      console.log("Contexte reçu :", context);
    
      if (!context.user) { 
        console.log("Utilisateur non authentifié :", context.user);
        throw new Error("Accès refusé !");
      }
    
      try {
        console.log(context.user.id);
        const contacts = await context.prisma.contact.findMany({ 
          where: { userId: context.user.id },
          include: { user: true }
        });
    
        if (!contacts) {
          throw new Error("Aucun contact trouvé pour cet utilisateur.");
        }
    
        return contacts; // S'assurer que contacts est un tableau (même vide)
      } catch (error) {
        console.log("Erreur lors de la récupération des contacts :", error.message);
        throw new Error("Erreur interne du serveur.");
      }
    },
    
    
    contact: async (_, { id }, context) => // ✅ Ajouter context
      await context.prisma.contact.findUnique({
        where: { id: parseInt(id) },
        include: { user: true },
      }),
    
  },

  Mutation: {
    // ajouterContact: async (_, { firstName, lastName, phone, email, address, userId }) => {
    //   const nouvoContact = await prisma.contact.create({
    //     data: {
    //       firstName,
    //       lastName,
    //       phone,
    //       email,
    //       address,
    //       userId: parseInt(userId, 10),
    //     },
    //   });

    //   return nouvoContact;
    // },

    ajouterContact: async (_, { firstName, lastName, phone, email, address, userId }) => {
      // 1. Création du contact
      const nouvoContact = await prisma.contact.create({
        data: {
          firstName,
          lastName,
          phone,
          email,
          address,
          userId: parseInt(userId, 10),
        },
        // 2. Inclure uniquement les données nécessaires de l'utilisateur
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
              // Exclure password, contacts, createdAt, etc.
            }
          }
        }
      });
    
      // 3. Structurer la réponse pour ne retourner que l'utilisateur
      return {
        ...nouvoContact,
        user: nouvoContact.user // Retourne uniquement les infos utilisateur sélectionnées
      };
    },

    modifierContact: async (_, { id, firstName, lastName, phone, email, address }) => {
      const contactIdInt = parseInt(id, 10);

      if (isNaN(contactIdInt)) {
        throw new Error("L'ID doit être un nombre valide.");
      }

      try {
        const updatedContact = await prisma.contact.update({
          where: {
            id: contactIdInt,
          },
          data: {
            firstName: firstName || undefined,
            lastName: lastName || undefined,
            phone: phone || undefined,
            email: email || undefined,
            address: address || undefined,
          },
        });

        return updatedContact;
      } catch (error) {
        throw new Error("Erreur lors de la mise à jour du contact : " + error.message);
      }
    },

    supprimerContact: async (_, { id }) => {
      const contactIdInt = Number(id);

      if (isNaN(contactIdInt)) {
        throw new Error("L'ID doit être un nombre valide.");
      }

      try {
        const deletedContact = await prisma.contact.delete({
          where: {
            id: contactIdInt,
          },
        });

        return true;
      } catch (error) {
        throw new Error("Erreur lors de la suppression du contact : " + error.message);
      }
    },
  },



 
};

export default contactResolvers;
