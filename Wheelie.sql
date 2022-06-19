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

	CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
);

CREATE TABLE Bike (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
	BikerId INTEGER NOT NULL,
	ImageUrl VARCHAR(255) NOT NULL,
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
	BikerId INTEGER NOT NULL,
	Jersey VARCHAR(255) NOT NULL,
	Goggles VARCHAR(255) NOT NULL,
	Shoes VARCHAR(255) NOT NULL,
	Helmet VARCHAR(255) NOT NULL,
	Other VARCHAR(255) NOT NULL
);

CREATE TABLE Trail (
	Id INTEGER NOT NULL PRIMARY KEY IDENTITY,
	BikerId INTEGER NOT NULL,
	ImageUrl VARCHAR(255) NOT NULL,
	[Name] VARCHAR(255) NOT NULL,
	[Location] VARCHAR(255) NOT NULL,
	Distance DECIMAL(17, 2) NOT NULL,
	Grade INTEGER NOT NULL,
	[Time] Decimal (17, 2) NOT NULL
);

INSERT INTO Biker (FirebaseUserId, [Role], [Name], Email, UserName, [Level], [Location], ImageUrl) VALUES ('QHpKr8hc6Ab0P5eTqugiLrUgCTB3', 'admin', 'Albert', 'albert123@gmail.com', 'albert123', 'Beginner', 'Houston, TX', 'imageUrl');
INSERT INTO Biker (FirebaseUserId, [Role], [Name], Email, UserName, [Level], [Location], ImageUrl) VALUES ('aer76gLnNyQLEWa2C57PlzfKbmS2', 'user', 'Test123', 'test123@gmail.com', 'test123', 'Intermediate', 'Nashville, TN', 'imageUrl');
INSERT INTO Biker (FirebaseUserId, [Role], [Name], Email, UserName, [Level], [Location], ImageUrl) VALUES ('282DswOGLNedZg3JfHUTnM8lbnl1', 'user', 'Test456', 'test456@gmail.com', 'test456', 'Advanced', 'Atlanta, GA', 'imageUrl');

