
var common_module = (function(){

    function calcAccount(jsonitem) {
        var result = jsonitem.result;

        var pollingInterval = result.pollingInterval;
        var time = result.time;
        var areas = result.areas[0];

        var name = areas.name;      // "SERVICE_ITEM";
        var datas = areas.datas[0];

        var cr = datas["cr"];       //�����%  cr
        var hv = datas["hv"];       //�� hv

        var lv = datas["lv"];       // ���� lv

        var ul = datas["ul"];   // ���Ѱ�  ul
        var ll = datas["ll"];   // ���Ѱ� ll
        var ov  = datas["ov"];  // �ð� - �׳��� �� ���۰�
        var cd = datas["cd"];   // �ֽĹ�ȣ

        var cv = datas["cv"];   // ���� ���� ���� ���� (������ ����)

        var nv = datas["nv"];   // ���� ����

        if (ov <= nv) {
            // �ö���.
            chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});    // set to red
            chrome.browserAction.setBadgeText({ text: cr.toString() });
        } else {
            // ���ȴ�.
            chrome.browserAction.setBadgeBackgroundColor({ color: [0, 0, 255, 255] });  // set to blue
            chrome.browserAction.setBadgeText({ text: cr.toString() });
        }
    }

    function makePrintable(jsonparam) {

        if (jsonparam.resultCode == "success") {

            result = jsonparam.result;

            pollingInterval = result.pollingInterval;
            time = result.time;
            areas = result.areas[0];

            name = areas.name;  // "SERVICE_ITEM";
            datas = areas.datas[0];
            
            var tbl_body = "";
            $.each(datas, function (key, value) {
                var tbl_row = "<td>" + key  + "</td> <td>" + value + "</td> ";
                tbl_body += "<tr >" + tbl_row + "</tr>";
            });

            return tbl_body;
        }
      }

    function getItemCode() {
        // get stock code
        code = localStorage.code;

        if (code == undefined || code == "") {
            code = "035720";   // stock code
        }

        return code;
    }
    
    function setItemCode(code) {
        localStorage.code = code;
    }

    function requestStockData(callbackfunc) {
        serviceURL = "http://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:" + getItemCode();

        console.log("request stock data: " + serviceURL);

        $.ajax({
            dataType: "json",
            url: serviceURL
        }).then(function (data) {

            if (data.resultCode == "success") {

                callbackfunc(data);
            }

        });
    };

    return {
        requestStockData: requestStockData,
        getItemCode: getItemCode,
        calcAccount: calcAccount,
        makePrintable: makePrintable,
        setItemCode: setItemCode
    }

})();

// common