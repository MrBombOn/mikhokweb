-- Fázis 6: retention beállítások singleton rekordban
CREATE TABLE "RetentionConfig" (
  "id" INTEGER NOT NULL PRIMARY KEY,
  "auditLogDays" INTEGER NOT NULL DEFAULT 365,
  "feedbackDays" INTEGER NOT NULL DEFAULT 365,
  "requestLogDays" INTEGER NOT NULL DEFAULT 30,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "RetentionConfig" ("id") VALUES (1);
