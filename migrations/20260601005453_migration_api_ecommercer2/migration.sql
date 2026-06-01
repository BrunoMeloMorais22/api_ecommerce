/*
  Warnings:

  - You are about to alter the column `role` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `usuario` MODIFY `role` ENUM('User', 'Admin') NOT NULL DEFAULT 'User';
