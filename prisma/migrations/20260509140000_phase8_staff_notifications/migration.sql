-- CreateTable
CREATE TABLE "StaffNotification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "eventKey" TEXT NOT NULL,
    "severity" TEXT NOT NULL DEFAULT 'info',
    "titleHu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "bodyHu" TEXT NOT NULL DEFAULT '',
    "bodyEn" TEXT NOT NULL DEFAULT '',
    "meta" JSONB,
    "readAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StaffNotification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "StaffNotification_userId_readAt_idx" ON "StaffNotification"("userId", "readAt");
CREATE INDEX "StaffNotification_userId_createdAt_idx" ON "StaffNotification"("userId", "createdAt");
