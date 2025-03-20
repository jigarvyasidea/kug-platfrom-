# KUG Advocacy & Community Platform - API Integration Guide

This document provides comprehensive information for developers who want to integrate with the KUG Advocacy & Community Platform API.

## Table of Contents

1. [Introduction](#introduction)
2. [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
4. [Third-Party API Integrations](#third-party-api-integrations)
5. [Webhooks](#webhooks)
6. [Rate Limiting](#rate-limiting)
7. [Error Handling](#error-handling)
8. [Best Practices](#best-practices)
9. [Examples](#examples)

## Introduction

The KUG Advocacy & Community Platform provides a RESTful API that allows developers to integrate with the platform, access data, and extend functionality. This guide covers everything you need to know to successfully integrate with our API.

### Base URL

All API requests should be made to the following base URL:

```
https://api.kug-platform.com/api/v1
```

### Response Format

All API responses are returned in JSON format. A typical response structure looks like this:

```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "meta": {
    "pagination": {
      "total": 100,
      "per_page": 10,
      "current_page": 1,
      "last_page": 10
    }
  }
}
```

For error responses, the structure is:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      // Additional error details if available
    }
  }
}
```

## Authentication

### JWT Authentication

The API uses JSON Web Tokens (JWT) for authentication. To authenticate your requests, you need to include the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Obtaining a Token

To obtain a JWT token, you need to authenticate using the `/auth/login` endpoint:

```
POST /api/v1/auth/login
```

Request body:
```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "YOUR_JWT_TOKEN",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com",
      "role": "member"
    }
  }
}
```

### Token Expiration

JWT tokens expire after 24 hours. You need to request a new token after expiration.

### API Keys (For Service Integrations)

For service-to-service integrations, you can use API keys instead of JWT tokens. Contact the platform administrator to obtain an API key.

To use an API key, include it in the header:

```
X-API-Key: YOUR_API_KEY
```

## API Endpoints

### Users

#### Get Current User

```
GET /api/v1/auth/me
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "role": "member",
    "profile_picture": "https://example.com/profile.jpg",
    "bio": "Kotlin enthusiast",
    "location": "Bangalore, India",
    "github_username": "johndoe",
    "twitter_username": "johndoe",
    "linkedin_url": "https://linkedin.com/in/johndoe",
    "website": "https://johndoe.dev",
    "joined_at": "2023-01-15T00:00:00.000Z"
  }
}
```

#### Get User Profile

```
GET /api/v1/users/:id
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "profile_picture": "https://example.com/profile.jpg",
    "bio": "Kotlin enthusiast",
    "location": "Bangalore, India",
    "github_username": "johndoe",
    "twitter_username": "johndoe",
    "linkedin_url": "https://linkedin.com/in/johndoe",
    "website": "https://johndoe.dev",
    "joined_at": "2023-01-15T00:00:00.000Z",
    "kugs": [
      {
        "id": 1,
        "name": "KUG Bangalore",
        "role": "member"
      }
    ],
    "badges": [
      {
        "id": 1,
        "name": "First Contribution",
        "description": "Made your first contribution",
        "image_url": "https://example.com/badges/first-contribution.png",
        "awarded_at": "2023-03-10T00:00:00.000Z"
      }
    ],
    "total_points": 80
  }
}
```

#### Update User Profile

```
PUT /api/v1/users/:id
```

Request body:
```json
{
  "bio": "Updated bio",
  "location": "New Delhi, India",
  "github_username": "johndoe_updated",
  "twitter_username": "johndoe_updated",
  "linkedin_url": "https://linkedin.com/in/johndoe_updated",
  "website": "https://johndoe-updated.dev"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "bio": "Updated bio",
    "location": "New Delhi, India",
    "github_username": "johndoe_updated",
    "twitter_username": "johndoe_updated",
    "linkedin_url": "https://linkedin.com/in/johndoe_updated",
    "website": "https://johndoe-updated.dev"
  }
}
```

### KUGs

#### List All KUGs

```
GET /api/v1/kugs
```

Query parameters:
- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 10)
- `search`: Search term
- `country`: Filter by country

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "KUG Bangalore",
      "city": "Bangalore",
      "country": "India",
      "description": "Kotlin User Group in Bangalore",
      "logo_url": "https://example.com/logo.png",
      "member_count": 120
    },
    {
      "id": 2,
      "name": "KUG Delhi",
      "city": "Delhi",
      "country": "India",
      "description": "Kotlin User Group in Delhi",
      "logo_url": "https://example.com/logo2.png",
      "member_count": 85
    }
  ],
  "meta": {
    "pagination": {
      "total": 50,
      "per_page": 10,
      "current_page": 1,
      "last_page": 5
    }
  }
}
```

