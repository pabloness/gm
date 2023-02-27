let curliid_zhibiao = "";
let curaid_zhibiao = "";
let curliid_retain = "";
let curaid_retain = "";
let pageIndex_1 = 1;
let pageIndex_2 = 1;
let pageIndex_3 = 1;
let everycount = 10;
let alldata_1 = []; //关键指标
let alldata_2 = []; //付费渗透
let alldata_3 = []; //玩家留存
let mychart_1;
let mychart_2;
let mychart_3;
$(function () {
    if(isNullorUndefined(GetCookies("token"))){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
    }

    let data = JSON.parse(GetCookies("sids"));
    //服务器
    let services = "";
    services += "<option value= 'all' id= 'allservices'>全部</option>";
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

    mychart_1 = echarts.init(document.getElementById('mychart_1'));
    mychart_2 = echarts.init(document.getElementById('mychart_2'));
    mychart_3 = echarts.init(document.getElementById('mychart_3'));
    var option = {
        title:{
            text:'LTV'
        },
        tooltip:{},
        legend:{
            },
        xAxis:{
            
        },
        yAxis:{

        },
        label: {
            
        },
        series:[]
    };
    mychart_1.setOption(option);
    mychart_2.setOption(option);
    mychart_3.setOption(option);

    let sid_0 = $("#selservice option:selected").val()=="all"?undefined:$("#selservice option:selected").val();
    let pf_0 = $("#selqudao option:selected").val()=="all"?undefined:$("#selqudao option:selected").val();
    let ctype_0 = $("#selsystem option:selected").val()==0?undefined:$("#selsystem option:selected").val();
    let begintime_0 = $("#starttime").val();
    let endtime_0 = $("#endtime").val();
    
    readTextFile("../config.json",function(text){
        let data = JSON.parse(text);
        IPconf = data.IPconf;
        prot = data.prot;
        httpHead = data.httpHead;
        statistics1(GetCookies("token"),ctype_0,pf_0,sid_0,begintime_0,endtime_0);
        statistics5(GetCookies("token"),ctype_0,pf_0,sid_0,begintime_0,endtime_0);
        clickli_zhibiao("what","a_0");
        clickli_retain("fouth","a_3");
    })
    document.getElementById("rightbtn_2").onclick = function(){
        Rpages(2,1);
    }
    document.getElementById("leftbtn_2").onclick = function(){
        Fpages(2,1);
    }
    document.getElementById("a_0").onclick=function(){
        clickli_zhibiao("what","a_0");
    } ;
    document.getElementById("a_1").onclick=function(){
        clickli_zhibiao("second","a_1");
    };
    document.getElementById("a_2").onclick=function(){
        clickli_zhibiao("third","a_2");
    };
    document.getElementById("a_3").onclick=function(){
        clickli_retain("fouth","a_3");
    };
    document.getElementById("a_4").onclick=function(){
        clickli_retain("fifth","a_4");
    };

    $(".button").click(function(){
        //alert("啊呀呀呀"+JSON.parse(GetCookies("token")));
        let sid = $("#selservice option:selected").val();
        sid = sid=="all"?undefined:sid;
        let pf = $("#selqudao option:selected").val();
        pf = pf=="all"?undefined:pf;
        let ctype = $("#selsystem option:selected").val();
        ctype = ctype==0?undefined:ctype;
        let begintime = $("#starttime").val();
        let endtime = $("#endtime").val();
        statistics1(GetCookies("token"),ctype,pf,sid,begintime,endtime);
        statistics5(GetCookies("token"),ctype,pf,sid,begintime,endtime);
        clickli_zhibiao(curliid_zhibiao,curaid_zhibiao);
        clickli_retain(curliid_retain,curaid_retain);
    });
})

