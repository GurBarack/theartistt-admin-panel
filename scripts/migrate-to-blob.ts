import { PrismaClient } from '@prisma/client';
import { uploadBase64ToBlob } from '../lib/blob';

const prisma = new PrismaClient();

async function migrateImagesToBlob() {
  try {
    console.log('🔄 Starting image migration to blob storage...');
    
    // Find all pages with blob URLs (temporary URLs)
    const pages = await prisma.page.findMany({
      where: {
        coverPhotoUrl: {
          startsWith: 'blob:'
        }
      }
    });

    console.log(`📸 Found ${pages.length} pages with blob URLs to migrate`);

    for (const page of pages) {
      try {
        console.log(`🔄 Migrating page: ${page.slug}`);
        
        // For blob URLs, we can't directly convert them to base64
        // This is a limitation - we'll need to handle this differently
        // For now, we'll set them to null and let users re-upload
        console.log(`⚠️  Cannot migrate blob URL for ${page.slug}, setting to null`);
        
        await prisma.page.update({
          where: { id: page.id },
          data: { coverPhotoUrl: null }
        });
        
        console.log(`✅ Updated ${page.slug} - cover photo set to null`);
      } catch (error) {
        console.error(`❌ Failed to migrate ${page.slug}:`, error);
      }
    }

    console.log('✅ Migration completed!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run migration
migrateImagesToBlob();
