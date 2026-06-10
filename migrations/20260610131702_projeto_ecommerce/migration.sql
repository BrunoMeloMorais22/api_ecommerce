/*
  Warnings:

  - You are about to drop the column `produtoId` on the `carrinho` table. All the data in the column will be lost.
  - Added the required column `produto_id` to the `Carrinho` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `carrinho` DROP FOREIGN KEY `Carrinho_produtoId_fkey`;

-- AlterTable
ALTER TABLE `carrinho` DROP COLUMN `produtoId`,
    ADD COLUMN `produto_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Carrinho` ADD CONSTRAINT `Carrinho_produto_id_fkey` FOREIGN KEY (`produto_id`) REFERENCES `Produto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
