from flask import Blueprint, request, send_from_directory
from con_sql import con
import json

# 使用Blueprint注册一个模块，尽量不要模块有同名
borrow_edit = Blueprint('borrow_edit', __name__)


# [{"bno":"b_no_12","category":"", "title":"wow", "press":"11", "year":2000,"author":"wzb","price":100.00,"total":1,
# "stock":1}]
@borrow_edit.route('/borrow', methods=['POST'])
def bookBorrow_post():
    body = json.loads(request.data.decode('utf-8'))
    print(body)
    res = 0
    sql = "INSERT INTO borrow(name,bno,borrowtime,receivetime)\
    VALUES ('%s' , '%s' ,'%s' ,'')"%(body['name'], body['bno'], body['borrowtime'])
    sql_update = 'UPDATE book SET stock = stock-1 WHERE bno= %s'
    print(sql)
    with con:
        cur = con.cursor()
        try:
            cur.execute("SELECT count( * ) FROM book WHERE bno = '%s'" % body['bno'])
            version = cur.fetchone()

            print(version)
            if version[0] == 0:
                res = 2  # 2:书不存在
            else:
                cur.execute("SELECT stock FROM book WHERE bno = '%s'" % body['bno'])
                version = cur.fetchone()
                print(version[0])
                if version[0] == 0:
                    res = 1  # 书无库存
                else:
                    try:
                        cur.execute(sql_update,body['bno'])
                        con.commit()
                        cur.execute(sql)
                        con.commit()
                    except:
                        res = 3
                        con.rollback()
        except:
            res = 3  # 数据库错误
            # 发生错误时回滚
            con.rollback()
    return json.dumps({'succeed': True, 'borrowSucceed': True if res == 0 else False, 'res': res})

@borrow_edit.route('/return', methods=['POST'])
def bookReturn_post():
    body = json.loads(request.data.decode('utf-8'))
    res = 0
    sql_update = 'UPDATE borrow SET receivetime = "%s" WHERE bno= "%s" and name = "%s" and receivetime = ""'% (body['receivetime'],body['bno'],body['name'])
    sql_update_2 = 'UPDATE book SET stock = stock+1 WHERE bno= %s'
    print(sql_update)
    with con:
        cur = con.cursor()
        try:
            cur.execute("SELECT count( * ) FROM borrow WHERE bno = '%s' and name = '%s' and receivetime = ''" % (body['bno'],body['name']))
            version = cur.fetchone()
            print(version[0])
            if version[0] == 0:
                res = 1  # 没有借书记录或已经还完
            else:
                cur.execute(sql_update)
                con.commit()
                cur.execute(sql_update_2, body['bno'])
                con.commit()
        except:
            res = 3 #数据库错误
            pass
    return json.dumps({'succeed': True, 'returnSucceed': True if res == 0 else False, 'res': res})



