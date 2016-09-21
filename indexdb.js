// jquery for storing the data of the form into indexeddb 

(function($) {
    console.log("b . js")
    $.fn.serializeFormJSON = function() {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    console.log("end fun")
})(jQuery);

$('form').submit(function(e) {
    e.preventDefault();
    var eventData = $(this).serializeFormJSON();
    console.log(eventData.name);
    console.log(eventData);


    $("#p").html(eventData.name + "   " + eventData.email + "   " + eventData.eventDate + "" + eventData.description + "" + eventData.location);

    //prefixes of implementation that we want to test
    console.log("checking for version")

    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

    //prefixes of window.IDB objects
    window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
    window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

    if (!window.indexedDB) {
        window.alert("Your browser doesn't support a stable version of IndexedDB.")
    }




    var db;
    console.log("request open")
    var request = window.indexedDB.open("EventForm", 1);

    request.onerror = function(event) {
        console.log("error: ");
    };

    request.onsuccess = function(event) {
        db = request.result;

        console.log("success db: " + db, "event data", eventData);
        console.log("event", event.target.result);
        console.log("db here", db)

        /************************************************************************/
        
       console.log("********TRANSACTION")

        var trans = db.transaction(["data"], "readwrite")
            .objectStore("data")
            .add({ name: eventData.name, email: eventData.email, eventDate: eventData.eventDate, description: eventData.description, location: eventData.location });
        console.log(" transaction executed ```")
        
        request.onsuccess = function(event) {
            alert("data has been added to your database.");
        };

        request.onerror = function(event) {
            alert("Unable to add data\r\ndata aready exists in your database! ");
        };

    };
    /************************************************************************/
    console.log("*****UPGRADE OBJECT STORE")
    request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore("data", { keyPath: "id", autoIncrement: true });
        console.log(objectStore)
        console.log(objectStore.IDBObjectStore.keyPath)
            /*for (var i in employeeeventData) {
               objectStore.add(employeeeventData[i]);
            }*/
    }


});
