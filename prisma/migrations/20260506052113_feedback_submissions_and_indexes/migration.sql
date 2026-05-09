-- CreateTable
CREATE TABLE "FeedbackSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "module" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AuditLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "actorId" TEXT,
    "actorName" TEXT NOT NULL,
    "actorRole" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "details" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_AuditLog" ("action", "actorId", "actorName", "actorRole", "createdAt", "details", "entityId", "entityType", "id") SELECT "action", "actorId", "actorName", "actorRole", "createdAt", "details", "entityId", "entityType", "id" FROM "AuditLog";
DROP TABLE "AuditLog";
ALTER TABLE "new_AuditLog" RENAME TO "AuditLog";
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");
CREATE INDEX "AuditLog_actorId_idx" ON "AuditLog"("actorId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "FeedbackSubmission_createdAt_idx" ON "FeedbackSubmission"("createdAt");

-- CreateIndex
CREATE INDEX "FeedbackSubmission_module_idx" ON "FeedbackSubmission"("module");

-- CreateIndex
CREATE INDEX "AboutMember_status_sortOrder_idx" ON "AboutMember"("status", "sortOrder");

-- CreateIndex
CREATE INDEX "AboutNarrative_status_sortOrder_idx" ON "AboutNarrative"("status", "sortOrder");

-- CreateIndex
CREATE INDEX "CalendarEvent_status_eventDate_idx" ON "CalendarEvent"("status", "eventDate");

-- CreateIndex
CREATE INDEX "Category_scope_status_idx" ON "Category"("scope", "status");

-- CreateIndex
CREATE INDEX "GalleryItem_folderId_status_idx" ON "GalleryItem"("folderId", "status");

-- CreateIndex
CREATE INDEX "Guide_status_listDate_idx" ON "Guide"("status", "listDate");

-- CreateIndex
CREATE INDEX "GymBooking_status_bookingDate_idx" ON "GymBooking"("status", "bookingDate");

-- CreateIndex
CREATE INDEX "News_status_listDate_idx" ON "News"("status", "listDate");
