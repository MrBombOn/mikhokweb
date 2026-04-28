-- CreateTable
CREATE TABLE "AboutNarrative" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "blockKey" TEXT NOT NULL,
    "titleHu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "bodyHu" TEXT NOT NULL DEFAULT '',
    "bodyEn" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'published',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AboutMember" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "roleHu" TEXT NOT NULL,
    "roleEn" TEXT NOT NULL,
    "bioHu" TEXT NOT NULL DEFAULT '',
    "bioEn" TEXT NOT NULL DEFAULT '',
    "groupHu" TEXT NOT NULL DEFAULT '',
    "groupEn" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'published',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AboutNarrative_blockKey_key" ON "AboutNarrative"("blockKey");
