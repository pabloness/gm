let everycount = 20;//每页数据
let pageIndex = 1;
let alldata = [];
let c = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
$(function () {
    //1.监听一级菜单的点击事件
    $(".nav_1>li").click(function () {
        //1.1拿到二级菜单
        var $sub = $(this).children(".sub_1");
        //1.2让二级菜单展开
        $sub.slideDown(500);
        //1.3拿到所有非当前的二级菜单
        var other = $(this).siblings().children(".sub_1");
        //1.4让所有非当前二级菜单收起
        other.slideUp(500);
        //1.5让被点击的一级菜单箭头旋转
        $(this).addClass("current");
        //1.6让所有非被所有点击的一级菜单还原
        $(this).siblings().removeClass("current");
    });
    let data = JSON.parse(GetCookies("sids"));
    let services = "";
    for(let i in data){
        services += "<option value=" +data[i]+ " id="+i+">"+data[i]+"</option>";
    }
    $("#selservice").html(services);

    data = JSON.parse(GetCookies("pfs"));
    let pfs = "";
    for(let i in data){
        pfs += "<option value=" +data[i].pf+ " id="+data[i].pf+">"+data[i].desc+"</option>";
    }
    $("#selqudao").html(pfs);
    
    let sid_0 = $("#selservice option:selected").val();
    let pf_0 = $("#selqudao option:selected").val();
    let ctype_0 = $("#selsystem option:selected").val();
    let begintime = $("#begintime").val();
    // begintime = begintime.replace(/T/," ");
    // begintime += ":00";
    begintime = "2020-04-02 00:00:00";
    let endtime = $("#endtime").val();
    endtime = "2020-04-13 15:00:00";
    readTextFile("../config.json",function(text){
        let data = JSON.parse(text);
        IPconf = data.IPconf;
        prot = data.prot;
        httpHead = data.httpHead;
        getRealtime(GetCookies("token"),begintime,endtime,sid_0,pf_0,ctype_0);
    });
    

    let num ="";
    let first;
    if(everycount > c.length){
        first = c.length;
    }else{
        first = everycount;
    }
    for(let i in c){
        if(i < everycount*pageIndex){
            num += "<tr  class='table-row'>"
            num += "<td class='table-cell'>" + c[i] + "</td>"
            num += "<td class='table-cell'>" + c[i] + "</td>"
            num += "<td class='table-cell'>" + c[i] + "</td>"
            num += "<td class='table-cell'>" + c[i] + "</td>"
            num += "<td class='table-cell'>" + c[i] + "</td>"
            num += "<td class='table-cell'>" + c[i] + "</td>"
            num += "<td class='table-cell'>" + c[i] + "</td>"
            num += "<td class='table-cell'>" + c[i] + "</td>"
            num += "<td class='table-cell'>" + c[i] + "</td>"
            num += "<td class='table-cell'>" + c[i]  + "</td>"
            num += "<td class='table-cell'>" + c[i]  + "</td>"
            num += "<td class='table-cell'>" + c[i]  + "</td>"
            num += "<td class='table-cell'>" + c[i]  + "</td>"
            num += "<td class='table-cell'>" + c[i]  + "</td>"
            num += "<td class='table-cell'>" + c[i]  + "</td>"
            num += "<td class='table-cell'>" + c[i]  + "</td>"
            num += "</tr>"
        }
    }
    $("#total").html(c.length);
    $("#num").html(first);
    $("#page").html(pageIndex);
    $("#table-body").html(num);
})
function Fpages() {
    let first;
    if(everycount > c.length){
        first = c.length;
    }else{
        first = everycount;
    }
    pageIndex = pageIndex - 1;
    let num_1 = "";
    if(pageIndex <= 0){
        pageIndex = 1;
        $("#total").html(c.length);
        $("#num").html(first);
        $("#page").html(pageIndex);
        return;
    }else{
        let endIndex = (everycount*pageIndex - 1)>c.length-1?c.length-1:(everycount*pageIndex - 1);
        for(let i = everycount*(pageIndex-1);i<=endIndex;i++){
            num_1 += "<tr  class='table-row'>"
            num_1 += "<td class='table-cell'>" + c[i] + "</td>"
            num_1 += "<td class='table-cell'>" + c[i] + "</td>"
            num_1 += "<td class='table-cell'>" + c[i] + "</td>"
            num_1 += "<td class='table-cell'>" + c[i] + "</td>"
            num_1 += "<td class='table-cell'>" + c[i] + "</td>"
            num_1 += "<td class='table-cell'>" + c[i] + "</td>"
            num_1 += "<td class='table-cell'>" + c[i] + "</td>"
            num_1 += "<td class='table-cell'>" + c[i] + "</td>"
            num_1 += "<td class='table-cell'>" + c[i] + "</td>"
            num_1 += "<td class='table-cell'>" + c[i]  + "</td>"
            num_1 += "<td class='table-cell'>" + c[i]  + "</td>"
            num_1 += "<td class='table-cell'>" + c[i]  + "</td>"
            num_1 += "<td class='table-cell'>" + c[i]  + "</td>"
            num_1 += "<td class='table-cell'>" + c[i]  + "</td>"
            num_1 += "<td class='table-cell'>" + c[i]  + "</td>"
            num_1 += "<td class='table-cell'>" + c[i]  + "</td>"
            num_1 += "</tr>"
        }
        $("#table-body").html(num_1);
        $("#total").html(c.length);
        $("#num").html(endIndex-everycount*(pageIndex-1)+1);
        $("#page").html(pageIndex);
    }
}

