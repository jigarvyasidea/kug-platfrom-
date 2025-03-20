-- Migration: 002_create_contribution_tables.sql

-- Create Contribution Types Table
CREATE TABLE contribution_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    points INTEGER NOT NULL, -- base points for this type
    icon VARCHAR(100)
);

-- Create Contributions Table
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

-- Insert Default Contribution Types
INSERT INTO contribution_types (name, description, points, icon) VALUES 
('Talk', 'Speaking at an event or meetup', 50, 'microphone'),
('Blog', 'Writing a blog post about Kotlin', 30, 'pencil'),
('Code', 'Contributing to Kotlin open source projects', 40, 'code'),
('Event', 'Organizing a Kotlin event', 60, 'calendar'),
('Tutorial', 'Creating a Kotlin tutorial or course', 45, 'book'),
('Video', 'Creating a Kotlin video tutorial', 50, 'video'),
('Mentoring', 'Mentoring other Kotlin developers', 35, 'users');
