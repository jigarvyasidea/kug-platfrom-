-- Migration: 001_create_initial_tables.sql

-- Create Users Table
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

-- Create Roles Table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- Create KUGs Table
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

-- Create User Roles Table (Many-to-Many)
CREATE TABLE user_roles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    kug_id INTEGER REFERENCES kugs(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, role_id, kug_id)
);

-- Create KUG Members Table (Many-to-Many)
CREATE TABLE kug_members (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    kug_id INTEGER REFERENCES kugs(id) ON DELETE CASCADE,
    joined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, kug_id)
);

-- Create Events Table
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

-- Create Event Attendees Table (Many-to-Many)
CREATE TABLE event_attendees (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    rsvp_status VARCHAR(20) NOT NULL, -- confirmed, maybe, declined
    check_in_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(event_id, user_id)
);

-- Create Event Speakers Table
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

-- Insert Default Roles
INSERT INTO roles (name, description) VALUES 
('Platform Administrator', 'Overall system administrators with full access to all platform features'),
('KUG Lead', 'Leaders of specific city-based KUG chapters'),
('KUG Co-Lead', 'Assistant leaders who help manage KUG chapters'),
('Event Organizer', 'Members responsible for organizing specific events'),
('KUG Member', 'Regular members of KUG chapters'),
('Guest User', 'Unregistered users or visitors');
