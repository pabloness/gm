let pageIndex = 1;
let alldata = [];
let everycount = 20;
$(function(){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    let uid = $("#username").val();
    readTextFile("../config.json",function(text){
        let data = JSON.parse(text);
        IPconf = data.IPconf;
        prot = data.prot;
        httpHead = data.httpHead;
        getRechargeRecordData(GetCookies("token"),uid);
    });
    
    document.getElementById('searchbtn').onclick = function(){
        let uid = $("#username").val();
        getRechargeRecordData(GetCookies("token"),uid);
    }
})

function getRechargeRecordData(CS_token,CS_uid,CS_beginDate,CS_endDate,CS_sid){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    if(isNullorUndefined(CS_uid)){
        alert("请输入角色id");
        return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+ IPconf + ':' + prot + '/operate3',true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        openId:CS_uid,
        beginDate:CS_beginDate,
        endDate:CS_endDate,
        sid:CS_sid,
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
            pageIndex = 1;
            let num = "";
            let index_0 = 0;
            for(let i = 1 ; i < respData.form.length ; i ++){
                index_0 ++;
                num += "<tr class='table-row'>";
                for(let j in respData.form[i]){
                    //每页7行
                    if(i <= everycount*pageIndex){
                        num += "<td class='table-cell'>"+respData.form[i][j]+"</td>";
                    }
                }
                num += "</tr>";
            }
            if(index_0 < everycount){
                let count = everycount - index_0;
                for(let i = 1;i<=count;i++){
                    num += "<tr  class='table-row'>";
                    for(let j = 0; j < respData.form[0].length ; j++){
                        num += "<td class='table-cell'></td>";
                    }
                    num += "</tr>";
                }
            }
            let headnum = "<tr class='table-header-row'>"//"<ul class='table-header-row'>";
            for(let i in respData.form[0]){
                headnum += "<th class = 'table-cell'>" + respData.form[0][i] +"</th>";
            }
            headnum += "</tr>";
            let index;
            if(everycount > respData.form.length-1){
                index = respData.form.length-1;
            }else{
                index = everycount;
            }
            alldata = respData.form;
            alldata.splice(0,1);
            $("#total").html(respData.form.length); //
            $("#page").html(pageIndex);
            $("#num").html(index);

            $("#table_head").html(headnum);
            $("#table_row_body").html(num);
        }
    }
}
function Fpages() {
    let first;
    let c = alldata;
    
    pageIndex--;
    if(everycount > c.length){
        first = c.length;
    }else{
        first = everycount;
    }
    
    let num_1 = "";
    if(pageIndex <= 0){
        pageIndex = 1;
        $("#total").html(c.length);
        $("#num").html(first);
        $("#page").html(pageIndex);
        return;
    }else{
        let endIndex = (everycount*pageIndex - 1)>c.length-1?c.length-1:(everycount*pageIndex - 1);
        let index_0 = 0;
        for(let i = everycount*(pageIndex-1);i<=endIndex;i++){
            index_0++;
            num_1 += "<tr  class='table-row'>";
            for(let j = 0; j < c[i].length ;j++){
                num_1 += "<td class='table-cell'>" + c[i][j] + "</td>";
            }
            num_1 += "</tr>";
        }
        if(index_0 < everycount){
            let count = everycount - index_0;
            for(let i = 1;i<=count;i++){
                num_1 += "<tr  class='table-row'>";
                for(let j = 0; j < c[0].length ; j++){
                    num_1 += "<td class='table-cell'></td>";
                }
                num_1 += "</tr>";
            }
        }
        $("#table_row_body").html(num_1);
        $("#total").html(c.length);
        $("#num").html(endIndex-everycount*(pageIndex-1)+1);
        $("#page").html(pageIndex);
    }
}
function Rpages() {
    pageIndex ++;
    let c = alldata;

    let allpages = Math.ceil(c.length/everycount);
    let num_2 = "";
    let totalid = "total";
    let numid = "num";
    let pageid = "page";

    if(pageIndex > allpages){
        pageIndex = allpages;
        $("#"+totalid).html(c.length);
        $("#"+numid).html((c.length - Math.floor(c.length/everycount)*everycount)==0?everycount:(c.length - Math.floor(c.length/everycount)*everycount));
        $("#"+pageid).html(pageIndex);
        return;
    }else{
        let endIndex = (everycount*pageIndex - 1)>c.length-1?c.length-1:(everycount*pageIndex - 1);
        let index_0 = 0;
        for(let i = everycount*(pageIndex-1);i<=endIndex;i++){
            index_0++;
            num_2 += "<tr  class='table-row'>";
            for(let j = 0; j < c[i].length ;j++){
                num_2 += "<td class='table-cell'>" + c[i][j] + "</td>";
            }
            num_2 += "</tr>";
        }
        if(index_0 < everycount){
            let count = everycount - index_0;
            for(let i = 1;i<=count;i++){
                num_2 += "<tr  class='table-row'>";
                for(let j = 0; j < c[0].length ; j++){
                    num_2 += "<td class='table-cell'></td>";
                }
                num_2 += "</tr>";
            }
        }
        $("#table_row_body").html(num_2);
        $("#total").html(c.length);
        $("#num").html(endIndex - everycount*(pageIndex-1) + 1);
        $("#page").html(pageIndex);
    }
}