const express=require('express');
const port=3000;
const app=express();
app.use(express.json());
const users=[{
    name:"Jade",
    age:"21",
    haveAccess:true ,
    kidneys:[{healthy:false}]
}]
function accessCheck(i:any):any{
  return users[i].haveAccess;
}


app.get("/",(req:any,res:any)=>{
  let numberOfKidney=users[0].kidneys.length;
let numberOfHealthyKidneys=0;
  if(accessCheck(0)){
   
   for(let i=0;i<users[0].kidneys.length;i++){
    if(users[0].kidneys[i].healthy)
      numberOfHealthyKidneys++;
   }
   let numberOfUnHealthyKidneys=numberOfKidney-numberOfHealthyKidneys;
   res.json({numberOfKidney,numberOfHealthyKidneys,numberOfUnHealthyKidneys});
  }
  else
   res.status(403).json({msg:"No Access"});
})
app.post("/",(req:any,res:any)=>{
  if(accessCheck(0)){
  const isHealthy=req.body.isHealthy;
  users[0].kidneys.push({healthy:isHealthy});
  
  res.json({msg:"kidney added"});
}
else
res.status(403).json({msg:"No Access"});
})
app.put("/",(req:any,res:any)=>{
    if(accessCheck(0)){
      let i=0;
      for(;i<users[0].kidneys.length;i++)
       if(!users[0].kidneys[i].healthy){
          users[0].kidneys[i].healthy=true;
         break;
       }
       if(i!=users[0].kidneys.length)
       res.json({msg:"Kidney transplant successful!!"});
      else
      res.json({msg:"Patient is already Healthy."});
    }
    else
res.status(403).json({msg:"No Access"});
})
app.delete("/",(req:any,res:any)=>{
  if(accessCheck(0)){
    if(kidneyHealthCheck()){
      let newSet=[];
      let count=0;
      for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy){
            newSet.push({
            healthy:true
          })
          
        }
        
        if(!users[0].kidneys[i].healthy&&count!=0){
         
          newSet.push({
            healthy:false
          })   

        }
        if(!users[0].kidneys[i].healthy&&count==0){
          count++;

        }
      }
      users[0].kidneys=newSet;
      res.json({msg:"One unhealthy kidney removed."})
    }
    else
    res.status(411).json({msg:"Patient is already Healthy."});
  }
  else
  res.status(403).json({msg:"No Access"});
})
function kidneyHealthCheck(){
  let note=false
  for(let i=0;i<users[0].kidneys.length;i++){
    if(!users[0].kidneys[i].healthy){
      note=true;
      break;}

  }
  return note;
}
app.listen(port);