-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "OfferAddWord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "offeraddword" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "OfferRemoveWord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "offerremoveword" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FourLetterWord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "word" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FiveLetterWord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "word" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SixLetterWord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "word" TEXT NOT NULL
);
