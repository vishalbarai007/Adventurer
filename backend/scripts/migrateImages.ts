import cloudinary from '../src/config/cloudinary';
import { db } from '../src/config/firebase';

const existingImages = [
  "https://your-old-storage.com/image1.jpg",
  "https://your-old-storage.com/image2.jpg",
  // Paste your 100+ links here
];

const migrateImages = async () => {
  console.log("🚀 Starting migration...");
  
  for (const url of existingImages) {
    try {
      const result = await cloudinary.uploader.upload(url, {
        folder: "adventurer_backups", // Organize them in a folder
        use_filename: true,
      });
      console.log(`✅ Uploaded: ${result.secure_url}`);
      
      // OPTIONAL: Update your Firebase DB here with the new URL
      // Example: find post with old URL and update it
      // const snapshot = await db.collection('posts').where('imageUrl', '==', url).get();
      // snapshot.forEach(async (doc) => {
      //   await doc.ref.update({ imageUrl: result.secure_url, mediaUrl: result.secure_url });
      // });
      
    } catch (error) {
      console.error(`❌ Failed: ${url}`, error);
    }
  }
  console.log("🏁 Migration complete!");
};

migrateImages();