function clickli_zhibiao(liid,aid){
    curliid_zhibiao = liid;
    curaid_zhibiao = aid;
    let zhibiao = document.getElementById('zhibiao');
    let allli = zhibiao.getElementsByTagName("li");
    let alla = zhibiao.getElementsByTagName('a');
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
    ctype_0 = ctype_0 == 0?undefined:ctype_0;
    let begintime_0 = $("#starttime").val();
    let endtime_0 = $("#endtime").val();
    if(aid == "a_0"){
        document.getElementById("rightbtn_1").onclick = function(){
            Rpages(1,1);
        }
        document.getElementById("leftbtn_1").onclick = function(){
            Fpages(1,1);
        }
        statistics2(GetCookies("token"),ctype_0,pf_0,sid_0,begintime_0,endtime_0);
    }else if(aid == "a_1"){
        document.getElementById("rightbtn_1").onclick = function(){
            Rpages(1,2);
        }
        document.getElementById("leftbtn_1").onclick = function(){
            Fpages(1,2);
        }
        statistics3(GetCookies("token"),ctype_0,pf_0,sid_0,begintime_0,endtime_0);
    }else if(aid == "a_2"){
        document.getElementById("rightbtn_1").onclick = function(){
            Rpages(1,3);
        }
        document.getElementById("leftbtn_1").onclick = function(){
            Fpages(1,3);
        }
        statistics4(GetCookies("token"),ctype_0,pf_0,sid_0,begintime_0,endtime_0);
    }
}
function clickli_retain(liid,aid){
    curliid_retain = liid;
    curaid_retain= aid;
    let retain = document.getElementById('retain');
    let allli = retain.getElementsByTagName("li");
    let alla = retain.getElementsByTagName('a');
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
    if(aid == "a_3"){
        document.getElementById("rightbtn_3").onclick = function(){
            Rpages(3,1);
        }
        document.getElementById("leftbtn_3").onclick = function(){
            Fpages(3,1);
        }
        statistics7(GetCookies("token"),ctype_0,pf_0,sid_0,begintime_0,endtime_0);
    }else if(aid == "a_4"){
        document.getElementById("rightbtn_3").onclick = function(){
            Rpages(3,2);
        }
        document.getElementById("leftbtn_3").onclick = function(){
            Fpages(3,2);
        }
        statistics6(GetCookies("token"),ctype_0,pf_0,sid_0,begintime_0,endtime_0);
    }
}
/**
 * 
 * @param {*} index 用来定位是哪个大表，1：关键指标，2：付费渗透，3：玩家留存
 * @param {*} index_index 用来定位表数据
 */
