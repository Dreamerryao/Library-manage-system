from flask import Flask
from flask_cors import CORS

# 导入模块
from blueprints.user_authentication import userAt
from blueprints.book_edit import book_edit
from blueprints.borrow_edit import borrow_edit

app = Flask(__name__)
CORS(app)

# 注册模块，同时指定前缀（现在需要使用/template/id/<aaa>访问模块里的那个函数）
app.register_blueprint(userAt, url_prefix='')
app.register_blueprint(book_edit, url_prefix='')
app.register_blueprint(borrow_edit,url_prefix='')


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
