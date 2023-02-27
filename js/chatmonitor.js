let pageIndex = 1;
let alldata = [];
let everycount = 15;
let x = 0;
let y = 0;
let chatdrop_x;
let chatdrop_y;
let chatdrop2_visi = false;
//1:封号 2：禁言
let chatsel = 1;
let chatId;
$(function(){
    document.onmousemove=function(e){
        e=e? e:window.event;
        x=e.clientX;
        y=e.clientY;
        let chatdrop_vis = getOpacity(document.getElementById("chatdrop"));
        let chatdrop_2_vis = getOpacity(document.getElementById("chatdrop_2"));
    }
    $(document).click(function(event){
        var _con = $('.chatmodel>.chatrecord');  // 设置目标区域
        var con_1 = $("#chatdrop");
        if(!_con.is(event.target) && _con.has(event.target).length === 0 && !con_1.is(event.target) && con_1.has(event.target).length === 0){ // Mark 1
        //$('#divTop').slideUp('slow');  //滑动消失
            $('#chatdrop').hide(1);     //淡出消失
        }
    });
    if(!GetCookies("token")){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    onclick();
    let data = JSON.parse(GetCookies("sids"));
    //服务器
    let services = "";
    services += "<option value= 'all' id= 'allservice'>全部</option>";
    for(let i in data){
        services += "<option value=" +data[i]+ " id="+i+">"+data[i]+"</option>";
    }
    $("#selservice").html(services);

    let sid_0 = $("#selservice option:selected").val()=="all"?undefined:$("#selservice option:selected").val();
    
    readTextFile("../config.json",function(text){
        let data = JSON.parse(text);
        IPconf = data.IPconf;
        prot = data.prot;
        httpHead = data.httpHead;
        // operate8(GetCookies("token"),sid_0);
    });
    tablebody(6);
    
    // self.setInterval(function (){
    //     let sid = $("#selservice option:selected").val();
    //     sid = sid=="all"?undefined:sid;
    //     operate8(GetCookies("token"),sid);
    // },30000);
    document.getElementById('searchbtn').onclick = function(){
        let sid = $("#selservice option:selected").val();
        sid = sid=="all"?undefined:sid;
        operate8(GetCookies("token"),sid);
    }
})

function onclick(){
    $("body").delegate(".chatmodel>.chatrecord", "click", function () {
        let id = $(this).children("span");
        console.log(id[0].id);
        chatId = id;
        document.getElementById("chatdrop").style.left = x + "px";
        document.getElementById("chatdrop").style.top = y + "px";
        chatdrop_x = x;
        chatdrop_y = y;
        $("#chatdrop").fadeToggle(10);
        if(document.getElementById("chatdrop").style.opacity == 1){
            if(chatdrop2_visi == true){
                $("#chatdrop_2").fadeToggle(0);
                chatdrop2_visi = false;
            }
        }
    })
    document.getElementById("a_close").onclick = function(){
        if(chatsel == 1){
            $("#chatdrop_2").fadeToggle(300);
        }
        if(document.getElementById("chatdrop_2").style.opacity == 1){
            chatdrop2_visi = false;
        }else{
            chatdrop2_visi = true;
        }
        let num = "<ul>"
        num += "<li><a id='a_24'>24小时</a></li>";
        num += "<li><a id='a_72'>72小时</a></li>";
        num += "<li><a id='a_120'>120小时</a></li>";
        num += "<li><a id='a_forever'>永久</a></li>";
        num += "<li><a id='a_sure'>正常</a></li>";
        num += "</ul>";
        $("#chatdrop_2").html(num);
        document.getElementById("chatdrop_2").style.left = chatdrop_x + 70 + "px";
        document.getElementById("chatdrop_2").style.top = chatdrop_y + "px";
        document.getElementById("a_close").style.color = "#fff";
        document.getElementById("a_forbidden").style.color = "#000";
        chatsel = 1;
        a2_onclick();
    }
    document.getElementById("a_forbidden").onclick = function(){
        if(chatsel == 2){
            $("#chatdrop_2").fadeToggle(300);
        }
        if(document.getElementById("chatdrop_2").style.opacity == 1){
            chatdrop2_visi = false;
        }else{
            chatdrop2_visi = true;
        }
        let num = "<ul>"
        num += "<li><a id='a_2'>2小时</a></li>";
        num += "<li><a id='a_8'>8小时</a></li>";
        num += "<li><a id='a_24'>24小时</a></li>";
        num += "<li><a id='a_48'>48小时</a></li>";
        num += "<li><a id='a_forever'>永久</a></li>";
        num += "<li><a id='a_sure'>正常</a></li>";
        num += "</ul>";
        $("#chatdrop_2").html(num);
        document.getElementById("chatdrop_2").style.left = chatdrop_x + 70 + "px";
        document.getElementById("chatdrop_2").style.top = chatdrop_y + "px";
        document.getElementById("a_forbidden").style.color = "#fff";
        document.getElementById("a_close").style.color = "#000";
        chatsel = 2;
        a1_onclick();
    } 
}
/**
 * 禁言
 */
function a1_onclick(){
    document.getElementById("a_2").onclick = function(){
        $("#chatdrop_2").fadeToggle(300);
        $("#chatdrop").fadeToggle(300);
        forbidChat(GetCookies("token"),chatId,null,2);
    }
    document.getElementById("a_8").onclick = function(){
        $("#chatdrop_2").fadeToggle(300);
        $("#chatdrop").fadeToggle(300);
        forbidChat(GetCookies("token"),chatId,null,8);
    }
    document.getElementById("a_24").onclick = function(){
        $("#chatdrop_2").fadeToggle(300);
        $("#chatdrop").fadeToggle(300);
        forbidChat(GetCookies("token"),chatId,null,24);
    }
    document.getElementById("a_48").onclick = function(){
        $("#chatdrop_2").fadeToggle(300);
        $("#chatdrop").fadeToggle(300);
        forbidChat(GetCookies("token"),chatId,null,48);
    }
    document.getElementById("a_forever").onclick = function(){
        $("#chatdrop_2").fadeToggle(300);
        $("#chatdrop").fadeToggle(300);
        forbidChat(GetCookies("token"),chatId,null);
    }
    document.getElementById("a_sure").onclick = function(){
        $("#chatdrop_2").fadeToggle(300);
        $("#chatdrop").fadeToggle(300);
        removeForbidChat(GetCookies("token"),chatId,null);
    }
}
/**
 * 封号
 */
function a2_onclick(){
    document.getElementById("a_24").onclick = function(){
        $("#chatdrop_2").fadeToggle(300);
        $("#chatdrop").fadeToggle(300);
        forbidLogin(GetCookies("token"),chatId,null,24);
    }
    document.getElementById("a_72").onclick = function(){
        $("#chatdrop_2").fadeToggle(300);
        $("#chatdrop").fadeToggle(300);
        forbidLogin(GetCookies("token"),chatId,null,72);
    }
    document.getElementById("a_120").onclick = function(){
        $("#chatdrop_2").fadeToggle(300);
        $("#chatdrop").fadeToggle(300);
        forbidLogin(GetCookies("token"),chatId,null,128);
    }
    document.getElementById("a_forever").onclick = function(){
        $("#chatdrop_2").fadeToggle(300);
        $("#chatdrop").fadeToggle(300);
        forbidLogin(GetCookies("token"),chatId,null);
    }
    document.getElementById("a_sure").onclick = function(){
        $("#chatdrop_2").fadeToggle(300);
        $("#chatdrop").fadeToggle(300);
        removeForbidLogin(GetCookies("token"),chatId,null);
    }
}
function operate8(CS_token,CS_sid){
    if(isNullorUndefined(GetCookies("token"))){
        // alert("账号已过期，请重新登陆");
        window.location.href = "login.html";
        return;
    }
    let httpRequest = new XMLHttpRequest();
    httpRequest.open('POST', httpHead+ IPconf + ':' + prot + '/operate8',true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    let reqData = JSON.stringify({
        token:JSON.parse(CS_token),
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
                        num += "<td class='table-cell'>";
                        //num += respData.form[i][j];
                        num += "<div class='chatmodel'>"
                        num += "<div class='chatrecord'>"
                        num += "<span id=" +respData.form[i][0]+">"+respData.form[i][j]+"</span>"
                        num += "</div>"
                        num += "</div>"
                        //num += "<td class='table-cell'>";
                        num += "</td>";
                    }
                }
                num += "</tr>";
            }
            if(index_0 < everycount){
                let count = everycount - index_0;
                for(let i = 1;i<=count;i++){
                    num += "<tr  class='table-row'>";
                    for(let j = 0; j < respData.form[0].length ; j++){
                        // num += "<td class='table-cell'></td>";
                        num += "<td class='table-cell'>";
                        //num += respData.form[i][j];
                        // num += "<div class='chatmodel'>"
                        // num += "<div class='chatrecord'>"
                        // num += "<span id="+i+0+">"+i+j+"</span>"
                        // num += "</div>"
                        // num += "</div>"
                        //num += "<td class='table-cell'>";
                        num += "</td>";
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
            operate8(GetCookies("token"),sid_0);
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
            operate8(GetCookies("token"),sid_0);
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
            operate8(GetCookies("token"),sid_0);
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
            operate8(GetCookies("token"),sid_0);
        }
    }
}