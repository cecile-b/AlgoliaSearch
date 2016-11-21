/* DATA WRANGLE SCRIPT */ 

/* This script combines two files, and 
writes the output as valid JSON to a file. */ 

//Read 1st File: restaurant_list.
var fs = require("fs");
console.log("\n ****START**** \n");
var contents = fs.readFileSync("data.txt");
var jsonContent = JSON.parse(contents);

//Read 2nd File: restaurant_info.
var contents2 = fs.readFileSync("data2.txt");
var jsonContent2 = JSON.parse(contents2);

//For each object in first file, look up 
//the corresponding object in second file. 
//Add properties to the first object. 
var returnArray = [];
for(var i = 0; i < jsonContent.length; i++) {
    var obj = jsonContent[i];
    var objIDToFind = obj.objectID;
    for (var j = 0; j < jsonContent2.length; j++){
      var obj2 = jsonContent2[i];
      if(obj2.objectID == objIDToFind){
        obj["food_type"] = obj2["food_type"];
        obj["stars_count"] = obj2["stars_count"];
        obj["neighborhood"] = obj2["neighborhood"];
        obj["price_range"] = obj2["price_range"];
        JSON.stringify(obj);
        returnArray.push(obj);
      }
    } 
}

//Use stringify to create JSON objects. 
for(var i= 0; i<returnArray.length; i++){
  var newString = JSON.stringify(returnArray[i]);
  returnArray[i] = newString;    
}

//Write combined output to a file. Output is valid JSON.
fs.writeFile('data3.txt', "[" + returnArray + "]", function (err) {
     if (err)
       throw err;
});
