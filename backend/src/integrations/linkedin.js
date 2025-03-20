require('dotenv').config();
const axios = require('axios');

// LinkedIn API client
// Note: LinkedIn API requires OAuth 2.0 authentication
// This is a simplified version for demonstration purposes

/**
 * Get user profile from LinkedIn
 * @param {string} accessToken - LinkedIn OAuth access token
 * @returns {Promise<Object>} - LinkedIn user profile
 */
async function getUserProfile(accessToken) {
  try {
    const response = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    // Get profile picture
    const pictureResponse = await axios.get('https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~:playableStreams))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    // Get email address
    const emailResponse = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    const profileData = response.data;
    const pictureData = pictureResponse.data;
    const emailData = emailResponse.data;
    
    // Extract profile picture URL
    let profilePictureUrl = null;
    if (pictureData.profilePicture && 
        pictureData.profilePicture['displayImage~'] && 
        pictureData.profilePicture['displayImage~'].elements && 
        pictureData.profilePicture['displayImage~'].elements.length > 0) {
      profilePictureUrl = pictureData.profilePicture['displayImage~'].elements[0].identifiers[0].identifier;
    }
    
    // Extract email
    let email = null;
    if (emailData.elements && 
        emailData.elements.length > 0 && 
        emailData.elements[0]['handle~']) {
      email = emailData.elements[0]['handle~'].emailAddress;
    }
    
    return {
      id: profileData.id,
      firstName: profileData.localizedFirstName,
      lastName: profileData.localizedLastName,
      profilePictureUrl,
      email,
      vanityName: profileData.vanityName
    };
  } catch (error) {
    console.error('Error fetching LinkedIn profile:', error);
    throw new Error('Failed to fetch LinkedIn profile');
  }
}

/**
 * Get user's LinkedIn posts
 * @param {string} accessToken - LinkedIn OAuth access token
 * @param {number} count - Number of posts to return
 * @returns {Promise<Array>} - List of posts
 */
async function getUserPosts(accessToken, count = 10) {
  try {
    // Get user's URN
    const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    const userUrn = `urn:li:person:${profileResponse.data.id}`;
    
    // Get user's posts
    const response = await axios.get(`https://api.linkedin.com/v2/ugcPosts?q=authors&authors=${encodeURIComponent(userUrn)}&count=${count}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    if (!response.data.elements) {
      return [];
    }
    
    return response.data.elements.map(post => ({
      id: post.id,
      urn: post.urn,
      author: post.author,
      created: post.created.time,
      lastModified: post.lastModified.time,
      specificContent: post.specificContent,
      visibility: post.visibility
    }));
  } catch (error) {
    console.error('Error fetching LinkedIn posts:', error);
    throw new Error('Failed to fetch LinkedIn posts');
  }
}

/**
 * Create a LinkedIn post
 * @param {string} accessToken - LinkedIn OAuth access token
 * @param {string} text - Post text content
 * @param {string} visibility - Post visibility (PUBLIC, CONNECTIONS, etc.)
 * @returns {Promise<Object>} - Created post
 */
async function createPost(accessToken, text, visibility = 'PUBLIC') {
  try {
    // Get user's URN
    const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    const userUrn = `urn:li:person:${profileResponse.data.id}`;
    
    // Create post
    const response = await axios.post('https://api.linkedin.com/v2/ugcPosts', {
      author: userUrn,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text
          },
          shareMediaCategory: 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': visibility
      }
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0',
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating LinkedIn post:', error);
    throw new Error('Failed to create LinkedIn post');
  }
}

/**
 * Get user's LinkedIn connections
 * @param {string} accessToken - LinkedIn OAuth access token
 * @param {number} count - Number of connections to return
 * @returns {Promise<Array>} - List of connections
 */
async function getUserConnections(accessToken, count = 10) {
  try {
    const response = await axios.get(`https://api.linkedin.com/v2/connections?q=viewer&count=${count}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    if (!response.data.elements) {
      return [];
    }
    
    return response.data.elements;
  } catch (error) {
    console.error('Error fetching LinkedIn connections:', error);
    throw new Error('Failed to fetch LinkedIn connections');
  }
}

/**
 * Track Kotlin-related LinkedIn posts
 * @param {string} accessToken - LinkedIn OAuth access token
 * @returns {Promise<Object>} - Summary of Kotlin-related posts
 */
async function trackKotlinPosts(accessToken) {
  try {
    // Get user's posts
    const posts = await getUserPosts(accessToken, 50);
    
    // Filter Kotlin-related posts
    const kotlinPosts = posts.filter(post => {
      if (!post.specificContent || 
          !post.specificContent['com.linkedin.ugc.ShareContent'] || 
          !post.specificContent['com.linkedin.ugc.ShareContent'].shareCommentary) {
        return false;
      }
      
      const text = post.specificContent['com.linkedin.ugc.ShareContent'].shareCommentary.text.toLowerCase();
      return (
        text.includes('kotlin') ||
        text.includes('#kotlin') ||
        text.includes('kotlinlang') ||
        text.includes('kotlinconf')
      );
    });
    
    return {
      kotlin_posts: kotlinPosts,
      summary: {
        total_kotlin_posts: kotlinPosts.length
      }
    };
  } catch (error) {
    console.error('Error tracking Kotlin LinkedIn posts:', error);
    throw new Error('Failed to track Kotlin LinkedIn posts');
  }
}

/**
 * Generate OAuth authorization URL
 * @returns {string} - Authorization URL
 */
function getAuthorizationUrl() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI;
  const scope = 'r_liteprofile r_emailaddress w_member_social';
  
  return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
}

/**
 * Exchange authorization code for access token
 * @param {string} code - Authorization code
 * @returns {Promise<Object>} - Access token response
 */
async function getAccessToken(code) {
  try {
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    const redirectUri = process.env.LINKEDIN_REDIRECT_URI;
    
    const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error getting LinkedIn access token:', error);
    throw new Error('Failed to get LinkedIn access token');
  }
}

module.exports = {
  getUserProfile,
  getUserPosts,
  createPost,
  getUserConnections,
  trackKotlinPosts,
  getAuthorizationUrl,
  getAccessToken
};
