/*
  Warnings:

  - You are about to drop the column `produto_id` on the `carrinho` table. All the data in the column will be lost.
  - Added the required column `produtoId` to the `Carrinho` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `carrinho` DROP FOREIGN KEY `Carrinho_produto_id_fkey`;

-- AlterTable
ALTER TABLE `carrinho` DROP COLUMN `produto_id`,
    ADD COLUMN `produtoId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Carrinho` ADD CONSTRAINT `Carrinho_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
