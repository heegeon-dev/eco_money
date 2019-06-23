-- 좋아요
DROP TABLE LIKEs;

-- 게시물
DROP TABLE POST;

-- 계좌 정보
DROP TABLE ACCOUNT;

-- 금융상품상세
DROP TABLE PRODUCT;

-- 유저user
DROP TABLE USER;

-- 게시물
CREATE TABLE POST (
	PNO      VARCHAR(255)  NOT NULL, -- 게시물번호
	UID      VARCHAR(255)  NOT NULL, -- 유저ID
	contents VARCHAR(5000) NULL      -- 내용
);

-- 게시물
ALTER TABLE POST
	ADD
		CONSTRAINT PK_POST -- 게시물 기본키
		PRIMARY KEY (
			PNO -- 게시물번호
		);

-- 금융상품상세
CREATE TABLE PRODUCT (
	PNAME VARCHAR(1023) NOT NULL, -- 상품명
	date  DATE          NULL,     -- 상품등록일
	code  VARCHAR(255)  NULL      -- 상품코드
);

-- 좋아요
CREATE TABLE LIKEs (
	UID      VARCHAR(255)  NOT NULL, -- 유저ID
	contents VARCHAR(5000) NULL,     -- 내용
	PNO      VARCHAR(255)  NOT NULL  -- 게시물번호
);

-- 계좌 정보
CREATE TABLE ACCOUNT (
	ANO  VARCHAR(255) NOT NULL, -- 계좌번호
	bank VARCHAR(255) NULL,     -- 은행
	UID  VARCHAR(255) NOT NULL  -- 유저ID
);

-- 유저
CREATE TABLE USER (
	UID      VARCHAR(255) NOT NULL, -- 유저ID
	email    VARCHAR(255) NOT NULL, -- ID
	password VARCHAR(255) NOT NULL,  -- 비밀번호
	hashtag  VARCHAR(255),
    phashtag varchar(255),
    goal	 VARCHAR(255),
    userseqnum VARCHAR(255),
    accessToken VARCHAR(255),
    refreshToken VARCHAR(255)
);

-- 유저
ALTER TABLE USER
	ADD
		CONSTRAINT PK_USER -- 유저 기본키
		PRIMARY KEY (
			UID -- 유저ID
		);

-- 게시물
ALTER TABLE POST
	ADD
		CONSTRAINT FK_USER_TO_POST -- 유저 -> 게시물
		FOREIGN KEY (
			UID -- 유저ID
		)
		REFERENCES USER ( -- 유저
			UID -- 유저ID
		);

-- 좋아요
ALTER TABLE LIKEs
	ADD
		CONSTRAINT FK_USER_TO_LIKEs -- 유저 -> 좋아요
		FOREIGN KEY (
			UID -- 유저ID
		)
		REFERENCES USER ( -- 유저
			UID -- 유저ID
		);

-- 좋아요
ALTER TABLE LIKEs
	ADD
		CONSTRAINT FK_POST_TO_LIKEs -- 게시물 -> 좋아요
		FOREIGN KEY (
			PNO -- 게시물번호
		)
		REFERENCES POST ( -- 게시물
			PNO -- 게시물번호
		);

-- 계좌 정보
ALTER TABLE ACCOUNT
	ADD
		CONSTRAINT FK_USER_TO_ACCOUNT -- 유저 -> 계좌 정보
		FOREIGN KEY (
			UID -- 유저ID
		)
		REFERENCES USER ( -- 유저
			UID -- 유저ID
		);