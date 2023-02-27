let pageIndex = 1;
let alldata = [];
let everycount = 20;
let x;
let y;
let selindex;
$(function(){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    document.onmousemove=function(e){
        e=e? e:window.event;
        x=e.clientX;
        y=e.clientY;
    }
    $(document).click(function(event){
        var _con = $('.listmodel>.listtitle');  // 设置目标区域
        var con_1 = $("#listdrop");
        if(!_con.is(event.target) && _con.has(event.target).length === 0 && !con_1.is(event.target) && con_1.has(event.target).length === 0){ // Mark 1
        //$('#divTop').slideUp('slow');  //滑动消失
            $('#listdrop').hide(1);     //淡出消失
        }
    })
    $("body").delegate(".listmodel>.listtitle", "click", function () {
        let id = $(this).children("span");
        selindex = id[0].id;
        document.getElementById("listdrop").style.left = x + "px";
        document.getElementById("listdrop").style.top = y + "px";
        listdrop_x = x;
        listdrop_y = y;
        $("#listdrop").show(1);
    })
    let data = JSON.parse(GetCookies("sids"));
    //服务器
    let services = "";
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
        //roleStatistics(GetCookies("token"),ctype_0,pf_0,sid_0,begintime_0,endtime_0);
    });

    tablebody(20);
    

    document.getElementById('searchbtn').onclick = function(){
        let sid = $("#selservice option:selected").val();
        sid = sid=="all"?undefined:sid;
        let pf= $("#selqudao option:selected").val();
        pf = pf=="all"?undefined:pf;
        let ctype = $("#selsystem option:selected").val();
        ctype = ctype==0?undefined:ctype;
        let begintime = $("#starttime").val();
        let endtime = $("#endtime").val();
        let uid = $("#uid").val()== ""?undefined:$("#uid").val();
        roleStatistics(GetCookies("token"),ctype,pf,sid,begintime,endtime,uid);
    }
    document.getElementById('sTob').onclick = function(){
        $('#listdrop').hide(1);
        ascend();
    }
    document.getElementById('bTos').onclick = function(){
        $('#listdrop').hide(1);
        descend();
    }
})

function roleStatistics(CS_token,CS_ctype,CS_pf,CS_sid,CS_beginDate,CS_endDate,CS_uid){
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
    httpRequest.open('POST', httpHead+ IPconf + ':' + prot + '/operate1',true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        pf:CS_pf,
        sid:CS_sid,
        ctype:CS_ctype,
        beginDate:CS_beginDate,
        endDate:CS_endDate,
        nick:CS_uid,
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
                if(i <= everycount*pageIndex){
                    num += "<td class='table-cell'>"+i+"</td>";
                }
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
            headnum += "<th class = 'table-cell'>序号</th>";
            for(let i in respData.form[0]){
                if(i == 4 || i == 5 || i== 6 || i==7 || i==8 || i==10 || i==14){
                    headnum += "<th class = 'table-cell'>";
                    headnum += "<div class = 'listmodel'>";
                    headnum += "<div class = 'listtitle'>";
                    headnum += "<span id=" + i + ">" + respData.form[0][i] + "</span>";
                    headnum += "</div>";
                    headnum += "</div>";
                    headnum += "</th>";
                }else{
                    headnum += "<th class = 'table-cell'>" + respData.form[0][i] +"</th>";
                }
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
            num_1 += "<td class='table-cell'>"+(i+1)+"</td>";
            for(let j = 0; j < c[i].length ;j++){
                num_1 += "<td class='table-cell'>" + c[i][j] + "</td>";
            }
            num_1 += "</tr>";
        }
        if(index_0 < everycount){
            let count = everycount - index_0;
            for(let i = 1;i<=count;i++){
                num_1 += "<tr  class='table-row'>";
                num_1 += "<td class='table-cell'></td>";
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
            num_2 += "<td class='table-cell'>"+(i+1)+"</td>";
            for(let j = 0; j < c[i].length ;j++){
                num_2 += "<td class='table-cell'>" + c[i][j] + "</td>";
            }
            num_2 += "</tr>";
        }
        if(index_0 < everycount){
            let count = everycount - index_0;
            for(let i = 1;i<=count;i++){
                num_2 += "<tr  class='table-row'>";
                num_2 += "<td class='table-cell'></td>";
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
//升序
function ascend(){
    alldata.sort((a,b)=>{
        if(b[selindex] > a[selindex]){
            return -1;
        }
        return 1;
    });
    pageIndex = 1;
    let num = "";
    let index_0 = 0;
    for(let i = 0 ; i < alldata.length ; i ++){
        index_0 ++;
        num += "<tr class='table-row'>";
        if((i+1) <= everycount*pageIndex){
            num += "<td class='table-cell'>"+(i+1)+"</td>";
        }
        for(let j in alldata[i]){
            if(i < everycount*pageIndex){
                num += "<td class='table-cell'>"+alldata[i][j]+"</td>";
            }
        }
        num += "</tr>";
    }
    if(index_0 < everycount){
        let count = everycount - index_0;
        for(let i = 1;i<=count;i++){
            num += "<tr  class='table-row'>";
            num += "<td class='table-cell'></td>";
            for(let j = 0; j < alldata[0].length ; j++){
                num += "<td class='table-cell'></td>";
            }
            num += "</tr>";
        }
    }
    let index;
    if(everycount > alldata.length-1){
        index = alldata.length-1;
    }else{
        index = everycount;
    }
    $("#total").html(alldata.length); //
    $("#page").html(pageIndex);
    $("#num").html(index);

    $("#table_row_body").html(num);
}
//降序
function descend(){
    alldata.sort((a,b)=>{
        if(b[selindex] < a[selindex]){
            return -1;
        }
        return 1;
    });
    pageIndex = 1;
    let num = "";
    let index_0 = 0;
    for(let i = 0 ; i < alldata.length ; i ++){
        index_0 ++;
        num += "<tr class='table-row'>";
        if((i+1) <= everycount*pageIndex){
            num += "<td class='table-cell'>"+(i+1)+"</td>";
        }
        for(let j in alldata[i]){
            if(i < everycount*pageIndex){
                num += "<td class='table-cell'>"+alldata[i][j]+"</td>";
            }
        }
        num += "</tr>";
    }
    if(index_0 < everycount){
        let count = everycount - index_0;
        for(let i = 1;i<=count;i++){
            num += "<tr  class='table-row'>";
            num += "<td class='table-cell'></td>";
            for(let j = 0; j < alldata[0].length ; j++){
                num += "<td class='table-cell'></td>";
            }
            num += "</tr>";
        }
    }
    let index;
    if(everycount > alldata.length-1){
        index = alldata.length-1;
    }else{
        index = everycount;
    }
    $("#total").html(alldata.length); //
    $("#page").html(pageIndex);
    $("#num").html(index);

    $("#table_row_body").html(num);
}
