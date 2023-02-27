/**
 * Created by stone on 2015/4/22.
 */

// outTimeToHour => 保存N个小时
function SetCookie(name, value,outTimeToHour) {
    var exp = new Date();
    exp.setTime(exp.getTime() + outTimeToHour * 60 * 60 * 1000);
    document.cookie = name + "=" + value + ";expires=" + exp.toGMTString();
}
function GetCookies(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        return arr[2];
    }
    return null;
}
function DelCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = GetCookies(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}