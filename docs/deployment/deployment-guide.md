# KUG Advocacy & Community Platform - Deployment Guide

This document provides comprehensive instructions for deploying the KUG Advocacy & Community Platform in various environments.

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Backend Deployment](#backend-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Third-Party API Configuration](#third-party-api-configuration)
7. [Monitoring and Maintenance](#monitoring-and-maintenance)
8. [Troubleshooting](#troubleshooting)

## System Requirements

### Production Environment

#### Hardware Requirements
- **CPU**: Minimum 2 vCPUs, recommended 4 vCPUs
- **RAM**: Minimum 4GB, recommended 8GB
- **Storage**: Minimum 20GB SSD, recommended 40GB SSD
- **Network**: Stable internet connection with minimum 10Mbps upload/download

#### Software Requirements
- **Operating System**: Ubuntu 20.04 LTS or newer
- **Node.js**: v16.x or newer
- **PostgreSQL**: v13.x or newer
- **Nginx**: v1.18.0 or newer (for reverse proxy)
- **SSL Certificate**: Valid SSL certificate for secure HTTPS connections

### Development Environment

#### Hardware Requirements
- **CPU**: Minimum 2 cores
- **RAM**: Minimum 4GB
- **Storage**: Minimum 10GB available space

#### Software Requirements
- **Operating System**: Any OS that supports Node.js (Windows, macOS, Linux)
- **Node.js**: v16.x or newer
- **PostgreSQL**: v13.x or newer
- **Git**: v2.x or newer
- **npm**: v7.x or newer

## Environment Setup

### Setting Up Production Environment

1. **Update System Packages**
   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt install -y nodejs
   ```

3. **Install PostgreSQL**
   ```bash
   sudo apt install -y postgresql postgresql-contrib
   ```

4. **Install Nginx**
   ```bash
   sudo apt install -y nginx
   ```

5. **Install PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   ```

6. **Configure Firewall**
   ```bash
   sudo ufw allow 'Nginx Full'
   sudo ufw allow ssh
   sudo ufw enable
   ```

### Setting Up Development Environment

1. **Install Node.js**
   - Download and install from [nodejs.org](https://nodejs.org/)

2. **Install PostgreSQL**
   - Download and install from [postgresql.org](https://www.postgresql.org/download/)

3. **Install Git**
   - Download and install from [git-scm.com](https://git-scm.com/downloads)

4. **Clone Repository**
   ```bash
   git clone https://github.com/your-organization/kug-platform.git
   cd kug-platform
   ```

## Database Setup

### Production Database Setup

1. **Create Database User and Database**
   ```bash
   sudo -u postgres psql
   ```

   ```sql
   CREATE USER kug_admin WITH PASSWORD 'secure_password';
   CREATE DATABASE kug_platform;
   GRANT ALL PRIVILEGES ON DATABASE kug_platform TO kug_admin;
   \q
   ```

2. **Run Database Migrations**
   ```bash
   cd /path/to/kug-platform/backend
   npm run migrate
   ```

### Development Database Setup

1. **Create Database User and Database**
   - Use pgAdmin or command line to create a database named `kug_platform_dev`
   - Create a user with appropriate permissions

2. **Run Database Migrations**
   ```bash
   cd /path/to/kug-platform/backend
   npm run migrate:dev
   ```

## Backend Deployment

### Production Deployment

1. **Clone Repository**
   ```bash
   git clone https://github.com/your-organization/kug-platform.git
   cd kug-platform/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install --production
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   nano .env
   ```
   
   Update the following variables:
   ```
   PORT=5000
   NODE_ENV=production
   DATABASE_URL=postgres://kug_admin:secure_password@localhost:5432/kug_platform
   JWT_SECRET=your_secure_jwt_secret
   
   # API Keys
   GITHUB_TOKEN=your_github_token
   TWITTER_API_KEY=your_twitter_api_key
   TWITTER_API_SECRET=your_twitter_api_secret
   TWITTER_ACCESS_TOKEN=your_twitter_access_token
   TWITTER_ACCESS_SECRET=your_twitter_access_secret
   YOUTUBE_API_KEY=your_youtube_api_key
   YOUTUBE_CLIENT_ID=your_youtube_client_id
   YOUTUBE_CLIENT_SECRET=your_youtube_client_secret
   LINKEDIN_CLIENT_ID=your_linkedin_client_id
   LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
   DISCORD_BOT_TOKEN=your_discord_bot_token
   ```

4. **Start Backend with PM2**
   ```bash
   pm2 start src/index.js --name kug-backend
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx as Reverse Proxy**
   ```bash
   sudo nano /etc/nginx/sites-available/kug-backend
   ```
   
   Add the following configuration:
   ```nginx
   server {
       listen 80;
       server_name api.kug-platform.com;
   
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Enable Site and Restart Nginx**
   ```bash
   sudo ln -s /etc/nginx/sites-available/kug-backend /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **Set Up SSL with Let's Encrypt**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d api.kug-platform.com
   ```

### Development Deployment

1. **Install Dependencies**
   ```bash
   cd /path/to/kug-platform/backend
   npm install
   ```

2. **Configure Environment Variables**
   ```bash
   cp .env.example .env.development
   ```
   
   Update the variables for your development environment.

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Frontend Deployment

### Production Deployment

1. **Navigate to Frontend Directory**
   ```bash
   cd /path/to/kug-platform/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.example .env.production
   nano .env.production
   ```
   
   Update the following variables:
   ```
   NEXT_PUBLIC_API_URL=https://api.kug-platform.com
   NEXT_PUBLIC_SITE_URL=https://kug-platform.com
   ```

4. **Build the Application**
   ```bash
   npm run build
   ```

5. **Configure Nginx for Frontend**
   ```bash
   sudo nano /etc/nginx/sites-available/kug-frontend
   ```
   
   Add the following configuration:
   ```nginx
   server {
       listen 80;
       server_name kug-platform.com www.kug-platform.com;
   
       root /path/to/kug-platform/frontend/out;
       index index.html;
   
       location / {
           try_files $uri $uri.html $uri/ =404;
       }
   }
   ```

6. **Enable Site and Restart Nginx**
   ```bash
   sudo ln -s /etc/nginx/sites-available/kug-frontend /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **Set Up SSL with Let's Encrypt**
   ```bash
   sudo certbot --nginx -d kug-platform.com -d www.kug-platform.com
   ```

### Development Deployment

1. **Install Dependencies**
   ```bash
   cd /path/to/kug-platform/frontend
   npm install
   ```

2. **Configure Environment Variables**
   ```bash
   cp .env.example .env.development
   ```
   
   Update the variables for your development environment.

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Third-Party API Configuration

### GitHub API
1. Create a GitHub OAuth App at https://github.com/settings/developers
2. Generate a Personal Access Token with appropriate permissions
3. Add the token to your environment variables as `GITHUB_TOKEN`

### Twitter API
1. Create a Twitter Developer Account at https://developer.twitter.com/
2. Create a new Project and App
3. Generate API keys and access tokens
4. Add the credentials to your environment variables

### YouTube API
1. Create a project in Google Cloud Console
2. Enable the YouTube Data API v3
3. Create API credentials (API Key and OAuth 2.0 Client)
4. Add the credentials to your environment variables

### LinkedIn API
1. Create a LinkedIn Developer Account
2. Create a new App
3. Configure OAuth 2.0 settings
4. Add the client ID and secret to your environment variables

### Discord API
1. Create a Discord Developer Account
2. Create a new Application and Bot
3. Generate a Bot Token
4. Add the token to your environment variables as `DISCORD_BOT_TOKEN`

## Monitoring and Maintenance

### Monitoring

1. **Set Up PM2 Monitoring**
   ```bash
   pm2 install pm2-logrotate
   pm2 set pm2-logrotate:max_size 10M
   pm2 set pm2-logrotate:retain 7
   ```

2. **Configure Nginx Logs**
   ```bash
   sudo nano /etc/nginx/nginx.conf
   ```
   
   Ensure proper logging is configured.

3. **Set Up Database Backups**
   ```bash
   sudo nano /etc/cron.daily/backup-kug-db
   ```
   
   Add the following script:
   ```bash
   #!/bin/bash
   BACKUP_DIR="/var/backups/postgresql"
   mkdir -p $BACKUP_DIR
   TIMESTAMP=$(date +%Y%m%d_%H%M%S)
   sudo -u postgres pg_dump kug_platform > $BACKUP_DIR/kug_platform_$TIMESTAMP.sql
   find $BACKUP_DIR -type f -mtime +7 -delete
   ```
   
   Make it executable:
   ```bash
   sudo chmod +x /etc/cron.daily/backup-kug-db
   ```

### Maintenance

1. **Regular Updates**
   ```bash
   # Update system packages
   sudo apt update
   sudo apt upgrade -y
   
   # Update Node.js packages
   cd /path/to/kug-platform/backend
   npm update
   
   cd /path/to/kug-platform/frontend
   npm update
   ```

2. **Database Maintenance**
   ```bash
   sudo -u postgres psql -d kug_platform -c "VACUUM ANALYZE;"
   ```

3. **SSL Certificate Renewal**
   Let's Encrypt certificates auto-renew, but verify the renewal process:
   ```bash
   sudo certbot renew --dry-run
   ```

## Troubleshooting

### Common Issues and Solutions

1. **Backend Service Not Starting**
   - Check logs: `pm2 logs kug-backend`
   - Verify environment variables: `cat .env`
   - Check database connection: `psql -U kug_admin -h localhost -d kug_platform`

2. **Database Connection Issues**
   - Verify PostgreSQL is running: `sudo systemctl status postgresql`
   - Check database credentials in `.env` file
   - Ensure database user has proper permissions

3. **Nginx Configuration Issues**
   - Test configuration: `sudo nginx -t`
   - Check logs: `sudo tail -f /var/log/nginx/error.log`

4. **SSL Certificate Issues**
   - Renew certificates: `sudo certbot renew`
   - Check certificate status: `sudo certbot certificates`

5. **API Integration Issues**
   - Verify API keys in environment variables
   - Check API request logs
   - Test API endpoints with Postman or curl

For additional support, please contact the development team or refer to the project's GitHub repository.
