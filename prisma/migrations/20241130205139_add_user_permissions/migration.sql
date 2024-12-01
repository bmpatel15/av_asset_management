/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[firebaseId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firebaseId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANAGER', 'STAFF', 'BASIC');

-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('VIEW_EQUIPMENT', 'ADD_EQUIPMENT', 'EDIT_EQUIPMENT', 'DELETE_EQUIPMENT', 'CHECKOUT_EQUIPMENT', 'CHECKIN_EQUIPMENT', 'VIEW_REPORTS', 'MANAGE_USERS', 'ACCESS_ADMIN_PANEL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "firebaseId" TEXT NOT NULL,
ADD COLUMN     "permissions" "Permission"[],
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'BASIC';

-- DropEnum
DROP TYPE "Role";

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseId_key" ON "User"("firebaseId");
