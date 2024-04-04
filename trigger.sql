CREATE OR ALTER TRIGGER update_user
ON social_user
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE social_user SET last_update = GETDATE()
    FROM inserted
    WHERE social_user.id = inserted.id;
END
GO