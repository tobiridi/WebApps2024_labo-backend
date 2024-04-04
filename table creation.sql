DROP TABLE message, follow_user, publication, commentary, social_user;
GO

CREATE TABLE social_user(
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    createAt DATE DEFAULT GETDATE(),
    email NVARCHAR(100) UNIQUE NOT NULL,
    password NVARCHAR(200) NOT NULL,
    firstname NVARCHAR(100),
    lastname NVARCHAR(100),
    profile_img IMAGE,
    last_update DATE DEFAULT GETDATE()
);

/* TODO: use later with socket.io */
-- CREATE TABLE message(
--     id bigint primary key identity(1,1),
--     createAt datetime default GETDATE(),
--     content nvarchar(500) not null,
--     id_user uniqueidentifier not null,

--     CONSTRAINT FK_message_user FOREIGN KEY (id_user) REFERENCES social_user (id) ON DELETE CASCADE
-- );

CREATE TABLE follow_user(
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    id_follower UNIQUEIDENTIFIER NOT NULL,
    id_followed UNIQUEIDENTIFIER NOT NULL,

    CONSTRAINT FK_follow_user_follower FOREIGN KEY (id_follower) REFERENCES social_user (id) ON DELETE CASCADE,
    CONSTRAINT FK_follow_user_followed FOREIGN KEY (id_followed) REFERENCES social_user (id) ON DELETE NO ACTION
);

CREATE TABLE publication(
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    createAt DATETIME DEFAULT GETDATE(),
    title NVARCHAR(50) NOT NULL,
    content NVARCHAR(500) NOT NULL,
    id_user UNIQUEIDENTIFIER NOT NULL,

    CONSTRAINT FK_publication_user FOREIGN KEY (id_user) REFERENCES social_user (id) ON DELETE NO ACTION
);

CREATE TABLE commentary(
    id BIGINT PRIMARY KEY IDENTITY(1,1),
    createAt DATETIME DEFAULT GETDATE(),
    content NVARCHAR(500) NOT NULL,
    id_user UNIQUEIDENTIFIER NOT NULL,
    id_publication BIGINT NOT NULL,

    CONSTRAINT FK_commentary_user FOREIGN KEY (id_user) REFERENCES social_user (id) ON DELETE NO ACTION,
    CONSTRAINT FK_commentary_publication FOREIGN KEY (id_publication) REFERENCES publication (id) ON DELETE CASCADE
);
GO

SELECT * FROM social_user;
SELECT * FROM message;
SELECT * FROM follow_user;
SELECT * FROM publication;
SELECT * FROM commentary;
GO