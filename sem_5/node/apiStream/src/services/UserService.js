import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default class UserService {
    create(user_data){
        return {};
    }

    async get(){
        return await prisma.user.findMany();
    }

    get_user(id){
        return [{}];
    }

    update(id, user_data){
        return {};
    }


    delete(id){
        return {};
    }

}