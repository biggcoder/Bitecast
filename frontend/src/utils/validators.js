/**
 * Validate if a string is a valid YouTube URL
 */
export const isValidYouTubeUrl = (url) => {
    try {
      const urlObj = new URL(url);
      if (!urlObj.hostname.includes('youtube.com') && !urlObj.hostname.includes('youtu.be')) {
        return false;
      }
  
      if (urlObj.hostname.includes('youtube.com')) {
        return urlObj.pathname === '/watch' && urlObj.searchParams.has('v');
      }
  
      if (urlObj.hostname.includes('youtu.be')) {
        return urlObj.pathname.length > 1;
      }
  
      return false;
    } catch {
      return false;
    }
  };
  
  /**
   * Validate email format
   */
  export const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  /**
   * Validate password strength
   */
  export const isStrongPassword = (password) => {
    return password && password.length >= 8;
  };
  