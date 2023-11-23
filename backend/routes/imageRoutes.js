const express = require('express');
const { uploadImages, resizeImage, getAllImage, createLabel, assignLabel, getAllLabels, deleteLabel, removeAssignLabel, deleteLabels } = require('../controller/imageController');
const { protect, admin } = require('../middleware/authMiddleware');



const router = express.Router();

router.get('/',getAllImage)
router.post('/upload',protect,admin,uploadImages,resizeImage)
router.route('/label').get(getAllLabels).post(protect,admin,createLabel)
router.delete('/delete-labels',protect,admin,deleteLabels)
router.post('/assign',assignLabel)
router.delete('/assign/:imageId/label/:labelId',removeAssignLabel)

module.exports = router;