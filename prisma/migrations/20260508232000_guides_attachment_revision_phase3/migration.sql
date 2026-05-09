-- Guides phase 3: attachment metadata, searchable text, revisions
ALTER TABLE "Guide" ADD COLUMN "attachmentName" TEXT;
ALTER TABLE "Guide" ADD COLUMN "attachmentMime" TEXT;
ALTER TABLE "Guide" ADD COLUMN "attachmentSizeBytes" INTEGER;
ALTER TABLE "Guide" ADD COLUMN "searchableText" TEXT NOT NULL DEFAULT '';

CREATE INDEX "Guide_status_category_topic_idx" ON "Guide"("status", "category", "topic");

CREATE TABLE "GuideRevision" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "guideId" INTEGER NOT NULL,
  "version" INTEGER NOT NULL,
  "payloadJson" JSONB NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "GuideRevision_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "GuideRevision_guideId_version_key" ON "GuideRevision"("guideId", "version");
CREATE INDEX "GuideRevision_guideId_createdAt_idx" ON "GuideRevision"("guideId", "createdAt");
