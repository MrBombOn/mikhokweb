-- P8: About tag publikációs dátum + alumni; Office heti ütemterv + belső megjegyzés
ALTER TABLE "AboutMember" ADD COLUMN "publishedAt" TEXT;
ALTER TABLE "AboutMember" ADD COLUMN "isAlumni" INTEGER NOT NULL DEFAULT 0;

ALTER TABLE "OfficeSnapshot" ADD COLUMN "weeklyScheduleHu" TEXT NOT NULL DEFAULT '';
ALTER TABLE "OfficeSnapshot" ADD COLUMN "weeklyScheduleEn" TEXT NOT NULL DEFAULT '';
ALTER TABLE "OfficeSnapshot" ADD COLUMN "internalNoteHu" TEXT NOT NULL DEFAULT '';
ALTER TABLE "OfficeSnapshot" ADD COLUMN "internalNoteEn" TEXT NOT NULL DEFAULT '';
