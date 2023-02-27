let alldata = [];
let pageIndex = 1;
let everycount = 20;
let curli = "";
let curaid = "";
let myChart;
$(function(){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    let data = JSON.parse(GetCookies("sids"));
    //服务器
    let services = "";
    services += "<option value= 'all' id= 'allservice'>全部</option>";
    for(let i in data){
        services += "<option value=" +data[i]+ " id="+i+">"+data[i]+"</option>";
    }
    $("#selservice").html(services);


    data = JSON.parse(GetCookies("urls"));
    
    //渠道
    data = JSON.parse(GetCookies("pfs"));
    let pfs = "";
    pfs += "<option value= 'all' id= 'allqudao'>全部</option>";
    for (let i in data) {
        pfs += "<option value=" +data[i].pf+ " id="+data[i].pf+">"+data[i].desc+"</option>";
    }
    $("#selqudao").html(pfs);

    if(isNullorUndefined(GetCookies("starttime"))||GetCookies("starttime")==""){
        document.getElementById('starttime').value = getNowdate();
    }else{
        document.getElementById('starttime').value = GetCookies("starttime");
    }
    if(isNullorUndefined(GetCookies("endtime"))||GetCookies("endtime")==""){
        document.getElementById('endtime').value = getNowdate();
    }else{
        document.getElementById('endtime').value = GetCookies("endtime");
    }
    myChart = echarts.init(document.getElementById('chartmain'));
    var option = {
        title:{
            text:'收入分析'
        },
        tooltip:{},
        legend:{
            },
        xAxis:{
            name:"天",
        },
        yAxis:{

        },
        label: {
            
        },
        series:[]
    };
    myChart.setOption(option);
    readTextFile("../config.json",function(text){
        let data = JSON.parse(text);
        IPconf = data.IPconf;
        prot = data.prot;
        httpHead = data.httpHead;
        clickli("first","a_0");
    });
    
    document.getElementById('a_0').onclick = function(){
        clickli("first","a_0");
    }
    document.getElementById('a_1').onclick = function(){
        clickli("second","a_1");
    }
    document.getElementById('a_2').onclick = function(){
        clickli("third","a_2");
    }
    document.getElementById('searchbtn').onclick = function(){
        clickli(curli,curaid);
    }

    
})
function clickli(liid,aid){
    curaid = aid;
    curli = liid;
    let revenue = document.getElementById('revenue_id');
    let allli = revenue.getElementsByTagName("li");
    let alla = revenue.getElementsByTagName('a');
    for(let i = 0;i<allli.length;i++){
        if(allli[i].id!=liid){
            allli[i].style.background = "#f0f0f0";
        }else{
            allli[i].style.background = "#08a2ba"
        }
    }
    for(let i = 0; i < alla.length; i++){
        if(alla[i].id!=aid){
            alla[i].style.color = "#000033";
        }else{
            alla[i].style.color = "#ffffff";
        }
    }
    let sid_0 = $("#selservice option:selected").val();
    sid_0 = sid_0=="all"?undefined:sid_0;
    let pf_0 = $("#selqudao option:selected").val();
    pf_0 = pf_0=="all"?undefined:pf_0;
    let ctype_0 = $("#selsystem option:selected").val();
    ctype_0 = ctype_0==0?undefined:ctype_0;
    let begintime_0 = $("#starttime").val();
    let endtime_0 = $("#endtime").val();
    if(aid == "a_0"){
        document.getElementById("rightbtn").onclick = function(){
            Rpages(1);
        }
        document.getElementById("leftbtn").onclick = function(){
            Fpages(1);
        }
        statistics11(GetCookies("token"),ctype_0,pf_0,sid_0,begintime_0,endtime_0);
    }else if(aid == "a_1"){
        document.getElementById("rightbtn").onclick = function(){
            Rpages(2);
        }
        document.getElementById("leftbtn").onclick = function(){
            Fpages(2);
        }
        statistics12(GetCookies("token"),ctype_0,pf_0,sid_0,begintime_0,endtime_0);
    }else if(aid == "a_2"){
        document.getElementById("rightbtn").onclick = function(){
            Rpages(3);
        }
        document.getElementById("leftbtn").onclick = function(){
            Fpages(3);
        }
        statistics13(GetCookies("token"),ctype_0,pf_0,sid_0,begintime_0,endtime_0);
    }
}
function Fpages(index) {
    let first;
    let totalid = "total"
    let numid = "num";
    let pageid = "page";
    let tableid = "table_body";
    let c = alldata[index];
    pageIndex--;
    if(everycount > c.length){
        first = c.length;
    }else{
        first = everycount;
    }
    
    let num_1 = "";
    if(pageIndex <= 0){
        pageIndex = 1;
        $("#"+totalid).html(c.length);
        $("#"+numid).html(first);
        $("#"+pageid).html(pageIndex);
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
        $("#"+tableid).html(num_1);
        $("#"+totalid).html(c.length);
        $("#"+numid).html(endIndex-everycount*(pageIndex-1)+1);
        $("#"+pageid).html(pageIndex);
    }
}
function Rpages(index) {
    let c = alldata[index] ;
    pageIndex++;
    let tableid;
    
    tableid = "table_body";

    let allpages = Math.ceil(c.length/everycount);
    let num_2 = "";
    let totalid = "total";
    let numid = "num";
    let pageid = "page";

    if(pageIndex > allpages){
        if(index == 1){
            pageIndex_1 = allpages;
            pageIndex = pageIndex_1;
        }else if(index == 2){
            pageIndex_2 = allpages;
            pageIndex = pageIndex_2;
        }else if(index == 3){
            pageIndex_3 = allpages;
            pageIndex = pageIndex_3;
        } 
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
        $("#"+tableid).html(num_2);
        $("#"+totalid).html(c.length);
        $("#"+numid).html(endIndex - everycount*(pageIndex-1) + 1);
        $("#"+pageid).html(pageIndex);
    }
}
/**
 * 数据统计-收入分析-收入总览
 */
