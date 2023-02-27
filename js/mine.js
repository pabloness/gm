$(function () {
    let urlsToTip={
        "/statistics1":"<li><a href='dataall.html' class='oneLi'>• 数据总览</a></li>",
        "/statistics2":"<li><a href='dataall.html' class='oneLi'>• 数据总览</a></li>",
        "/statistics3":"<li><a href='dataall.html' class='oneLi'>• 数据总览</a></li>",
        "/statistics4":"<li><a href='dataall.html' class='oneLi'>• 数据总览</a></li>",
        "/statistics5":"<li><a href='dataall.html' class='oneLi'>• 数据总览</a></li>",
        "/statistics6":"<li><a href='dataall.html' class='oneLi'>• 数据总览</a></li>",
        "/statistics7":"<li><a href='dataall.html' class='oneLi'>• 数据总览</a></li>",
        "/statistics8":"<li><a href='levelloss.html' class='oneLi'>• 等级流失</a></li>",
        "/statistics9":"<li><a href='leveldetails.html' class='twoLi'>• 等级详情</a></li>",
        "/statistics10":"<li><a href='taskprogress.html' class='threeLi'>• 任务进度</a></li>",
        "/statistics11":"<li><a href='revenue_analysis.html' class='fourLi'>• 收入分析</a></li>",
        "/statistics12":"<li><a href='revenue_analysis.html' class='fourLi'>• 收入分析</a></li>",
        "/statistics13":"<li><a href='revenue_analysis.html' class='fourLi'>• 收入分析</a></li>",
        "/statistics14":"<li><a href='ltv.html' class='fifLi'>• LTV</a></li>",
        "/statistics15":"<li><a href='rechargeStatis.html' class='sixLi'>• 充值统计</a></li>",
        "/statistics16":"<li><a href='timelength.html' class='sevenLi'>• 时长统计</a></li>",
        "/statistics17":"<li><a href='activityStatis.html' class='eightLi'>• 活动统计</a></li>",
        "/statistics18":"<li><a href='activityStatis.html' class='eightLi'>• 活动统计</a></li>",
        "/statistics19":"<li><a href='activityStatis.html' class='eightLi'>• 活动统计</a></li>",
        "/statistics20":"<li><a href='activityStatis.html' class='eightLi'>• 活动统计</a></li>",
        "/statistics21":"<li><a href='activityStatis.html' class='eightLi'>• 活动统计</a></li>",
        "/statistics22":"<li><a href='activityStatis.html' class='eightLi'>• 活动统计</a></li>",
        "/statistics23":"<li><a href='activityStatis.html' class='eightLi'>• 活动统计</a></li>",
        "/statistics24":"<li><a href='activityStatis.html' class='eightLi'>• 活动统计</a></li>",
        "/statistics25":"<li><a href='activityStatis.html' class='eightLi'>• 活动统计</a></li>",
        "/statistics26":"<li><a href='activityStatis.html' class='eightLi'>• 活动统计</a></li>",
        "/statistics27":"<li><a href='activityStatis.html' class='eightLi'>• 活动统计</a></li>",
        "/statistics28":"<li><a href='activityStatis.html' class='eightLi'>• 活动统计</a></li>",
        "/operate1":"<li><a href='usermessage.html' class='oneLi'>• 用户信息</a></li>",
        "/operate2":"<li><a href='gamediary.html' class='twoLi'>• 游戏日志</a></li>",
        "/operate3":"<li><a href='rechargerecord.html' class='fourLi'>• 充值记录</a></li>",
        "/operate4":"<li><a href='forbidden_close.html' class='threeLi' id='forbiddenclose'>• 禁言封号</a></li>",
        "/operate5":"<li><a href='forbidden_close.html' class='threeLi' id='forbiddenclose'>• 禁言封号</a></li>",
        "/operate6":"<li><a href='forbidden_close.html' class='threeLi' id='forbiddenclose'>• 禁言封号</a></li>",
        "/operate7":"<li><a href='forbidden_close.html' class='threeLi' id='forbiddenclose'>• 禁言封号</a></li>",
        "/operate8":"<li><a href='chatmonitor.html' class='sixLi'>• 聊天监控</a></li>",
        "/operate9":"<li><a href='announcement.html' class='fourLi'>• 发公告</a></li>",
        "/operate10":"<li><a href='email.html' class='fifLi'>• 发邮件</a></li>",
        "/operate11":"<li><a href='recharge.html' class='threeLi'>• 充值</a></li>",
        "/operate12":"<li><a href='servicemanager.html' class='oneLi'>• 服务器管理</a></li>",
        "/operate13":"<li><a href='servicemanager.html' class='oneLi'>• 服务器管理</a></li>",
        "/operate14":"<li><a href='servicemanager.html' class='oneLi'>• 服务器管理</a></li>",
        "/operate15":"<li><a href='servicemanager.html' class='oneLi'>• 服务器管理</a></li>",
        "/operate16":"<li><a href='servicelist.html' class='sevenLi'>• 服务器列表</a></li>",
        "/operate17":"<li><a href='servicemerge.html' class='eightLi'>• 服务器合并</a></li>",
    }
    let activityurl={
        0:"/statistics17",
        1:"/statistics18",
        2:"/statistics19",
        3:"/statistics20",
        4:"/statistics21",
        5:"/statistics22",
        6:"/statistics23",
        7:"/statistics24",
        8:"/statistics25",
        9:"/statistics26",
        11:"/statistics27",
        12:"/statistics28",
    }
    //1.监听一级菜单的点击事件（节点创建时使用delegate监听事件）
    $("body").delegate(".nav>li", "click", function () {
        //1.1拿到二级菜单
        var $sub = $(this).children(".sub");
        //1.2让二级菜单展开
        $sub.slideDown(500);
        //1.3拿到所有非当前的二级菜单
        var other = $(this).siblings().children(".sub");
        //1.4让所有非当前二级菜单收起
        other.slideUp(500);
        //1.5让被点击的一级菜单箭头旋转
        $(this).addClass("current");
        //1.6让所有非被所有点击的一级菜单还原
        $(this).siblings().removeClass("current");

        
    });

    $("body").delegate(".title>.rightUser", "click", function () {
        $(".dropDown").fadeToggle(300);
    })

    /*
    创建公共页面节点
     */
    let admin = JSON.parse(GetCookies("username"));
    //title
    var $title = $("<div class=\"title\">\n" +
        "        <div class=\"rightUser fr\">\n" +
        "            <img src=\"../img/userfacebg.png\" alt=\"\">\n" +
        "            <span id=\"username\">admin</span>\n" +
        "            <i></i>\n" +
        "        </div>\n" +
        "        <div class=\"dropDown fr\">\n" +
        "            <ul>\n" +
        "                <li><a href='login.html'>重新登陆</a></li>\n" +
        // "                <li><a href='##'>修改密码</a></li>\n" +
        "                <li><a href='login.html'>退出</a></li>\n" +
        "            </ul>\n" +
        "        </div>\n" +
        "    </div>");
    $(".content").prepend($title);
    $("#username").html(admin);
    //left
    var $left = $("<div class=\"left fl\">\n" +
        "            <ul class=\"nav\">\n" +
        "                <li>\n" +
        "                    <i></i>\n" +
        "                    系统主页\n" +
        "                </li>\n" +
        "                <li class='dataall'>\n" +
        "                    <i></i>\n" +
        "                    概况<span></span>\n" +
        "                    <ul class=\"sub\">\n" +
        "                        <li><a href='dataall.html' class='oneLi'>• 数据总览</a></li>\n" +
        // "                        <li><a href='realtime.html' class='twoLi'>实时统计</a></li>\n" +
        "                    </ul>\n" +
        "                </li>\n" +
        "                <li class='datamanager'>\n" +
        "                    <i></i>\n" +
        "                    数据统计<span></span>\n" +
        "                    <ul class=\"sub\">\n" +
        "                        <li><a href='levelloss.html' class='oneLi'>• 等级流失</a></li>\n" +
        "                        <li><a href='leveldetails.html' class='twoLi'>• 等级详情</a></li>\n" +
        "                        <li><a href='taskprogress.html' class='threeLi'>• 任务进度</a></li>\n" +
        "                        <li><a href='revenue_analysis.html' class='fourLi'>• 收入分析</a></li>\n" +
        "                        <li><a href='ltv.html' class='fifLi'>• LTV</a></li>\n" +
        "                        <li><a href='rechargeStatis.html' class='sixLi'>• 充值统计</a></li>\n" +
        "                        <li><a href='timelength.html' class='sevenLi'>• 时长统计</a></li>\n" +
        "                        <li><a href='activityStatis.html' class='eightLi'>• 活动统计</a></li>\n" +
        "                    </ul>\n" +
        "                </li>\n" +
        "                <li class='usermanager'>\n" +
        "                    <i></i>\n" +
        "                    用户管理<span></span>\n" +
        "                    <ul class=\"sub\">\n" +
        "                        <li><a href='usermessage.html' class='oneLi'>• 用户信息</a></li>\n" +
        "                        <li><a href='gamediary.html' class='twoLi'>• 游戏日志</a></li>\n" +
        "                        <li><a href='forbidden_close.html' class='threeLi' id='forbiddenclose'>• 禁言封号</a></li>\n" +
        "                        <li><a href='rechargerecord.html' class='fourLi'>• 充值记录</a></li>\n" +
        "                    </ul>\n" +
        "                </li>\n" +
        "                <li class='machineRecharge'>\n" +
        "                    <i></i>\n" +
        "                    GM工具<span></span>\n" +
        "                    <ul class=\"sub\">\n" +
        "                        <li><a href='servicemanager.html' class='oneLi'>• 服务器管理</a></li>\n" +
        "                        <li><a href='querryorder.html' class='twoLi'>• 订单查询</a></li>\n" +
        "                        <li><a href='recharge.html' class='threeLi'>• 充值</a></li>\n" +
        "                        <li><a href='announcement.html' class='fourLi'>• 发公告</a></li>\n" +
        "                        <li><a href='email.html' class='fifLi'>• 发邮件</a></li>\n" +
        "                        <li><a href='chatmonitor.html' class='sixLi'>• 聊天监控</a></li>\n" +
        "                    </ul>\n" +
        "                </li>\n" +
        "            </ul>\n" +
        "        </div>");
    $(".pageCont").prepend($left);
    let url = JSON.parse(GetCookies("urls"));
    let num_0="";
    let num_1="";
    let num_2="";
    let num_3="";
    //数据统计列表
    let isshourufenxi = false;
    let isactivity = false;
    for(let i in urlsToTip){
        for(let j in url){
            if(i == url[j]){
                if(i == "/statistics8" || i=="/statistics9"|| i=="/statistics10" || i=="/statistics14" || i=="/statistics15" || i=="/statistics16"){
                    num_1 += urlsToTip[i];
                }
                if(i == "/statistics11" || i == "/statistics12" || i == "/statistics13"){
                    if(!isshourufenxi){
                        num_1 += urlsToTip[i];
                    }
                    isshourufenxi = true;
                }
                for(let c in activityurl){
                    if(i == activityurl[c]){
                        if(!isactivity){
                            num_1 += urlsToTip[i];
                        }
                        isactivity = true;
                    }
                }
                
            }
        }
    }
    $(".datamanager>.sub").html(num_1);
    //用户管理
    let ischat = false;
    for(let i in urlsToTip){
        for(let j in url){
            if(i == url[j]){
                if(i == "/operate1" || i=="/operate2"|| i=="/operate3" ){
                    num_2 += urlsToTip[i];
                }
                if(i == "/operate4" || i == "/operate5" || i == "/operate6"| i == "/operate7"){
                    if(!ischat){
                        num_2 += urlsToTip[i];
                    }
                    ischat = true;
                }
            }
        }
    }
    $(".usermanager>.sub").html(num_2);
    //GM工具
    let isservice = false;
    for(let i in urlsToTip){
        for(let j in url){
            if(i == url[j]){
                if(i == "/operate8" || i=="/operate9"|| i=="/operate10" || i=="/operate11" || i == "/operate16" || i == "/operate17"){
                    num_3 += urlsToTip[i];
                }
                if(i == "/operate12" || i == "/operate13" || i == "/operate14"| i == "/operate15"){
                    if(!isservice){
                        num_3 += urlsToTip[i];
                    }
                    isservice = true;
                }
            }
        }
    }
    $(".machineRecharge>.sub").html(num_3);
    


    //选项卡切换
    $(".rh_title>li").click(function () {
        $(this).addClass("current");
        $(this).siblings().removeClass("current");
        var index = $(this).index();
        var $li = $(".rh_cont>li").eq(index);
        $li.siblings().removeClass("show");
        $li.addClass("show");
    });

    //邮件系统全选管理
    var $vselect = $(".vselect");
    var $vsele = $(".vsele");
    $vselect.click(function () {
        var that = this;
        $vsele.each(function() { //所有的单选按钮跟随选中的多选按钮变化
            this.checked = that.checked;
        })
        $vselect.each(function(){  //所有的多选按钮跟随选中的多选按钮变化
            this.checked=that.checked;
        })
        $vsele.change(function() {
            let count = 0; //单选 按钮 个数
            $vsele.each(function() {
                if(this.checked) {
                    count ++;
                }
            })
            if(count == $vsele.length) {   //当count等于单选按钮的个数时 说明单选按钮全部选中了，此时多选按钮也该被选中
                $vselect.each(function() {
                    this.checked = true;
                })
            } else {
                $vselect.each(function() {
                    this.checked = false;
                })
            }
        });
    });

    //删除已发送的道具
    $(".delProp").click(function () {
        $(".propSend").remove();
    });
});
function Select_User_infrom_Ranking(num) {
    SetCookie("NUM",num);
    // alert(123)
    socket = new WebSocket("ws://"+IPconf+":"+prot+"/ws/join");
    socket.onopen = function() {
        socket.send("1000"+GetCookies("UG"));
        socket.send("9077" + JSON.stringify({
            BG:"",
            UG:GetCookies("UG"),
            ST:parseInt(num),
            SID:parseInt(0),
            SN:parseInt(5),
            NUM:parseInt(15),
        }));
        socket.onmessage = function (msg) {
            var newdate="";
            for(var i=0;i<msg.data.length;i++){
                if (i>3){
                    newdate = newdate + msg.data[i];
                }
            }

            // $("#user").html("用户昵称");
            // $("#uid").html("用户Id");
            // $("#uuid").html("用户uid");
            // $("#lv").html(" 等级");
            // $("#vlv").html("Vip等级");
            // $("#yuanbao").html("元宝数量");
            // $("#moneyge").html("赠送数量（金币 ）");
            // $("#money").html("金币数量");
            // $("#atnr").html("账号");
            // $("#etml").html("设备");

            obj = toJson(newdate)
            if (obj.UMG == null) {
                alert("未查询到数据")
                return
            }
            // alert(newdate)
            // $("table:eq(0) tr:gt(0)").remove();

            SetCookie("HPlength", obj.UMG.length)

            var num = ""
            for (var i = 0; i < obj.UMG.length; i++) {
                // var tr = $("<tr>");
                num += "<ul  class='table-row'>"
                num += "<li class='table-cell'>"+obj.UMG[i].NickName+"</li>"
                num += "<li class='table-cell'>"+obj.UMG[i].ZH+"</li>"
                num += "<li class='table-cell'>"+obj.UMG[i].Id+"</li>"
                num += "<li class='table-cell'>"+obj.UMG[i].Uid+"</li>"
                num += "<li class='table-cell'>"+obj.UMG[i].Lv+"</li>"
                num += "<li class='table-cell'>"+obj.UMG[i].Vip+"</li>"
                num += "<li class='table-cell yuanBao' onclick='yuanbao()' >"+obj.UMG[i].GoldN+"</li>"
                num += "<li class='table-cell goldCoin'  onclick='jinbi()'>"+obj.UMG[i].Coin+"</li>"
                num += "<li class='table-cell'>"+obj.UMG[i].MG+"</li>"
                num += "<li class='table-cell'>"+obj.UMG[i].HD+"</li>"
                num += "<li class='table-cell'>"+obj.UMG[i].Rmb+"</li>"
                num += "<li class='table-cell'>"+obj.UMG[i].YXN+"</li>"
                num += "<li class='table-cell'>"+obj.UMG[i].ZXTM+"</li>"
                num += "<li class='table-cell'>"+obj.UMG[i].CallX+"</li>"
                num += "</ul>"
            }
            $("#table-body").html(num)
            socket.close()
        }
    }
}
function isNullorUndefined(data){
    if(data == null || data == undefined){
        return true;
    }else{
        return false;
    }
}

