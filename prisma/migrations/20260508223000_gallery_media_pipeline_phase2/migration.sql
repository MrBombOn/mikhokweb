-- Gallery media pipeline (phase 2): thumbnail and metadata columns
ALTER TABLE "GalleryItem" ADD COLUMN "thumbnailUrl" TEXT NOT NULL DEFAULT '';
ALTER TABLE "GalleryItem" ADD COLUMN "imageWidth" INTEGER;
ALTER TABLE "GalleryItem" ADD COLUMN "imageHeight" INTEGER;
ALTER TABLE "GalleryItem" ADD COLUMN "mimeType" TEXT;
ALTER TABLE "GalleryItem" ADD COLUMN "fileSizeBytes" INTEGER;
ALTER TABLE "GalleryItem" ADD COLUMN "exifJson" JSONB;
