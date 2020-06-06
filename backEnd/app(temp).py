from flask import Flask
from flask_cors import CORS

# 导入templates模块
from blueprints.template import templates

app = Flask(__name__)
CORS(app)

# 注册模块，同时指定前缀（现在需要使用/template/id/<aaa>访问模块里的那个函数）
app.register_blueprint(templates, url_prefix='/template')


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
