require('dotenv').config();
const { Octokit } = require('@octokit/rest');

// Initialize GitHub client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

/**
 * Get user profile from GitHub
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} - GitHub user profile
 */
async function getUserProfile(username) {
  try {
    const { data } = await octokit.users.getByUsername({
      username,
    });
    
    return {
      id: data.id,
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      bio: data.bio,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      created_at: data.created_at,
    };
  } catch (error) {
    console.error('Error fetching GitHub user profile:', error);
    throw new Error('Failed to fetch GitHub user profile');
  }
}

/**
 * Get user repositories from GitHub
 * @param {string} username - GitHub username
 * @param {number} per_page - Number of repositories per page
 * @param {number} page - Page number
 * @returns {Promise<Array>} - List of repositories
 */
async function getUserRepositories(username, per_page = 10, page = 1) {
  try {
    const { data } = await octokit.repos.listForUser({
      username,
      per_page,
      page,
      sort: 'updated',
      direction: 'desc',
    });
    
    return data.map(repo => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      html_url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      is_fork: repo.fork,
    }));
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    throw new Error('Failed to fetch GitHub repositories');
  }
}

/**
 * Get user contributions (commits) to a repository
 * @param {string} owner - Repository owner
 * @param {string} repo - Repository name
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} - List of commits
 */
async function getUserCommits(owner, repo, username) {
  try {
    const { data } = await octokit.repos.listCommits({
      owner,
      repo,
      author: username,
      per_page: 100,
    });
    
    return data.map(commit => ({
      sha: commit.sha,
      html_url: commit.html_url,
      message: commit.commit.message,
      author: {
        name: commit.commit.author.name,
        email: commit.commit.author.email,
        date: commit.commit.author.date,
      },
    }));
  } catch (error) {
    console.error('Error fetching GitHub commits:', error);
    throw new Error('Failed to fetch GitHub commits');
  }
}

/**
 * Get user pull requests
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} - List of pull requests
 */
async function getUserPullRequests(username) {
  try {
    const { data } = await octokit.search.issuesAndPullRequests({
      q: `author:${username} type:pr is:public`,
      per_page: 100,
    });
    
    return data.items.map(pr => ({
      id: pr.id,
      number: pr.number,
      title: pr.title,
      html_url: pr.html_url,
      state: pr.state,
      created_at: pr.created_at,
      updated_at: pr.updated_at,
      repository_url: pr.repository_url,
      user: {
        login: pr.user.login,
        avatar_url: pr.user.avatar_url,
      },
    }));
  } catch (error) {
    console.error('Error fetching GitHub pull requests:', error);
    throw new Error('Failed to fetch GitHub pull requests');
  }
}

/**
 * Search for Kotlin repositories
 * @param {string} query - Search query
 * @param {number} per_page - Number of repositories per page
 * @param {number} page - Page number
 * @returns {Promise<Array>} - List of repositories
 */
async function searchKotlinRepositories(query, per_page = 10, page = 1) {
  try {
    const { data } = await octokit.search.repos({
      q: `${query} language:kotlin`,
      per_page,
      page,
      sort: 'stars',
      order: 'desc',
    });
    
    return {
      total_count: data.total_count,
      items: data.items.map(repo => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        html_url: repo.html_url,
        description: repo.description,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        owner: {
          login: repo.owner.login,
          avatar_url: repo.owner.avatar_url,
        },
      })),
    };
  } catch (error) {
    console.error('Error searching Kotlin repositories:', error);
    throw new Error('Failed to search Kotlin repositories');
  }
}

/**
 * Track user's Kotlin contributions
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} - Summary of Kotlin contributions
 */
async function trackKotlinContributions(username) {
  try {
    // Get user's repositories
    const repositories = await getUserRepositories(username, 100);
    
    // Filter Kotlin repositories
    const kotlinRepos = repositories.filter(repo => 
      repo.language === 'Kotlin' || repo.name.toLowerCase().includes('kotlin')
    );
    
    // Get user's pull requests
    const pullRequests = await getUserPullRequests(username);
    
    // Extract repository names from pull request URLs
    const prRepoUrls = pullRequests.map(pr => {
      const repoUrl = pr.repository_url;
      const parts = repoUrl.split('/');
      return {
        owner: parts[parts.length - 2],
        repo: parts[parts.length - 1],
      };
    });
    
    // Check which PRs are for Kotlin repositories
    const kotlinPRs = [];
    for (const pr of pullRequests) {
      const repoUrl = pr.repository_url;
      const parts = repoUrl.split('/');
      const owner = parts[parts.length - 2];
      const repo = parts[parts.length - 1];
      
      try {
        const { data } = await octokit.repos.get({
          owner,
          repo,
        });
        
        if (data.language === 'Kotlin' || data.name.toLowerCase().includes('kotlin')) {
          kotlinPRs.push(pr);
        }
      } catch (error) {
        // Skip if repo not found or other error
        continue;
      }
    }
    
    return {
      kotlin_repositories: kotlinRepos,
      kotlin_pull_requests: kotlinPRs,
      summary: {
        total_kotlin_repos: kotlinRepos.length,
        total_kotlin_prs: kotlinPRs.length,
        total_stars: kotlinRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
        total_forks: kotlinRepos.reduce((sum, repo) => sum + repo.forks_count, 0),
      },
    };
  } catch (error) {
    console.error('Error tracking Kotlin contributions:', error);
    throw new Error('Failed to track Kotlin contributions');
  }
}

module.exports = {
  getUserProfile,
  getUserRepositories,
  getUserCommits,
  getUserPullRequests,
  searchKotlinRepositories,
  trackKotlinContributions,
};
