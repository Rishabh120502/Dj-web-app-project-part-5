function preload(){
song = loadSound("music.mp3");
song2 = loadSound("music2.mp3") 
}

song = "";
song2 = "";

function setup(){
canvas = createCanvas(600,500);
canvas.center();

video = createCapture(VIDEO)
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);

}


function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    status_song = song.isPlaying();
    
    if(scoreleftWrist >= 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(status_song == false){
            song.play();
        
            document.getElementById("song").innerHTML = "playing Harrypotter song"
    }
}
status_song2 = song2.isPlaying();
if(scorerightWrist >= 0.2){
    circle(leftWristX,leftWristY,20);
    song.stop();
    if(status_song2 == false){
       song2.play();
        document.getElementById("song").innerHTML = "Playing peter pan";
    }
}
}






leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
status = "";
scorerightWrist = 0;
scoreleftWrist = 0;


function gotPoses(results){
if(results.length>0){
    console.log(results);
    scoreleftWrist = results[0].pose.keypoints[9].score;
    scorerightWrist = results[0].pose.keypoints[10].score;
    console.log("score left wrist = " + scoreleftWrist);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log('Left wrist X = ' + leftWristX+ "left wrist y =" + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log('right wrist x ='+ rightWristX + "right wrist y = "+ rightWristY);
}
}



function modelLoaded(){
    console.log("POSENET IS INITIALISED")
}