CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    nickname VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT password_length_check CHECK (char_length(password) >= 8)
);

CREATE TABLE saved_structures (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    structure_name VARCHAR(255) NOT NULL,
    structure_color VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE structure_layouts (
    id SERIAL PRIMARY KEY,
    structure_id INTEGER NOT NULL,
    level_value VARCHAR(255) NOT NULL,
    blind_value VARCHAR(255) NOT NULL,
    level_interval INTEGER NOT NULL,
    FOREIGN KEY (structure_id) REFERENCES saved_structures(id)
);
