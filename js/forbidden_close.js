let everycount = 20;
let alldata = [];
let pageIndex = 1;
let x;
let y;
let chatOpenId;
let forbidenOpenId;
$(function(){
    document.onmousemove=function(e){
        e=e? e:window.event;
        x=e.clientX;
        y=e.clientY;
        let chatdrop_vis = getOpacity(document.getElementById("chatdrop"));
        let chatdrop_2_vis = getOpacity(document.getElementById("chatdrop_2"));
        var _con = $('.chatmodel>.chatrecord');  // 设置目标区域
        var con_1 = $("#chatdrop");
    }
    $(document).click(function(event){
        var _con = $('.chatmodel>.chatrecord');  // 设置目标区域
        var con_1 = $("#chatdrop");
        if(!_con.is(event.target) && _con.has(event.target).length === 0 && !con_1.is(event.target) && con_1.has(event.target).length === 0){ // Mark 1
        //$('#divTop').slideUp('slow');  //滑动消失
            $('#chatdrop').hide(1);     //淡出消失
        }
        var _con = $('.forbidenmodel>.forbidenrecord');  // 设置目标区域
        var con_1 = $("#forbidendrop");
        if(!_con.is(event.target) && _con.has(event.target).length === 0 && !con_1.is(event.target) && con_1.has(event.target).length === 0){ // Mark 1
        //$('#divTop').slideUp('slow');  //滑动消失
            $('#forbidendrop').hide(1);     //淡出消失
        }
    });
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    
    let data = JSON.parse(GetCookies("sids"));
    //服务器
    let services = "";
    //services += "<option value= 'all' id= 'allservice'>全部</option>";
    for(let i in data){
        services += "<option value=" +data[i]+ " id="+i+">"+data[i]+"</option>";
    }
    $("#selservice").html(services);
    
    let sid_0 = $("#selservice option:selected").val()=="all"?undefined:$("#selservice option:selected").val();
    let uid_0 = $("#username").val();
    let nick_0 = $("#username").val();
    
    readTextFile("../config.json",function(text){
        let data = JSON.parse(text);
        IPconf = data.IPconf;
        prot = data.prot;
        httpHead = data.httpHead;
        //roleStatistics(GetCookies("token"),sid_0,nick_0,uid_0);
    });
    tablebody(11);
    onclick();
})

function onclick(){
    $("body").delegate(".chatmodel>.chatrecord", "click", function () {
        let id = $(this).children("span");
        console.log(id[0].id);
        chatOpenId = id[0].id;
        document.getElementById("chatdrop").style.left = x + "px";
        document.getElementById("chatdrop").style.top = y + "px";
        chatdrop_x = x;
        chatdrop_y = y;
        $("#chatdrop").fadeToggle(10);
    })
    $("body").delegate(".forbidenmodel>.forbidenrecord", "click", function () {
        let id = $(this).children("span");
        console.log(id[0].id);
        forbidenOpenId = id[0].id;
        document.getElementById("forbidendrop").style.left = x + "px";
        document.getElementById("forbidendrop").style.top = y + "px";
        chatdrop_x = x;
        chatdrop_y = y;
        $("#forbidendrop").fadeToggle(10);
    })
    document.getElementById('searchbtn').onclick = function(){
        let sid = $("#selservice option:selected").val();
        sid = sid=="all"?undefined:sid;
        let uid = $("#username").val();
        let nick = uid;
        roleStatistics(GetCookies("token"),sid,nick,uid);
    }
    document.getElementById('a1_2').onclick = function(){
        $("#chatdrop").fadeToggle(10);
        forbidChat(GetCookies("token"),chatOpenId,null,2);
    }
    document.getElementById('a1_8').onclick = function(){
        $("#chatdrop").fadeToggle(10);
        forbidChat(GetCookies("token"),chatOpenId,null,8);
    }
    document.getElementById('a1_24').onclick = function(){
        $("#chatdrop").fadeToggle(10);
        forbidChat(GetCookies("token"),chatOpenId,null,24);
    }
    document.getElementById('a1_48').onclick = function(){
        $("#chatdrop").fadeToggle(10);
        forbidChat(GetCookies("token"),chatOpenId,null,48);
    }
    document.getElementById('a1_forever').onclick = function(){
        $("#chatdrop").fadeToggle(10);
        forbidChat(GetCookies("token"),chatOpenId,null);
    }
    document.getElementById('a1_sure').onclick = function(){
        $("#chatdrop").fadeToggle(10);
        removeForbidChat(GetCookies("token"),chatOpenId);
    }
    document.getElementById('a2_24').onclick = function(){
        $("#forbidendrop").fadeToggle(10);
        forbidLogin(GetCookies("token"),forbidenOpenId,null,24);
    }
    document.getElementById('a2_72').onclick = function(){
        $("#forbidendrop").fadeToggle(10);
        forbidLogin(GetCookies("token"),forbidenOpenId,null,72);
    }
    document.getElementById('a2_120').onclick = function(){
        $("#forbidendrop").fadeToggle(10);
        forbidLogin(GetCookies("token"),forbidenOpenId,null,120);
    }
    document.getElementById('a2_forever').onclick = function(){
        $("#forbidendrop").fadeToggle(10);
        forbidLogin(GetCookies("token"),forbidenOpenId,null);
    }
    document.getElementById('a2_sure').onclick = function(){
        $("#forbidendrop").fadeToggle(10);
        removeForbidLogin(GetCookies("token"),forbidenOpenId);
    }
}

