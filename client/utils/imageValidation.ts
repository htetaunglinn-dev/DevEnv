export interface ImageValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateImage = (file: File): ImageValidationResult => {
  // Check if file is an image
  if (!file.type.startsWith('image/')) {
    return {
      isValid: false,
      error: 'Please select an image file',
    };
  }

  // Check file size (3MB limit)
  const maxSize = 3 * 1024 * 1024; // 3MB in bytes
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'Image size must be less than 3MB',
    };
  }

  // Check image dimensions (optional - can be added if needed)
  // This would require reading the image and getting its dimensions

  return {
    isValid: true,
  };
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};