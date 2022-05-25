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
dpUrl varchar(350),
balance int NOT NULL,
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
imageUrl varchar(9000),
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
PRIMARY KEY(payid),
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

insert into user values(0001, "Amit", "kesari.amit33@gmail.com", 9616773794, "Gold", "password", 0, "https://images.unsplash.com/photo-1584964139384-8baf818ba6c8?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfGFldTZyTC1qNmV3fHxlbnwwfHx8fA%3D%3D&auto=format", 100000);
insert into user values(0002, "Anand", "anand.anu@gmail.com", 9616773794, "Diamond", "password", 1, "https://images.unsplash.com/photo-1581464647110-26e129ce2d02?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDd8YWV1NnJMLWo2ZXd8fGVufDB8fHx8&auto=format", 200000);

insert into product values(1001, "Rigged Jeans: Levi's", current_date(), 2100.99, "20", "Men's wear", "Levi", "Levi's", "Blue", "Instock", 4, "A modern slim with room to move, the 511™ slim fit jeans have added stretch for all-day comfort. They offer a lean look and is a great alternative to skinny jeans.","https://www.levi.in/dw/image/v2/BBRC_PRD/on/demandware.static/-/Sites-LeviMaster-Catalog/en_IN/dw3de47b9b/images/hi-res/182981060/182981060_10_Model Front.jpg?sw=334&sh=445");
insert into product values(1002, "Dark Rigged Jeans: Levi's", current_date(), 2800.99, "0", "Men's wear", "Levi", "Levi's", "Blue", "Instock", 3, "A modern slim with room to move, the 511™ slim fit jeans have added stretch for all-day comfort. They offer a lean look and is a great alternative to skinny jeans.","https://www.levi.in/dw/image/v2/BBRC_PRD/on/demandware.static/-/Sites-LeviMaster-Catalog/en_IN/dw3de47b9b/images/hi-res/182981060/182981060_10_Model Front.jpg?sw=334&sh=445");
insert into product values(1003, "Shirt", current_date(), 900.99, "10", "Women's wear", "CK", "CK", "Blue", "Instock", 4, "A moderm slim blue shirt","https://images.unsplash.com/photo-1589310243389-96a5483213a8?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMHNoaXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600");
insert into product values(1004, "Shorts", current_date(), 200.99, "80", "Women's wear", "CK", "CK", "Blue", "Instock", 5, "A waterproof blue shinny full cotton short especially designed for summers.","https://images.unsplash.com/photo-1591195853828-11db59a44f6b?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvcnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600");
insert into product values(1005, "Saree", current_date(), 1900.99, "40", "Women's wear", "Amaravathi", "Levi's", "Purple", "Instock", 4.5, "Purple Saree design for beautiful women. Fully cotton. Self-washable.","https://images.unsplash.com/photo-1610030469983-98e550d6193c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FyZWV8ZW58MHx8MHx8&auto=format&fit=crop&w=600");
insert into product values(1006, "Denim Jeans", current_date(), 1000.99, "0", "Women's wear", "Cobra", "Bull's", "Blue", "Instock", 4, "Blue denim jeans especially made to make women look hotter. Even diamond will melt infront of them.","https://images.unsplash.com/photo-1475178626620-a4d074967452?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZGVuaW0lMjBqZWFuc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600");
insert into product values(1007, "Kurta", current_date(), 200.99, "0", "Men's wear", "Saanskaar", "Levi's", "Red", "Instock", 5, "A red tradition look Kurta. Mixed up of traditional and hotness.","https://images.unsplash.com/photo-1628250521470-28c1fc54616c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a3VydGF8ZW58MHx8MHx8&auto=format&fit=crop&w=600");

insert into cart values(2001, 0001, 1001, "Progress", "cart1", 1201.22, "Renukoot", "gg@gmail.com", 696969);
insert into cart values(2002, 0002, 1002, "Progress", "cart2", 1201.22, "Renukoot", "gg@gmail.com", 969696);
-- insert into comment values(3001, "Anu Anand", 2001, 4.3, "Very good product");

select * from user;
select * from product;
select * from cart;

-- use cid 9999 for product in store and not in cart;
