

var popup_module = (function () {
    
    var saved_json_data;
    
    return {

        saved_json_data: saved_json_data
    };
})();

$(document).ready(function () {
    
    console.log("popup.js: .ready handler ");
    
    if (popup_module.saved_json_data == undefined) {
        common_module.requestStockData(function (jsonresult) {
            popup_module.saved_json_data = jsonresult;
            var tbl_body = common_module.makePrintable(popup_module.saved_json_data);
            $("#tbody").html(tbl_body);
            common_module.calcAccount(jsonresult);
        });
        return;
    }
    
    var tbl_body = common_module.makePrintable(popup_module.saved_json_data);
    $("#tbody").html(tbl_body);
});