function roleStatistics(CS_token,CS_sid,CS_nick,CS_uid){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    // if(isNullorUndefined(CS_nick) || CS_nick == "" || isNullorUndefined(CS_uid) || CS_uid == ""){
    //     alert("请输入角色昵称或者uid");
    //     return;
    // }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+ IPconf + ':' + prot + '/operate1',true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        sid:CS_sid,
        nick:CS_nick,
        uid:CS_uid,
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
                        if(j=="1" || j == "2" || j=="6" || j=="7" || j=="8" || j=="11" || j=="14" || j=="15" || j=="16"){
                            if(j == "2"){
                                num += "<td class='table-cell'>"+$("#selservice option:selected").val()+"</td>";
                            }
                        }else{
                            if(j=="17"){
                                num += "<td class='table-cell'>";
                                num += "<div class='chatmodel'>"
                                num += "<div class='chatrecord'>"
                                num += "<span id=" +respData.form[i][0]+">"+respData.form[i][j]+"</span>"
                                num += "</div>"
                                num += "</div>"
                                num += "</td>";
                            }else if(j == "18"){
                                num += "<td class='table-cell'>";
                                num += "<div class='forbidenmodel'>"
                                num += "<div class='forbidenrecord'>"
                                num += "<span id=" +respData.form[i][0]+">"+respData.form[i][j]+"</span>"
                                num += "</div>"
                                num += "</div>"
                                num += "</td>";
                            }else{
                                num += "<td class='table-cell'>"+respData.form[i][j]+"</td>";
                            }
                        }
                    }
                }
                num += "</tr>";
            }
            if(index_0 < everycount){
                let count = everycount - index_0;
                for(let i = 1;i<=count;i++){
                    num += "<tr  class='table-row'>";
                    for(let j = 0; j < respData.form[0].length ; j++){
                        if(j=="1" || j=="6" || j=="7" || j=="8" || j=="10" || j=="13" || j=="14" || j=="15"|| j=="16"){
                            if(j == "1"){
                                num += "<td class='table-cell'></td>";
                            }
                        }else{
                            num += "<td class='table-cell'></td>";
                        }
                    }
                    num += "</tr>";
                }
            }
            //这里的表头固定
            // let headnum = "<tr class='table-header-row'>"//"<ul class='table-header-row'>";
            // for(let i in respData.form[0]){
            //     headnum += "<th class = 'table-cell'>" + respData.form[0][i] +"</th>";
            // }
            // headnum += "</tr>";
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

            //$("#table_head").html(headnum);
            $("#table_row_body").html(num);
        }
    }
}

function forbidChat(CS_token,CS_openId,CS_ip,CS_endDate){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    if(isNullorUndefined(CS_endDate) || CS_endDate == ""){
        alert("请选择结尾时间");
        return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+ IPconf + ':' + prot + '/operate4',true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        ip:CS_ip,
        openId:CS_openId,
        hours:CS_endDate,
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
            let sid_0 = $("#selservice option:selected").val()=="all"?undefined:$("#selservice option:selected").val();
            let uid_0 = $("#username").val();
            let nick_0 = $("#username").val();
            roleStatistics(GetCookies("token"),sid_0,nick_0,uid_0);
        }
    }
}

function removeForbidChat(CS_token,CS_openId,CS_ip){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+ IPconf + ':' + prot + '/operate6',true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        openId:CS_openId,
        ip:CS_ip,
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
            let sid_0 = $("#selservice option:selected").val()=="all"?undefined:$("#selservice option:selected").val();
            let uid_0 = $("#username").val();
            let nick_0 = $("#username").val();
            roleStatistics(GetCookies("token"),sid_0,nick_0,uid_0);
        }
    }
}

