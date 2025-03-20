# KUG Advocacy & Community Platform - API Endpoints

## Authentication Endpoints

### POST /api/auth/register
Register a new user
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

### POST /api/auth/login
Login a user
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### POST /api/auth/logout
Logout the current user

### GET /api/auth/me
Get the current authenticated user

### POST /api/auth/forgot-password
Request password reset
```json
{
  "email": "user@example.com"
}
```

### POST /api/auth/reset-password
Reset password with token
```json
{
  "token": "reset_token",
  "password": "new_password"
}
```

## User Endpoints

### GET /api/users
Get all users (with pagination and filtering)

### GET /api/users/:id
Get a specific user by ID

### PUT /api/users/:id
Update a user
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Kotlin developer",
  "location": "Bangalore",
  "githubUsername": "johndoe",
  "twitterUsername": "johndoe",
  "linkedinUsername": "johndoe",
  "mediumUsername": "johndoe",
  "devToUsername": "johndoe",
  "youtubeChannel": "johndoe"
}
```

### DELETE /api/users/:id
Delete a user

### GET /api/users/:id/contributions
Get all contributions by a user

### GET /api/users/:id/events
Get all events a user is attending

### GET /api/users/:id/badges
Get all badges earned by a user

### GET /api/users/:id/rewards
Get all rewards redeemed by a user

### GET /api/users/:id/kugs
Get all KUGs a user is a member of

## KUG Endpoints

### GET /api/kugs
Get all KUGs (with pagination and filtering)

### POST /api/kugs
Create a new KUG
```json
{
  "name": "KUG Bangalore",
  "city": "Bangalore",
  "country": "India",
  "description": "Kotlin User Group in Bangalore",
  "logoUrl": "https://example.com/logo.png",
  "foundedDate": "2023-01-15",
  "website": "https://kugbangalore.org",
  "meetupUrl": "https://meetup.com/kug-bangalore",
  "discordUrl": "https://discord.gg/kugbangalore",
  "githubUrl": "https://github.com/kug-bangalore"
}
```

### GET /api/kugs/:id
Get a specific KUG by ID

### PUT /api/kugs/:id
Update a KUG
```json
{
  "name": "KUG Bangalore",
  "description": "Updated description",
  "logoUrl": "https://example.com/new-logo.png"
}
```

### DELETE /api/kugs/:id
Delete a KUG

### GET /api/kugs/:id/members
Get all members of a KUG

### POST /api/kugs/:id/members
Add a member to a KUG
```json
{
  "userId": 123
}
```

### DELETE /api/kugs/:id/members/:userId
Remove a member from a KUG

### GET /api/kugs/:id/events
Get all events for a KUG

### GET /api/kugs/:id/contributions
Get all contributions for a KUG

### GET /api/kugs/:id/leaderboard
Get the leaderboard for a KUG

## Event Endpoints

### GET /api/events
Get all events (with pagination and filtering)

### POST /api/events
Create a new event
```json
{
  "title": "Kotlin Everywhere",
  "description": "A global Kotlin event",
  "eventType": "meetup",
  "startDate": "2025-04-15T18:00:00Z",
  "endDate": "2025-04-15T21:00:00Z",
  "location": "TechHub, Bangalore",
  "isVirtual": false,
  "virtualLink": "",
  "maxAttendees": 100,
  "kugId": 1
}
```

### GET /api/events/:id
Get a specific event by ID

### PUT /api/events/:id
Update an event
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "location": "New Location"
}
```

### DELETE /api/events/:id
Delete an event

### GET /api/events/:id/attendees
Get all attendees for an event

### POST /api/events/:id/attendees
Add an attendee to an event
```json
{
  "userId": 123,
  "rsvpStatus": "confirmed"
}
```

### PUT /api/events/:id/attendees/:userId
Update an attendee's RSVP status
```json
{
  "rsvpStatus": "confirmed"
}
```

### DELETE /api/events/:id/attendees/:userId
Remove an attendee from an event

