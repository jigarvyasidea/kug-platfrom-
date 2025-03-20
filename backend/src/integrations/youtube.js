require('dotenv').config();
const { google } = require('googleapis');
const youtube = google.youtube('v3');

// Initialize YouTube client
const auth = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  process.env.YOUTUBE_REDIRECT_URI
);

// Set credentials if available
if (process.env.YOUTUBE_ACCESS_TOKEN) {
  auth.setCredentials({
    access_token: process.env.YOUTUBE_ACCESS_TOKEN,
    refresh_token: process.env.YOUTUBE_REFRESH_TOKEN,
    expiry_date: parseInt(process.env.YOUTUBE_TOKEN_EXPIRY || '0')
  });
}

/**
 * Get YouTube channel information by username
 * @param {string} username - YouTube username or channel ID
 * @returns {Promise<Object>} - Channel information
 */
async function getChannelInfo(username) {
  try {
    const response = await youtube.channels.list({
      auth: process.env.YOUTUBE_API_KEY,
      part: 'snippet,contentDetails,statistics',
      forUsername: username
    });

    // If no results found by username, try by ID
    if (response.data.items.length === 0) {
      const idResponse = await youtube.channels.list({
        auth: process.env.YOUTUBE_API_KEY,
        part: 'snippet,contentDetails,statistics',
        id: username
      });
      
      if (idResponse.data.items.length === 0) {
        throw new Error('Channel not found');
      }
      
      return {
        id: idResponse.data.items[0].id,
        title: idResponse.data.items[0].snippet.title,
        description: idResponse.data.items[0].snippet.description,
        customUrl: idResponse.data.items[0].snippet.customUrl,
        publishedAt: idResponse.data.items[0].snippet.publishedAt,
        thumbnails: idResponse.data.items[0].snippet.thumbnails,
        statistics: idResponse.data.items[0].statistics,
        uploadsPlaylistId: idResponse.data.items[0].contentDetails.relatedPlaylists.uploads
      };
    }
    
    return {
      id: response.data.items[0].id,
      title: response.data.items[0].snippet.title,
      description: response.data.items[0].snippet.description,
      customUrl: response.data.items[0].snippet.customUrl,
      publishedAt: response.data.items[0].snippet.publishedAt,
      thumbnails: response.data.items[0].snippet.thumbnails,
      statistics: response.data.items[0].statistics,
      uploadsPlaylistId: response.data.items[0].contentDetails.relatedPlaylists.uploads
    };
  } catch (error) {
    console.error('Error fetching YouTube channel info:', error);
    throw new Error('Failed to fetch YouTube channel info');
  }
}

/**
 * Get channel videos
 * @param {string} channelId - YouTube channel ID
 * @param {number} maxResults - Maximum number of videos to return
 * @returns {Promise<Array>} - List of videos
 */
async function getChannelVideos(channelId, maxResults = 10) {
  try {
    // First get the uploads playlist ID
    const channelInfo = await getChannelInfo(channelId);
    const uploadsPlaylistId = channelInfo.uploadsPlaylistId;
    
    // Then get the videos from the playlist
    const response = await youtube.playlistItems.list({
      auth: process.env.YOUTUBE_API_KEY,
      part: 'snippet,contentDetails',
      playlistId: uploadsPlaylistId,
      maxResults
    });
    
    // Get video IDs to fetch statistics
    const videoIds = response.data.items.map(item => item.contentDetails.videoId);
    
    // Get video statistics
    const videoStats = await youtube.videos.list({
      auth: process.env.YOUTUBE_API_KEY,
      part: 'statistics',
      id: videoIds.join(',')
    });
    
    // Create a map of video IDs to statistics
    const statsMap = {};
    videoStats.data.items.forEach(item => {
      statsMap[item.id] = item.statistics;
    });
    
    return response.data.items.map(item => ({
      id: item.contentDetails.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      thumbnails: item.snippet.thumbnails,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      statistics: statsMap[item.contentDetails.videoId] || {}
    }));
  } catch (error) {
    console.error('Error fetching YouTube channel videos:', error);
    throw new Error('Failed to fetch YouTube channel videos');
  }
}

