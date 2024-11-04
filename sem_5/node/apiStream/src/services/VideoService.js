import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class VideoService {
    
    // Créer une nouvelle vidéo
    async create(video_data) {
        try {
            return await prisma.video.create({
                data: video_data,
            });
        } catch (error) {
            throw new Error(`Error creating video: ${error.message}`);
        }
    }

    // Récupérer toutes les vidéos
    async get() {
        try {
            return await prisma.video.findMany();
        } catch (error) {
            throw new Error(`Error retrieving videos: ${error.message}`);
        }
    }

    // Récupérer une vidéo par ID
    async get_video(id) {
        try {
            const video = await prisma.video.findUnique({
                where: { id: id },
            });
            if (!video) {
                throw new Error("Video not found");
            }
            return video;
        } catch (error) {
            throw new Error(`Error retrieving video: ${error.message}`);
        }
    }

    // Mettre à jour une vidéo par ID
    async update(id, video_data) {
        try {
            const updatedVideo = await prisma.video.update({
                where: { id: id },
                data: video_data,
            });
            return updatedVideo;
        } catch (error) {
            throw new Error(`Error updating video: ${error.message}`);
        }
    }

    // Supprimer une vidéo par ID
    async delete(id) {
        try {
            await prisma.video.delete({
                where: { id: id },
            });
            return { message: "Video deleted successfully" };
        } catch (error) {
            throw new Error(`Error deleting video: ${error.message}`);
        }
    }
}


// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()


// export default class VideoService {
//     create(video_data){
//         return {};
//     }

//     async get(){
//         return await prisma.video.findMany();
//     }

//     get_video(id){
//         return [{}];
//     }

//     update(id, video_data){
//         return {};
//     }


//     delete(id){
//         return {};
//     }

// }