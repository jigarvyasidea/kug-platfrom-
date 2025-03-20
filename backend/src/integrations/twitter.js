require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

// Initialize Twitter client
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// Read-only client
const readOnlyClient = twitterClient.readOnly;

/**
 * Get user profile from Twitter
 * @param {string} username - Twitter username
 * @returns {Promise<Object>} - Twitter user profile
 */
async function getUserProfile(username) {
  try {
    const user = await readOnlyClient.v2.userByUsername(username, {
      'user.fields': [
        'description',
        'created_at',
        'profile_image_url',
        'public_metrics',
        'url',
        'verified',
        'location',
      ],
    });
    
    if (!user.data) {
      throw new Error('User not found');
    }
    
    return {
      id: user.data.id,
      username: user.data.username,
      name: user.data.name,
      description: user.data.description,
      profile_image_url: user.data.profile_image_url,
      followers_count: user.data.public_metrics.followers_count,
      following_count: user.data.public_metrics.following_count,
      tweet_count: user.data.public_metrics.tweet_count,
      created_at: user.data.created_at,
      verified: user.data.verified,
      location: user.data.location,
      url: user.data.url,
    };
  } catch (error) {
    console.error('Error fetching Twitter user profile:', error);
    throw new Error('Failed to fetch Twitter user profile');
  }
}

/**
 * Get user tweets
 * @param {string} username - Twitter username
 * @param {number} max_results - Maximum number of tweets to return
 * @returns {Promise<Array>} - List of tweets
 */
async function getUserTweets(username, max_results = 10) {
  try {
    // First get the user ID
    const user = await readOnlyClient.v2.userByUsername(username);
    
    if (!user.data) {
      throw new Error('User not found');
    }
    
    const userId = user.data.id;
    
    // Then get the user's tweets
    const tweets = await readOnlyClient.v2.userTimeline(userId, {
      max_results,
      'tweet.fields': [
        'created_at',
        'public_metrics',
        'entities',
        'referenced_tweets',
      ],
      expansions: ['attachments.media_keys', 'referenced_tweets.id'],
    });
    
    return tweets.data.data.map(tweet => ({
      id: tweet.id,
      text: tweet.text,
      created_at: tweet.created_at,
      retweet_count: tweet.public_metrics.retweet_count,
      reply_count: tweet.public_metrics.reply_count,
      like_count: tweet.public_metrics.like_count,
      quote_count: tweet.public_metrics.quote_count,
      is_retweet: tweet.referenced_tweets?.some(rt => rt.type === 'retweeted'),
      is_reply: tweet.referenced_tweets?.some(rt => rt.type === 'replied_to'),
      is_quote: tweet.referenced_tweets?.some(rt => rt.type === 'quoted'),
      hashtags: tweet.entities?.hashtags?.map(h => h.tag) || [],
      mentions: tweet.entities?.mentions?.map(m => m.username) || [],
      urls: tweet.entities?.urls?.map(u => u.expanded_url) || [],
    }));
  } catch (error) {
    console.error('Error fetching user tweets:', error);
    throw new Error('Failed to fetch user tweets');
  }
}

/**
 * Search for tweets
 * @param {string} query - Search query
 * @param {number} max_results - Maximum number of tweets to return
 * @returns {Promise<Array>} - List of tweets
 */
