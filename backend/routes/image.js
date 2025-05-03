const express = require("express");
const multer = require("multer");
const uuid = require("uuid").v4;
const auth = require("../middlewares/auth");
const { uploadToS3, getS3Url, deleteFromS3 } = require("../services/s3");
const { saveImageMeta, listImages, deleteImageMeta } = require("../services/dynamodb");

// Import Rekognition SDK
const { RekognitionClient, DetectLabelsCommand, DetectTextCommand } = require("@aws-sdk/client-rekognition");

const router = express.Router();
const upload = multer();

router.post("/upload", auth, upload.single("image"), async (req, res) => {
  const userId = req.user.sub;
  const imageId = uuid();
  const key = `users/${userId}/${imageId}_${req.file.originalname}`;

  // Upload to S3
  await uploadToS3(key, req.file.buffer, req.file.mimetype);

  // Analyze image with Rekognition
  const rekognition = new RekognitionClient({ region: process.env.AWS_REGION });

  // Detect labels (objects/scenes)
  let labels = [];
  try {
    const labelsRes = await rekognition.send(
      new DetectLabelsCommand({
        Image: { S3Object: { Bucket: process.env.S3_BUCKET, Name: key } },
        MaxLabels: 10,
        MinConfidence: 70,
      })
    );
    labels = (labelsRes.Labels || []).map(l => l.Name);
  } catch (err) {
    console.error("Rekognition label error:", err);
  }

  // Detect text
  let detectedText = [];
  try {
    const textRes = await rekognition.send(
      new DetectTextCommand({
        Image: { S3Object: { Bucket: process.env.S3_BUCKET, Name: key } },
      })
    );
    detectedText = (textRes.TextDetections || [])
      .filter(t => t.Type === "LINE")
      .map(t => t.DetectedText);
  } catch (err) {
    console.error("Rekognition text error:", err);
  }

  // Save metadata with tags/labels and text
  await saveImageMeta(userId, imageId, key, labels, detectedText);

  res.json({ imageId, url: getS3Url(key), labels, detectedText });
});
// Example for Express route
router.get("/", auth, async (req, res) => {
  const userId = req.user.sub;
  const images = await listImages(userId);
  res.json(
    images.map((img) => ({
      imageId: img.imageId,
      url: getS3Url(img.s3Key),
      labels: img.labels || [], // <-- ensure always array
      detectedText: img.detectedText || [],
      s3Key: img.s3Key,
    }))
  );
});


// ---- ADD THIS DELETE ROUTE ----
router.delete("/:imageId", auth, async (req, res) => {
  const userId = req.user.sub;
  const imageId = req.params.imageId;

  // Find the image in DynamoDB to get the s3Key
  const images = await listImages(userId);
  const image = images.find((img) => img.imageId === imageId);
  if (!image) return res.status(404).json({ error: "Image not found" });

  // Delete from S3
  await deleteFromS3(image.s3Key);
  // Delete from DynamoDB
  await deleteImageMeta(userId, imageId);

  res.json({ success: true });
});

module.exports = router;

