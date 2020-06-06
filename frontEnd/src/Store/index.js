import { refresh, register, unregister } from './refresher';
import { del, get, post, put } from './fetcher';
const data={
books:[],
users:[{'username':'root','authority':'1'}]
};

const status = {
    IsAdmin:false,
    waiting:0,
    debug : false,//for debug
    indexNum:0,
    login:false,
    permission:-1,
    username:"",
    notGet:{
        users:true,
        book:true
    },
};

const initData = {
    user:user=>({
            username:user.name,
            authority:user.permission
    }),
    book:book=>({
        bno:book[0],
        category:book[1], 
        title:book[2],
        press:book[3],
        year:book[4],
        author:book[5],
        price:book[6],
        total:book[7],
        stock:book[8]
    })
}
const getData = {
    status:{
        isWaiting:() => status.waiting > 0,
        indexNum:()=>status.indexNum,
        login:()=>status.login,
        username:()=>status.username,
        permission:()=>status.permission
    },
    theme:()=>({
        palette:{
            primary:{
                light:'rgb(229,229,229)',
                main:'rgb(43,43,43)',
            }
        }
    }),
    users:()=>{
        if(status.notGet.users === true){
            status.notGet.users = false
            backend.get('/user', res => {
                if (!res.succeed) {
                    alert(res.info);
                    return;
                }
                data.users = res.userlist.map(user=>{
                    return initData.user(user)
                })
                console.log(res.userlist)
                // refresh('IndexMain');
            })
        }
        return JSON.parse(JSON.stringify(data.users))
    },
    book:()=>{
        if(status.notGet.book === true){
            status.notGet.book = false
            backend.post('/book/query',{
                bno:"",
                category:"", 
                title:"",
                press:"",
                year:"",
                author:"",
                price:""
            }, res => {
                if (!res.succeed) {
                    alert(res.info);
                    return;
                }
                console.log(res.list)
                data.books = res.list.map(book=>{
                    return initData.book(book)
                })
                refresh('IndexMain');
            },false)
        }
        return JSON.parse(JSON.stringify(data.books))
    }
};
const handleChange = {
    wait:toWait =>{
        if(toWait) status.waiting +=1;
        else status.waiting-=1;
        if(status.waiting<0) status.waiting = 0;
        refresh('waiting');
    },
    changeIndex:id =>{

        status.indexNum = id;
        console.log(status.indexNum)
        refresh('IndexMain');
    },
    signIn:(username,pwd)=>{
    //mode 1
    if(!status.debug){
        backend.post('/user', {
            username:username,
            pwd:pwd
            // filters:[{winner: null, server: "Zhu Yuling",gameNo:null}, {winner: null, server: "Liu Shiwen",gameNo:null}]
            // filters:null,
        }, res => {
            if (!res.succeed) {
                status.login= false;
                // refresh('SignInSide');
                window.alert("用户名或密码错误！\n请重新输入！")
            }
            else{
                status.login= true;
                status.permission = parseInt(res.permission);
                status.username = username;
                refresh("Root")
                getData.users();
                getData.book();
                // refresh('SignInSide');
            }
    },false);
    }

    //mode 2
    else{
    status.login= true;
                status.permission = 0;
                status.username = "root";
                refresh("Root")
               getData.book();
                getData.users();
    }

    },
    submit:(username,pwd,member)=>{
        backend.post('/user/add', {
            name:username,
            pwd:pwd,
            kind:member===false?'0':'1'
            // filters:[{winner: null, server: "Zhu Yuling",gameNo:null}, {winner: null, server: "Liu Shiwen",gameNo:null}]
            // filters:null,
        }, res => {
            if (!res.succeed) {

                // refresh('SignInSide');
                window.alert("post失败")
            }
            else{
               if(!res.addsucceed){
                   if(res.res===1){
                       window.alert('账号已存在')
                   }
                   else if(res.res===3){
                       window.alert('数据库问题')
                   }
               }
               else{
                   window.alert('添加成功！')
                //    status.notGet.users=true
                    data.users.push({username:username,authority:member===false?'0':'1'})
                    refresh('IndexMain')
               }
               console.log(res)
            }
    },false);
    },
    deleteSubmit:(username)=>{
        backend.post('/user/delete', {
            name:username,
            // filters:[{winner: null, server: "Zhu Yuling",gameNo:null}, {winner: null, server: "Liu Shiwen",gameNo:null}]
            // filters:null,
        }, res => {
            if (!res.succeed) {

                // refresh('SignInSide');
                window.alert("post失败")
            }
            else{
               if(!res.deletesucceed){
                   if(res.res===1){
                       window.alert('账号不存在')
                   }
                   else if(res.res===3){
                       window.alert('数据库问题')
                   }
               }
               else{
                   window.alert('删除成功！')
                //    status.notGet.users=true
                data.users= data.users.filter(function(user){
                    return user.username !== username;
                });
                    refresh('IndexMain')
               }
               console.log(res)
            }
    },false);
    },
    bookquery:(bno,category,title,press,year,price,author)=>{
        // let year = "";
        
        backend.post('/book/query',{
            bno:bno,
            category:category, 
            title:title,
            press:press,
            year:year,
            author:author,
            price:price
        },res => {
            if (!res.succeed) {
                alert(res.info);
                return;
            }
            console.log(res.list)
            data.books=[]
            data.books = res.list.map(book=>{
                return initData.book(book)
            })
            console.log(data.books)
            refresh('Index0');
        },false)
    },
    bookImport:(bno,category,title,press,num,year,price,author)=>{
        // let year = "";
        if(bno === ""){
            alert("bno字段必须填写")
        }
        else if(num === ""){
            alert("请填写导入数量")
        }
        else{
            backend.post('/book/import',[{
                bno:bno,
                category:category, 
                title:title,
                press:press,
                year:year,
                author:author,
                price:price,
                total:num,
                stock:num
            }],res => {
                if (!res.succeed) {
                    alert("导入失败！"+"失败列表:"+res.failList);
                    return;
                }
                else{
                    alert("导入成功！")
                    status.notGet.book = true
                    refresh("Index0")
                }
            },false)
        }
        
    },
    borrowBook:(bno,time)=>{
        // let year = "";
        if(bno === ""){
            alert("bno字段必须填写")
        }
        else if(time === ""){
            alert("请填写借书时间")
        }
        else{
            backend.post('/borrow',{
                name:status.username,
                bno:bno,
                borrowtime:time
            },res => {
                if (!res.succeed) {
                    alert("后端连接失败");
                    return;
                }
                else{
                    if(!res.borrowSucceed){
                        if(res.res ==1){
                            alert("此书已没有库存，请过段时间再来")
                        }
                        else if(res.res ==2){
                            alert("您所要借的书号不存在，请正确查询后再次借书")
                        }
                        else{
                            alert("数据库错误！")
                        }
                        refresh("Index0")
                    }
                    else{
                        alert("借书成功！")
                        status.notGet.book = true
                        refresh("Index0")
                    }
                }
            },false)
        }
        
    },
    returnBook:(bno,time)=>{
        // let year = "";
        if(bno === ""){
            alert("bno字段必须填写")
        }
        else if(time === ""){
            alert("请填写还书时间")
        }
        else{
            backend.post('/return',{
                name:status.username,
                bno:bno,
                receivetime:time
            },res => {
                if (!res.succeed) {
                    alert("后端连接失败");
                    return;
                }
                else{
                    if(!res.returnSucceed){
                        if(res.res ==1){
                            alert("没有借书记录或已还完")
                        }
                        else{
                            alert("数据库错误！")
                        }
                    }
                    else{
                        alert("还书成功！")
                        status.notGet.book = true
                        refresh("Index0")
                    }
                }
            },false)
        }
        
    },
};