function Fpages(index,index_index) {
    let first;
    let pageIndex;
    let totalid = "total_"+index;
    let numid = "num_"+index;
    let pageid = "page_"+index;
    let tableid;
    let c;
    
    if(index == 1){
        c = alldata_1[index_index];
        pageIndex_1 -= 1;
        pageIndex = pageIndex_1;
        tableid = "zhibiao_table_body";
    }else if(index == 2){
        c = alldata_2[index_index];
        tableid = "shentou_table_body";
        pageIndex_2 -= 1;
        pageIndex = pageIndex_2;
    }else if(index == 3){
        c = alldata_3[index_index];
        tableid = "retain_table_body";
        pageIndex_3 -= 1;
        pageIndex = pageIndex_3;
    }
    if(everycount > c.length){
        first = c.length;
    }else{
        first = everycount;
    }
    
    let num_1 = "";
    if(pageIndex <= 0){
        if(index == 1){
            pageIndex_1 = 1;
            pageIndex = pageIndex_1;
        }else if(index == 2){
            pageIndex_2 = 1;
            pageIndex = pageIndex_2;
        }else if(index == 3){
            pageIndex_3 = 1;
            pageIndex = pageIndex_3;
        }
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
function Rpages(index,index_index) {
    let c ;
    let pageIndex;
    let tableid;
    if(index == 1){
        c = alldata_1[index_index];
        pageIndex_1 += 1;
        pageIndex = pageIndex_1;
        tableid = "zhibiao_table_body";
    }else if(index == 2){
        c = alldata_2[index_index];
        pageIndex_2 += 1;
        tableid = "shentou_table_body";
        pageIndex = pageIndex_2;
    }else if(index == 3){
        c = alldata_3[index_index];
        pageIndex_3 += 1;
        tableid = "retain_table_body";
        pageIndex = pageIndex_3;
    }

    let allpages = Math.ceil(c.length/everycount);
    let num_2 = "";
    let totalid = "total_"+index;
    let numid = "num_"+index;
    let pageid = "page_"+index;

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
 * 数据总览-简要
 */
function statistics1(CS_token,CS_ctype,CS_pf,CS_sid,CS_begindate,CS_endate){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    if(isNullorUndefined(CS_begindate) || CS_begindate == ""){
        alert("请选择开始时间");
        return;
    }
    if(isNullorUndefined(CS_endate) || CS_endate == ""){
        alert("请选择结尾时间");
        return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+IPconf+':'+prot+'/statistics1', true);
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    let data = JSON.stringify({
        token:JSON.parse(CS_token),
        pf:CS_pf,
        ctype:CS_ctype,
        sid:CS_sid,
        beginDate:CS_begindate,
        endDate:CS_endate,
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
            let num = "";
            for(let i = 1 ; i < data.form.length ; i ++){
                num += "<tr class='table-row'>";
                for(let j in data.form[i]){
                    num += "<td class='table-cell'>"+data.form[i][j]+"</td>";
                }
                num += "</tr>";
            }
            let headnum = "<tr class='table-header-row'>"//"<ul class='table-header-row'>";
            for(let i in data.form[0]){
                headnum += "<th class = 'table-cell'>" + data.form[0][i] +"</th>";
            }
            headnum += "</tr>";
            $("#table-head").html(headnum);
            $("#table-body").html(num);
            // let fifleName = sid+"_"+pf+"_"+ctype;
            // export_xls('print_table',fifleName);
        }
    }
}
/**
 * 数据总览-关键指标-新增激活和账户
 */
function statistics2(CS_token,CS_ctype,CS_pf,CS_sid,CS_begindate,CS_endate){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    if(isNullorUndefined(CS_begindate) || CS_begindate == ""){
        alert("请选择开始时间");
        return;
    }
    if(isNullorUndefined(CS_endate) || CS_endate == ""){
        alert("请选择结尾时间");
        return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+IPconf+':'+prot+'/statistics2', true);
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    let data = JSON.stringify({
        token:JSON.parse(CS_token),
        pf:CS_pf,
        ctype:CS_ctype,
        sid:CS_sid,
        beginDate:CS_begindate,
        endDate:CS_endate,
    });
    httpRequest.send(data);
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState == 4 && httpRequest.status==200){
            let json = httpRequest.responseText;
            let data =  eval("(" + json + ")");
            if(data.hasOwnProperty("error")){
                alert(data.error);
                return;
            }
            setEchart(data,mychart_1,"新增用户/角色");

            $("#title_1").html(data.briefing);
            pageIndex_1 = 1;
            let num = "";
            let index_0 = 0;
            for(let i = 1 ; i < data.form.length ; i ++){
                index_0 ++;
                num += "<tr class='table-row'>";
                for(let j in data.form[i]){
                    //每页7行
                    if(i <= everycount*pageIndex_1){
                        num += "<td class='table-cell'>"+data.form[i][j]+"</td>";
                    }
                }
                num += "</tr>";
            }
            if(index_0 < everycount){
                let count = everycount - index_0;
                for(let i = 1;i<=count;i++){
                    num += "<tr  class='table-row'>";
                    for(let j = 0; j < data.form[0].length ; j++){
                        num += "<td class='table-cell'></td>";
                    }
                    num += "</tr>";
                }
            }
            let headnum = "<tr class='table-header-row'>"//"<ul class='table-header-row'>";
            for(let i in data.form[0]){
                headnum += "<th class = 'table-cell'>" + data.form[0][i] +"</th>";
            }
            headnum += "</tr>";
            let index;
            if(everycount > data.form.length-1){
                index = data.form.length-1;
            }else{
                index = everycount;
            }
            alldata_1[1] = data.form;
            alldata_1[1].splice(0,1);
            $("#total_1").html(data.form.length); //
            $("#page_1").html(pageIndex_1);
            $("#num_1").html(index);

            $("#zhibiao_table_head").html(headnum);
            $("#zhibiao_table_body").html(num);
        }
    }
}

/**
 * 数据总览-关键指标-活跃玩家
 */
function statistics3(CS_token,CS_ctype,CS_pf,CS_sid,CS_begindate,CS_endate){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    if(isNullorUndefined(CS_begindate) || CS_begindate == ""){
        alert("请选择开始时间");
        return;
    }
    if(isNullorUndefined(CS_endate) || CS_endate == ""){
        alert("请选择结尾时间");
        return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+IPconf+':'+prot+'/statistics3', true);
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    let data = JSON.stringify({
        token:JSON.parse(CS_token),
        pf:CS_pf,
        ctype:CS_ctype,
        sid:CS_sid,
        beginDate:CS_begindate,
        endDate:CS_endate,
    });
    httpRequest.send(data);
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState == 4 && httpRequest.status==200){
            let json = httpRequest.responseText;
            let data =  eval("(" + json + ")");
            if(data.hasOwnProperty("error")){
                alert(data.error);
                return;
            }
            setEchart(data,mychart_1,"活跃玩家");

            $("#title_1").html(data.briefing);
            pageIndex_1 = 1;
            let num = "";
            let index_0 = 0;
            for(let i = 1 ; i < data.form.length ; i ++){
                index_0 ++;
                num += "<tr class='table-row'>";
                if(i <= everycount){
                    for(let j in data.form[i]){
                        num += "<td class='table-cell'>"+data.form[i][j]+"</td>";
                    }
                }
                num += "</tr>";
            }
            if(index_0 < everycount){
                let count = everycount - index_0;
                for(let i = 1;i<=count;i++){
                    num += "<tr  class='table-row'>";
                    for(let j = 0; j < data.form[0].length ; j++){
                        num += "<td class='table-cell'></td>";
                    }
                    num += "</tr>";
                }
            }
            let headnum = "<tr class='table-header-row'>"//"<ul class='table-header-row'>";
            for(let i in data.form[0]){
                headnum += "<th class = 'table-cell'>" + data.form[0][i] +"</th>";
            }
            headnum += "</tr>";
            let index;
            if(everycount > data.form.length-1){
                index = data.form.length-1;
            }else{
                index = everycount;
            }
            alldata_1[2] = data.form;
            alldata_1[2].splice(0,1);
            $("#total_1").html(data.form.length); //
            $("#page_1").html(pageIndex_1);
            $("#num_1").html(index);
            
            $("#zhibiao_table_head").html(headnum);
            $("#zhibiao_table_body").html(num);
        }
    }
}
/**
 * 数据总览-关键指标-付费玩家
 */