### GET /api/events/:id/speakers
Get all speakers for an event

### POST /api/events/:id/speakers
Add a speaker to an event
```json
{
  "userId": 123,
  "talkTitle": "Introduction to Kotlin Coroutines",
  "talkDescription": "Learn about Kotlin Coroutines",
  "talkDuration": 45
}
```

### PUT /api/events/:id/speakers/:userId
Update a speaker's information
```json
{
  "talkTitle": "Updated Title",
  "talkDescription": "Updated description",
  "talkDuration": 60,
  "talkSlidesUrl": "https://example.com/slides.pdf",
  "talkVideoUrl": "https://youtube.com/watch?v=123"
}
```

### DELETE /api/events/:id/speakers/:userId
Remove a speaker from an event

## Contribution Endpoints

### GET /api/contributions
Get all contributions (with pagination and filtering)

### POST /api/contributions
Create a new contribution
```json
{
  "userId": 123,
  "kugId": 1,
  "contributionTypeId": 1,
  "title": "Introduction to Kotlin Coroutines",
  "description": "A talk about Kotlin Coroutines",
  "url": "https://example.com/talk",
  "contributionDate": "2025-01-22"
}
```

### GET /api/contributions/:id
Get a specific contribution by ID

### PUT /api/contributions/:id
Update a contribution
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "url": "https://example.com/updated-url"
}
```

### DELETE /api/contributions/:id
Delete a contribution

### PUT /api/contributions/:id/approve
Approve a contribution
```json
{
  "points": 50
}
```

### PUT /api/contributions/:id/reject
Reject a contribution
```json
{
  "reason": "Duplicate contribution"
}
```

### GET /api/contribution-types
Get all contribution types

### POST /api/contribution-types
Create a new contribution type
```json
{
  "name": "Talk",
  "description": "Speaking at an event",
  "points": 50,
  "icon": "microphone"
}
```

## Badge Endpoints

### GET /api/badges
Get all badges

### POST /api/badges
Create a new badge
```json
{
  "name": "Speaker",
  "description": "Given 5 talks",
  "icon": "badge-speaker.png",
  "requirementType": "contributions",
  "requirementValue": 5
}
```

### GET /api/badges/:id
Get a specific badge by ID

### PUT /api/badges/:id
Update a badge
```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "requirementValue": 10
}
```

### DELETE /api/badges/:id
Delete a badge

## Reward Endpoints

### GET /api/rewards
Get all rewards

### POST /api/rewards
Create a new reward
```json
{
  "name": "KotlinConf Ticket",
  "description": "Free ticket to KotlinConf",
  "imageUrl": "https://example.com/ticket.png",
  "pointsCost": 1000,
  "quantityAvailable": 5,
  "isActive": true
}
```

### GET /api/rewards/:id
Get a specific reward by ID

### PUT /api/rewards/:id
Update a reward
```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "pointsCost": 1200
}
```

### DELETE /api/rewards/:id
Delete a reward

### POST /api/rewards/:id/redeem
Redeem a reward
```json
{
  "userId": 123
}
```

### PUT /api/user-rewards/:id/fulfill
Fulfill a redeemed reward
```json
{
  "notes": "Ticket sent via email"
}
```

## Leaderboard Endpoints

### GET /api/leaderboards/global
Get the global leaderboard

### GET /api/leaderboards/kug/:kugId
Get the leaderboard for a specific KUG

## Notification Endpoints

### GET /api/notifications
Get all notifications for the current user

### PUT /api/notifications/:id/read
Mark a notification as read

### PUT /api/notifications/read-all
Mark all notifications as read

## Admin Endpoints

### GET /api/admin/stats
Get platform statistics

### GET /api/admin/activity-logs
Get activity logs

### POST /api/admin/roles
Assign a role to a user
```json
{
  "userId": 123,
  "roleId": 2,
  "kugId": 1
}
```

### DELETE /api/admin/roles
Remove a role from a user
```json
{
  "userId": 123,
  "roleId": 2,
  "kugId": 1
}
```
