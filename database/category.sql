CREATE TABLE IF NOT EXISTS category (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    createdAt BIGINT(20) DEFAULT (UNIX_TIMESTAMP() * 1000),
    name_en VARCHAR(255),
    name_vi NVARCHAR(255),
    requireDetail CHAR(255) DEFAULT NULL
);
insert into category (name_en, name_vi) values('Root', 'Root');
insert into category (name_en, name_vi) values('Clothes', 'Quần áo');
insert into category (name_en, name_vi) values('Men Clothes', 'Quần áo nam');
insert into category (name_en, name_vi) values('Men Clothes', 'Women Clothes');
insert into category (name_en, name_vi) values('Electronics', 'Điện tử');
insert into category (name_en, name_vi) values('Food', 'Thực phẩm');
insert into category (name_en, name_vi) values('Shoes', 'Giày dép', 'brand');
insert into category (name_en, name_vi) values('Men Shoes', 'Giày dép nam');
insert into category (name_en, name_vi) values('Women Shoes', 'Giày dép nữ');
insert into category (name_en, name_vi) values('Sports', 'Thể thao');
insert into category (name_en, name_vi) values('Toys', 'Đồ chơi');
insert into category (name_en, name_vi) values('Books', 'Sách');
insert into category (name_en, name_vi) values('T-Shirt', 'Áo thun');
insert into category (name_en, name_vi) values('Shirt', 'Áo sơ mi');
insert into category (name_en, name_vi) values('Pants', 'Quần');
insert into category (name_en, name_vi) values('Shoes', 'Giày');
insert into category (name_en, name_vi) values('Sneakers', 'Giày thể thao');
insert into category (name_en, name_vi) values('Sandals', 'Giày dép');
insert into category (name_en, name_vi) values('Flip Flops', 'Dép');
insert into category (name_en, name_vi) values('Socks', 'Quần lót');
insert into category (name_en, name_vi) values('Underwear', 'Đồ lót');
insert into category (name_en, name_vi) values('Tie', 'Cà vạt');
insert into category (name_en, name_vi) values('Belt', 'Dây lưng');
insert into category (name_en, name_vi) values('Hat', 'Mũ');
insert into category (name_en, name_vi) values('Glasses', 'Kính');
insert into category (name_en, name_vi) values('Watch', 'Đồng hồ');
insert into category (name_en, name_vi) values('Phone', 'Điện thoại');
insert into category (name_en, name_vi) values('Laptop', 'Laptop');
insert into category (name_en, name_vi) values('Tablet', 'Máy tính bảng');
insert into category (name_en, name_vi) values('Camera', 'Máy ảnh');
insert into category (name_en, name_vi) values('TV', 'Tivi');
insert into category (name_en, name_vi) values('Fruit', 'Trái cây');
insert into category (name_en, name_vi) values('Vegetable', 'Rau củ');
insert into category (name_en, name_vi) values('Meat', 'Thịt');
insert into category (name_en, name_vi) values('Fish', 'Cá');
insert into category (name_en, name_vi) values('Egg', 'Trứng');

-- use your brain to determine what is parent and what is child, i trust on you
-- example women and men shoes is a child of shoes, e.t.c
CREATE TABLE IF NOT EXISTS category_category (
  parent INT NOT NULL,
  child INT NOT NULL,
  FOREIGN KEY (parent) REFERENCES category(_id),
  FOREIGN KEY (child) REFERENCES category(_id)
);
insert into category_category(parent, child) values(1,2);
insert into category_category(parent, child) values(1,3);
insert into category_category(parent, child) values(6,7);
insert into category_category(parent, child) values(6,8);