#### Get KUG Details

```
GET /api/v1/kugs/:id
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "KUG Bangalore",
    "city": "Bangalore",
    "country": "India",
    "description": "Kotlin User Group in Bangalore",
    "logo_url": "https://example.com/logo.png",
    "website": "https://kug-bangalore.org",
    "github_url": "https://github.com/kug-bangalore",
    "twitter_handle": "KUGBangalore",
    "discord_invite": "https://discord.gg/kugbangalore",
    "created_at": "2022-01-01T00:00:00.000Z",
    "member_count": 120,
    "upcoming_events_count": 3,
    "leads": [
      {
        "id": 1,
        "name": "John Doe",
        "profile_picture": "https://example.com/profile.jpg"
      }
    ]
  }
}
```

#### Create KUG (Admin Only)

```
POST /api/v1/kugs
```

Request body:
```json
{
  "name": "KUG Mumbai",
  "city": "Mumbai",
  "country": "India",
  "description": "Kotlin User Group in Mumbai",
  "logo_url": "https://example.com/logo3.png",
  "website": "https://kug-mumbai.org",
  "github_url": "https://github.com/kug-mumbai",
  "twitter_handle": "KUGMumbai",
  "discord_invite": "https://discord.gg/kugmumbai"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "KUG Mumbai",
    "city": "Mumbai",
    "country": "India",
    "description": "Kotlin User Group in Mumbai",
    "logo_url": "https://example.com/logo3.png",
    "website": "https://kug-mumbai.org",
    "github_url": "https://github.com/kug-mumbai",
    "twitter_handle": "KUGMumbai",
    "discord_invite": "https://discord.gg/kugmumbai",
    "created_at": "2023-03-19T00:00:00.000Z",
    "member_count": 0
  }
}
```

#### Update KUG (Admin or KUG Lead Only)

```
PUT /api/v1/kugs/:id
```

Request body:
```json
{
  "description": "Updated description for Kotlin User Group in Bangalore",
  "logo_url": "https://example.com/updated-logo.png",
  "website": "https://kug-bangalore-updated.org"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "KUG Bangalore",
    "description": "Updated description for Kotlin User Group in Bangalore",
    "logo_url": "https://example.com/updated-logo.png",
    "website": "https://kug-bangalore-updated.org"
  }
}
```

#### Get KUG Members

```
GET /api/v1/kugs/:id/members
```

Query parameters:
- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 10)
- `role`: Filter by role (lead, co-lead, member)

Response:
```json
{
  "success": true,
  "data": [
    {
      "user_id": 1,
      "name": "John Doe",
      "profile_picture": "https://example.com/profile.jpg",
      "role": "lead",
      "joined_at": "2022-01-01T00:00:00.000Z"
    },
    {
      "user_id": 2,
      "name": "Jane Smith",
      "profile_picture": "https://example.com/profile2.jpg",
      "role": "member",
      "joined_at": "2022-02-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "pagination": {
      "total": 120,
      "per_page": 10,
      "current_page": 1,
      "last_page": 12
    }
  }
}
```

#### Join KUG

```
POST /api/v1/kugs/:id/join
```

