import multer from 'multer'
import path from 'path'

const multerConfigs = {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (req, file, callback) => {
            const fileName = `${Date.now()}-${file.originalname}`
            callback(null, fileName)
        }
    })
}


export default multerConfigs