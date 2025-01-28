CREATE TABLE Users (
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hashed VARCHAR(255) NOT NULL,
    profile_picture_url TEXT,
    locations TEXT[] -- Array of locations (e.g., ['London', 'Hong Kong'])
);



CREATE TABLE Listings (
    id SERIAL PRIMARY KEY,
    creator_id INT REFERENCES Users(id) ON DELETE CASCADE,
    listing_name VARCHAR(255) NOT NULL,
    description TEXT,
    location TEXT 
    price TEXT 
    credentials_bullets TEXT[], -- Array of bullet points for credentials
    about_paragraph TEXT, -- Optional paragraph description
    tags TEXT[], -- 
    pictures_gallery TEXT[] -- array of urls
);

-- JSONB, -- Example: { "min": 50, "max": 100, "negotiable": true }
    -- Price range: One rate

CREATE TABLE Reviews {
    id SERIAL PRIMARY KEY NOT NULL,


    listingId INTEGER NOT NULL,
    FOREIGN KEY listingId REFERENCES Listing(id)
}

/* Relational system for tags  */

-- CREATE TABLE Listing {
--     id SERIAL PRIMARY KEY NOT NULL,
--     title VARCHAR(255) NOT NULL,
--     description TEXT,

--     location TEXT,
--     PRICE ????,

--     tags 
--     imageLink TEXT,
    



--     creatorId INTEGER NOT NULL,
--     FOREIGN KEY creatorId REFERENCES User(id)
-- }