Response:
```json
{
  "success": true,
  "data": {
    "user_id": 1,
    "kug_id": 1,
    "role": "member",
    "joined_at": "2023-03-19T00:00:00.000Z"
  }
}
```

### Contributions

#### List Contributions

```
GET /api/v1/contributions
```

Query parameters:
- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 10)
- `type`: Filter by type (talk, blog, code, event)
- `status`: Filter by status (pending, approved, rejected)
- `kug_id`: Filter by KUG
- `user_id`: Filter by user

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "type": "talk",
      "title": "Introduction to Kotlin Coroutines",
      "description": "A deep dive into Kotlin Coroutines",
      "user_id": 1,
      "user_name": "John Doe",
      "kug_id": 1,
      "kug_name": "KUG Bangalore",
      "date": "2023-03-10T00:00:00.000Z",
      "points": 50,
      "status": "approved"
    },
    {
      "id": 2,
      "type": "blog",
      "title": "Kotlin Flow vs RxJava",
      "description": "Comparing Kotlin Flow with RxJava",
      "user_id": 2,
      "user_name": "Jane Smith",
      "kug_id": 2,
      "kug_name": "KUG Delhi",
      "date": "2023-04-15T00:00:00.000Z",
      "points": 30,
      "status": "approved"
    }
  ],
  "meta": {
    "pagination": {
      "total": 50,
      "per_page": 10,
      "current_page": 1,
      "last_page": 5
    }
  }
}
```

#### Get Contribution Details

```
GET /api/v1/contributions/:id
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "type": "talk",
    "title": "Introduction to Kotlin Coroutines",
    "description": "A deep dive into Kotlin Coroutines",
    "user_id": 1,
    "user_name": "John Doe",
    "kug_id": 1,
    "kug_name": "KUG Bangalore",
    "date": "2023-03-10T00:00:00.000Z",
    "url": "https://example.com/talk",
    "points": 50,
    "status": "approved",
    "approved_by": 2,
    "approved_at": "2023-03-12T00:00:00.000Z"
  }
}
```

#### Create Contribution

```
POST /api/v1/contributions
```

Request body:
```json
{
  "title": "Kotlin Multiplatform Library",
  "description": "A shared library for Android and iOS",
  "type": "code",
  "kug_id": 1,
  "date": "2023-05-20T00:00:00.000Z",
  "url": "https://github.com/user/repo"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 3,
    "type": "code",
    "title": "Kotlin Multiplatform Library",
    "description": "A shared library for Android and iOS",
    "user_id": 1,
    "kug_id": 1,
    "date": "2023-05-20T00:00:00.000Z",
    "url": "https://github.com/user/repo",
    "status": "pending"
  }
}
```

#### Approve Contribution (KUG Lead or Admin Only)

```
PUT /api/v1/contributions/:id/approve
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 3,
    "status": "approved",
    "approved_by": 1,
    "approved_at": "2023-05-22T00:00:00.000Z",
    "points": 40
  }
}
```

#### Reject Contribution (KUG Lead or Admin Only)

```
PUT /api/v1/contributions/:id/reject
```

Request body:
```json
{
  "reason": "Insufficient information provided"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 3,
    "status": "rejected",
    "rejected_by": 1,
    "rejected_at": "2023-05-22T00:00:00.000Z",
    "rejection_reason": "Insufficient information provided"
  }
}
```

### Events

#### List Events

```
GET /api/v1/events
```

Query parameters:
- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 10)
- `status`: Filter by status (upcoming, past, all)
- `kug_id`: Filter by KUG
- `type`: Filter by type (meetup, workshop, hackathon, conference)

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Kotlin Coroutines Workshop",
      "description": "Learn about Kotlin Coroutines in this hands-on workshop",
      "start_date": "2023-06-15T10:00:00.000Z",
      "end_date": "2023-06-15T13:00:00.000Z",
      "location": "Tech Hub, Bangalore",
      "is_online": false,
      "max_attendees": 50,
      "attendee_count": 35,
      "kug_id": 1,
      "kug_name": "KUG Bangalore",
      "banner_image": "https://example.com/event1.jpg",
      "status": "upcoming"
    },
    {
      "id": 2,
      "title": "Introduction to Kotlin Multiplatform",
      "description": "An introduction to Kotlin Multiplatform Mobile development",
      "start_date": "2023-07-20T14:00:00.000Z",
      "end_date": "2023-07-20T16:00:00.000Z",
      "location": "Online",
      "is_online": true,
      "meeting_link": "https://meet.google.com/abc-defg-hij",
      "max_attendees": 100,
      "attendee_count": 65,
      "kug_id": 2,
      "kug_name": "KUG Delhi",
      "banner_image": "https://example.com/event2.jpg",
      "status": "upcoming"
    }
  ],
  "meta": {
    "pagination": {
      "total": 20,
      "per_page": 10,
      "current_page": 1,
      "last_page": 2
    }
  }
}
```

