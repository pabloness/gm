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
    $("#sendbtn").click(function(){
        let sid = $("#selService").val() == "all"?undefined:$("#selService").val();
        let uid = $("#Emilnc").val()== ""?undefined:$("#Emilnc").val();
        let zhuanfuId = $("#zhuanfuId").val()== ""?undefined:$("#zhuanfuId").val();
        let txt = $("#content").val()== ""?undefined:$("#content").val();
        let awards = $("#itemdata").val()== ""?undefined:$("#itemdata").val();
        // let begintime = $("#BTime").val()== ""?null:$("#BTime").val();
        // let endtime = $("#CTime").val()== ""?null:$("#CTime").val();
        sendEmail(GetCookies("token"),uid,sid,zhuanfuId,txt,awards);
    })
})

function sendEmail(CS_token,CS_uid,CS_sid,CS_zhuanfu,CS_txt,CS_awards){
    if(isNullorUndefined(GetCookies("token"))||GetCookies("token")==""){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+ IPconf + ':' + prot + '/operate10',true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        sid:CS_sid,
        uid:CS_uid,
        zone:CS_zhuanfu,
        txt:CS_txt,
        awards:CS_awards,
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