const express =require("express")
const request=require("request")
const bodyparser = require("body-parser")
const https = require("https")

const app=express()

app.use(express.static('public')) //for using css and images
app.use(express.urlencoded())  //for bodyparser

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstN = req.body.f;
  const lastN = req.body.l;
  const email = req.body.e;

  const data = {
    members: [
      {
        email_address: email,
        status : "subscribed",
        merge_fields : {
          FNAME: firstN,
          LNAME: lastN,
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us.api.mailchimp.com/3.0/lists/15d848cfc2";

  const options = {
    method: "POST",
    auth: "      "
  }

  const request = https.request(url, options, function(response){

    if(response.statusCode===200)
        res.sendFile(__dirname + "/success.html");
    else
        res.sendfile(__dirname + "/failure.html")

    response.on("data", function(data){
      console.log(JSON.parse(data));

    })
  })

  request.write(jsonData);
  request.end();

});


app.listen(process.env.PORT || 3000,function(){
  console.log("server is now live at port 3000");
})

app.post("/failure",function(req,res){
  res.redirect("/")
})



