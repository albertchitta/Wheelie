USE MASTER
GO

IF NOT EXISTS (
    SELECT [name]
    FROM sys.databases
    WHERE [name] = N'WheelieMVC'
)
CREATE DATABASE WheelieMVC
GO

USE WheelieMVC
GO

DROP TABLE IF EXISTS Biker;
DROP TABLE IF EXISTS Gear;
DROP TABLE IF EXISTS Bike;
DROP TABLE IF EXISTS Helmet;
DROP TABLE IF EXISTS Clothing;
DROP TABLE IF EXISTS Trail;

CREATE TABLE Biker (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
	FirebaseUserId NVARCHAR(28) NOT NULL,
	[Role] VARCHAR(255) NOT NULL,
	[Name] VARCHAR(255) NOT NULL,
	Email VARCHAR(255) NOT NULL,
	UserName VARCHAR(255) NOT NULL,
	[Level] VARCHAR(255) NOT NULL,
	[Location] VARCHAR(255) NOT NULL,
	ImageUrl VARCHAR(255) NOT NULL,
	Rides INTEGER NOT NULL,
	Distance DECIMAL(17, 2) NOT NULL

	CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
);

CREATE TABLE Bike (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
	Brand VARCHAR(255) NOT NULL,
	Color VARCHAR(255) NOT NULL,
	Accessories VARCHAR(255) NOT NULL
);

CREATE TABLE Helmet (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
	Brand VARCHAR(255) NOT NULL,
	Color VARCHAR(255) NOT NULL
);

CREATE TABLE Clothing (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
	Jersey VARCHAR(255) NOT NULL,
	Goggles VARCHAR(255) NOT NULL,
	Shoes VARCHAR(255) NOT NULL,
	Other VARCHAR(255) NOT NULL
);

CREATE TABLE Gear (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
	BikeId INTEGER NOT NULL,
	HelmetId INTEGER NOT NULL,
	ClothingId INTEGER NOT NULL,
	BikerId INTEGER NOT NULL

	CONSTRAINT FK_Gear_Bike FOREIGN KEY (BikeId) REFERENCES Bike(Id),
	CONSTRAINT FK_Gear_Helmet FOREIGN KEY (HelmetId) REFERENCES Helmet(Id),
	CONSTRAINT FK_Gear_Clothing FOREIGN KEY (ClothingId) REFERENCES Clothing(Id),
	CONSTRAINT FK_Gear_Biker FOREIGN KEY (BikerId) REFERENCES Biker(Id)
);

CREATE TABLE Trail (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
	BikerId INTEGER NOT NULL,
	ImageUrl VARCHAR(255) NOT NULL,
	[Name] VARCHAR(255) NOT NULL,
	[Location] VARCHAR(255) NOT NULL,
	Distance DECIMAL(17, 2) NOT NULL,
	Grade INTEGER NOT NULL

	CONSTRAINT FK_Trail_Biker FOREIGN KEY (BikerId) REFERENCES Biker(Id)
);

INSERT INTO Biker (FirebaseUserId, [Role], [Name], Email, UserName, [Level], [Location], ImageUrl, Rides, Distance) VALUES ('QHpKr8hc6Ab0P5eTqugiLrUgCTB3', 'admin', 'Albert', 'albert123@gmail.com', 'albert123', 'Beginner', 'Houston, TX', 'imageUrl', 5, 20);
INSERT INTO Biker (FirebaseUserId, [Role], [Name], Email, UserName, [Level], [Location], ImageUrl, Rides, Distance) VALUES ('aer76gLnNyQLEWa2C57PlzfKbmS2', 'user', 'Test123', 'test123@gmail.com', 'test123', 'Intermediate', 'Nashville, TN', 'imageUrl', 6, 30);
INSERT INTO Biker (FirebaseUserId, [Role], [Name], Email, UserName, [Level], [Location], ImageUrl, Rides, Distance) VALUES ('282DswOGLNedZg3JfHUTnM8lbnl1', 'user', 'Test456', 'test456@gmail.com', 'test456', 'Advanced', 'Atlanta, GA', 'imageUrl', 7, 40);