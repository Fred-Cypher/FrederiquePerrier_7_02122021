/*
  Warnings:

  - You are about to drop the column `author_id` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `author_id` on the `message` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Comment_author_id_fkey` ON `comment`;

-- DropIndex
DROP INDEX `Comment_image_id_fkey` ON `comment`;

-- DropIndex
DROP INDEX `Message_author_id_fkey` ON `message`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `author_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `message` DROP COLUMN `author_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_image_id_fkey` FOREIGN KEY (`image_id`) REFERENCES `Message`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
