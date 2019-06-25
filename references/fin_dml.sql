-- user(uid,email,password,upicture,uname,apihashtag,inputhashtag,goal)
insert into user(email,password,nickname,phashtag,hashtag,goal) values("user1@gmail.com","user1","user1","[국민은행] 국민수퍼정기예금(개인), [국민은행] KB Star 정기예금, [국민은행] 국민수퍼정기예금 (CD금리연동형), [국민은행] KB골든라이프연금저축신탁 (안정형, [국민은행] KB 매직카대출)",null,null);
insert into user(email,password,nickname,phashtag,hashtag,goal) values("user2@gmail.com","user2","user2","[국민은행] KB Smart★폰 예금, [국민은행] KB국민UP정기예금, [국민은행] KB 러시아 대표성장주 증권 자투자신탁(주식)-C-E, [국민은행] KB골든라이프연금저축신탁 (채권형), [국민은행] KB Star 신용대출",null,null);
insert into user(email,password,nickname,phashtag,hashtag,goal) values("user3@gmail.com","user3","user3","[국민은행] KB국민첫재테크예금, [국민은행] KB골든라이프연금우대예금, [국민은행] KB실버웰빙연금저축신탁 (안정형), [국민은행] KB Star 모기지론",null,null);
insert into user(email,password,nickname,phashtag,hashtag,goal) values("user4@gmail.com","user4","user4","[국민은행] KB펀드와만나는예금, [국민은행] 일반정기예금, [국민은행] DB 글로벌 핀테크 증권자투자신탁 UH(주식) AE, [국민은행] KB실버웰빙연금저축신탁 (채권형)",null,null);
insert into user(email,password,nickname,phashtag,hashtag,goal) values("user5@gmail.com","user5","user5","[국민은행] KB Young Youth 증여예금, [국민은행] 국민수퍼정기예금 (CD금리연동형), [국민은행] DB 글로벌 핀테크 증권자투자신탁 UH(주식) CE, [국민은행] KB비과세파도타기시스템 주식형신탁",null,null);

-- account(ano,bank,uid)
insert into account values("11111111111","국민은행",1);
insert into account values("22222222222","국민은행",2);
insert into account values("33333333333","국민은행",3);
insert into account values("44444444444","국민은행",4);
insert into account values("55555555555","국민은행",5);

/*
CREATE TABLE POST (
	PNO      INTEGER NOT NULL auto_increment primary key, -- 게시물번호
	UID      INTEGER  NOT NULL, -- 유저ID
	contents VARCHAR(5000) NULL      -- 내용
);
*/

INSERT INTO POST(uid,contents) values(1,"첫번째");
INSERT INTO POST(uid,contents) values(1,"두번째");
INSERT INTO POST(uid,contents) values(1,"세번째");
INSERT INTO POST(uid,contents) values(2,"네번째");
INSERT INTO POST(uid,contents) values(2,"다섯번째");


-- like(lno,pno,uid)
insert into likes(uid,pno) values(1,1);
insert into likes(uid,pno) values(1,2);
insert into likes(uid,pno) values(1,3);
insert into likes(uid,pno) values(1,4);
insert into likes(uid,pno) values(1,5);
insert into likes(uid,pno) values(2,1);
insert into likes(uid,pno) values(2,2);
insert into likes(uid,pno) values(2,3);
insert into likes(uid,pno) values(2,4);
insert into likes(uid,pno) values(2,5);
insert into likes(uid,pno) values(3,1);
insert into likes(uid,pno) values(3,2);
insert into likes(uid,pno) values(3,3);
insert into likes(uid,pno) values(3,4);
insert into likes(uid,pno) values(3,5);
/*
insert into bookmark values(null,1,1);
insert into bookmark values(null,1,2);
insert into bookmark values(null,1,3);
insert into bookmark values(null,1,4);
insert into bookmark values(null,1,5);
insert into bookmark values(null,2,1);
insert into bookmark values(null,2,2);
insert into bookmark values(null,2,3);
insert into bookmark values(null,2,4);
insert into bookmark values(null,2,5);
insert into bookmark values(null,3,1);
insert into bookmark values(null,3,2);
insert into bookmark values(null,3,3);
insert into bookmark values(null,3,4);
insert into bookmark values(null,3,5);

insert into product values("[국민은행] 국민수퍼정기예금(개인)","kb-00001","2018-03-10 14:30:22");
insert into product values("[국민은행] KB Star 정기예금","kb-00002","2018-03-10 14:30:22");
insert into product values("[국민은행] KB골든라이프연금저축신탁","kb-00003","2018-03-10 14:30:22");
insert into product values("[국민은행] KB국민첫재테크예금","kb-00004","2018-03-10 14:30:22");
insert into product values("[국민은행] KB펀드와만나는예금","kb-00005","2018-03-10 14:30:22");
*/ 