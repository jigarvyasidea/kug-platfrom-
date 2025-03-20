require('dotenv').config();
const axios = require('axios');

/**
 * Discord API client
 * Note: Discord API requires authentication with a bot token
 */

/**
 * Send a message to a Discord channel
 * @param {string} channelId - Discord channel ID
 * @param {string} message - Message content
 * @returns {Promise<Object>} - Sent message
 */
async function sendChannelMessage(channelId, message) {
  try {
    const response = await axios.post(
      `https://discord.com/api/v10/channels/${channelId}/messages`,
      { content: message },
      {
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error sending Discord message:', error);
    throw new Error('Failed to send Discord message');
  }
}

/**
 * Get messages from a Discord channel
 * @param {string} channelId - Discord channel ID
 * @param {number} limit - Maximum number of messages to return
 * @returns {Promise<Array>} - List of messages
 */
async function getChannelMessages(channelId, limit = 50) {
  try {
    const response = await axios.get(
      `https://discord.com/api/v10/channels/${channelId}/messages?limit=${limit}`,
      {
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error fetching Discord messages:', error);
    throw new Error('Failed to fetch Discord messages');
  }
}

/**
 * Create a new Discord channel in a guild
 * @param {string} guildId - Discord guild (server) ID
 * @param {string} name - Channel name
 * @param {number} type - Channel type (0 = text, 2 = voice, 4 = category)
 * @param {string} parentId - Parent category ID (optional)
 * @returns {Promise<Object>} - Created channel
 */
async function createChannel(guildId, name, type = 0, parentId = null) {
  try {
    const payload = {
      name,
      type
    };
    
    if (parentId) {
      payload.parent_id = parentId;
    }
    
    const response = await axios.post(
      `https://discord.com/api/v10/guilds/${guildId}/channels`,
      payload,
      {
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error creating Discord channel:', error);
    throw new Error('Failed to create Discord channel');
  }
}

/**
 * Get information about a Discord guild (server)
 * @param {string} guildId - Discord guild ID
 * @returns {Promise<Object>} - Guild information
 */
async function getGuildInfo(guildId) {
  try {
    const response = await axios.get(
      `https://discord.com/api/v10/guilds/${guildId}`,
      {
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error fetching Discord guild info:', error);
    throw new Error('Failed to fetch Discord guild info');
  }
}

/**
 * Get channels in a Discord guild
 * @param {string} guildId - Discord guild ID
 * @returns {Promise<Array>} - List of channels
 */
async function getGuildChannels(guildId) {
  try {
    const response = await axios.get(
      `https://discord.com/api/v10/guilds/${guildId}/channels`,
      {
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error fetching Discord guild channels:', error);
    throw new Error('Failed to fetch Discord guild channels');
  }
}

/**
 * Create a webhook for a Discord channel
 * @param {string} channelId - Discord channel ID
 * @param {string} name - Webhook name
 * @returns {Promise<Object>} - Created webhook
 */
async function createWebhook(channelId, name) {
  try {
    const response = await axios.post(
      `https://discord.com/api/v10/channels/${channelId}/webhooks`,
      { name },
      {
        headers: {
          'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error creating Discord webhook:', error);
    throw new Error('Failed to create Discord webhook');
  }
}

/**
 * Send a message via webhook
 * @param {string} webhookUrl - Discord webhook URL
 * @param {Object} message - Message content
 * @returns {Promise<Object>} - Sent message
 */
async function sendWebhookMessage(webhookUrl, message) {
  try {
    const response = await axios.post(
      webhookUrl,
      message,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error sending Discord webhook message:', error);
    throw new Error('Failed to send Discord webhook message');
  }
}

/**
 * Create a KUG Discord server structure
 * @param {string} guildId - Discord guild ID
 * @param {string} kugName - KUG name (e.g., "KUG Bangalore")
 * @returns {Promise<Object>} - Created channels
 */
async function setupKUGDiscordServer(guildId, kugName) {
  try {
    // Create categories
    const announcementsCategory = await createChannel(guildId, '📢 Announcements', 4);
    const eventsCategory = await createChannel(guildId, '🎟️ Events', 4);
    const discussionsCategory = await createChannel(guildId, '💬 Discussions', 4);
    const contributionsCategory = await createChannel(guildId, '🚀 Contributions', 4);
    const resourcesCategory = await createChannel(guildId, '📚 Resources', 4);
    
    // Create channels under Announcements category
    const welcomeChannel = await createChannel(guildId, 'welcome', 0, announcementsCategory.id);
    const announcementsChannel = await createChannel(guildId, 'announcements', 0, announcementsCategory.id);
    const rulesChannel = await createChannel(guildId, 'rules', 0, announcementsCategory.id);
    
    // Create channels under Events category
    const upcomingEventsChannel = await createChannel(guildId, 'upcoming-events', 0, eventsCategory.id);
    const eventIdeasChannel = await createChannel(guildId, 'event-ideas', 0, eventsCategory.id);
    const eventPhotosChannel = await createChannel(guildId, 'event-photos', 0, eventsCategory.id);
    
    // Create channels under Discussions category
    const generalChannel = await createChannel(guildId, 'general', 0, discussionsCategory.id);
    const kotlinHelpChannel = await createChannel(guildId, 'kotlin-help', 0, discussionsCategory.id);
    const androidChannel = await createChannel(guildId, 'android', 0, discussionsCategory.id);
    const multiplatformChannel = await createChannel(guildId, 'multiplatform', 0, discussionsCategory.id);
    const jobsChannel = await createChannel(guildId, 'jobs', 0, discussionsCategory.id);
    
    // Create channels under Contributions category
    const talksChannel = await createChannel(guildId, 'talks', 0, contributionsCategory.id);
    const blogsChannel = await createChannel(guildId, 'blogs', 0, contributionsCategory.id);
    const codeChannel = await createChannel(guildId, 'code', 0, contributionsCategory.id);
    const projectsChannel = await createChannel(guildId, 'projects', 0, contributionsCategory.id);
    
    // Create channels under Resources category
    const learningResourcesChannel = await createChannel(guildId, 'learning-resources', 0, resourcesCategory.id);
    const librariesChannel = await createChannel(guildId, 'libraries', 0, resourcesCategory.id);
    const toolsChannel = await createChannel(guildId, 'tools', 0, resourcesCategory.id);
    
    // Send welcome message
    await sendChannelMessage(welcomeChannel.id, 
      `Welcome to the ${kugName} Discord server! 👋\n\n` +
      `This is the official Discord server for the ${kugName} community. Here you can:\n` +
      `- Stay updated on upcoming events and announcements\n` +
      `- Discuss Kotlin-related topics\n` +
      `- Share your contributions (talks, blogs, code)\n` +
      `- Connect with other Kotlin enthusiasts\n\n` +
      `Please read the rules in the #rules channel and introduce yourself in the #general channel!`
    );
    
    // Send rules message
    await sendChannelMessage(rulesChannel.id,
      `# ${kugName} Community Rules\n\n` +
      `1. **Be respectful and inclusive** - Treat everyone with respect and kindness.\n` +
      `2. **No spam or self-promotion** - Share your work in the appropriate channels.\n` +
      `3. **Stay on topic** - Keep discussions relevant to the channel's purpose.\n` +
      `4. **No harassment or discrimination** - We have zero tolerance for any form of harassment.\n` +
      `5. **Follow the Code of Conduct** - We follow the Kotlin Foundation's Code of Conduct.`
    );
    
    return {
      categories: {
        announcements: announcementsCategory,
        events: eventsCategory,
        discussions: discussionsCategory,
        contributions: contributionsCategory,
        resources: resourcesCategory
      },
      channels: {
        welcome: welcomeChannel,
        announcements: announcementsChannel,
        rules: rulesChannel,
        upcomingEvents: upcomingEventsChannel,
        eventIdeas: eventIdeasChannel,
        eventPhotos: eventPhotosChannel,
        general: generalChannel,
        kotlinHelp: kotlinHelpChannel,
        android: androidChannel,
        multiplatform: multiplatformChannel,
        jobs: jobsChannel,
        talks: talksChannel,
        blogs: blogsChannel,
        code: codeChannel,
        projects: projectsChannel,
        learningResources: learningResourcesChannel,
        libraries: librariesChannel,
        tools: toolsChannel
      }
    };
  } catch (error) {
    console.error('Error setting up KUG Discord server:', error);
    throw new Error('Failed to set up KUG Discord server');
  }
}

/**
 * Create a webhook for event announcements
 * @param {string} channelId - Discord channel ID
 * @param {string} kugName - KUG name
 * @returns {Promise<Object>} - Created webhook
 */
async function createEventWebhook(channelId, kugName) {
  try {
    const webhook = await createWebhook(channelId, `${kugName} Events`);
    return webhook;
  } catch (error) {
    console.error('Error creating event webhook:', error);
    throw new Error('Failed to create event webhook');
  }
}

/**
 * Send an event announcement via webhook
 * @param {string} webhookUrl - Discord webhook URL
 * @param {Object} event - Event details
 * @returns {Promise<Object>} - Sent message
 */
async function announceEvent(webhookUrl, event) {
  try {
    const message = {
      username: event.kugName,
      avatar_url: event.kugLogo || 'https://kotlinlang.org/assets/images/favicon.svg',
      content: '📣 **New Event Announcement** 📣',
      embeds: [
        {
          title: event.title,
          description: event.description,
          color: 0x7F52FF, // Kotlin purple
          fields: [
            {
              name: '📅 Date',
              value: event.date,
              inline: true
            },
            {
              name: '⏰ Time',
              value: event.time,
              inline: true
            },
            {
              name: '📍 Location',
              value: event.location,
              inline: true
            },
            {
              name: '👥 Speakers',
              value: event.speakers || 'TBA',
              inline: false
            }
          ],
          thumbnail: {
            url: event.image || 'https://kotlinlang.org/assets/images/favicon.svg'
          },
          footer: {
            text: `Register on the KUG Platform: ${event.registrationUrl}`
          }
        }
      ]
    };
    
    return await sendWebhookMessage(webhookUrl, message);
  } catch (error) {
    console.error('Error announcing event:', error);
    throw new Error('Failed to announce event');
  }
}

/**
 * Track Kotlin-related messages in a Discord channel
 * @param {string} channelId - Discord channel ID
 * @returns {Promise<Object>} - Summary of Kotlin-related messages
 */
async function trackKotlinMessages(channelId) {
  try {
    // Get channel messages
    const messages = await getChannelMessages(channelId, 100);
    
    // Filter Kotlin-related messages
    const kotlinMessages = messages.filter(message => {
      const content = message.content.toLowerCase();
      return (
        content.includes('kotlin') ||
        content.includes('#kotlin') ||
        content.includes('kotlinlang') ||
        content.includes('kotlinconf')
      );
    });
    
    return {
      kotlin_messages: kotlinMessages,
      summary: {
        total_kotlin_messages: kotlinMessages.length,
        active_users: [...new Set(kotlinMessages.map(message => message.author.id))].length,
        most_active_user: kotlinMessages.length > 0 
          ? kotlinMessages
              .reduce((counts, message) => {
                counts[message.author.username] = (counts[message.author.username] || 0) + 1;
                return counts;
              }, {})
              .sort((a, b) => b[1] - a[1])[0]
          : null
      }
    };
  } catch (error) {
    console.error('Error tracking Kotlin Discord messages:', error);
    throw new Error('Failed to track Kotlin Discord messages');
  }
}

module.exports = {
  sendChannelMessage,
  getChannelMessages,
  createChannel,
  getGuildInfo,
  getGuildChannels,
  createWebhook,
  sendWebhookMessage,
  setupKUGDiscordServer,
  createEventWebhook,
  announceEvent,
  trackKotlinMessages
};
