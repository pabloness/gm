/**
 * Created by Administrator on 2018/5/24.
 */

var IPconf ;//= "jlfsconn1.yujiegames.com" ;//IP地址
var prot ;//= "3001";
var httpHead ;//= "https://";
var token;
var title_name = "游戏管理后台";
window.accounttype = 0;
// window.name='测试';



//解析josn数据函数
//处理Josn
function toJson(str){
    var json = (new Function("return " + str))();
    return json;
}


// //清除Cookie
// function DelCookie(name) {
//     var exp = new Date();
//     exp.setTime(exp.getTime() - 1);
//     var cval = GetCookies(name);
//     if (cval != null) {
//         document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
//     };
// }
