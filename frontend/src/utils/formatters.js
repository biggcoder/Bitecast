/**
 * Format a date string to a readable format
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  /**
   * Truncate text to a specified length
   */
  export const truncateText = (text, length = 150) => {
    if (!text || text.length <= length) return text;
    return `${text.substring(0, length).trim()}...`;
  };
  
  /**
   * Format a YouTube URL
   */
  export const formatYouTubeUrl = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com')) {
        return 'YouTube Video';
      }
      return url;
    } catch {
      return url;
    }
  };
  