import express from "express";
import multer from "multer";
import * as fs from 'fs';
import cloudinary from "../config/cloudinary";

const router = express.Router();

// Save files temporarily to 'uploads/' directory with 50MB limit
const upload = multer({ 
  dest: "uploads/",
  limits: { fileSize: 50 * 1024 * 1024 } // 50 MB
});

// Accept a single file under the field name 'file'
router.post("/", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }

  try {
    let result: any;
    let optimizedUrl = "";

    // Check if the file is a video by inspecting its mimetype
    if (req.file.mimetype.startsWith("video/")) {
      // Use upload_large for videos (supports chunking)
      result = await cloudinary.uploader.upload_large(req.file.path, {
        resource_type: "video",
        chunk_size: 6000000, // 6MB chunks
        folder: "adventurer_videos",
      });
      // Optimize video delivery
      optimizedUrl = result.secure_url.replace('/upload/', '/upload/q_auto/');
    } else {
      // Standard upload for images
      result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
        folder: "adventurer_images",
      });
      // Optimize image delivery (quality auto, format auto)
      optimizedUrl = result.secure_url.replace('/upload/', '/upload/q_auto,f_auto/');
    }

    // Delete the temporary file from our local server
    fs.unlinkSync(req.file.path);

    // Return the optimized secure URL to the frontend
    res.json({
      url: optimizedUrl,
      public_id: result.public_id,
      resource_type: result.resource_type
    });
  } catch (err) {
    // Ensure we delete the file even if upload fails
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: "Cloudinary upload failed", details: err });
  }
});

export default router;
