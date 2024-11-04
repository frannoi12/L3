import VideoService from "../services/VideoService.js";
import * as status from "../constantes/httpStatus.js";

export default class VideoController {
    videoService;

    constructor() {
        // Initialize video service here
        this.videoService = new VideoService();
    }

    // Récupérer et afficher toutes les vidéos
    async getVideos(req, res) {
        try {
            const videos = await this.videoService.getAllVideos();  // Assure-toi que la méthode getAllVideos() existe dans VideoService
            res.status(status.HTTP_200_OK).json(videos);
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error retrieving videos" });
        }
    }

    // Récupérer et afficher une seule vidéo par ID
    async getVideo(req, res) {
        const { id } = req.params;
        try {
            const video = await this.videoService.getVideoById(parseInt(id));  // Assure-toi que la méthode getVideoById() existe dans VideoService
            if (video) {
                res.status(status.HTTP_200_OK).json(video);
            } else {
                res.status(status.HTTP_404_NOT_FOUND).json({ message: "Video not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error retrieving video" });
        }
    }

    async createVideo(req, res) {
        const { title, description, url } = req.body;
        try {
            const newVideo = await this.videoService.createVideo(title, description, url);
            res.status(status.HTTP_201_CREATED).json(newVideo);
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error creating video" });
        }
    }

    async updateVideo(req, res) {
        const { id } = req.params;
        const { title, description, url } = req.body;
        try {
            const updatedVideo = await this.videoService.updateVideo(parseInt(id), { title, description, url });
            if (updatedVideo) {
                res.status(status.HTTP_200_OK).json(updatedVideo);
            } else {
                res.status(status.HTTP_404_NOT_FOUND).json({ message: "Video not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error updating video" });
        }
    }

    async deleteVideo(req, res) {
        const { id } = req.params;
        try {
            const deleted = await this.videoService.deleteVideo(parseInt(id));
            if (deleted) {
                res.status(status.HTTP_204_NO_CONTENT).send();
            } else {
                res.status(status.HTTP_404_NOT_FOUND).json({ message: "Video not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({ message: "Error deleting video" });
        }
    }
}
