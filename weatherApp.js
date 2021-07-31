const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.get('/style.css',function(req,res){
    res.sendFile(__dirname+"/style.css");
})

app.post("/",function(req,res){
     const query=req.body.cityName;
     const apiKey="6e9b4e032fdbade8e5f85ec3aef2be66";
     const unit="metric";
     const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
     https.get(url,function(response){
            response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const desc=weatherData.weather[0].description;
            const icon=weatherData.weather[0].icon;
            console.log(icon);
            const image_url="https://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<h1>The Temperature in "+ query + " is " +temp +" degree Celcius.</h1>");
            res.write("<p>The Currently weather is " + desc +"</p>");
            res.write("<img src="+ image_url +">");
            res.send();
       })
    })
})


app.listen(3000,function(){
    console.log("Server is running on port 3000.");
}) 