#### Get Event Details

```
GET /api/v1/events/:id
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Kotlin Coroutines Workshop",
    "description": "Learn about Kotlin Coroutines in this hands-on workshop",
    "start_date": "2023-06-15T10:00:00.000Z",
    "end_date": "2023-06-15T13:00:00.000Z",
    "location": "Tech Hub, Bangalore",
    "is_online": false,
    "max_attendees": 50,
    "attendee_count": 35,
    "kug_id": 1,
    "kug_name": "KUG Bangalore",
    "banner_image": "https://example.com/event1.jpg",
    "status": "upcoming",
    "created_by": 1,
    "created_by_name": "John Doe",
    "agenda": [
      {
        "time": "10:00 AM",
        "title": "Introduction to Coroutines",
        "speaker": "John Doe"
      },
      {
        "time": "11:00 AM",
        "title": "Hands-on Workshop",
        "speaker": "Jane Smith"
      },
      {
        "time": "12:30 PM",
        "title": "Q&A Session",
        "speaker": "All Speakers"
      }
    ]
  }
}
```

#### Create Event (KUG Lead or Event Organizer Only)

```
POST /api/v1/events
```

Request body:
```json
{
  "title": "Kotlin 2.0 Features",
  "description": "Exploring the new features in Kotlin 2.0",
  "start_date": "2023-08-10T11:00:00.000Z",
  "end_date": "2023-08-10T13:00:00.000Z",
  "location": "Developer Space, Jaipur",
  "is_online": false,
  "max_attendees": 40,
  "kug_id": 3,
  "banner_image": "https://example.com/event3.jpg",
  "agenda": [
    {
      "time": "11:00 AM",
      "title": "Introduction to Kotlin 2.0",
      "speaker": "Bob Johnson"
    },
    {
      "time": "11:45 AM",
      "title": "Demo of New Features",
      "speaker": "Alice Williams"
    },
    {
      "time": "12:30 PM",
      "title": "Q&A Session",
      "speaker": "All Speakers"
    }
  ]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 3,
    "title": "Kotlin 2.0 Features",
    "description": "Exploring the new features in Kotlin 2.0",
    "start_date": "2023-08-10T11:00:00.000Z",
    "end_date": "2023-08-10T13:00:00.000Z",
    "location": "Developer Space, Jaipur",
    "is_online": false,
    "max_attendees": 40,
    "kug_id": 3,
    "banner_image": "https://example.com/event3.jpg",
    "status": "upcoming",
    "created_by": 1,
    "agenda": [
      {
        "time": "11:00 AM",
        "title": "Introduction to Kotlin 2.0",
        "speaker": "Bob Johnson"
      },
      {
        "time": "11:45 AM",
        "title": "Demo of New Features",
        "speaker": "Alice Williams"
      },
      {
        "time": "12:30 PM",
        "title": "Q&A Session",
        "speaker": "All Speakers"
      }
    ]
  }
}
```

