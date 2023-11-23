const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
// const { images, labels } = require("../data/image");
function generateUniqueId() {
  return uuidv4();
}

const labels = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/label.json`, "utf-8")
);
const images = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/image.json`, "utf-8")
);

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    res.status(400);
    throw new Error("Not an image ! Please upload only images");
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadImages = upload.single("image");

exports.resizeImage = async (req, res, next) => {
  // console.log(req)
  try {
    if (!req.file) return next();

    const image = `image-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`Images/${image}`);

    images.push({ id: generateUniqueId(), url: `${image}`, labels: [] });

    // Write the updated images array back to the file
    fs.writeFileSync(
      `${__dirname}/../data/image.json`,
      JSON.stringify(images, null, 2)
    );
    console.log(images);
    res.status(200).json({
      status: "Success",
      message: "file uploaded successfully",
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.getAllImage = (req, res) => {
  const { labelId, page = 1, limit = 5 } = req.query;

  let filteredImages = images;

  // If a labelId is provided, filter the images
  if (labelId) {
    filteredImages = images.filter((image) =>
      image.labels.some((label) => label.id === labelId)
    );
  }

  // Paginate the results
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedImages = filteredImages.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredImages.length / limit);

  res.json({ paginatedImages, totalPages });
};

exports.createLabel = (req, res) => {
  const { name } = req.body;
  //   const labels = JSON.parse(
  //     fs.readFileSync(`${__dirname}/../data/label.json`, "utf-8")
  //   );
  labels.push({ id: generateUniqueId(), name: name });
  fs.writeFileSync(
    `${__dirname}/../data/label.json`,
    JSON.stringify(labels, null, 2)
  );
  res.status(200).json({ message: "Label created successfully" });
};
exports.getAllLabels = (req, res) => {
  //   const labels = JSON.parse(
  //     fs.readFileSync(`${__dirname}/../data/label.json`, "utf-8")
  //   );
  res.json(labels);
};

exports.deleteLabels = (req, res) => {
  const { labelIds } = req.body;
  const initialLength = labels.length;

  const newArray = labels.filter((lbl) => !labelIds.includes(lbl.id));

  if (newArray.length < initialLength) {
    fs.writeFileSync(
      `${__dirname}/../data/label.json`,
      JSON.stringify(newArray, null, 2)
    );
    res.status(200).json({ message: "Labels deleted successfully" });
  } else {
    res.status(404).json({ message: "Labels not found" });
  }
};

exports.assignLabel = (req, res) => {
  const { imageId, labelId } = req.body;
  console.log(labels, images);
  const image = images.find((img) => img.id === imageId);
  const label = labels.find((lbl) => lbl.id === labelId);

  if (image && label) {
    if (!image.labels.some((lbl) => lbl.id === label.id)) {
      image.labels.push(label);
      fs.writeFileSync(
        `${__dirname}/../data/image.json`,
        JSON.stringify(images, null, 2)
      );
      res.status(200).json({ message: "Label assigned successfully" });
    } else {
      res.status(400).json({ message: "Label already exists in this image" });
    }
  } else {
    res.status(400).json({ message: "Invalid image or label ID" });
  }
};
exports.removeAssignLabel = (req, res) => {
  const { imageId, labelId } = req.params;

  const image = images.find((img) => img.id === imageId);
  const label = labels.find((lbl) => lbl.id === labelId);

  if (image && label) {
    const updatedLabels = image.labels.filter((lbl) => lbl.id !== label.id);

    if (updatedLabels.length < image.labels.length) {
      // Labels were removed, update the image's labels
      image.labels = updatedLabels;
      fs.writeFileSync(
        `${__dirname}/../data/image.json`,
        JSON.stringify(images, null, 2)
      );
      res.status(200).json({ message: "Label removed successfully" });
    } else {
      res.status(400).json({ message: "Label is not assigned to this image" });
    }
  } else {
    res.status(400).json({ message: "Invalid image or label ID" });
  }
};
