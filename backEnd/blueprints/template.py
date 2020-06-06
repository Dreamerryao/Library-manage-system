from flask import Blueprint, request, send_from_directory
import json

# 使用Blueprint注册一个模块，尽量不要模块有同名
templates = Blueprint('template', __name__)


# 这里是路由声明
# @后面的是模块变量，表示这个路由在哪个模块里
# route里第一部分是uri，固定部分直接写如/id，变量部分用<>框起，并且里面的内容，作为下面函数的参数
# route里第二部分是触发的方法，例如本路由函数可以使用GET或者POST触发，但是不能用PUT，DELETE触发
@templates.route('/id/<id_name>', methods=['GET', 'POST'])
# 这里函数名随意，不重名即可，参数必须包含路由里所有<>框起的内容
def template(id_name):
    # 这里是读取header，我们的系统大部分不需要
    # headers = dict(request.headers)
    # 这里是读取body，注意GET和DELETE方法不能包含body
    # body = json.loads(request.data.decode('utf-8'))

    # 可以在这里处理请求，生成结果

    # 这里必须有return值，且必须为字符串，流式数据（图片、文件等）等
    # return值会返回前端
    # return json.dumps({"status": 'succeed', "id": id_name, "headers": headers, "body": body})  # 返回json对象（必须转成字符串）
    # return send_from_directory('./', 'abc.txt')  # 返回./abc.txt文件（一般用于下载）
    return json.dumps({'succeed': True,
                       'datasets': "test success"})

