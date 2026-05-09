-- CreateTable
CREATE TABLE "SiteBuilderPageRevision" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pageId" INTEGER NOT NULL,
    "action" TEXT NOT NULL DEFAULT 'patch',
    "titleHu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "bodyJson" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "actorId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SiteBuilderPageRevision_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "SiteBuilderPage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SiteBuilderPublishQueue" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pageId" INTEGER NOT NULL,
    "targetStatus" TEXT NOT NULL DEFAULT 'published',
    "scheduledFor" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'queued',
    "processedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    CONSTRAINT "SiteBuilderPublishQueue_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "SiteBuilderPage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "SiteBuilderPageRevision_pageId_createdAt_idx" ON "SiteBuilderPageRevision"("pageId", "createdAt");

-- CreateIndex
CREATE INDEX "SiteBuilderPublishQueue_status_scheduledFor_idx" ON "SiteBuilderPublishQueue"("status", "scheduledFor");

-- CreateIndex
CREATE INDEX "SiteBuilderPublishQueue_pageId_createdAt_idx" ON "SiteBuilderPublishQueue"("pageId", "createdAt");
