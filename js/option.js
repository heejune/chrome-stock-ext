
var option_module = (function () { 
})();

$(document).ready(function () {
    var itemcode = common_module.getItemCode();
    
    $('#inputStockid').val(itemcode);
});

$("#save").click(function () {
    var stockid = $('#inputStockid').val();
    var delay = $('#inputStockid').val();
    
    if (!stockid) {
        return;
    }
    
    common_module.setItemCode(stockid);

    alert('Settings saved');

    // update
    common_module.requestStockData(function (jsondata) {
        common_module.calcAccount(jsondata);
    });
});