#### Register for Event

```
POST /api/v1/events/:id/register
```

Response:
```json
{
  "success": true,
  "data": {
    "event_id": 1,
    "user_id": 1,
    "registered_at": "2023-03-19T00:00:00.000Z"
  }
}
```

#### Get Event Attendees (KUG Lead or Event Organizer Only)

```
GET /api/v1/events/:id/attendees
```

Query parameters:
- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 10)

Response:
```json
{
  "success": true,
  "data": [
    {
      "user_id": 1,
      "name": "John Doe",
      "profile_picture": "https://example.com/profile.jpg",
      "registered_at": "2023-03-01T00:00:00.000Z",
      "attended": true
    },
    {
      "user_id": 2,
      "name": "Jane Smith",
      "profile_picture": "https://example.com/profile2.jpg",
      "registered_at": "2023-03-05T00:00:00.000Z",
      "attended": false
    }
  ],
  "meta": {
    "pagination": {
      "total": 35,
      "per_page": 10,
      "current_page": 1,
      "last_page": 4
    }
  }
}
```

### Leaderboards

#### Global Leaderboard

```
GET /api/v1/leaderboards/global
```

Query parameters:
- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 10)

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "profile_picture": "https://example.com/profile.jpg",
      "total_points": 150,
      "contribution_count": 5,
      "talks": 2,
      "blogs": 1,
      "code": 2,
      "events": 0,
      "badge_count": 3
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "profile_picture": "https://example.com/profile2.jpg",
      "total_points": 120,
      "contribution_count": 4,
      "talks": 1,
      "blogs": 2,
      "code": 1,
      "events": 0,
      "badge_count": 2
    }
  ],
  "meta": {
    "pagination": {
      "total": 100,
      "per_page": 10,
      "current_page": 1,
      "last_page": 10
    }
  }
}
```

#### KUG Leaderboard

```
GET /api/v1/leaderboards/kug/:kugId
```

Query parameters:
- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 10)

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "profile_picture": "https://example.com/profile.jpg",
      "total_points": 100,
      "contribution_count": 3,
      "talks": 1,
      "blogs": 1,
      "code": 1,
      "events": 0,
      "badge_count": 2
    },
    {
      "id": 3,
      "name": "Bob Johnson",
      "profile_picture": "https://example.com/profile3.jpg",
      "total_points": 80,
      "contribution_count": 2,
      "talks": 1,
      "blogs": 0,
      "code": 1,
      "events": 0,
      "badge_count": 1
    }
  ],
  "meta": {
    "pagination": {
      "total": 50,
      "per_page": 10,
      "current_page": 1,
      "last_page": 5
    }
  }
}
```

#### Contribution Type Leaderboard

```
GET /api/v1/leaderboards/type/:type
```

