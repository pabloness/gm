$(function () {
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
    //title
    var $title = $("<div class=\"title\">\n" +
        "        <div class=\"rightUser fr\">\n" +
        "            <img src=\"../img/userfacebg.png\" alt=\"\">\n" +
        "            <span>admin</span>\n" +
        "            <i></i>\n" +
        "        </div>\n" +
        "        <div class=\"dropDown fr\">\n" +
        "            <ul>\n" +
        "                <li><a href='login.html'>重新登陆</a></li>\n" +
        "                <li><a href='##'>修改密码</a></li>\n" +
        "                <li><a href='login.html'>退出</a></li>\n" +
        "            </ul>\n" +
        "        </div>\n" +
        "    </div>");
    $(".content").prepend($title);
    //left
    var $left = $("<div class=\"left fl\">\n" +
        "            <ul class=\"nav\">\n" +
        "                <li>\n" +
        "                    <i></i>\n" +
        "                    系统主页\n" +
        "                </li>\n" +
        "                <li class='userQuery'>\n" +
        "                    <i></i>\n" +
        "                    概况<span></span>\n" +
        "                    <ul class=\"sub\">\n" +
        "                        <li><a href='dataall.html' class='test'>数据总览</a></li>\n" +
        "                        <li><a href='userQuery.html' class='test'>实时统计</a></li>\n" +
        "                    </ul>\n" +
        "                </li>\n" +
        "                <li class='machineAccount'>\n" +
        "                    <i></i>\n" +
        "                    数据统计<span></span>\n" +
        "                    <ul class=\"sub\">\n" +
        //"                        <li><a href='realTimeDataFishing.html'>线号数据</a></li>\n" +
        "                        <li><a href='machineAccount.html' class='oneLi'>留存</a></li>\n" +
        "                        <li><a href='realTimeDataOverview.html' class='twoLi'>付费</a></li>\n" +
        "                        <li><a href='statisticsDataOverview.html' class='threeLi'>等级分布</a></li>\n" +
        "                        <li><a href='statisticsDataOverview.html' class='threeLi'>LTV</a></li>\n" +
        "                    </ul>\n" +
        "                </li>\n" +
        "                <li class='rankingList'>\n" +
        "                    <i></i>\n" +
        "                    <a href='rankingList.html' style='display: inline-block;width: 68%;'>用户管理</a><span></span>\n" +
        "                    <ul class=\"sub\">\n" +
        "                        <li><a href='rankingList.html' class='all'>总排行榜</a></li>\n" +
        "                        <li><a href='javascript:;' onclick='Select_User_infrom_Ranking(2)' class='oneLi'>用户信息</a></li>\n" +
        "                        <li><a href='javascript:;' onclick='Select_User_infrom_Ranking(1)' class='twoLi'>游戏日志</a></li>\n" +
        "                        <li><a href='javascript:;' onclick='Select_User_infrom_Ranking(3)' class='threeLi'>充值记录</a></li>\n" +
        "                    </ul>\n" +
        "                </li>\n" +
        "                <li class='prohibition'>\n" +
        "                    <i></i>\n" +
        "                    GM工具<span></span>\n" +
        "                    <ul class=\"sub\">\n" +
        "                        <li><a href='prohibition.html' class='oneLi'>禁言封号</a></li>\n" +
        "                        <li><a href='forbiddenWords.html' class='twoLi'>发公告</a></li>\n" +
        "                        <li><a href='mailAnnouncement.html'>邮件系统</a></li>\n" +
        "                    </ul>\n" +
        "                </li>\n" +
        "                <li class='machineRecharge'>\n" +
        "                    <i></i>\n" +
        "                    管理工具<span></span>\n" +
        "                    <ul class=\"sub\">\n" +
        "                        <li><a href='machineRecharge.html' class='oneLi'>服务器管理</a></li>\n" +
        "                        <li><a href='payEnquiry.html' class='twoLi'>充值</a></li>\n" +
        //"                        <li><a href='cardAdd.html'>充值卡详情</a></li>\n" +
        "                    </ul>\n" +
        "                </li>\n" +
        "            </ul>\n" +
        "        </div>");
    $(".pageCont").prepend($left);


    //弹层(元宝)
    $(".yuanBao").click(function () {
        $(".mask").fadeToggle(200);
        $(".yuanBaoList").show(200);
        $(".maskPages").show(200);
    });
    $(".close").click(function () {
        $(".mask").fadeOut(200);
        $(".yuanBaoList").hide(200);
        $(".maskPages").hide(200);
    });

    //弹层(金币)
    $(".goldCoin").click(function () {
        $(".mask").fadeToggle(200);
        $(".goldCoinList").show(200);
        $(".maskPages").show(200);
    });
    $(".close").click(function () {
        $(".mask").fadeOut(200);
        $(".goldCoinList").hide(200);
        $(".maskPages").hide(200);
    });

    //封禁、解封弹框提示
    $(".implement").click(function () {
        // alert("账号封禁成功");
    });
    $(".unsealing").click(function () {
        // alert("账号解封成功");
    });

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
