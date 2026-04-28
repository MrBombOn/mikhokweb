-- CreateTable
CREATE TABLE "News" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "source" TEXT NOT NULL DEFAULT 'internal',
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "pinned" BOOLEAN NOT NULL DEFAULT false,
    "listDate" TEXT NOT NULL,
    "titleHu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "textHu" TEXT NOT NULL,
    "textEn" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "cover" TEXT NOT NULL DEFAULT 'blue',
    "hasCover" BOOLEAN NOT NULL DEFAULT true,
    "scheduledFor" TEXT,
    "externalUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
