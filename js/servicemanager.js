$(function(){
    let data = JSON.parse(GetCookies("sids"));
    //服务器
    let services = "";
    services += "<option value= '' id= 'allservices'>全部</option>";
    for(let i in data){
        services += "<option value=" +data[i]+ " id="+i+">"+data[i]+"</option>";
    }
    $("#ServiceName").html(services);
    if(isNullorUndefined(GetCookies("token"))||GetCookies("token")==""){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    readTextFile("../config.json",function(text){
        let data = JSON.parse(text);
        IPconf = data.IPconf;
        prot = data.prot;
        httpHead = data.httpHead;
    })
    $("#peizhibtn").click(function(){
        let zhuanfu = $("#zhuanfu").val();
        let sid = $("#ServiceName").val();
        reloadConfig(GetCookies("token"),sid,zhuanfu);
    })
    $("#openbtn").click(function(){
        let zhuanfu = $("#zhuanfu").val();
        let sid = $("#ServiceName").val();
        serverStart(GetCookies("token"),sid,zhuanfu);
    })
    $("#kickbtn").click(function(){
        let zhuanfu = $("#zhuanfu").val();
        let sid = $("#ServiceName").val();
        serverKick(GetCookies("token"),sid,zhuanfu);
    })
    $("#closebtn").click(function(){
        let zhuanfu = $("#zhuanfu").val();
        let sid = $("#ServiceName").val();
        serverClose(GetCookies("token"),sid,zhuanfu);
    })
})

//配置更新
function reloadConfig(CS_token,CS_sid,CS_zone){
    if(isNullorUndefined(GetCookies("token"))||GetCookies("token")==""){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    if(isNullorUndefined(CS_sid)||CS_sid == ""){
        CS_sid = undefined;
    }
    if(isNullorUndefined(CS_zone)||CS_zone == ""){
        CS_zone = undefined;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+ IPconf + ':' + prot + '/operate12',true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        sid:CS_sid,
        zone:CS_zone,
    });
    httpRequest.send(reqData);
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            let json = httpRequest.responseText;
            let respData = eval("(" + json + ")");
            if(respData.hasOwnProperty("error")){
                alert(respData.error);
                return;
            }
            alert("操作成功");
        }
    }
}

//服务器启动
function serverStart(CS_token,CS_sid,CS_zone){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    if(isNullorUndefined(CS_sid)||CS_sid == ""){
        CS_sid = undefined;
    }
    if(isNullorUndefined(CS_zone)||CS_zone == ""){
        CS_zone = undefined;
    }
    let httpRequst = new XMLHttpRequest();
    httpRequst.open('POST', httpHead+IPconf+':'+prot+'/operate13',true);
    httpRequst.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        sid:CS_sid,
        zone:CS_zone,
    });
    httpRequst.send(reqData);
    httpRequst.onreadystatechange = function(){
        if(httpRequst.readyState == 4 && httpRequst.status == 200){
            let json = httpRequst.responseText;
            let respData = eval("(" + json + ")");
            if(respData.hasOwnProperty("error")){
                alert(respData.error);
                return;
            }
            alert("操作成功");
        }
    }
}

//服务器踢人
function serverKick(CS_token,CS_sid,CS_zone){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    if(isNullorUndefined(CS_sid)||CS_sid == ""){
        CS_sid = undefined;
    }
    if(isNullorUndefined(CS_zone)||CS_zone == ""){
        CS_zone = undefined;
    }
    let httpRequst = new XMLHttpRequest();
    httpRequst.open('POST', httpHead+IPconf+':'+prot+'/operate14',true);
    httpRequst.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        sid:CS_sid,
        zone:CS_zone,
    });
    httpRequst.send(reqData);
    httpRequst.onreadystatechange = function(){
        if(httpRequst.readyState == 4 && httpRequst.status == 200){
            let json = httpRequst.responseText;
            let respData = eval("(" + json + ")");
            if(respData.hasOwnProperty("error")){
                alert(respData.error);
                return;
            }
            alert("操作成功");
        }
    }
}

//服务器关闭
function serverClose(CS_token,CS_sid,CS_zone){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    if(isNullorUndefined(CS_sid)||CS_sid == ""){
        CS_sid = undefined;
    }
    if(isNullorUndefined(CS_zone)||CS_zone == ""){
        CS_zone = undefined;
    }
    let httpRequst = new XMLHttpRequest();
    httpRequst.open('POST', httpHead+IPconf+':'+prot+'/operate15',true);
    httpRequst.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        sid:CS_sid,
        zone:CS_zone,
    });
    httpRequst.send(reqData);
    httpRequst.onreadystatechange = function(){
        if(httpRequst.readyState == 4 && httpRequst.status == 200){
            let json = httpRequst.responseText;
            let respData = eval("(" + json + ")");
            if(respData.hasOwnProperty("error")){
                alert(respData.error);
                return;
            }
            alert("操作成功");
        }
    }
}