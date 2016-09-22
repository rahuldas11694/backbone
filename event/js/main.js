// this contanis db function 
// here first we need to open the database connection 
// & then use this connection in formView // code from indexeddb.js//

//console.log("main js")
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

var db;
//console.log("request open")
// here we are creating and opening the db connection 

var request = window.indexedDB.open("EVENT3", 1);

request.onerror = function(event) {
    console.log("error: ");
};

request.onsuccess = function(event) {
    db = request.result;

    //console.log("success db: " + db);
    //console.log("event.target.result", event.target.result);
    //console.log("db here", db)

};

request.onupgradeneeded = function(event) {
    var db = event.target.result; // EVENTDATA is name of the TABLE ie object store
    var objectStore = db.createObjectStore("EVENTDATA3", { keyPath: "id", autoIncrement: true });

    console.log("objectStore created", objectStore)
    console.log("objectStore.IDBObjectStore.keyPath", objectStore.IDBObjectStore)
}









// after taht transaction code should be in view
