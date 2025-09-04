import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the SVG file
const svgBuffer = fs.readFileSync(path.join(__dirname, 'client/public/bolt-logo.svg'));

// Convert SVG to PNG at different sizes
const sizes = [
  { width: 512, height: 512, filename: 'bolt-logo-512.png' },
  { width: 256, height: 256, filename: 'bolt-logo-256.png' },
  { width: 128, height: 128, filename: 'bolt-logo-128.png' }
];

async function convertSvgToPng() {
  try {
    for (const size of sizes) {
      await sharp(svgBuffer)
        .resize(size.width, size.height)
        .png()
        .toFile(path.join(__dirname, 'client/public', size.filename));
      
      console.log(`✅ Created ${size.filename} (${size.width}x${size.height})`);
    }
    
    console.log('\n🎉 Logo conversion complete! PNG files created in client/public/');
    console.log('📁 Files ready for upload to Hashnode:');
    console.log('   - bolt-logo-512.png (high resolution)');
    console.log('   - bolt-logo-256.png (medium resolution)');
    console.log('   - bolt-logo-128.png (standard resolution)');
  } catch (error) {
    console.error('Error converting SVG to PNG:', error);
  }
}

convertSvgToPng();