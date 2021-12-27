-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Balance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "total" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Balance" ("createdAt", "id", "total", "updatedAt", "userId") SELECT "createdAt", "id", "total", "updatedAt", "userId" FROM "Balance";
DROP TABLE "Balance";
ALTER TABLE "new_Balance" RENAME TO "Balance";
CREATE UNIQUE INDEX "Balance_userId_key" ON "Balance"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
