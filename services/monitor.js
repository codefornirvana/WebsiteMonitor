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
  return request.get({url: "https://"+websiteObj.url, time: true}, function(err, response){
    if(err){
      console.log(err);
      return false;
    }
    models.Duration.create({
      WebsiteId: websiteObj.id,
      duration: response.elapsedTime
    });
    console.log("Pinged the endpoint");
    console.log("Reponse time => "+response.elapsedTime);
  });
}