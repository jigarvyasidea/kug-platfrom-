# KUG Advocacy & Community Platform - Database Schema

## Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    bio TEXT,
    location VARCHAR(100),
    github_username VARCHAR(100),
    twitter_username VARCHAR(100),
    linkedin_username VARCHAR(100),
    medium_username VARCHAR(100),
    dev_to_username VARCHAR(100),
    youtube_channel VARCHAR(100),
    total_points INTEGER DEFAULT 0,
    level VARCHAR(50) DEFAULT 'Beginner',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Roles Table
```sql
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);
```

## User Roles Table (Many-to-Many)
```sql
CREATE TABLE user_roles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    kug_id INTEGER REFERENCES kugs(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, role_id, kug_id)
);
```

## KUGs (Kotlin User Groups) Table
```sql
CREATE TABLE kugs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    description TEXT,
    logo_url VARCHAR(255),
    founded_date DATE,
    website VARCHAR(255),
    meetup_url VARCHAR(255),
    discord_url VARCHAR(255),
    github_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(city, country)
);
```

## KUG Members Table (Many-to-Many)
```sql
CREATE TABLE kug_members (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    kug_id INTEGER REFERENCES kugs(id) ON DELETE CASCADE,
    joined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, kug_id)
);
```

## Events Table
```sql
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_type VARCHAR(50) NOT NULL, -- meetup, hackathon, conference, etc.
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    location VARCHAR(255),
    is_virtual BOOLEAN DEFAULT FALSE,
    virtual_link VARCHAR(255),
    max_attendees INTEGER,
    kug_id INTEGER REFERENCES kugs(id) ON DELETE CASCADE,
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Event Attendees Table (Many-to-Many)
```sql
CREATE TABLE event_attendees (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    rsvp_status VARCHAR(20) NOT NULL, -- confirmed, maybe, declined
    check_in_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(event_id, user_id)
);
```

## Event Speakers Table
```sql
CREATE TABLE event_speakers (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    talk_title VARCHAR(255) NOT NULL,
    talk_description TEXT,
    talk_duration INTEGER, -- in minutes
    talk_slides_url VARCHAR(255),
    talk_video_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(event_id, user_id, talk_title)
);
```

## Contribution Types Table
```sql
CREATE TABLE contribution_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    points INTEGER NOT NULL, -- base points for this type
    icon VARCHAR(100)
);
```

## Contributions Table
```sql
CREATE TABLE contributions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    kug_id INTEGER REFERENCES kugs(id) ON DELETE CASCADE,
    contribution_type_id INTEGER REFERENCES contribution_types(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(255),
    contribution_date DATE NOT NULL,
    points INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
    approved_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Badges Table
```sql
CREATE TABLE badges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(255) NOT NULL,
    requirement_type VARCHAR(50) NOT NULL, -- points, contributions, events, etc.
    requirement_value INTEGER NOT NULL, -- threshold value to earn badge
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## User Badges Table (Many-to-Many)
```sql
CREATE TABLE user_badges (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    badge_id INTEGER REFERENCES badges(id) ON DELETE CASCADE,
    earned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_id)
);
```

## Rewards Table
```sql
CREATE TABLE rewards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    points_cost INTEGER NOT NULL,
    quantity_available INTEGER DEFAULT -1, -- -1 for unlimited
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## User Rewards Table (Many-to-Many)
```sql
CREATE TABLE user_rewards (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    reward_id INTEGER REFERENCES rewards(id) ON DELETE CASCADE,
    redeemed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending', -- pending, fulfilled, cancelled
    fulfilled_at TIMESTAMP,
    notes TEXT
);
```

## Notifications Table
```sql
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Activity Log Table
```sql
CREATE TABLE activity_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    kug_id INTEGER REFERENCES kugs(id) ON DELETE SET NULL,
    activity_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    entity_type VARCHAR(50), -- user, kug, event, contribution, etc.
    entity_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
