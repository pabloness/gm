$(function(){
    //服务器
    if(isNullorUndefined(GetCookies("token"))||GetCookies("token")==""){
        window.location.href = "login.html";
        return;
    }
    readTextFile("../config.json",function(text){
        let data = JSON.parse(text);
        IPconf = data.IPconf;
        prot = data.prot;
        httpHead = data.httpHead;
    })
    $("#mergebtn").click(function(){
        let zhuanfu = $("#zhuanfu").val();
        let congfu = $("#congfu").val();
        let congfuArray = selectStr(congfu);
        serviceMerge(GetCookies("token"),zhuanfu,congfuArray);
    })
})

//配置更新
function serviceMerge(CS_token,CS_main,CS_slave){
    if(isNullorUndefined(GetCookies("token"))||GetCookies("token")==""){
        window.location.href = "login.html";
        return;
    }
    if(isNullorUndefined(CS_main)||CS_main == ""){
        CS_main = undefined;
    }
    if(isNullorUndefined(CS_slave)||CS_slave == ""){
        CS_slave = undefined;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+ IPconf + ':' + prot + '/operate17',true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        mainSid:CS_main,
        slaveSids:CS_slave,
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
            alert(respData.form);
        }
    }
}

function selectStr(str){
    str = str.replace(/"/g,'');
    str = str.replace("[",'');
    str = str.replace("]","");
    let n = str.split(",");
    return n;
}