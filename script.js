num=0;
inc=0;
frac=0;
function down(event){
    if(event.keyCode==38)
    {
        if(comp.y>0)
        comp.y -=comp.velocityY;
    }
    if(event.keyCode==40)
    {   if(comp.y+comp.height<c.height)
        comp.y +=comp.velocityY;
    }
}
function up(event){
    console.log(event);
}





//background color



function backgroundcolor(){
    let x= Math.floor(Math.random()*255);
    let y= Math.floor(Math.random()*255);
    let z= Math.floor(Math.random()*255);
    document.querySelector("#body").style.backgroundColor=`rgba(${x},${y},${z})`;
}

setInterval(backgroundcolor,1000);


var c= document.getElementById("game");
c.width=850;
c.height=400;
var contx= c.getContext("2d");
 
// move userhandle
window.addEventListener("mousemove",userhandle);
function userhandle(){
    user.y= (event.y/window.innerHeight)*(c.height-user.height);
}

// move computer handle
function comphandle(b){
    if(b-comp.height/2<= 0){
        comp.y=comp.height*(1-frac);
    }
    else if(b+comp.height/2==c.height)
        {
            comp.y=(c.height-comp.height)*frac;
        }
    else{
    comp.y=( b-comp.height/2)*frac;
    }
}
function restart(){
   ball.x=425;
    ball.y=200;
    ball.speed=5*Math.pow(2,0.5);
    ball.velocityX=5;
    ball.velocityY=5;
}
//collission detector
function collission(){
    if(ball.x-ball.r-user.width<=0||ball.x+ball.r+comp.width>=c.width)
    {     
            if(user.y-ball.r<=ball.y&&ball.y<=user.y+ball.r+user.height&&ball.x<c.width/2)
                {
                
                    return true;
                }
            else if (comp.y - ball.r <= ball.y && ball.y <= comp.y + ball.r + comp.height && ball.x > c.width / 2) {
                return true;

            }


            else {
                return false;
            }

    }
    else{
        return false;
    }
}


// make rectangle
function rect(x,y,w,h,color)
{   
    contx.fillStyle = color;
    contx.fillRect(x,y,w,h);

   
}
// make circle
function circle(x,y,r,color){
contx.beginPath();
contx.fillStyle= color;
contx.arc(x,y,r,0,Math.PI*2,false);
contx.fill();
}
// make net
function net(){
    for(i=0;i<10;i++){
        rect(420,i*40+4,5,31);
    }
}
// write text
function text(score,x,y){
contx.font= "60px fantasia";
contx.fillStyle="white";
contx.fillText(score,x,y);
}

// user object
var user={
    x:0,
    y:150,
    color:"#ffffff",
    width:30,
    height:100,
    score:0,
}
//computer object
var comp={
    x:820,
    y:150,
    color:"#ffffff",
    width:30,
    height:100,
    score:0,
    velocityY:0,
}

// ball object
var ball={
    x:425,
    y:200,
    color:"white",
    r:20,
    speed:5*Math.pow(2,0.5),
    velocityX:5,
    velocityY:5,
}


// fuction that display diff components
function render(){
contx.clearRect(0, 0, c.width, c.height);
rect(user.x,user.y,user.width,user.height,user.color);
rect(comp.x,comp.y,comp.width,comp.height,comp.color);
circle(ball.x,ball.y,ball.r,ball.color);
net();
text(user.score,212.5,70);
text(comp.score,637.5,70);

}
function update(){
   
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    if(num==1){
    comphandle(ball.y);
    }
    if(ball.y+ball.r>=c.height||ball.y-ball.r<=0){
        document.getElementById("strike").currentTime=0;
         document.getElementById("strike").play();
        ball.velocityY=-ball.velocityY;

    }
    

    
    if(collission())
    {   document.getElementById("padle").currentTime=0;
         document.getElementById("padle").play();
       player= ball.x<425?user:comp;
       dir= ball.x<425?1:-1;
         a =( ball.y-(player.y+player.height/2))/(player.height/2+ball.r)*Math.PI/4;
        ball.speed +=inc;
            ball.velocityX = dir*ball.speed*Math.cos(a);
            ball.velocityY =ball.speed*Math.sin(a) ;

    }
    if(ball.x-ball.r<=0)
    { document.getElementById("point").currentTime=0;
    document.getElementById("point").play();

        comp.score++;
        restart();
    }
    if(ball.x+ball.r>=c.width)
    {   document.getElementById("point").currentTime=0;
    document.getElementById("point").play();

        user.score++;

        restart();
}
  
}
// 
function game(){
    
    if(num==1){
    if(user.score==5)
    { document.getElementById("clap").currentTime=0;
    document.getElementById("clap").play();
    clearInterval(r);
    window.alert("YOU WON");
    document.getElementById("clap").pause();
    
    }
    else  if(comp.score==5)
    {    document.getElementById("boo").currentTime=0;
    document.getElementById("boo").play();
        clearInterval(r);

        window.alert("ANIRUDDH WON");
        document.getElementById("boo").pause();
    }
    }
    if(num==2){
        if(user.score==5)
       {  
       document.getElementById("clap").play();   
        clearInterval(r);
            window.alert("USER 1 WON");
            document.getElementById("clap").pause();
        }
        else  if(comp.score==5)
      {  
      document.getElementById("clap").play(); 
        clearInterval(r);
      
           window.alert("USER 2 WON");
           document.getElementById("clap").pause();
          }
        }
        update();
    render();
    }

function gamestrt()
{
    let f =0;
let ini= document.getElementsByTagName("input");
for(let k=0;k< ini.length;k++)
{
    if(ini[k].name=="level")
    {
       if(ini[k].checked)
       {   f++; 
           if(ini[k].value=="hard"){
            inc=0.5;
            frac=0.77;
           }
           else{
            inc=0.1;
            frac=0.75;
           }
       }
}

if(ini[k].name=="par")
{
   if(ini[k].checked)
   {    f++;
    if(ini[k].value=="two"){
        num=2;
       }
       else{
        num=1;
       }
   }
}
}
if(f!=2){
    window.alert("Please Select Level and Number of Players");
    return;
}
document.getElementById("numb").style.display="none";
document.querySelector("button").style.display="none";
c.style.display="block";
document.getElementById("exit").style.display="block";
if(num==2){
    comp.velocityY=40;
    window.addEventListener("keydown",down);
    window.addEventListener("keyup",up); 
}
r= setInterval(game,1000/50);
}

//adding 2player functionality
document.querySelector("button").addEventListener("click",gamestrt);
document.getElementById("exit").addEventListener("click",()=>{location.reload()});