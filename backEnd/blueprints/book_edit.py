from flask import Blueprint, request, send_from_directory
from con_sql import con
import json
import csv

# 使用Blueprint注册一个模块，尽量不要模块有同名
book_edit = Blueprint('book_edit', __name__)


# [{"bno":"b_no_12","category":"", "title":"wow", "press":"11", "year":2000,"author":"wzb","price":100.00,"total":1,
# "stock":1}]
@book_edit.route('/book/import', methods=['POST'])
def bookImport_post():
    body = json.loads(request.data.decode("utf-8"))
    # print(body)
    res = []
    for i in body:
        print(i)
        res.append(tuple(i.values()))
    res = tuple(res)
    # print(tuple(body.values()))
    with con:
        sql = "INSERT INTO book(bno, \
               category, title, press, year,author,price,total,stock) \
              VALUES (%s, %s, %s,%s,  %s, %s, %s, %s, %s)"

        sql_update = 'UPDATE book SET total = total+' + body[0]['stock'] + ', stock = stock +' + body[0][
            'stock'] + ' WHERE bno= %s'
        print(sql_update % res[0][0])
        cur = con.cursor()
        false = []
        for i in res:
            try:
                cur.execute("SELECT count( * ) FROM book WHERE bno = '%s'" % i[0])
                version = cur.fetchone()
                # print(version)
                if version[0] == 0:
                    cur.execute(sql, i)
                    con.commit()
                else:
                    cur.execute(sql_update, i[0])
                    con.commit()

            except:
                false.append(i)
                # 发生错误时回滚
                con.rollback()
    return json.dumps({'succeed': True if len(false) == 0 else False, 'failList': false})


# {"bno":"","category":"", "title":"", "press":"", "year":"2000","author":"wzb","price":""}

@book_edit.route('/book/query', methods=['POST'])
def book_query():
    body = json.loads(request.data.decode('utf-8'))
    year_ok = 0
    year_f = ""
    year_b = ""
    if "-" in body['year']:
        year_ok = 1
        lst = body['year'].split("-")
        year_f = lst[0]
        year_b = lst[1]

    # print(body)
    sql = "select * from book where 1"
    sql = sql + ("" if body['bno'] == "" else " and bno = '%s'" % body['bno'])
    sql = sql + ("" if body['category'] == "" else (" and category like '%" + '%s' % body['category'] + "%'"))
    sql = sql + ("" if body['title'] == "" else (" and title like '%" + '%s' % body['title'] + "%'"))
    sql = sql + ("" if body['press'] == "" else (" and press like '%" + '%s' % body['press'] + "%'"))
    sql = sql + ("" if body['year'] == "" else (
        " and year = %s" % body['year'] if year_ok == 0 else " and year between %s and %s" % (year_f, year_b)))
    sql = sql + ("" if body['author'] == "" else (" and press like '%" + '%s' % body['author'] + "%'"))
    sql = sql + ("" if body['price'] == "" else " and price = '%s'" % body['price'])
    print(sql)
    with con:
        cur = con.cursor()
        cur.execute(sql)
        version = cur.fetchall()
        print(version)
        print(len(version))
    return json.dumps({'succeed': True, 'list': version})
