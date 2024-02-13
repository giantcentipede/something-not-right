img=""
status='';
objects=[];

function preload() {

}

function setup() {
canvas=createCanvas(640,420);
canvas.center();
video=createCapture(VIDEO);
video.hide(); 

objectDetector=ml5.objectDetector("cocossd",modelLoaded);
document.getElementById("status").innerHTML="status:detecting objects";


}

function modelLoaded() {
    console.log("modelLoaded");
    status=true;

}

function draw() {
image(video,0,0,640,420);
if (status!="") {
    objectDetector.detect(img,gotresults);
for (i=0; i<objects.length; i++) {
    document.getElementById("status").innerHTML="status:objects detected";

    fill(255, 0, 0);
    percent=floor(objects[i].confidence*100);
    text(objects[i].label+" "+percent+"%",objects[i].x+5,objects[i].y+15);
    noFill();
stroke(255,0,0);
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

}
}


}

function gotresults(error,results) {
    if (error) {
        console.log(error);

    }

    else {
        console.log(results);
        objects=results;

    }
}