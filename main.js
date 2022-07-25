STATUS ="";
objects = [];
objects_name="";

function setup() {
    canvas = createCanvas(350, 350)
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start() {
 
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
 objects_name = document.getElementById("input_text").innerHTML.value;
}
function draw() {
    
    if(STATUS != "") {
        image(video, 0, 0, 350, 350);
        objectDetector.detect(video, gotResults);

        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects detected";
            document.getElementById("name_of_object").innerHTML = "";
       fill("#0000FF");
       percent=floor(objects[i].confidence * 100);
       text(objects[i].label + " " + percent + "%" , objects[i].x, objects[i].y);
       
       if(objects[i].label ==  objects_name) 
       {
        objectDetector.detect(gotResults);
        video.stop();
        document.getElementById("status").innerHTML = "Object mentioned found";
        document.getElementById("name_of_object").innerHTML = objects[i].label;
        synth = window.speechSynthesis;
        utterThis = SpeechSynthesisUtterance(objects_name);
        synth.speak(utterThis);
        }
        else
        {
            document.getElementById("status").innerHTML = "Object mentioned not found";
        
            }
    }
    }
}
function modelLoaded() {
    console.log("Model Loaded!");
  STATUS=true; 
}

function gotResults(error, results) {
if(error) {
console.log(error);
}else{
    console.log(results);
    objects = results;
}
}