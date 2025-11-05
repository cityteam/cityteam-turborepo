/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `facilities` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "facilities" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "facilities_name_key" ON "facilities"("name");
