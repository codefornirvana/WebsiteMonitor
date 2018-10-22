var express = require('express');
var router = express.Router();
var models = require("../models");
const monitorService = require("../services/monitor");
const percentile = require("percentile");
/* GET home page. */
router.get("/", async (req, res) => {
  // send the details of the url
  console.log("Received in normal ");
  res.send({urls: await models.Website.findAll({
    attributes: [["id","_id"], "url", "method", "data", "headers"]
  })});
});
router.get("/:id([0-9]+)",async  (req, res) => {
  console.log("recieved in regex");
  let logData = await models.Website.findById(req.params.id,{
    include: [{
      model: models.Duration,
      order: [["id", "DESC"]]
    }]
  });
  let msg = {
    status: (logData != null)
  }
  if(msg.status){

    let durations = logData.Durations.map(x => x.duration);
    let fiftyPercentile               = percentile(50, durations);
    let seventyFivePercentile   = percentile( 75, durations);
    let ninetyFivePercentile    = percentile( 95, durations);
    let ninetyNinePercentile    = percentile( 99, durations);
    msg["_id"] = logData.id;
    msg["responses"] = durations.slice(0,100);
    msg["50th_percentile"] = fiftyPercentile;
    msg["75th_percentile"] = seventyFivePercentile;
    msg["95th_percentile"] = ninetyFivePercentile;
    msg["99th_percentile"] = ninetyNinePercentile;
    msg["url"] = logData.url;
    msg["data"] = logData.data;
    msg["method"] = logData.method;
    msg["headers"] = logData.headers;
  }
  res.send(msg);
});
router.post("/", async (req, res) => {
  // add an url to monitor
  let newWebsite = await models.Website.create(req.body);
  console.log("Initiating the log monitoring");
  monitorService.monitor(newWebsite.id);
  res.send({success: true, _id: newWebsite.id});
});
router.put("/:id([0-9]+)", async (req, res) => {
  await models.Website.update(req.body, {where: { url: req.params.id}});
  res.send({success: true, _id: req.params.id})
});
router.delete("/:id([0-9]+)", async (req, res) => {
  let response = await models.Website.destroy({
    where: {
      id: req.params.id
    }
  });
  let deleteResponse = {};
  deleteResponse.success = response > 0;
  res.send(deleteResponse);
});
module.exports = router;
