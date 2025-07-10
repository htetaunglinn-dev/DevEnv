/**
 * Generates a standardized avatar URL using ui-avatars.com API
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @param size - Avatar size (default: 50)
 * @returns Avatar URL string
 */
export const generateAvatarUrl = (
  firstName?: string,
  lastName?: string,
  size: number = 50
): string => {
  const name = `${firstName || 'User'}+${lastName || ''}`.trim();
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=${size}`;
};

/**
 * Generates avatar URL from full name string
 * @param fullName - User's full name
 * @param size - Avatar size (default: 50)
 * @returns Avatar URL string
 */
export const generateAvatarUrlFromName = (
  fullName: string,
  size: number = 50
): string => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=random&size=${size}`;
};

/**
 * Generates avatar URL from email (fallback when name is not available)
 * @param email - User's email
 * @param size - Avatar size (default: 50)
 * @returns Avatar URL string
 */
export const generateAvatarUrlFromEmail = (
  email: string,
  size: number = 50
): string => {
  // Extract name from email (before @) and format it
  const nameFromEmail = email.split('@')[0].replace(/[._-]/g, ' ');
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(nameFromEmail)}&background=random&size=${size}`;
};