let pageIndex = 1;
let everycount = 20;
let alldata = [];
let myChart;
$(function (){
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
            text:'等级详情'
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
        //statistics9(GetCookies("token"),ctype_0,pf_0,sid_0,begintime_0,endtime_0);
    });
    tablebody(4);

    document.getElementById('searchbtn').onclick = function(){
        let sid = $("#selservice option:selected").val();
        sid = sid=="all"?undefined:sid;
        let pf= $("#selqudao option:selected").val();
        pf = pf=="all"?undefined:pf;
        let ctype = $("#selsystem option:selected").val();
        ctype = ctype==0?undefined:ctype;
        let begintime = $("#starttime").val();
        let endtime = $("#endtime").val();
        statistics9(GetCookies("token"),ctype,pf,sid,begintime,endtime);
    }

})

function statistics9(CS_token,CS_ctype,CS_pf,CS_sid,CS_beginDate,CS_endDate){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    if(isNullorUndefined(CS_beginDate) || CS_beginDate == ""){
        alert("请选择开始时间");
        return;
    }
    if(isNullorUndefined(CS_endDate) || CS_endDate == ""){
        alert("请选择结尾时间");
        return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+ IPconf + ':' + prot + '/statistics9',true);
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
            setEchart(respData,myChart);
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