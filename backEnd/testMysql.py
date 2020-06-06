import pymysql

# create  table book
#   (bno char(10),
#   category 	varchar(10),
#   title 	varchar(20),
#   press	varchar(20),
#   year varchar(10),
#   author varchar(10),
#   price	decimal(7,2),
#   total	int,
#   stock	int,
#   primary key(bno));
con = pymysql.connect('localhost', 'root',
    '123456', 'lab5')
sql = "INSERT INTO book(bno, \
       category, title, press, year,author,price,total,stock) \
       VALUES ('%s', '%s',  '%s',  '%s',  '%s', '%s',  %s,  %s,  %s)" % \
       ('B_no_2', 'CS', "title of", 'www', "2000","wzb","98.00",2,1)
sql = "INSERT INTO book(bno, \
              category, title, press, year,author,price,total,stock) \
              VALUES (%s, %s, %s,%s,  %s, %s, %s, %s, %s)"
t = ('b_no_3', '11', 'wow', '11', 2000, 'wzb', '100.0', 1, 1)

with con:
    cur = con.cursor()
    flag = 1
    try:
        cur.execute(sql,t)
        con.commit()
    except:
        flag = 0
        # 发生错误时回滚
        con.rollback()
    print(flag)
