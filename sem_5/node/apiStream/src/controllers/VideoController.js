import VideoService from "../services/VideoService.js";

export default class VideoController{
    async getVideos(req, res){
        const videoService = new VideoService();
        res.json(await videoService.get());
        // res.send('list Users');
    }

    async getVideo(req, res){
    }

    async createVideo(req, res){
    }

    async updateVideo(req, res){
    }

    async deleteVideo(req, res){
    }
}