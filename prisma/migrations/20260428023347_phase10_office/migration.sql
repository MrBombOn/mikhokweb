-- CreateTable
CREATE TABLE "OfficeSnapshot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "openingHoursHu" TEXT NOT NULL,
    "openingHoursEn" TEXT NOT NULL,
    "presentNowHu" TEXT NOT NULL DEFAULT '',
    "presentNowEn" TEXT NOT NULL DEFAULT '',
    "serviceStatusHu" TEXT NOT NULL,
    "serviceStatusEn" TEXT NOT NULL,
    "servicesInfoHu" TEXT NOT NULL DEFAULT '',
    "servicesInfoEn" TEXT NOT NULL DEFAULT '',
    "nfcInfoHu" TEXT NOT NULL DEFAULT '',
    "nfcInfoEn" TEXT NOT NULL DEFAULT '',
    "quickInfoHu" TEXT NOT NULL DEFAULT '',
    "quickInfoEn" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'published',
    "updatedAt" DATETIME NOT NULL
);
