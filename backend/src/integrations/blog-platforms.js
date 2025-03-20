require('dotenv').config();
const axios = require('axios');

/**
 * Get Medium user profile
 * @param {string} username - Medium username
 * @returns {Promise<Object>} - Medium user profile
 */
async function getMediumProfile(username) {
  try {
    // Medium doesn't have an official API for profiles, so we'll use a workaround
    // by fetching the user's JSON feed
    const response = await axios.get(`https://medium.com/@${username}/latest?format=json`);
    
    // Medium prepends its JSON responses with ])}while(1);</x>
    const jsonString = response.data.replace('])}while(1);</x>', '');
    const data = JSON.parse(jsonString);
    
    // Extract user data
    const userId = Object.keys(data.payload.references.User)[0];
    const user = data.payload.references.User[userId];
    
    return {
      id: user.userId,
      username: user.username,
      name: user.name,
      bio: user.bio,
      imageUrl: `https://miro.medium.com/fit/c/240/240/${user.imageId}`,
      followers: user.socialStats.followerCount,
      following: user.socialStats.followingCount,
      twitter: user.twitterScreenName,
      facebook: user.facebookAccountId,
    };
  } catch (error) {
    console.error('Error fetching Medium profile:', error);
    throw new Error('Failed to fetch Medium profile');
  }
}

/**
 * Get Medium user posts
 * @param {string} username - Medium username
 * @returns {Promise<Array>} - List of posts
 */
async function getMediumPosts(username) {
  try {
    // Fetch user's JSON feed
    const response = await axios.get(`https://medium.com/@${username}/latest?format=json`);
    
    // Medium prepends its JSON responses with ])}while(1);</x>
    const jsonString = response.data.replace('])}while(1);</x>', '');
    const data = JSON.parse(jsonString);
    
    // Extract posts
    const posts = [];
    const streamItems = data.payload.streamItems;
    
    for (const item of streamItems) {
      if (item.itemType !== 'postPreview') continue;
      
      const postId = item.postPreview.postId;
      const post = data.payload.references.Post[postId];
      
      if (!post) continue;
      
      posts.push({
        id: post.id,
        title: post.title,
        subtitle: post.content.subtitle,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        url: `https://medium.com/@${username}/${post.uniqueSlug}`,
        claps: post.virtuals.totalClapCount,
        views: post.virtuals.totalViewsCount,
        readingTime: post.virtuals.readingTime,
        tags: post.virtuals.tags.map(tag => tag.name),
        imageUrl: post.virtuals.previewImage?.imageId 
          ? `https://miro.medium.com/max/1200/${post.virtuals.previewImage.imageId}` 
          : null,
      });
    }
    
    return posts;
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    throw new Error('Failed to fetch Medium posts');
  }
}

/**
 * Get Dev.to user profile
 * @param {string} username - Dev.to username
 * @returns {Promise<Object>} - Dev.to user profile
 */
async function getDevToProfile(username) {
  try {
    const response = await axios.get(`https://dev.to/api/users/by_username?url=${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Dev.to profile:', error);
    throw new Error('Failed to fetch Dev.to profile');
  }
}

/**
 * Get Dev.to user articles
 * @param {string} username - Dev.to username
 * @returns {Promise<Array>} - List of articles
 */
async function getDevToArticles(username) {
  try {
    const response = await axios.get(`https://dev.to/api/articles?username=${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Dev.to articles:', error);
    throw new Error('Failed to fetch Dev.to articles');
  }
}

/**
 * Track Kotlin-related Medium posts
 * @param {string} username - Medium username
 * @returns {Promise<Object>} - Summary of Kotlin-related posts
 */
async function trackKotlinMediumPosts(username) {
  try {
    // Get user's posts
    const posts = await getMediumPosts(username);
    
    // Filter Kotlin-related posts
    const kotlinPosts = posts.filter(post => {
      const title = post.title.toLowerCase();
      const subtitle = post.subtitle ? post.subtitle.toLowerCase() : '';
      const hasTags = post.tags.some(tag => 
        tag.toLowerCase() === 'kotlin' || 
        tag.toLowerCase().includes('kotlin')
      );
      
      return (
        title.includes('kotlin') ||
        subtitle.includes('kotlin') ||
        hasTags
      );
    });
    
    return {
      kotlin_posts: kotlinPosts,
      summary: {
        total_kotlin_posts: kotlinPosts.length,
        total_claps: kotlinPosts.reduce((sum, post) => sum + post.claps, 0),
        total_views: kotlinPosts.reduce((sum, post) => sum + (post.views || 0), 0),
        average_reading_time: kotlinPosts.length > 0 
          ? kotlinPosts.reduce((sum, post) => sum + post.readingTime, 0) / kotlinPosts.length 
          : 0,
      },
    };
  } catch (error) {
    console.error('Error tracking Kotlin Medium posts:', error);
    throw new Error('Failed to track Kotlin Medium posts');
  }
}

/**
 * Track Kotlin-related Dev.to articles
 * @param {string} username - Dev.to username
 * @returns {Promise<Object>} - Summary of Kotlin-related articles
 */
async function trackKotlinDevToArticles(username) {
  try {
    // Get user's articles
    const articles = await getDevToArticles(username);
    
    // Filter Kotlin-related articles
    const kotlinArticles = articles.filter(article => {
      const title = article.title.toLowerCase();
      const description = article.description ? article.description.toLowerCase() : '';
      const hasTags = article.tag_list.some(tag => 
        tag.toLowerCase() === 'kotlin' || 
        tag.toLowerCase().includes('kotlin')
      );
      
      return (
        title.includes('kotlin') ||
        description.includes('kotlin') ||
        hasTags
      );
    });
    
    return {
      kotlin_articles: kotlinArticles,
      summary: {
        total_kotlin_articles: kotlinArticles.length,
        total_reactions: kotlinArticles.reduce((sum, article) => sum + article.public_reactions_count, 0),
        total_comments: kotlinArticles.reduce((sum, article) => sum + article.comments_count, 0),
        total_views: kotlinArticles.reduce((sum, article) => sum + (article.page_views_count || 0), 0),
      },
    };
  } catch (error) {
    console.error('Error tracking Kotlin Dev.to articles:', error);
    throw new Error('Failed to track Kotlin Dev.to articles');
  }
}

/**
 * Search for Kotlin articles on Dev.to
 * @param {string} query - Additional search terms
 * @returns {Promise<Array>} - List of articles
 */
async function searchKotlinDevToArticles(query = '') {
  try {
    const searchQuery = query ? `kotlin ${query}` : 'kotlin';
    const response = await axios.get(`https://dev.to/api/articles?tag=kotlin&q=${encodeURIComponent(searchQuery)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching Kotlin Dev.to articles:', error);
    throw new Error('Failed to search Kotlin Dev.to articles');
  }
}

module.exports = {
  getMediumProfile,
  getMediumPosts,
  getDevToProfile,
  getDevToArticles,
  trackKotlinMediumPosts,
  trackKotlinDevToArticles,
  searchKotlinDevToArticles,
};
