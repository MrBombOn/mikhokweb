-- AlterTable
ALTER TABLE "News" ADD COLUMN "slug" TEXT;
ALTER TABLE "News" ADD COLUMN "ingestFingerprint" TEXT;
ALTER TABLE "News" ADD COLUMN "previewToken" TEXT;
ALTER TABLE "News" ADD COLUMN "coverAltHu" TEXT NOT NULL DEFAULT '';
ALTER TABLE "News" ADD COLUMN "coverAltEn" TEXT NOT NULL DEFAULT '';

CREATE UNIQUE INDEX "News_slug_key" ON "News"("slug");
CREATE UNIQUE INDEX "News_previewToken_key" ON "News"("previewToken");
CREATE INDEX "News_ingestFingerprint_idx" ON "News"("ingestFingerprint");

CREATE TABLE "NewsRevision" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "newsId" INTEGER NOT NULL,
    "payload" TEXT NOT NULL,
    "editorId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "NewsRevision_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX "NewsRevision_newsId_createdAt_idx" ON "NewsRevision"("newsId", "createdAt");

CREATE TABLE "NewsIngestFingerprint" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fingerprint" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "sourcePostId" TEXT,
    "newsId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX "NewsIngestFingerprint_fingerprint_key" ON "NewsIngestFingerprint"("fingerprint");
