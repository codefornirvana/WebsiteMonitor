const request = require("request");
const models= require("../models");
module.exports.monitor = async (websiteId) => {
  let runnerReference = setInterval(async () => {
    await pingEndpoint(websiteId, runnerReference);
  }, 1000);
};
async function pingEndpoint(websiteId, runnerReference){
  var websiteObj = await models.Website.findById(websiteId);
  if(websiteObj == null ){
    console.log("Clearing up the timer ... ");
    clearInterval(runnerReference);
    return false;
  }
  console.log(JSON.stringify(websiteObj));
  return request[websiteObj.method.toLowerCase()]({
    url: "https://"+websiteObj.url, 
    headers: websiteObj.headers,  
    body: websiteObj.data,
    time: true}, async function(err, response){
    if(err){
      console.log(err);
      return false;
    }
    try{
      await models.Duration.create({
        WebsiteId: websiteObj.id,
        duration: response.elapsedTime
      });
    }
    catch(e){
      console.log("Record is already deleted ... ");
    }
    console.log("Pinged the endpoint");
    console.log("Reponse time => "+response.elapsedTime);
  });
}