function Rpages() {
    let allpages = Math.floor(c.length/everycount)  + 1;
    let num_2 = "";
    pageIndex = pageIndex + 1;
    if(pageIndex > allpages){
        pageIndex = allpages;
        $("#total").html(c.length);
        $("#num").html(c.length - Math.floor(c.length/everycount)*everycount);
        $("#page").html(pageIndex);
        return;
    }else{
        let endIndex = (everycount*pageIndex - 1)>c.length-1?c.length-1:(everycount*pageIndex - 1);
        for(let i = everycount*(pageIndex-1);i<=endIndex;i++){
            num_2 += "<tr  class='table-row'>"
            num_2 += "<td class='table-cell'>" + c[i] + "</td>"
            num_2 += "<td class='table-cell'>" + c[i] + "</td>"
            num_2 += "<td class='table-cell'>" + c[i] + "</td>"
            num_2 += "<td class='table-cell'>" + c[i] + "</td>"
            num_2 += "<td class='table-cell'>" + c[i] + "</td>"
            num_2 += "<td class='table-cell'>" + c[i] + "</td>"
            num_2 += "<td class='table-cell'>" + c[i] + "</td>"
            num_2 += "<td class='table-cell'>" + c[i] + "</td>"
            num_2 += "<td class='table-cell'>" + c[i] + "</td>"
            num_2 += "<td class='table-cell'>" + c[i]  + "</td>"
            num_2 += "<td class='table-cell'>" + c[i]  + "</td>"
            num_2 += "<td class='table-cell'>" + c[i]  + "</td>"
            num_2 += "<td class='table-cell'>" + c[i]  + "</td>"
            num_2 += "<td class='table-cell'>" + c[i]  + "</td>"
            num_2 += "<td class='table-cell'>" + c[i]  + "</td>"
            num_2 += "<td class='table-cell'>" + c[i]  + "</td>"
            num_2 += "</tr>"
        }
        $("#table-body").html(num_2);
        $("#total").html(c.length);
        $("#num").html(endIndex - everycount*(pageIndex-1) + 1);
        $("#page").html(pageIndex);
    }
}
function getRealtime(CS_token,CS_beginDate,CS_endDate,CS_sid,CS_pf,CS_ctype){
    if(!CS_beginDate || !CS_endDate){
        if(!CS_beginDate){
            alert("请选择开始时间");
            return;
        }
        if(!CS_endDate){
            alert("请选择结尾时间");
            return;
        }
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+IPconf+':'+prot+'/realtimeStatistics', true);
    httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        beginDate:CS_beginDate,
        endDate:CS_endDate,
        sid:CS_sid,
        pf:CS_pf,
        ctype:CS_ctype,
    });
    console.log(reqData);
    httpRequest.send(reqData);
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            let json = httpRequest.responseText;
            let respData = eval("(" + json + ")");
            if(respData.hasOwnProperty("error")){
                alert(respData.error);
                return;
            }
            console.log(respData);
        }
    }
}