function statistics4(CS_token,CS_ctype,CS_pf,CS_sid,CS_begindate,CS_endate){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    if(isNullorUndefined(CS_begindate) || CS_begindate == ""){
        alert("请选择开始时间");
        return;
    }
    if(isNullorUndefined(CS_endate) || CS_endate == ""){
        alert("请选择结尾时间");
        return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+IPconf+':'+prot+'/statistics4', true);
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    let data = JSON.stringify({
        token:JSON.parse(CS_token),
        pf:CS_pf,
        sid:CS_sid,
        ctype:CS_ctype,
        beginDate:CS_begindate,
        endDate:CS_endate,
    });
    httpRequest.send(data);
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState == 4 && httpRequest.status==200){
            let json = httpRequest.responseText;
            let data =  eval("(" + json + ")");
            if(data.hasOwnProperty("error")){
                alert(data.error);
                return;
            }
            setEchart(data,mychart_1,"付费玩家");
            $("#title_1").html(data.briefing);
            pageIndex_1 = 1;
            let num = "";
            let index_0 = 0;
            for(let i = 1 ; i < data.form.length ; i ++){
                index_0 ++;
                num += "<tr class='table-row'>";
                if(i <= everycount){
                    for(let j in data.form[i]){
                        num += "<td class='table-cell'>"+data.form[i][j]+"</td>";
                    }
                }
                num += "</tr>";
            }
            if(index_0 < everycount){
                let count = everycount - index_0;
                for(let i = 1;i<=count;i++){
                    num += "<tr  class='table-row'>";
                    for(let j = 0; j < data.form[0].length ; j++){
                        num += "<td class='table-cell'></td>";
                    }
                    num += "</tr>";
                }
            }
            let headnum = "<tr class='table-header-row'>"//"<ul class='table-header-row'>";
            for(let i in data.form[0]){
                headnum += "<th class = 'table-cell'>" + data.form[0][i] +"</th>";
            }
            headnum += "</tr>";
            let index;
            if(everycount > data.form.length-1){
                index = data.form.length-1;
            }else{
                index = everycount;
            }
            alldata_1[3] = data.form;
            alldata_1[3].splice(0,1);
            $("#total_1").html(data.form.length); //
            $("#page_1").html(pageIndex_1);
            $("#num_1").html(index);
            
            $("#zhibiao_table_head").html(headnum);
            $("#zhibiao_table_body").html(num);
        }
    }
}
/**
 * 数据总览-付费渗透
 */