Query parameters:
- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 10)

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "profile_picture": "https://example.com/profile.jpg",
      "total_points": 100,
      "contribution_count": 2
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "profile_picture": "https://example.com/profile2.jpg",
      "total_points": 50,
      "contribution_count": 1
    }
  ],
  "meta": {
    "pagination": {
      "total": 30,
      "per_page": 10,
      "current_page": 1,
      "last_page": 3
    }
  }
}
```

#### Monthly Leaderboard

```
GET /api/v1/leaderboards/monthly
```

Query parameters:
- `page`: Page number (default: 1)
- `per_page`: Items per page (default: 10)
- `month`: Month (1-12, default: current month)
- `year`: Year (default: current year)

Response:
```json
{
  "success": true,
  "data": {
    "month": 3,
    "year": 2023,
    "leaderboard": [
      {
        "id": 1,
        "name": "John Doe",
        "profile_picture": "https://example.com/profile.jpg",
        "total_points": 80,
        "contribution_count": 2
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "profile_picture": "https://example.com/profile2.jpg",
        "total_points": 60,
        "contribution_count": 2
      }
    ]
  },
  "meta": {
    "pagination": {
      "total": 20,
      "per_page": 10,
      "current_page": 1,
      "last_page": 2
    }
  }
}
```

#### User Ranking

```
GET /api/v1/leaderboards/user/:userId
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "profile_picture": "https://example.com/profile.jpg"
    },
    "global_ranking": {
      "rank": 1,
      "total_points": 150
    },
    "kug_rankings": [
      {
        "kug_id": 1,
        "kug_name": "KUG Bangalore",
        "rank": 1,
        "total_points": 100
      },
      {
        "kug_id": 2,
        "kug_name": "KUG Delhi",
        "rank": 2,
        "total_points": 50
      }
    ],
    "contribution_stats": {
      "total": 5,
      "talks": 2,
      "blogs": 1,
      "code": 2,
      "events": 0,
      "total_points": 150
    },
    "badges": [
      {
        "id": 1,
        "name": "First Contribution",
        "description": "Made your first contribution",
        "image_url": "https://example.com/badges/first-contribution.png",
        "kug_name": "KUG Bangalore",
        "awarded_at": "2023-03-10T00:00:00.000Z"
      },
      {
        "id": 2,
        "name": "Speaker",
        "description": "Gave 3+ talks",
        "image_url": "https://example.com/badges/speaker.png",
        "kug_name": "KUG Bangalore",
        "awarded_at": "2023-04-15T00:00:00.000Z"
      }
    ]
  }
}
```

## Third-Party API Integrations

The KUG Advocacy & Community Platform integrates with several third-party APIs to enhance functionality. This section explains how to use these integrations.

### GitHub Integration

The platform integrates with GitHub to track Kotlin repositories and contributions.

#### Get User GitHub Repositories

```
GET /api/v1/integrations/github/repositories
```

Query parameters:
- `username`: GitHub username (default: current user's GitHub username)
- `language`: Filter by language (default: kotlin)

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 123456789,
      "name": "kotlin-sample",
      "full_name": "johndoe/kotlin-sample",
      "description": "A sample Kotlin project",
      "html_url": "https://github.com/johndoe/kotlin-sample",
      "stars": 25,
      "forks": 10,
      "language": "Kotlin",
      "created_at": "2022-01-15T00:00:00.000Z",
      "updated_at": "2023-02-20T00:00:00.000Z"
    }
  ]
}
```

#### Import GitHub Repository as Contribution

```
POST /api/v1/integrations/github/import
```

Request body:
```json
{
  "repository_url": "https://github.com/johndoe/kotlin-sample",
  "kug_id": 1,
  "contribution_type": "code",
  "description": "A sample Kotlin project demonstrating best practices"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 4,
    "type": "code",
    "title": "kotlin-sample",
    "description": "A sample Kotlin project demonstrating best practices",
    "user_id": 1,
    "kug_id": 1,
    "date": "2023-03-19T00:00:00.000Z",
    "url": "https://github.com/johndoe/kotlin-sample",
    "status": "pending"
  }
}
```

### Twitter Integration

The platform integrates with Twitter to monitor Kotlin-related tweets.

#### Get User Tweets

```
GET /api/v1/integrations/twitter/tweets
```

