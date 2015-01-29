
var event_module = (function () {
    
    var interval = 1.0;

    function createAlarm() {
        if (interval == 0) {
            chrome.alarms.clear("worker_myalarm");
            return;
        }

        // check existing alarms
        chrome.alarms.get("worker_myalarm", function (alarm) {
            
            if (alarm != undefined) {
                console.log(alarm);
            } else {
                console.log("worker_myalarm is not defined!");
            }
        });

        chrome.alarms.create("worker_myalarm", { delayInMinutes: 0.1, periodInMinutes: interval });
        
        console.log("worker_myalarm just created");
    }

    chrome.runtime.onStartup.addListener(function () {
        console.log("runtime.onStartUp handler ");
        createAlarm();  // set alarm
    });

    chrome.runtime.onInstalled.addListener(function () {
        console.log("runtime.onInstalled handler ");
        createAlarm();  // set alarm
    });

    chrome.alarms.onAlarm.addListener(function (alarm) {
        // alarm callback
        var loggingtime = new Date();
        console.log("onAlarm from event.js, time: " + loggingtime.getHours() + ":" + loggingtime.getMinutes() + ":" + loggingtime.getSeconds());

        // do query
        common_module.requestStockData(function (jsondata) {

            //chrome.runtime.sendMessage({ jsonobj: jsondata }, function (response) { });
            
            common_module.calcAccount(jsondata);

        });
    });

    //chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //    saved_json_data = request.jsonobj;
    //    common_module.calcAccount(saved_json_data);
    //    var tbl_body = common_module.makePrintable(saved_json_data);
    //    $("#tbody").html(tbl_body);
    //});

})();