function statistics5(CS_token,CS_ctype,CS_pf,CS_sid,CS_begindate,CS_endate){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    if(isNullorUndefined(CS_begindate) || CS_begindate == ""){
        alert("请选择开始时间");
        return;
    }
    if(isNullorUndefined(CS_endate) || CS_endate == ""){
        alert("请选择结尾时间");
        return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+IPconf+':'+prot+'/statistics5', true);
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    let data = JSON.stringify({
        token:JSON.parse(CS_token),
        pf:CS_pf,
        ctype:CS_ctype,
        sid:CS_sid,
        beginDate:CS_begindate,
        endDate:CS_endate,
    });
    httpRequest.send(data);
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState == 4 && httpRequest.status==200){
            let json = httpRequest.responseText;
            let data =  eval("(" + json + ")");
            if(data.hasOwnProperty("error")){
                alert(data.error);
                return;
            }
            setEchart(data,mychart_2,"付费渗透");
            $("#title_2").html(data.briefing);
            pageIndex_2 = 1;
            let num = "";
            let index_0 = 0;
            for(let i = 1 ; i < data.form.length ; i ++){
                index_0 ++;
                num += "<tr class='table-row'>";
                if(i <= everycount){
                    for(let j in data.form[i]){
                        num += "<td class='table-cell'>"+data.form[i][j]+"</td>";
                    }
                }
                num += "</tr>";
            }
            if(index_0 < everycount){
                let count = everycount - index_0;
                for(let i = 1;i<=count;i++){
                    num += "<tr  class='table-row'>";
                    for(let j = 0; j < data.form[0].length ; j++){
                        num += "<td class='table-cell'></td>";
                    }
                    num += "</tr>";
                }
            }
            let headnum = "<tr class='table-header-row'>"//"<ul class='table-header-row'>";
            for(let i in data.form[0]){
                headnum += "<th class = 'table-cell'>" + data.form[0][i] +"</th>";
            }
            headnum += "</tr>";
            let index;
            if(everycount > data.form.length-1){
                index = data.form.length-1;
            }else{
                index = everycount;
            }
            alldata_2[1] = data.form;
            alldata_2[1].splice(0,1);
            $("#total_2").html(data.form.length); //
            $("#page_2").html(pageIndex_1);
            $("#num_2").html(index);
            
            $("#shentou_table_head").html(headnum);
            $("#shentou_table_body").html(num);
        }
    }
}
/**
 * 数据总览-玩家留存-新增账户留存
 */