function getNowdate(){
    let format = "";
    let nTime = new Date();
    format += nTime.getFullYear() + "-";
    format += ((nTime.getMonth()+1)<10?"0"+(nTime.getMonth()+1):(nTime.getMonth()+1)) + "-";
    format += nTime.getDate()<10?"0"+nTime.getDate():nTime.getDate();
    return format;
}

function getNowtime(){
    let format = "";
    let nTime = new Date();
    format += nTime.getFullYear() + "-";
    format += ((nTime.getMonth()+1)<10?"0"+(nTime.getMonth()+1):(nTime.getMonth()+1)) + "-";
    format += (nTime.getDate()<10?"0"+nTime.getDate():nTime.getDate()) + "T";
    format += (nTime.getHours()<10?"0"+nTime.getHours():nTime.getHours()) + ":";
    format += (nTime.getMinutes()<10?"0"+nTime.getMinutes():nTime.getMinutes()) + ":00";
    return format;
}

function getOpacity(obj){
    if(getComputedStyle(obj,null)['opacity']){
        return getComputedStyle(obj,null)['opacity'];
    }else{
        return obj.currentStyle['fileter'];
    }
}

function Tabs(tabs_name,contents_name,tabs_checked_style,contents_checked_style){
    let tabs = document.querySelectorAll(tabs_name);
    let contents = document.querySelectorAll(contents_name);
    let e_mark = 0;
    for (var i = 0, len = tabs.length; i < len; i++) {
        tabs[i].num = i;
        tabs[i].onclick = function () {
        tabs[e_mark].classList.toggle(tabs_checked_style);
        tabs[this.num].classList.toggle(tabs_checked_style);
        contents[e_mark].classList.toggle(contents_checked_style);
        contents[this.num].classList.toggle(contents_checked_style);
        e_mark = this.num;
        };
    }
}