/**
 * Search for YouTube videos
 * @param {string} query - Search query
 * @param {number} maxResults - Maximum number of videos to return
 * @returns {Promise<Array>} - List of videos
 */
async function searchVideos(query, maxResults = 10) {
  try {
    const response = await youtube.search.list({
      auth: process.env.YOUTUBE_API_KEY,
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults
    });
    
    // Get video IDs to fetch statistics
    const videoIds = response.data.items.map(item => item.id.videoId);
    
    // Get video statistics
    const videoStats = await youtube.videos.list({
      auth: process.env.YOUTUBE_API_KEY,
      part: 'statistics',
      id: videoIds.join(',')
    });
    
    // Create a map of video IDs to statistics
    const statsMap = {};
    videoStats.data.items.forEach(item => {
      statsMap[item.id] = item.statistics;
    });
    
    return response.data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      thumbnails: item.snippet.thumbnails,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      statistics: statsMap[item.id.videoId] || {}
    }));
  } catch (error) {
    console.error('Error searching YouTube videos:', error);
    throw new Error('Failed to search YouTube videos');
  }
}

/**
 * Track Kotlin-related videos for a channel
 * @param {string} channelId - YouTube channel ID
 * @returns {Promise<Object>} - Summary of Kotlin-related videos
 */
async function trackKotlinVideos(channelId) {
  try {
    // Get all videos from the channel (up to 50)
    const videos = await getChannelVideos(channelId, 50);
    
    // Filter Kotlin-related videos
    const kotlinVideos = videos.filter(video => {
      const title = video.title.toLowerCase();
      const description = video.description.toLowerCase();
      return (
        title.includes('kotlin') ||
        description.includes('kotlin') ||
        title.includes('kotlinconf') ||
        description.includes('kotlinconf')
      );
    });
    
    // Search for Kotlin videos by the channel
    const searchResults = await searchVideos(`kotlin channel:${channelId}`, 50);
    
    // Combine and deduplicate results
    const allKotlinVideos = [...kotlinVideos];
    for (const video of searchResults) {
      if (!allKotlinVideos.some(v => v.id === video.id)) {
        allKotlinVideos.push(video);
      }
    }
    
    return {
      kotlin_videos: allKotlinVideos,
      summary: {
        total_kotlin_videos: allKotlinVideos.length,
        total_views: allKotlinVideos.reduce((sum, video) => sum + parseInt(video.statistics.viewCount || 0), 0),
        total_likes: allKotlinVideos.reduce((sum, video) => sum + parseInt(video.statistics.likeCount || 0), 0),
        total_comments: allKotlinVideos.reduce((sum, video) => sum + parseInt(video.statistics.commentCount || 0), 0),
      },
    };
  } catch (error) {
    console.error('Error tracking Kotlin videos:', error);
    throw new Error('Failed to track Kotlin videos');
  }
}

/**
 * Track KUG-related videos
 * @param {string} kugName - KUG name (e.g., "KUG Bangalore")
 * @returns {Promise<Object>} - Summary of KUG-related videos
 */
async function trackKUGVideos(kugName) {
  try {
    // Search for KUG-related videos
    const videos = await searchVideos(`"${kugName}" OR "Kotlin User Group ${kugName}"`, 50);
    
    return {
      kug_videos: videos,
      summary: {
        total_videos: videos.length,
        total_views: videos.reduce((sum, video) => sum + parseInt(video.statistics.viewCount || 0), 0),
        total_likes: videos.reduce((sum, video) => sum + parseInt(video.statistics.likeCount || 0), 0),
        total_comments: videos.reduce((sum, video) => sum + parseInt(video.statistics.commentCount || 0), 0),
      },
    };
  } catch (error) {
    console.error('Error tracking KUG videos:', error);
    throw new Error('Failed to track KUG videos');
  }
}

module.exports = {
  getChannelInfo,
  getChannelVideos,
  searchVideos,
  trackKotlinVideos,
  trackKUGVideos,
};
