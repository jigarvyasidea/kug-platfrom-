-- Migration: 003_create_gamification_tables.sql

-- Create Badges Table
CREATE TABLE badges (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(255) NOT NULL,
    requirement_type VARCHAR(50) NOT NULL, -- points, contributions, events, etc.
    requirement_value INTEGER NOT NULL, -- threshold value to earn badge
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create User Badges Table (Many-to-Many)
CREATE TABLE user_badges (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    badge_id INTEGER REFERENCES badges(id) ON DELETE CASCADE,
    earned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, badge_id)
);

-- Create Rewards Table
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

-- Create User Rewards Table (Many-to-Many)
CREATE TABLE user_rewards (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    reward_id INTEGER REFERENCES rewards(id) ON DELETE CASCADE,
    redeemed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending', -- pending, fulfilled, cancelled
    fulfilled_at TIMESTAMP,
    notes TEXT
);

-- Insert Default Badges
INSERT INTO badges (name, description, icon, requirement_type, requirement_value) VALUES 
('Kotlin Beginner', 'Earned 100 points', 'badge-beginner.png', 'points', 100),
('Kotlin Intermediate', 'Earned 500 points', 'badge-intermediate.png', 'points', 500),
('Kotlin Expert', 'Earned 1000 points', 'badge-expert.png', 'points', 1000),
('Kotlin Master', 'Earned 2000 points', 'badge-master.png', 'points', 2000),
('Speaker', 'Given 5 talks', 'badge-speaker.png', 'contributions', 5),
('Writer', 'Written 5 blog posts', 'badge-writer.png', 'contributions', 5),
('Coder', 'Contributed to 5 code projects', 'badge-coder.png', 'contributions', 5),
('Organizer', 'Organized 3 events', 'badge-organizer.png', 'contributions', 3),
('Community Builder', 'Attended 10 events', 'badge-community.png', 'events', 10);
