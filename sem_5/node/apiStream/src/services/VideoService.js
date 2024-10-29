import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default class VideoService {
    create(video_data){
        return {};
    }

    async get(){
        return await prisma.video.findMany();
    }

    get_video(id){
        return [{}];
    }

    update(id, video_data){
        return {};
    }


    delete(id){
        return {};
    }

}