async function searchTweets(query, max_results = 10) {
  try {
    const tweets = await readOnlyClient.v2.search(query, {
      max_results,
      'tweet.fields': [
        'created_at',
        'public_metrics',
        'entities',
        'referenced_tweets',
        'author_id',
      ],
      expansions: ['author_id'],
      'user.fields': ['username', 'name', 'profile_image_url'],
    });
    
    // Create a map of user IDs to user objects
    const users = {};
    if (tweets.includes?.users) {
      for (const user of tweets.includes.users) {
        users[user.id] = user;
      }
    }
    
    return tweets.data.map(tweet => ({
      id: tweet.id,
      text: tweet.text,
      created_at: tweet.created_at,
      retweet_count: tweet.public_metrics.retweet_count,
      reply_count: tweet.public_metrics.reply_count,
      like_count: tweet.public_metrics.like_count,
      quote_count: tweet.public_metrics.quote_count,
      author: users[tweet.author_id] ? {
        id: users[tweet.author_id].id,
        username: users[tweet.author_id].username,
        name: users[tweet.author_id].name,
        profile_image_url: users[tweet.author_id].profile_image_url,
      } : null,
      is_retweet: tweet.referenced_tweets?.some(rt => rt.type === 'retweeted'),
      is_reply: tweet.referenced_tweets?.some(rt => rt.type === 'replied_to'),
      is_quote: tweet.referenced_tweets?.some(rt => rt.type === 'quoted'),
      hashtags: tweet.entities?.hashtags?.map(h => h.tag) || [],
      mentions: tweet.entities?.mentions?.map(m => m.username) || [],
      urls: tweet.entities?.urls?.map(u => u.expanded_url) || [],
    }));
  } catch (error) {
    console.error('Error searching tweets:', error);
    throw new Error('Failed to search tweets');
  }
}

/**
 * Track Kotlin-related tweets
 * @param {string} username - Twitter username
 * @returns {Promise<Object>} - Summary of Kotlin-related tweets
 */
async function trackKotlinTweets(username) {
  try {
    // Get user's tweets
    const tweets = await getUserTweets(username, 100);
    
    // Filter Kotlin-related tweets
    const kotlinTweets = tweets.filter(tweet => {
      const text = tweet.text.toLowerCase();
      return (
        text.includes('kotlin') ||
        text.includes('#kotlin') ||
        text.includes('kotlinlang') ||
        text.includes('kotlinconf') ||
        tweet.hashtags.some(tag => 
          tag.toLowerCase() === 'kotlin' || 
          tag.toLowerCase().includes('kotlin')
        )
      );
    });
    
    // Search for Kotlin tweets by the user
    const searchResults = await searchTweets(`from:${username} kotlin OR #kotlin`, 100);
    
    // Combine and deduplicate results
    const allKotlinTweets = [...kotlinTweets];
    for (const tweet of searchResults) {
      if (!allKotlinTweets.some(t => t.id === tweet.id)) {
        allKotlinTweets.push(tweet);
      }
    }
    
    return {
      kotlin_tweets: allKotlinTweets,
      summary: {
        total_kotlin_tweets: allKotlinTweets.length,
        total_retweets: allKotlinTweets.reduce((sum, tweet) => sum + tweet.retweet_count, 0),
        total_likes: allKotlinTweets.reduce((sum, tweet) => sum + tweet.like_count, 0),
        total_replies: allKotlinTweets.reduce((sum, tweet) => sum + tweet.reply_count, 0),
      },
    };
  } catch (error) {
    console.error('Error tracking Kotlin tweets:', error);
    throw new Error('Failed to track Kotlin tweets');
  }
}

/**
 * Track KUG-related tweets
 * @param {string} kugName - KUG name (e.g., "KUG Bangalore")
 * @returns {Promise<Array>} - List of KUG-related tweets
 */
async function trackKUGTweets(kugName) {
  try {
    // Create search query
    const query = `"${kugName}" OR #${kugName.replace(/\s+/g, '')}`;
    
    // Search for tweets
    const tweets = await searchTweets(query, 100);
    
    return {
      kug_tweets: tweets,
      summary: {
        total_tweets: tweets.length,
        total_retweets: tweets.reduce((sum, tweet) => sum + tweet.retweet_count, 0),
        total_likes: tweets.reduce((sum, tweet) => sum + tweet.like_count, 0),
        total_replies: tweets.reduce((sum, tweet) => sum + tweet.reply_count, 0),
      },
    };
  } catch (error) {
    console.error('Error tracking KUG tweets:', error);
    throw new Error('Failed to track KUG tweets');
  }
}

module.exports = {
  getUserProfile,
  getUserTweets,
  searchTweets,
  trackKotlinTweets,
  trackKUGTweets,
};
