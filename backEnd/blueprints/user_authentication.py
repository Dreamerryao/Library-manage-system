from flask import Blueprint, request, send_from_directory
from con_sql import con
import json

# 使用Blueprint注册一个模块，尽量不要模块有同名
userAt = Blueprint('userAt', __name__)


@userAt.route('/user', methods=['POST'])
def user_at_post():
    body = json.loads(request.data.decode('utf-8'))
    # print(body)
    res = -1
    with con:
        cur = con.cursor()
        cur.execute("SELECT * from users")

        version = cur.fetchall()
        # print(version)
        for i in version:
            if i[0] == body["username"]:
                if i[1] == body['pwd']:
                    res = i[2]
        # print(res)
    return json.dumps({'succeed': True if res != -1 else False, 'permission': res})


@userAt.route('/user', methods=['GET'])
def user_show():
    res = []
    with con:
        cur = con.cursor()
        cur.execute("SELECT * from users")
        version = cur.fetchall()
        for i in version:
            print(i)
            res.append({'name': i[0], 'permission': i[2]})
    return json.dumps({'succeed': True, 'userlist': res})


@userAt.route('/user/add', methods=['POST'])
def user_add():
    body = json.loads(request.data.decode('utf-8'))
    print(body)
    print(tuple(body))

    sql = "INSERT INTO users(name,password,kind) \
                 VALUES (%s, %s,%s)"
    res = 0
    with con:
        cur = con.cursor()
        try:
            cur.execute("SELECT count( * ) FROM users WHERE name = '%s'" % body['name'])
            version = cur.fetchone()
            print(version[0])
            if version[0] == 0:
                cur.execute(sql, tuple(body.values()))
                print("**")
                con.commit()
            else:
                res = 1  # 账户已存在
        except:
            res = 3
            pass
    return json.dumps({'succeed': True, 'addsucceed': True if res == 0 else False, 'res': res})


@userAt.route('/user/delete', methods=['POST'])
def user_delete():
    body = json.loads(request.data.decode('utf-8'))
    print(body)
    print(tuple(body))

    sql = "delete from users where name = '%s'"
    res = 0
    with con:
        cur = con.cursor()
        try:
            cur.execute("SELECT count( * ) FROM users WHERE name = '%s'" % body['name'])
            version = cur.fetchone()
            print(version[0])
            if version[0] == 0:
                res = 1 #账户不存在

            else:
                cur.execute(sql%body['name'])
                print("**")
                con.commit()
        except:
            res = 3
            pass
    return json.dumps({'succeed': True, 'deletesucceed': True if res == 0 else False, 'res': res})