INSERT INTO Trail (BikerId, ImageUrl, [Name], [Location], Distance, Grade, [Time]) VALUES (0, 'https://cloudfront.traillink.com/photos/buffalo-bayou-trail_192393_sc.jpg', 'Buffalo Bayou Loop', 'Houston, TX', 4.8, 0.0, 1);
INSERT INTO Trail (BikerId, ImageUrl, [Name], [Location], Distance, Grade, [Time]) VALUES (0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDdS91qJpPBDrUaOgB8-06kC-uLF-XHPbTWg&usqp=CAU', 'The Quail Trail  from Sam Houston Tollway', 'Houston, TX', 11.7, 0.1, 1.5);
INSERT INTO Trail (BikerId, ImageUrl, [Name], [Location], Distance, Grade, [Time]) VALUES (0, 'https://cloudfront.traillink.com/photos/buffalo-bayou-trail_173452_sc.jpg', 'Buffalo Bayou: Blue Lagoon Trail', 'Houston, TX', 2.1, 0.0, 2);
INSERT INTO Trail (BikerId, ImageUrl, [Name], [Location], Distance, Grade, [Time]) VALUES (0, 'https://images.theoutbound.com/2021/02/22/23/d1279be876a369c18fb282c6b4bc6bcf?w=1200&h=630&fit=crop&dpr=1&q=60&s=eee5fb2f7943f8edac15abc7af03e3ca', 'Cullen Park Hike and Bike Trail', 'Houston, TX', 8.0, 0.1, 2.5);
INSERT INTO Trail (BikerId, ImageUrl, [Name], [Location], Distance, Grade, [Time]) VALUES (0, 'https://images.theoutbound.com/2021/02/22/23/d1279be876a369c18fb282c6b4bc6bcf?w=300&h=220&fit=crop&q=60&s=2b722b18f1fcabd39511a7bed39b03fa&h=80&w=80&fit=crop&dpr=2', 'Quail Trail via Mockingbird Trail', 'Houston, TX', 13.2, 0.0, 3);
INSERT INTO Trail (BikerId, ImageUrl, [Name], [Location], Distance, Grade, [Time]) VALUES (0, 'https://365thingsinhouston.com/wp-content/uploads/2022/04/running-jogging-trails-parks-greater-houston-kickerillo-mischer-preserve-4.jpg', 'Cardinal and Blue Jay Trails Loop', 'Houston, TX', 2.4, -0.5, 3.5);
INSERT INTO Trail (BikerId, ImageUrl, [Name], [Location], Distance, Grade, [Time]) VALUES (0, 'https://cdn2.apstatic.com/photos/hike/7017993_smallMed_1554830147.jpg', 'Memorial Park Red Trail', 'Houston, TX', 1.1, 0.0, 4);
INSERT INTO Trail (BikerId, ImageUrl, [Name], [Location], Distance, Grade, [Time]) VALUES (0, 'https://www.hermannpark.org/media/uploads/.thumbnails/taylor_trail_2-1000x0.jpg', 'Hermann Park Trail', 'Houston, TX', 1.5, 0.1, 4.5);
INSERT INTO Trail (BikerId, ImageUrl, [Name], [Location], Distance, Grade, [Time]) VALUES (0, 'https://www.hcp1.net/media/Parks/Gene%20Green/Park%20_Silder_Gene%20Green_01.jpg?width=900', 'Gene Green Beltway 8 Park Loop', 'Houston, TX', 2.0, 0.0, 5);
INSERT INTO Trail (BikerId, ImageUrl, [Name], [Location], Distance, Grade, [Time]) VALUES (0, 'https://t4.ftcdn.net/jpg/01/43/08/27/360_F_143082717_grQErFAqZInt0tx2r0PqBais02vZjTSF.jpg', 'Paul Carr Jogging Trail', 'Houston, TX', 3.8, -0.1, 5.5);

INSERT INTO Bike (BikerId, ImageUrl, Brand, Color, Accessories) VALUES (1, 'https://trek.scene7.com/is/image/TrekBicycleProducts/DomaneAL2_22_33083_C_Portrait?$responsive-pjpg$&cache=on,on&wid=1200&hei=900', 'Trek Domane Al 2 Disc', 'Red', 'lights, water bottle holders');
INSERT INTO Bike (BikerId, ImageUrl, Brand, Color, Accessories) VALUES (1, 'https://trek.scene7.com/is/image/TrekBicycleProducts/DomaneAL3Disc_21_33082_A_Portrait?$responsive-pjpg$&cache=on,on&wid=1200&hei=900', 'Trek Domane Al 3 Disc', 'Grey', 'lights, water bottle holders');
INSERT INTO Bike (BikerId, ImageUrl, Brand, Color, Accessories) VALUES (2, 'https://trek.scene7.com/is/image/TrekBicycleProducts/DomaneAL4Disc_21_33085_C_Portrait?$responsive-pjpg$&cache=on,on&wid=1200&hei=900', 'Trek Domane Al 4 Disc', 'White', 'lights, water bottle holders, biking bag, bike computer');
INSERT INTO Bike (BikerId, ImageUrl, Brand, Color, Accessories) VALUES (3, 'https://assets.specialized.com/i/specialized/90021-76_ALLEZ-SPRINT-LTD-PRPTNTALU-CMLN_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto', 'Specialized Allez Sprint LTD', 'Purple', 'lights, water bottle holders, biking bag, bike computer');

INSERT INTO Clothing (BikerId, Jersey, Goggles, Shoes, Helmet, Other) VALUES (1, 'PEARL iZUMi Quest Cycling Jersey', 'Smith Ruckus Sunglasses', 'Bontrager Solstice Road Cycling Shoes', 'Giro Synthe MIPS II Helmet', 'PEARL iZUMi Elite Gel Cycling Gloves');
INSERT INTO Clothing (BikerId, Jersey, Goggles, Shoes, Helmet, Other) VALUES (2, 'Rapha Core Lightweight Jersey', 'Smith Ruckus ChromaPop Sunglasses', 'Bontrager Circuit Road Cycling Shoes', 'Smith Persis MIPS Bike Helmet', 'Garneau Cith Path Bike Shorts');
INSERT INTO Clothing (BikerId, Jersey, Goggles, Shoes, Helmet, Other) VALUES (3, 'Trek Circuit Custom Mount & Bigfoot Cycling Jersey', 'Tifosi Sledge Sunglasses', 'PEARL iZUMi Attack Road Cycling Shoes', 'Bontrager Starvos WaveCel Cycling Helmet', 'Feetures Elite Light Cushion Mini Crew Socks');
