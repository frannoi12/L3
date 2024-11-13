import ArtWorkService from "./ArtWorkService.js";
import { artworkDataValidator } from "./utils.js";
import * as status from "./constantes.js"




export default class ArtWorkController {

    artService;

    constructor(){
        this.artService = new ArtWorkService();
    }


    async create(req, res) {
        try {
            const validatedData = artworkDataValidator(req.body);
            const newArtwork = await this.artService.create(validatedData);
            res.status(status.HTTP_STATUS_CREATED).json(newArtwork);
        } catch (error) {
            res.status(status.HTTP_STATUS_BAD_REQUEST).json({ error: error.message });
        }
    }
 
    async getAll(req, res) {
        try {
            const artworks = await this.artService.getAll();
            res.status(status.HTTP_STATUS_OK).json(artworks);
        } catch (error) {
            res.status(status.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: 'Erreur lors de la récupération des œuvres d\'art.' });
        }
    }


    async update(req, res) {
        const { id } = req.params;
        try {
            const validatedData = artworkDataValidator(req.body);
            const updatedArtwork = await this.artService.update(parseInt(id), validatedData);
            res.status(status.HTTP_STATUS_OK).json(updatedArtwork);
        } catch (error) {
            if (error.message.includes('non trouvée')) {
                return res.status(status.HTTP_STATUS_NOT_FOUND).json({ error: 'Œuvre d\'art non trouvée.' });
            }
            res.status(status.HTTP_STATUS_BAD_REQUEST).json({ error: error.message });
        }
    }



    async delete(req, res) {
        const { id } = req.params;
        try {
            await this.artService.delete(parseInt(id));
            res.status(status.HTTP_STATUS_NO_CONTENT).send(); // No Content
        } catch (error) {
            res.status(status.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: 'Erreur lors de la suppression de l\'œuvre d\'art.' });
        }
    }



    async filter(req, res) {
        const { id } = req.params;
        try {
            const artwork = await this.artService.get(parseInt(id));
            if (!artwork) {
                return res.status(status.HTTP_STATUS_BAD_REQUEST).json({ error: 'Œuvre d\'art non trouvée.' });
            }
            res.status(status.HTTP_STATUS_OK).json(artwork);
        } catch (error) {
            res.status(status.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: 'Erreur lors de la récupération de l\'œuvre d\'art.' });
        }
    }
}


// export default new ArtWorkController();