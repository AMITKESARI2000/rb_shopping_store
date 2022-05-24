-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root123';
-- flush privileges
drop database if exists rb_shopping_store;
create database rb_shopping_store;
use rb_shopping_store;

drop table if exists user;
create table user (
uid int NOT NULL,
user_name varchar(35) NOT NULL,
email varchar(35) NOT NULL,
phone varchar(15),
membership varchar(25),
user_pass varchar(25) NOT NULL,
is_seller bool DEFAULT 0,
dpUrl char(150),
PRIMARY KEY (uid)
);



drop table if exists product;

create table product (
pid int NOT NULL,
prod_name varchar(100) NOT NULL,
arrival date,
price decimal(10,2),
offer varchar(25),
category varchar(25) NOT NULL,
manufacturer varchar(25) NOT NULL,
brand varchar(25),
color varchar(25),
prod_status varchar(25),
rating int,
prod_desc varchar(1000),
imageUrl varchar(200),
PRIMARY KEY (pid)
);

drop table if exists cart;
create table cart (
cid int NOT NULL,
uid int NOT NULL,
pid int NOT NULL,
cart_status varchar(20),
cart_name varchar(25) NOT NULL,
bill decimal(10,2),
location varchar(200),
email varchar(35),
payid int NOT NULL,
PRIMARY KEY(cid),
FOREIGN KEY(uid) REFERENCES user(uid),
FOREIGN KEY(pid) REFERENCES product(pid)
);

drop table if exists comment;

create table comment (
coid int NOT NULL,
user_name varchar(25),
pid int NOT NULL,
rating int NOT NULL,
comment_desc varchar(1000),
PRIMARY KEY (coid),
FOREIGN KEY (pid) REFERENCES product(pid)
);

insert into user values(0001, "Amit Kesari", "kesari.amit33@gmail.com", 9616773794, "Gold", "password", 0, "https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/11/2021-hd-Best-Cool-Whatsapp-Dp-Profile-Images-download.jpg");
insert into product values(1001, "Rigged Jeans: Levi's", current_date(), 2100.99, "20", "Men's wear", "Levi", "Levi's", "Blue", "Instock", 4.5, "A modern slim with room to move, the 511™ slim fit jeans have added stretch for all-day comfort. They offer a lean look and is a great alternative to skinny jeans.","https://www.levi.in/dw/image/v2/BBRC_PRD/on/demandware.static/-/Sites-LeviMaster-Catalog/en_IN/dw3de47b9b/images/hi-res/182981060/182981060_10_Model Front.jpg?sw=334&sh=445");
insert into product values(1002, "Dark Rigged Jeans: Levi's", current_date(), 2800.99, "20", "Men's wear", "Levi", "Levi's", "Blue", "Instock", 4.5, "A modern slim with room to move, the 511™ slim fit jeans have added stretch for all-day comfort. They offer a lean look and is a great alternative to skinny jeans.","https://www.levi.in/dw/image/v2/BBRC_PRD/on/demandware.static/-/Sites-LeviMaster-Catalog/en_IN/dw3de47b9b/images/hi-res/182981060/182981060_10_Model Front.jpg?sw=334&sh=445");
insert into cart values(2001, 0001, 1001, "Progress", "cart1", 1201.22, "Renukoot", "gg@gmail.com", 696969);
-- insert into comment values(3001, "Anu Anand", 2001, 4.3, "Very good product");

select * from user;
select * from cart;
select * from product;
select * from comment;

-- use cid 9999 for product in store and not in cart;
