-- Admin Site Builder: custom pages + design configuration singleton
CREATE TABLE "SiteBuilderPage" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "slug" TEXT NOT NULL,
  "titleHu" TEXT NOT NULL,
  "titleEn" TEXT NOT NULL,
  "bodyJson" JSONB NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'draft',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX "SiteBuilderPage_slug_key" ON "SiteBuilderPage"("slug");
CREATE INDEX "SiteBuilderPage_status_slug_idx" ON "SiteBuilderPage"("status", "slug");

CREATE TABLE "SiteDesignConfig" (
  "id" INTEGER NOT NULL PRIMARY KEY,
  "primaryColor" TEXT NOT NULL DEFAULT '#3b82f6',
  "accentColor" TEXT NOT NULL DEFAULT '#ec4899',
  "surfaceRadius" INTEGER NOT NULL DEFAULT 16,
  "contentMaxWidth" INTEGER NOT NULL DEFAULT 1100,
  "fontFamily" TEXT NOT NULL DEFAULT 'Inter, system-ui, sans-serif',
  "customCss" TEXT NOT NULL DEFAULT '',
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "SiteDesignConfig" ("id") VALUES (1);
