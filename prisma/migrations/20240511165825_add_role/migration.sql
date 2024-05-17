-- AlterTable
ALTER TABLE `users` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user';
