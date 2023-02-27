$(function(){

})

function getPackageData(CS_token,CS_sid,CS_pf,CS_ctype,CS_beginDate,CS_endDate){
    if(!GetCookies("token")){
        alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    if(!CS_beginDate){
        alert("请选择开始时间");
        return;
    }
    if(!CS_endDate){
        alert("请选择结尾时间");
        return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'http://'+ IPconf + ':' + prot + '/giftStatistics',true);
    httpRequest.setRequestHeader("Content-type", "appliction/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        sid:CS_sid,
        pf:CS_pf,
        ctype:CS_ctype,
        beginDate:CS_beginDate,
        endDate:CS_endDate,
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
            
        }
    }
}