$(function(){
    readTextFile("../config.json",function(text){
        let data = JSON.parse(text);
        IPconf = data.IPconf;
        prot = data.prot;
        httpHead = data.httpHead;
    })
    document.getElementById('recharge').onclick = function(){
        let uid_0 = $("#openId").val();
        let rechargeId = $("#rechargeId").val();
        recharge(GetCookies("token"),uid_0,rechargeId);
    }
})

function recharge(CS_token,CS_uid,CS_rid){
    if(isNullorUndefined(GetCookies("token")) || GetCookies("token")==""){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    if(isNullorUndefined(CS_uid) || CS_uid==""){
        alert("输入角色id");
        return;
    }
    if(isNullorUndefined(CS_rid)|| CS_rid==""){
        alert("请输入充值id");
        return;
    }
    
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+ IPconf + ':' + prot + '/operate11',true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        uid:CS_uid,
        rid:CS_rid,
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
            alert("充值成功");
        }
    }
}