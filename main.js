prediccion1 = "";
prediccion2 = "";
Webcam.set({ 
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
}); 
camera = document.getElementById("camara");
 Webcam.attach('#camara');

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = '<img id="image" src="'+data_uri+'"/>';
    })
}
function speak()
{
    var synth = window.speechSynthesis;
    var p1 = "La primera prediccion es"+prediccion1;
    var p2 = "La segunda prediccion es"+prediccion2;
    var utterThis = new SpeechSynthesisUtterance(p1+p2);
    synth.speak(utterThis)
}

console.log("ml5 version:",ml5.version);
Classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/76xjg5yxa/model.json", model_logged);
function model_logged() {
    console.log("Modelo cargado!");
}
function check()
{
    var img = document.getElementById("image");
    Classifier.classify(img, gotResults);
}
function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        document.getElementById("emotion_name").innerHTML = results[0].label;
        document.getElementById("emotion_name2").innerHTML = results[1].label;
        prediccion1 = results[0].label;
        prediccion2 = results[1].label;
        speak();
        if(results[0].label == "Bien")
        {
            document.getElementById("emoji").innerHTML = "&#128077;";
            
        }
        if(results[0].label == "Mal")
        {
            document.getElementById("emoji").innerHTML = "&#128078;";
            
        }
        if(results[0].label == "Ok")
        {
            document.getElementById("emoji").innerHTML = "&#128076;";
            
        }
        if(results[1].label == "Bien")
        {
            document.getElementById("emoji2").innerHTML = "&#128077;";
            
        }
        if(results[1].label == "Mal")
        {
            document.getElementById("emoji2").innerHTML = "&#128078;";
            
        }
        if(results[1].label == "Ok")
        {
            document.getElementById("emoji2").innerHTML = "&#128076;";
            
        }
    }
}