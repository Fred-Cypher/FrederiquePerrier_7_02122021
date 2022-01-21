/*
  Warnings:

  - You are about to drop the column `article` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `article_id` on the `note` table. All the data in the column will be lost.
  - Added the required column `content` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_id` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Article_user_id_fkey` ON `article`;

-- DropIndex
DROP INDEX `Comment_image_id_fkey` ON `comment`;

-- DropIndex
DROP INDEX `Comment_user_id_fkey` ON `comment`;

-- DropIndex
DROP INDEX `Message_user_id_fkey` ON `message`;

-- DropIndex
DROP INDEX `Note_article_id_fkey` ON `note`;

-- DropIndex
DROP INDEX `Note_user_id_fkey` ON `note`;

-- AlterTable
ALTER TABLE `article` DROP COLUMN `article`,
    ADD COLUMN `content` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `note` DROP COLUMN `article_id`,
    ADD COLUMN `content_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `Message`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_content_id_fkey` FOREIGN KEY (`content_id`) REFERENCES `Article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
