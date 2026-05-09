/*
  Warnings:

  - Added the required column `updatedAt` to the `FeedbackSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FeedbackSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "module" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "email" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "assigneeId" TEXT,
    "internalNote" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FeedbackSubmission_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_FeedbackSubmission" ("createdAt", "email", "id", "message", "module") SELECT "createdAt", "email", "id", "message", "module" FROM "FeedbackSubmission";
DROP TABLE "FeedbackSubmission";
ALTER TABLE "new_FeedbackSubmission" RENAME TO "FeedbackSubmission";
CREATE INDEX "FeedbackSubmission_createdAt_idx" ON "FeedbackSubmission"("createdAt");
CREATE INDEX "FeedbackSubmission_module_idx" ON "FeedbackSubmission"("module");
CREATE INDEX "FeedbackSubmission_status_createdAt_idx" ON "FeedbackSubmission"("status", "createdAt");
CREATE INDEX "FeedbackSubmission_assigneeId_idx" ON "FeedbackSubmission"("assigneeId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
