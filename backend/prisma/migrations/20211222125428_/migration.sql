/*
  Warnings:

  - Added the required column `commentary` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Comment_image_id_fkey` ON `comment`;

-- DropIndex
DROP INDEX `Comment_user_id_fkey` ON `comment`;

-- DropIndex
DROP INDEX `Message_user_id_fkey` ON `message`;

-- AlterTable
ALTER TABLE `comment` ADD COLUMN `commentary` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `Message`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