Query parameters:
- `username`: Twitter username (default: current user's Twitter username)
- `count`: Number of tweets to return (default: 10)

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "1234567890123456789",
      "text": "Just published a new blog post about Kotlin Coroutines! #Kotlin #AndroidDev",
      "created_at": "2023-03-15T00:00:00.000Z",
      "url": "https://twitter.com/johndoe/status/1234567890123456789",
      "retweet_count": 5,
      "favorite_count": 10
    }
  ]
}
```

#### Import Tweet as Contribution

```
POST /api/v1/integrations/twitter/import
```

Request body:
```json
{
  "tweet_url": "https://twitter.com/johndoe/status/1234567890123456789",
  "kug_id": 1,
  "contribution_type": "blog",
  "description": "Shared knowledge about Kotlin Coroutines"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 5,
    "type": "blog",
    "title": "Twitter: Kotlin Coroutines",
    "description": "Shared knowledge about Kotlin Coroutines",
    "user_id": 1,
    "kug_id": 1,
    "date": "2023-03-19T00:00:00.000Z",
    "url": "https://twitter.com/johndoe/status/1234567890123456789",
    "status": "pending"
  }
}
```

### YouTube Integration

The platform integrates with YouTube to track Kotlin-related videos.

#### Get User Videos

```
GET /api/v1/integrations/youtube/videos
```

Query parameters:
- `channel_id`: YouTube channel ID (default: current user's linked channel)
- `count`: Number of videos to return (default: 10)
- `query`: Search query (default: kotlin)

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "abcdefghijk",
      "title": "Introduction to Kotlin Coroutines",
      "description": "A comprehensive guide to Kotlin Coroutines",
      "published_at": "2023-02-10T00:00:00.000Z",
      "thumbnail_url": "https://i.ytimg.com/vi/abcdefghijk/hqdefault.jpg",
      "view_count": 1500,
      "like_count": 120,
      "comment_count": 25,
      "url": "https://www.youtube.com/watch?v=abcdefghijk"
    }
  ]
}
```

#### Import YouTube Video as Contribution

```
POST /api/v1/integrations/youtube/import
```

Request body:
```json
{
  "video_url": "https://www.youtube.com/watch?v=abcdefghijk",
  "kug_id": 1,
  "contribution_type": "talk",
  "description": "A comprehensive guide to Kotlin Coroutines presented at KUG Bangalore"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 6,
    "type": "talk",
    "title": "Introduction to Kotlin Coroutines",
    "description": "A comprehensive guide to Kotlin Coroutines presented at KUG Bangalore",
    "user_id": 1,
    "kug_id": 1,
    "date": "2023-03-19T00:00:00.000Z",
    "url": "https://www.youtube.com/watch?v=abcdefghijk",
    "status": "pending"
  }
}
```

## Webhooks

The platform provides webhooks to notify external systems about events.

### Available Webhook Events

- `user.registered`: Triggered when a new user registers
- `user.joined_kug`: Triggered when a user joins a KUG
- `contribution.submitted`: Triggered when a contribution is submitted
- `contribution.approved`: Triggered when a contribution is approved
- `contribution.rejected`: Triggered when a contribution is rejected
- `event.created`: Triggered when an event is created
- `event.registered`: Triggered when a user registers for an event
- `badge.awarded`: Triggered when a badge is awarded to a user

### Registering a Webhook (Admin Only)

```
POST /api/v1/webhooks
```

Request body:
```json
{
  "url": "https://your-server.com/webhook",
  "events": ["contribution.approved", "event.created"],
  "secret": "your_webhook_secret"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "url": "https://your-server.com/webhook",
    "events": ["contribution.approved", "event.created"],
    "created_at": "2023-03-19T00:00:00.000Z"
  }
}
```

### Webhook Payload Format

```json
{
  "event": "contribution.approved",
  "timestamp": "2023-03-19T00:00:00.000Z",
  "data": {
    // Event-specific data
  },
  "signature": "HMAC-SHA256 signature"
}
```

### Verifying Webhook Signatures

Webhooks include a signature in the `X-KUG-Signature` header. To verify the signature:

1. Get the raw request body
2. Create an HMAC-SHA256 hash using your webhook secret
3. Compare the hash with the signature in the header

Example in Node.js:
```javascript
const crypto = require('crypto');

function verifyWebhookSignature(body, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(body).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(digest),
    Buffer.from(signature)
  );
}
```

## Rate Limiting

To ensure fair usage of the API, rate limiting is implemented:

- Standard users: 100 requests per minute
- Service accounts (with API key): 1000 requests per minute

Rate limit information is included in the response headers:

