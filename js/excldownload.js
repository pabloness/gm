function export_xls(table_id,name){
    let html = "<html><head><meta charset='utf-8' /></head><body><table  border=\"1\">" + document.getElementById(table_id).innerHTML + "</table>></body></html>";
    let blob = new Blob([html],{type:"application/vnd.ms-excel"});
    let a = document.getElementById("text_a");
    a.href = URL.createObjectURL(blob);
    a.download = name+".xls";
}
//var w_timer;

// 想要更改下载xls文件名，必须使用 a标签


// 输出 xls 文件
// exoirt_xls('print_table');

// function export_xls(table_id) {
//     // console.log(getExplorer())
//     // if (getExplorer()=="ie") {
//     //     // ie浏览器处理
//     //     var curTbl = document.getElementById(table_id);
//     //     var oXL = new ActiveXObject("Excel.Application");
//     //     var oWB = oXL.Workbooks.Add();
//     //     var xlsheet = oWB.Worksheets(1);
//     //     var sel = document.body.createTextRange();
//     //     sel.moveToElementText(curTbl);
//     //     sel.select();
//     //     sel.execCommand("Copy");
//     //     xlsheet.Paste();
//     //     oXL.Visible = true;
//     //
//     //     try {
//     //         var fname = oXL.Application.GetSaveAsFilename("Excel.xls",
//     //             "Excel Spreadsheets (*.xls), *.xls");
//     //     } catch(e) {
//     //         print("Nested catch caught " + e);
//     //     } finally {
//     //         oWB.SaveAs(fname);
//     //         oWB.Close(savechanges = false);
//     //         oXL.Quit();
//     //         oXL = null;
//     //         w_timer = window.setInterval("Cleanup();", 1);
//     //     }
//     //
//     //
//     // }else {
//         print_xls(table_id,'用户列表');
//     // }
//
// }
//
// function Cleanup(){
//     window.clearInterval(w_timer);
//     CollectGarbage();
// }
//
// // 不同浏览器处理
// function getExplorer() {
//     var explorer = window.navigator.userAgent;
//     //ie
//     if(explorer.indexOf("MSIE") >= 0) {
//         return 'ie';
//     }
//     //firefox
//     else if(explorer.indexOf("Firefox") >= 0) {
//         return 'Firefox';
//     }
//     //Chrome
//     else if(explorer.indexOf("Chrome") >= 0) {
//         return 'Chrome';
//     }
//     //Opera
//     else if(explorer.indexOf("Opera") >= 0) {
//         return 'Opera';
//     }
//     //Safari
//     else if(explorer.indexOf("Safari") >= 0) {
//         return 'Safari';
//     }
// }
//
// // 输出xls文件主要函数
// function print_xls (table_id,name) {
//     var uri = 'data:application/vnd.ms-excel;base64,';
//     var table = document.getElementById(table_id);
//     var base64 = function(tem) {
//         return window.btoa(unescape(encodeURIComponent(tem)))
//     };
//     var table_tem = '<html><head><meta charset="UTF-8"></head><body><table  border="1">' + table.innerHTML + '</table></body></html>';
//     document.getElementById('export_xls').href=uri + base64(table_tem);
//     document.getElementById('export_xls').download = name || '下载';
// }