function statistics11(CS_token,CS_ctype,CS_pf,CS_sid,CS_beginDate,CS_endDate){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
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
    httpRequest.open('POST', httpHead+ IPconf + ':' + prot + '/statistics11',true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        pf:CS_pf,
        sid:CS_sid,
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
            pageIndex = 1;
            let num = "";
            let index_0 = 0;

            setEchart(respData,myChart);

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
            alldata[1] = respData.form;
            alldata[1].splice(0,1);
            $("#total").html(respData.form.length); //
            $("#page").html(pageIndex);
            $("#num").html(index);

            $("#table_head").html(headnum);
            $("#table_body").html(num);
        }
    }
}
/**
 * 数据统计-收入分析-付费等级
 */
function statistics12(CS_token,CS_ctype,CS_pf,CS_sid,CS_beginDate,CS_endDate){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
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
    httpRequest.open('POST', httpHead+ IPconf + ':' + prot + '/statistics12',true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        pf:CS_pf,
        sid:CS_sid,
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
            pageIndex = 1;
            let num = "";
            let index_0 = 0;

            setEchart(respData,myChart);

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
            alldata[2] = respData.form;
            alldata[2].splice(0,1);
            $("#total").html(respData.form.length); //
            $("#page").html(pageIndex);
            $("#num").html(index);

            $("#table_head").html(headnum);
            $("#table_body").html(num);
        }
    }
}

/**
 * 数据统计-收入分析-渠道占比
 */
function statistics13(CS_token,CS_ctype,CS_pf,CS_sid,CS_beginDate,CS_endDate){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
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
    httpRequest.open('POST', httpHead+ IPconf + ':' + prot + '/statistics13',true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        pf:CS_pf,
        sid:CS_sid,
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
            pageIndex = 1;
            let num = "";
            let index_0 = 0;

            setEchart(respData,myChart);

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
            alldata[3] = respData.form;
            alldata[3].splice(0,1);
            $("#total").html(respData.form.length); //
            $("#page").html(pageIndex);
            $("#num").html(index);

            $("#table_head").html(headnum);
            $("#table_body").html(num);
        }
    }
}