function statistics6(CS_token,CS_ctype,CS_pf,CS_sid,CS_begindate,CS_endate){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    if(isNullorUndefined(CS_begindate) || CS_begindate == ""){
        alert("请选择开始时间");
        return;
    }
    if(isNullorUndefined(CS_endate) || CS_endate == ""){
        alert("请选择结尾时间");
        return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+IPconf+':'+prot+'/statistics6', true);
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    let data = JSON.stringify({
        token:JSON.parse(CS_token),
        pf:CS_pf,
        ctype:CS_ctype,
        sid:CS_sid,
        beginDate:CS_begindate,
        endDate:CS_endate,
    });
    httpRequest.send(data);
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState == 4 && httpRequest.status==200){
            let json = httpRequest.responseText;
            let data =  eval("(" + json + ")");
            if(data.hasOwnProperty("error")){
                alert(data.error);
                return;
            }
            setEchart(data,mychart_3,"新增账户留存");
            $("#title_3").html(data.briefing);
            pageIndex_2 = 1;
            let num = "";
            let index_0 = 0;
            for(let i = 1 ; i < data.form.length ; i ++){
                index_0 ++;
                num += "<tr class='table-row'>";
                if(i <= everycount){
                    for(let j in data.form[i]){
                        num += "<td class='table-cell'>"+data.form[i][j]+"</td>";
                    }
                }
                num += "</tr>";
            }
            if(index_0 < everycount){
                let count = everycount - index_0;
                for(let i = 1;i<=count;i++){
                    num += "<tr  class='table-row'>";
                    for(let j = 0; j < data.form[0].length ; j++){
                        num += "<td class='table-cell'></td>";
                    }
                    num += "</tr>";
                }
            }
            let headnum = "<tr class='table-header-row'>"//"<ul class='table-header-row'>";
            for(let i in data.form[0]){
                headnum += "<th class = 'table-cell'>" + data.form[0][i] +"</th>";
            }
            headnum += "</tr>";
            let index;
            if(everycount > data.form.length-1){
                index = data.form.length-1;
            }else{
                index = everycount;
            }
            alldata_3[2] = data.form;
            alldata_3[2].splice(0,1);
            $("#total_3").html(data.form.length); //
            $("#page_3").html(pageIndex_1);
            $("#num_3").html(index);
            
            $("#retain_table_head").html(headnum);
            $("#retain_table_body").html(num);
        }
    }
}
/**
 * 数据总览-玩家留存-新增设备留存
 */
function statistics7(CS_token,CS_ctype,CS_pf,CS_sid,CS_begindate,CS_endate){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    if(isNullorUndefined(CS_begindate) || CS_begindate == ""){
        alert("请选择开始时间");
        return;
    }
    if(isNullorUndefined(CS_endate) || CS_endate == ""){
        alert("请选择结尾时间");
        return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+IPconf+':'+prot+'/statistics7', true);
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    let data = JSON.stringify({
        token:JSON.parse(CS_token),
        pf:CS_pf,
        ctype:CS_ctype,
        sid:CS_sid,
        beginDate:CS_begindate,
        endDate:CS_endate,
    });
    httpRequest.send(data);
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState == 4 && httpRequest.status==200){
            let json = httpRequest.responseText;
            let data =  eval("(" + json + ")");
            if(data.hasOwnProperty("error")){
                alert(data.error);
                return;
            }
            setEchart(data,mychart_3,"新增设备留存");
            $("#title_3").html(data.briefing);
            pageIndex_2 = 1;
            let num = "";
            let index_0 = 0;
            for(let i = 1 ; i < data.form.length ; i ++){
                index_0 ++;
                num += "<tr class='table-row'>";
                if(i <= everycount){
                    for(let j in data.form[i]){
                        num += "<td class='table-cell'>"+data.form[i][j]+"</td>";
                    }
                }
                num += "</tr>";
            }
            if(index_0 < everycount){
                let count = everycount - index_0;
                for(let i = 1;i<=count;i++){
                    num += "<tr  class='table-row'>";
                    for(let j = 0; j < data.form[0].length ; j++){
                        num += "<td class='table-cell'></td>";
                    }
                    num += "</tr>";
                }
            }
            let headnum = "<tr class='table-header-row'>"//"<ul class='table-header-row'>";
            for(let i in data.form[0]){
                headnum += "<th class = 'table-cell'>" + data.form[0][i] +"</th>";
            }
            headnum += "</tr>";
            let index;
            if(everycount > data.form.length-1){
                index = data.form.length-1;
            }else{
                index = everycount;
            }
            alldata_3[1] = data.form;
            alldata_3[1].splice(0,1);
            $("#total_3").html(data.form.length); //
            $("#page_3").html(pageIndex_1);
            $("#num_3").html(index);
            
            $("#retain_table_head").html(headnum);
            $("#retain_table_body").html(num);
        }
    }
}