function setEchart(respData,myChart,name){
    let day = [];
    let table_line = [];
    let series = [];
    

    for(let i = 0; i < respData.form[0].length;i++){
        table_line[i] = [];
    }
    for(let i = 0;i<table_line.length;i++){
        for(let j = 0;j < respData.form.length;j++){
            if(j>0){
                day.push(respData.form[j][0]);
            }
            for(let c = 0; c < respData.form[j].length;c++){
                if(c == i){
                    table_line[i].push(respData.form[j][c]);
                }
            }
        }
    }
    let legenddata = [];
    for(let i = 1;i < table_line.length; i ++){
        let data = {
            name:table_line[i][0],
            type:'bar',
            barWidth:30,
            barMaxWidth:30,
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: 'red'
                    }
                }
            },
            data:[],
        }
        legenddata.push(table_line[i][0]);
        for(let j = 1;j < table_line[i].length;j++){
            if(isNaN(table_line[i][j])){
                let str = table_line[i][j].substr(0,table_line[i][j].length-1);
                data.data.push(str);
            }else{
                data.data.push(table_line[i][j]);
            }
        }
        series.push(data);
    }
    let legend = {
        data:legenddata,
    };
    let option1 = myChart.getOption();
    if(!isNullorUndefined(name)){
        option1.title = {text:name};
    }
    option1.legend = legend;
    //x轴
    option1.dataZoom = [{
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        left: '9%',
        bottom: -5,
        start: 10,
        end: 90 //初始化滚动条
    }];
    option1.xAxis = {
        data:day,
        name:table_line[0][0],
    };
    option1.series = series;
    myChart.setOption(option1,true);
}

