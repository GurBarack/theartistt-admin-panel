import { put } from '@vercel/blob';

export async function uploadImageToBlob(file: File): Promise<string> {
  try {
    const blob = await put(file.name, file, {
      access: 'public',
    });
    return blob.url;
  } catch (error) {
    console.error('Error uploading image to blob:', error);
    throw new Error('Failed to upload image');
  }
}

export async function uploadBase64ToBlob(base64Data: string, filename: string): Promise<string> {
  try {
    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data.split(',')[1], 'base64');
    
    // Create a File-like object
    const file = new File([buffer], filename, { type: 'image/jpeg' });
    
    const blob = await put(filename, file, {
      access: 'public',
    });
    return blob.url;
  } catch (error) {
    console.error('Error uploading base64 to blob:', error);
    throw new Error('Failed to upload image');
  }
}

export async function deleteBlob(url: string): Promise<void> {
  try {
    // Vercel Blob doesn't have a direct delete method in the client
    // You'll need to implement this via an API route
    const response = await fetch('/api/blob/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete blob');
    }
  } catch (error) {
    console.error('Error deleting blob:', error);
    throw new Error('Failed to delete image');
  }
}
