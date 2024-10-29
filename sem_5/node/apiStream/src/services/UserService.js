import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export default class UserService {
    create(user_data){
        
    }

    async getAll(){
        try {
            return await prisma.user.findMany();
        } catch (error) {
            throw new Error(error)
        }
    }

    get_user(_id){
        try {
            return prisma.user.findUnique({
                where: { 
                    id: _id 
                },
            });
        } catch (error) {
            throw new Error(error)
        }
    }

    update(id, user_data){
        return {};
    }


    delete(id){
        return {};
    }

}