-- CreateTable
CREATE TABLE "SearchDocument" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "module" TEXT NOT NULL,
    "entityId" INTEGER NOT NULL,
    "titleHu" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "snippetHu" TEXT NOT NULL DEFAULT '',
    "snippetEn" TEXT NOT NULL DEFAULT '',
    "searchBlob" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT '',
    "slug" TEXT,
    "hrefPath" TEXT NOT NULL,
    "listDate" TEXT NOT NULL DEFAULT '',
    "updatedAt" DATETIME NOT NULL
);

CREATE UNIQUE INDEX "SearchDocument_module_entityId_key" ON "SearchDocument"("module", "entityId");
CREATE INDEX "SearchDocument_module_idx" ON "SearchDocument"("module");
CREATE INDEX "SearchDocument_category_idx" ON "SearchDocument"("category");

-- CreateTable
CREATE TABLE "SearchQueryStat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day" TEXT NOT NULL,
    "queryNormalized" TEXT NOT NULL,
    "searchCount" INTEGER NOT NULL DEFAULT 0,
    "zeroResultCount" INTEGER NOT NULL DEFAULT 0
);

CREATE UNIQUE INDEX "SearchQueryStat_day_queryNormalized_key" ON "SearchQueryStat"("day", "queryNormalized");
CREATE INDEX "SearchQueryStat_day_idx" ON "SearchQueryStat"("day");
