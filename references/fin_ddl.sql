-- 댓글
DROP TABLE REPLY;

-- 좋아요
DROP TABLE LIKEs;

-- 게시물
DROP TABLE POST;

-- 계좌 정보
DROP TABLE ACCOUNT;

-- 금융상품상세
DROP TABLE my_PRODUCT;

-- 유저user
DROP TABLE USER;

DROP TABLE deal;
 
 drop table detail_product;
 
-- 게시물
CREATE TABLE POST (
   PNO      INTEGER NOT NULL auto_increment primary key, -- 게시물번호
   UID      INTEGER  NOT NULL, -- 유저ID
   contents VARCHAR(5000) not NULL,      -- 내용
    gp_inc_tot VARCHAR(255) not NULL,     -- 그래프 수입 전체
    gp_int_keywd VARCHAR(255) not NULL,   -- 그래프 수입 키워드
    gp_inc_amt VARCHAR(255) not NULL,     -- 그래프 수입 금액
    gp_spd_tot VARCHAR(255) not NULL,
    gp_spd_keywd VARCHAR(255) not NULL,   -- 그래프 소비 키워드
    gp_spd_amt VARCHAR(255) not NULL,      -- 그래프 소비 금액
    reg_date date,  -- 등록날짜 ,
	apihashtag VARCHAR(500) NOT NULL,
    inputhastag VARCHAR(500) NOT NULL    
);

-- 댓글
CREATE TABLE Reply (
   RID       integer   primary key auto_increment,
   contents VARCHAR(5000) NULL, -- 내용
   PNO      INTEGER       NULL, -- 게시물번호
   UID      INTEGER       NULL  -- 유저ID
);


-- 금융상품상세
CREATE TABLE MY_PRODUCT (
   pname VARCHAR(1023) NOT NULL, -- 상품명
   UID   INTEGER  NOT NULL,
   pdate  DATE     NOT NULL,     -- 상품등록일
   pcode  VARCHAR(255)  primary key     -- 상품코드
    
    
);

create table DETAIL_PRODUCT (
    pname VARCHAR(1023) NOT NULL, -- 상품명
    pdate  DATE NOT NULL,     -- 상품등록일
   pcode  VARCHAR(255)  primary key     -- 상품코드

);


-- 좋아요
CREATE TABLE LIKEs (
   likes_no INTEGER  auto_increment primary key,
   UID      INTEGER  NOT NULL, -- 유저ID
   contents VARCHAR(5000) NULL,     -- 내용
   PNO      INTEGER  NOT NULL  -- 게시물번호
);

-- 계좌 정보
CREATE TABLE ACCOUNT (
   account_no INTEGER NOT NULL, -- 계좌번호
   UID  INTEGER NOT NULL  -- 유저ID
);

-- 유저
CREATE TABLE USER (
   UID      INTEGER NOT NULL auto_increment primary key, -- 유저ID
   email    VARCHAR(255) NOT NULL, -- ID
   password VARCHAR(255) NOT NULL,  -- 비밀번호
    upicture VARCHAR(255) NOT NULL,
    uname    VARCHAR(50) NOT NULL,
    apihashtag VARCHAR(500) NOT NULL,
    inputhastag VARCHAR(500) NOT NULL,
    goal       VARCHAR(500) 
);

create table deal (
            tran_date date not null,
            tran_time varchar(255) not null,
            inout_type varchar(255) not null,
            tran_type varchar(255) not null,
            print_content varchar(255) not null,
            tran_amt INTEGER not null,
            after_balance_amt INTEGER not null,
            branch_name varchar(255),
            account_no varchar(255)
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
        
        
-- 댓글
ALTER TABLE Reply
	ADD
		CONSTRAINT FK_POST_TO_Reply -- 게시물 -> 댓글
		FOREIGN KEY (
			PNO -- 게시물번호
		)
		REFERENCES POST ( -- 게시물
			PNO -- 게시물번호
		);

-- 댓글
ALTER TABLE Reply
	ADD
		CONSTRAINT FK_USER_TO_Reply -- 유저 -> 댓글
		FOREIGN KEY (
			UID -- 유저ID
		)
		REFERENCES USER ( -- 유저
			UID -- 유저ID
		);