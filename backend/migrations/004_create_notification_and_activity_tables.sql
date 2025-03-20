-- Migration: 004_create_notification_and_activity_tables.sql

-- Create Notifications Table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    link VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Activity Log Table
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

-- Create indexes for better performance
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_kug_id ON activity_logs(kug_id);
CREATE INDEX idx_contributions_user_id ON contributions(user_id);
CREATE INDEX idx_contributions_kug_id ON contributions(kug_id);
CREATE INDEX idx_events_kug_id ON events(kug_id);
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_kug_id ON user_roles(kug_id);
CREATE INDEX idx_kug_members_user_id ON kug_members(user_id);
CREATE INDEX idx_kug_members_kug_id ON kug_members(kug_id);