// 与后端通信接口，增加页面进度条
const backend = {
    get: (uri, callback = null, withProgress = true) => {
        if (withProgress) handleChange.wait(true);
        get(uri, res => {
            if (withProgress) handleChange.wait(false);
            if (callback instanceof Function) callback(res);
        });
    },
    post: (uri, body = undefined, callback = null, withProgress = true) => {
        if (withProgress) handleChange.wait(true);
        post(uri, (body instanceof Object) ? JSON.stringify(body) : body, res => {
            if (withProgress) handleChange.wait(false);
            if (callback instanceof Function) callback(res);
        });
    },
    put: (uri, body = undefined, callback = null, withProgress = true) => {
        if (withProgress) handleChange.wait(true);
        put(uri, (body instanceof Object) ? JSON.stringify(body) : body, res => {
            if (withProgress) handleChange.wait(false);
            if (callback instanceof Function) callback(res);
        });
    },
    del: (uri, callback = null, withProgress = true) => {
        if (withProgress) handleChange.wait(true);
        del(uri, res => {
            if (withProgress) handleChange.wait(false);
            if (callback instanceof Function) callback(res);
        });
    }
};


// 系统初始化
const globalInit = () => {
    window.onresize = () => refresh('App');
    document.oncontextmenu = e => e.preventDefault();

};
globalInit();

export { getData, handleChange, register, unregister, backend }