import cloudinary from '../src/config/cloudinary';
import { db } from '../src/config/firebase';
import * as fs from 'fs';
import * as path from 'path';

const assetsDir = path.resolve(__dirname, '../../frontend/public/assets');

// Recursively get all files in a directory
const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []) => {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  
  const files = fs.readdirSync(dirPath);

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
};

const migrateImages = async () => {
  console.log("🚀 Starting local assets migration...");
  
  if (!fs.existsSync(assetsDir)) {
    console.error(`❌ Directory not found: ${assetsDir}`);
    return;
  }

  const allFiles = getAllFiles(assetsDir);
  console.log(`Found ${allFiles.length} files to migrate.`);

  for (const filePath of allFiles) {
    try {
      // Determine if it's a video based on extension (simple check)
      const ext = path.extname(filePath).toLowerCase();
      const isVideo = ['.mp4', '.mov', '.avi', '.mkv'].includes(ext);

      let result: any;
      if (isVideo) {
        console.log(`⏳ Uploading video: ${path.basename(filePath)}`);
        result = await cloudinary.uploader.upload_large(filePath, {
          resource_type: "video",
          chunk_size: 6000000,
          folder: "adventurer_assets_migration/videos",
          use_filename: true,
        });
      } else {
        console.log(`⏳ Uploading image: ${path.basename(filePath)}`);
        result = await cloudinary.uploader.upload(filePath, {
          resource_type: "image",
          folder: "adventurer_assets_migration/images",
          use_filename: true,
        });
      }

      console.log(`✅ Uploaded successfully: ${result.secure_url}`);
      
      // Note: If you need to map this back to Firebase, you can do it here by 
      // finding documents where the old local path matches and updating them.

    } catch (error) {
      console.error(`❌ Failed to upload: ${filePath}`, error);
    }
  }
  
  console.log("🏁 Migration complete!");
};

migrateImages();
