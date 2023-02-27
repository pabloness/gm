$(function(){
    let data = JSON.parse(GetCookies("sids"));
    let services = "";
    services += "<option value= 'all' id= 'allservices'>全部</option>";
    for(let i in data){
        services += "<option value=" +data[i]+ " id="+i+">"+data[i]+"</option>";
    }
    $("#selService").html(services);
    readTextFile("../config.json",function(text){
        let data = JSON.parse(text);
        IPconf = data.IPconf;
        prot = data.prot;
        httpHead = data.httpHead;
    })
    document.getElementById('btn').onclick = function(){
        let sid = $("#selService option:selected").val()== "all"?undefined:$("#selService option:selected").val();
        let zone = $("#zhuanfuId").val()== ""?undefined:$("#zhuanfuId").val();
        let txt = $("#content").val()== ""?undefined:$("#content").val();
        let interval = $("#interval").val()== ""?undefined:$("#interval").val();
        let times = $("#times").val()== ""?undefined:$("#times").val();
        sendAnnounce(GetCookies("token"),sid,zone,txt,interval,times);
    }
})

function sendAnnounce(CS_token,CS_sid,CS_zone,CS_txt,CS_interval,CS_times){
    if(isNullorUndefined(GetCookies("token"))||GetCookies("token")==""){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    if(isNullorUndefined(CS_txt)||CS_txt==""){
        alert("输入公告内容");
        return;
    }
    if(isNullorUndefined(CS_interval)||CS_interval==""){
        alert("请输入间隔时间");
        return;
    }
    if(isNullorUndefined(CS_times)||CS_times==""){
        alert("请输入发送次数");
        return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+ IPconf + ':' + prot + '/operate9',true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        sid:CS_sid,
        zone:CS_zone,
        txt:CS_txt,
        interval:CS_interval,
        times:CS_times,
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
            alert("发送成功");
        }
    }
}