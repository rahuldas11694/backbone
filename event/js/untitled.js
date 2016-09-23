/******************#########################***************************/
var transaction = db.transaction(["EVENTDATA6"], "readonly");
var objectStore = transaction.objectStore("EVENTDATA6");
 
var cursor = objectStore.openCursor();
 
cursor.onsuccess = function(e) {
    var res = e.target.result;

    console.log(res)
    console.log(res.value)
    
    if(res) {

    	s+=res.key;
    	for(var field in res.value )
    		s+=field ""+cursor.value[field];
        console.log("Key", res.key);
        console.dir("Data", res.value);
        res.continue();
    }
    $(".container").html(s)
}
/******************#########################***************************/
if(cursor) {
            s += "&lt;h2>Key "+cursor.key+"&lt;/h2>&lt;p>";
            for(var field in cursor.value) {
                s+= field+"="+cursor.value[field]+"&lt;br/>";
            }
            s+="&lt;/p>";
            cursor.continue();







                            if (res) {
                    console.log("Key", res.key);
                    
                    for(var)                                                                       
                    var key = res.key;
                    var data = res.value.name;
                    $(".container").html(key+""+data);
                    


                    console.dir("Data", res.value.name);
                    res.continue();
                }