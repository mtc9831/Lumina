var mongoose=require("mongoose"),FeedbackModel=mongoose.model("Feedback"),exports=module.exports={};exports.Feedbacks=function(b,c){return FeedbackModel.find(function(a,b){a?console.log(a):c.json(b)})};exports.Feedback=function(b,c){var a=b.params.id;a&&FeedbackModel.findById(a,function(a,b){a?console.log(a):b?c.json({Feedback:b,status:!0}):c.json({status:!1})})};
exports.editFeedback=function(b,c){var a=b.params.id;a&&FeedbackModel.findById(a,function(a,d){d.fbIsDisplayed=b.body.fbIsDisplayed;d.save(function(a){a?(c.json(!1),console.log(a)):c.json(!0)})})};exports.deleteFeedback=function(b,c){var a=b.params.id;a&&FeedbackModel.findById(a,function(a,b){b.remove(function(a){a?(c.json(!1),console.log(a)):c.json(!0)})})};