-- CREATE administrative_region TABLE
CREATE TABLE administrative_region (
	id integer NOT NULL,
	name varchar(255) NOT NULL,
	name_en varchar(255) NOT NULL,
	code_name varchar(255) NULL,
	code_name_en varchar(255) NULL,
	CONSTRAINT administrative_region_pkey PRIMARY KEY (id)
);


-- CREATE administrative_unit TABLE
CREATE TABLE administrative_unit (
	id integer NOT NULL,
	full_name varchar(255) NULL,
	full_name_en varchar(255) NULL,
	short_name varchar(255) NULL,
	short_name_en varchar(255) NULL,
	code_name varchar(255) NULL,
	code_name_en varchar(255) NULL,
	CONSTRAINT administrative_unit_pkey PRIMARY KEY (id)
);


-- CREATE province TABLE
CREATE TABLE province (
	code varchar(20) NOT NULL,
	name varchar(255) NOT NULL,
	name_en varchar(255) NULL,
	full_name varchar(255) NOT NULL,
	full_name_en varchar(255) NULL,
	code_name varchar(255) NULL,
	administrative_unit_id integer NULL,
	administrative_region_id integer NULL,
	CONSTRAINT province_pkey PRIMARY KEY (code)
);


-- province foreign keys

ALTER TABLE province ADD CONSTRAINT province_administrative_region_id_fkey FOREIGN KEY (administrative_region_id) REFERENCES administrative_region(id);
ALTER TABLE province ADD CONSTRAINT province_administrative_unit_id_fkey FOREIGN KEY (administrative_unit_id) REFERENCES administrative_unit(id);


-- CREATE district TABLE
CREATE TABLE district (
	code varchar(20) NOT NULL,
	name varchar(255) NOT NULL,
	name_en varchar(255) NULL,
	full_name varchar(255) NULL,
	full_name_en varchar(255) NULL,
	code_name varchar(255) NULL,
	province_code varchar(20) NULL,
	administrative_unit_id integer NULL,
	CONSTRAINT district_pkey PRIMARY KEY (code)
);


-- district foreign keys

ALTER TABLE district ADD CONSTRAINT district_administrative_unit_id_fkey FOREIGN KEY (administrative_unit_id) REFERENCES administrative_unit(id);
ALTER TABLE district ADD CONSTRAINT district_province_code_fkey FOREIGN KEY (province_code) REFERENCES province(code);



-- CREATE ward TABLE
CREATE TABLE ward (
	code varchar(20) NOT NULL,
	name varchar(255) NOT NULL,
	name_en varchar(255) NULL,
	full_name varchar(255) NULL,
	full_name_en varchar(255) NULL,
	code_name varchar(255) NULL,
	district_code varchar(20) NULL,
	administrative_unit_id integer NULL,
	CONSTRAINT ward_pkey PRIMARY KEY (code)
);


-- ward foreign keys

ALTER TABLE ward ADD CONSTRAINT ward_administrative_unit_id_fkey FOREIGN KEY (administrative_unit_id) REFERENCES administrative_unit(id);
ALTER TABLE ward ADD CONSTRAINT ward_district_code_fkey FOREIGN KEY (district_code) REFERENCES district(code);