- `X-RateLimit-Limit`: Maximum number of requests allowed per minute
- `X-RateLimit-Remaining`: Number of requests remaining in the current window
- `X-RateLimit-Reset`: Time (in seconds) until the rate limit resets

When a rate limit is exceeded, the API returns a 429 Too Many Requests response.

## Error Handling

The API uses standard HTTP status codes to indicate success or failure:

- 200 OK: Request succeeded
- 201 Created: Resource created successfully
- 400 Bad Request: Invalid request parameters
- 401 Unauthorized: Authentication required
- 403 Forbidden: Insufficient permissions
- 404 Not Found: Resource not found
- 422 Unprocessable Entity: Validation error
- 429 Too Many Requests: Rate limit exceeded
- 500 Internal Server Error: Server error

Error responses include detailed information:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": {
      "title": ["Title is required"],
      "kug_id": ["Invalid KUG ID"]
    }
  }
}
```

## Best Practices

### Authentication

- Store JWT tokens securely
- Refresh tokens before they expire
- Use API keys for service-to-service integrations

### Performance

- Use pagination for large result sets
- Specify only the fields you need
- Cache responses when appropriate

### Error Handling

- Implement proper error handling in your client
- Respect rate limits
- Implement exponential backoff for retries

### Security

- Use HTTPS for all API requests
- Validate webhook signatures
- Keep API keys and secrets secure

## Examples

### Node.js Example

```javascript
const axios = require('axios');

const API_BASE_URL = 'https://api.kug-platform.com/api/v1';
const JWT_TOKEN = 'your_jwt_token';

async function getKUGs() {
  try {
    const response = await axios.get(`${API_BASE_URL}/kugs`, {
      headers: {
        'Authorization': `Bearer ${JWT_TOKEN}`
      }
    });
    
    return response.data.data;
  } catch (error) {
    console.error('Error fetching KUGs:', error.response?.data || error.message);
    throw error;
  }
}

async function submitContribution(contributionData) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/contributions`,
      contributionData,
      {
        headers: {
          'Authorization': `Bearer ${JWT_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.data;
  } catch (error) {
    console.error('Error submitting contribution:', error.response?.data || error.message);
    throw error;
  }
}
```

### Python Example

```python
import requests

API_BASE_URL = 'https://api.kug-platform.com/api/v1'
JWT_TOKEN = 'your_jwt_token'

def get_kugs():
    headers = {
        'Authorization': f'Bearer {JWT_TOKEN}'
    }
    
    response = requests.get(f'{API_BASE_URL}/kugs', headers=headers)
    response.raise_for_status()
    
    return response.json()['data']

def submit_contribution(contribution_data):
    headers = {
        'Authorization': f'Bearer {JWT_TOKEN}',
        'Content-Type': 'application/json'
    }
    
    response = requests.post(
        f'{API_BASE_URL}/contributions',
        json=contribution_data,
        headers=headers
    )
    response.raise_for_status()
    
    return response.json()['data']
```

### Webhook Handler Example (Node.js)

```javascript
const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
const WEBHOOK_SECRET = 'your_webhook_secret';

// Use raw body parser for webhook verification
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    }
  })
);

app.post('/webhook', (req, res) => {
  const signature = req.headers['x-kug-signature'];
  
  if (!signature) {
    return res.status(400).send('Missing signature');
  }
  
  // Verify signature
  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const digest = hmac.update(req.rawBody).digest('hex');
  
  if (digest !== signature) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process webhook event
  const event = req.body.event;
  const data = req.body.data;
  
  console.log(`Received webhook event: ${event}`);
  console.log('Data:', data);
  
  // Handle different event types
  switch (event) {
    case 'contribution.approved':
      // Handle contribution approval
      break;
    case 'event.created':
      // Handle event creation
      break;
    // Handle other events
  }
  
  res.status(200).send('Webhook received');
});

app.listen(3000, () => {
  console.log('Webhook server listening on port 3000');
});
```