function forbidLogin(CS_token,CS_openId,CS_ip,CS_endDate){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    if(isNullorUndefined(CS_endDate) || CS_endDate == ""){
        alert("请选择结尾时间");
        return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+ IPconf + ':' + prot + '/operate5',true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        openId:CS_openId,
        ip:CS_ip,
        hours:CS_endDate,
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
            let sid_0 = $("#selservice option:selected").val()=="all"?undefined:$("#selservice option:selected").val();
            let uid_0 = $("#username").val();
            let nick_0 = $("#username").val();
            roleStatistics(GetCookies("token"),sid_0,nick_0,uid_0);
        }
    }
}

function removeForbidLogin(CS_token,CS_openId,CS_ip){
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+ IPconf + ':' + prot + '/operate7',true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
        openId:CS_openId,
        ip:CS_ip,
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
            let sid_0 = $("#selservice option:selected").val()=="all"?undefined:$("#selservice option:selected").val();
            let uid_0 = $("#username").val();
            let nick_0 = $("#username").val();
            roleStatistics(GetCookies("token"),sid_0,nick_0,uid_0);
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
                if(j=="1" || j=="6" || j=="7" || j=="8" || j=="10" || j=="13" || j=="14" || j=="15" || j=="16"){
                    if(j == "1"){
                        num_1 += "<td class='table-cell'>"+$("#selservice option:selected").val()+"</td>";
                    }
                }else{
                    if(j=="17"){
                        num_1 += "<td class='table-cell'>";
                        num_1 += "<div class='chatmodel'>"
                        num_1 += "<div class='chatrecord'>"
                        num_1 += "<span id=" +c[i][0]+">"+c[i][j]+"</span>"
                        num_1 += "</div>"
                        num_1 += "</div>"
                        num_1 += "</td>";
                    }else if(j == "18"){
                        num_1 += "<td class='table-cell'>";
                        num_1 += "<div class='forbidenmodel'>"
                        num_1 += "<div class='forbidenrecord'>"
                        num_1 += "<span id=" +c[i][0]+">"+c[i][j]+"</span>"
                        num_1 += "</div>"
                        num_1 += "</div>"
                        num_1 += "</td>";
                    }else{
                        num_1 += "<td class='table-cell'>"+c[i][j]+"</td>";
                    }
                }
            }
            num_1 += "</tr>";
        }
        if(index_0 < everycount){
            let count = everycount - index_0;
            for(let i = 1;i<=count;i++){
                num_1 += "<tr  class='table-row'>";
                for(let j = 0; j < c[0].length ; j++){
                    if(j=="1" || j=="6" || j=="7" || j=="8" || j=="10" || j=="13" || j=="14" || j=="15" || j=="16"){
                        if(j == "1"){
                            num_1 += "<td class='table-cell'></td>";
                        }
                    }else{
                        num_1 += "<td class='table-cell'></td>";
                    }
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
                if(j=="1" || j=="6" || j=="7" || j=="8" || j=="10" || j=="13" || j=="14" || j=="15" || j=="16"){
                    if(j == "1"){
                        num_2 += "<td class='table-cell'>"+$("#selservice option:selected").val()+"</td>";
                    }
                }else{
                    if(j=="17"){
                        num_2 += "<td class='table-cell'>";
                        num_2 += "<div class='chatmodel'>"
                        num_2 += "<div class='chatrecord'>"
                        num_2 += "<span id=" +c[i][0]+">"+c[i][j]+"</span>"
                        num_2 += "</div>"
                        num_2 += "</div>"
                        num_2 += "</td>";
                    }else if(j == "18"){
                        num_2 += "<td class='table-cell'>";
                        num_2 += "<div class='forbidenmodel'>"
                        num_2 += "<div class='forbidenrecord'>"
                        num_2 += "<span id=" +c[i][0]+">"+c[i][j]+"</span>"
                        num_2 += "</div>"
                        num_2 += "</div>"
                        num_2 += "</td>";
                    }else{
                        num_2 += "<td class='table-cell'>"+c[i][j]+"</td>";
                    }
                }
            }
            num_2 += "</tr>";
        }
        if(index_0 < everycount){
            let count = everycount - index_0;
            for(let i = 1;i<=count;i++){
                num_2 += "<tr  class='table-row'>";
                for(let j = 0; j < c[0].length ; j++){
                    if(j=="1" || j=="6" || j=="7" || j=="8" || j=="10" || j=="13" || j=="14" || j=="15"|| j=="16"){
                        if(j == "1"){
                            num_2 += "<td class='table-cell'></td>";
                        }
                    }else{
                        num_2 += "<td class='table-cell'></td>";
                    }
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