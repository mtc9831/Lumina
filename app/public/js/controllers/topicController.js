var mongoose=require("mongoose"),EssayTopicModel=mongoose.model("EssayTopic"),exports=module.exports={};exports.Topics=function(a,c){return EssayTopicModel.find(function(a,e){a?console.log(a):c.json(e)})};exports.Topic=function(a,c){var b=a.params.id;b&&EssayTopicModel.findById(b,function(a,b){a?console.log(a):b?c.json({Topic:b,status:!0}):c.json({status:!1})})};
exports.addTopic=function(a,c){var b=a.body,b=new EssayTopicModel({topicId:a.body.topicId,essayCategory:a.body.essayCategory,essayTopic:a.body.essayTopic});b.save(function(a){a?(console.log(a),c.json(!1)):c.json(!0)});return c.jsonp(a.body)};exports.editTopic=function(a,c){var b=a.params.id;b&&EssayTopicModel.findById(b,function(b,d){d.topicId=a.body.topicId;d.essayCategory=a.body.essayCategory;d.essayTopic=a.body.essayTopic;d.save(function(a){a?(c.json(!1),console.log(a)):c.json(!0)})})};
exports.deleteTopic=function(a,c){var b=a.params.id;b&&EssayTopicModel.findById(b,function(a,b){b.remove(function(a){a?(c.json(!1),console.log(a)):c.json(!0)})})};
