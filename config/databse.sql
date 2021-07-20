CREATE TABLE `portofolio`.`users` ( 
    `id` INT NOT NULL AUTO_INCREMENT , 
    `email` VARCHAR(255) NOT NULL , 
    `password` VARCHAR(255) NOT NULL , 
    PRIMARY KEY (`id`)) 
    ENGINE = InnoDB CHARSET=utf8 
    COLLATE utf8_general_ci COMMENT = 'table d\'authentification';