function setEchart_2(respData,myChart,name){
    let day = [];
    let table_line = [];
    let series = [];

    for(let i = 0; i < respData.form[0].length;i++){
        table_line[i] = [];
    }
    for(let i = 0;i<table_line.length;i++){
        for(let j = 0;j < respData.form.length;j++){
            if(j>0){
                day.push(respData.form[j][1]);
            }
            for(let c = 0; c < respData.form[j].length;c++){
                if(c == i){
                    table_line[i].push(respData.form[j][c]);
                }
            }
        }
    }
    let legenddata = [];
    for(let i = 2;i < table_line.length; i ++){
        let data = {
            name:table_line[i][0],
            type:'bar',
            barWidth:30,
            barMaxWidth:30,
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: 'red'
                    }
                }
            },
            data:[],
        }
        legenddata.push(table_line[i][0]);
        for(let j = 1;j < table_line[i].length;j++){
            if(isNaN(table_line[i][j])){
                let str = table_line[i][j].substr(0,table_line[i][j].length-1);
                data.data.push(str);
            }else{
                data.data.push(table_line[i][j]);
            }
        }
        series.push(data);
    }
    let legend = {
        data:legenddata,
    };
    let option1 = myChart.getOption();
    if(!isNullorUndefined(name)){
        option1.title = {text:name};
    }
    option1.legend = legend;
    //x轴
    option1.dataZoom = [{
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        left: '9%',
        bottom: -5,
        start: 10,
        end: 90 //初始化滚动条
    }];
    option1.xAxis = {
        data:day,
        name:table_line[0][0],
    };
    option1.series = series;
    myChart.setOption(option1,true);
}

function readTextFile(file, callback) {  
    var rawFile = new XMLHttpRequest();  
    rawFile.overrideMimeType("application/json");  
    rawFile.open("GET", file, true);  
    rawFile.onreadystatechange = function() {  
        if (rawFile.readyState === 4 && rawFile.status == "200") {  
            callback(rawFile.responseText);  
        }  
    }  
    rawFile.send(null);  
}  

function dateChange(){
    let starttime = $("#starttime").val();
    let endtime = $("#endtime").val();
    SetCookie("starttime",starttime,2);
    SetCookie("endtime",endtime,2);
}

function tablebody(num){
    let num_1 = "";
    for(let i = 1 ; i < 20 ; i ++){
        num_1 += "<tr class='table-row'>";
         for(let j =0 ; j<num ; j++){
            num_1 += "<td class='table-cell'></td>";
         }
         num_1 += "</tr>";
    }
    $("#table_row_body").html(num_1);
}