-- CreateTable
CREATE TABLE "CalculatorState" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "semesters" JSONB NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CalculatorState_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
