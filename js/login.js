$(function(){
    // readTextFile("../config.json",function(text){
    //     let data = JSON.parse(text);
    //     console.log(data);
    //     console.log(data.prot);
    // })
    console.log("外网");
    readTextFile("../config.json",function(text){
        let data = JSON.parse(text);
        IPconf = data.IPconf;
        prot = data.prot;
        httpHead = data.httpHead;
    })
})

function Select_as_Banned(){
    let username = document.getElementById("page1_jEdit1").value;
    let pas = document.getElementById("page1_jEdit2").value;
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', 'http://'+IPconf+':'+prot+'/login', true);
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    let data = JSON.stringify({
        account:username,
        password:pas,
    });
    httpRequest.send(data);
    httpRequest.onreadystatechange = function () {
        if(httpRequest.readyState == 4 && httpRequest.status==200){
            let json = httpRequest.responseText;
            let data =  eval("(" + json + ")");
            if(data.hasOwnProperty("error")){
                alert(data.error);
                return;
            }
            SetCookie("token",JSON.stringify(data.token),2);
            SetCookie("urls",JSON.stringify(data.urls),24);
            SetCookie("sids",JSON.stringify(data.sids),24);
            SetCookie("pfs",JSON.stringify(data.pfs),24);
            SetCookie("username",JSON.stringify(username),24);
            SetCookie("starttime","",-1);
            SetCookie("endtime","",-1);
            window.location.href = "dataall.html";
        }
    }
}