module.exports=function(a){var b=new a.Schema({userId:{type:String,required:!0},sessionId:{type:String,required:!0},elapsedTime:{type:Number},essaycaption:{type:String},essaytxt:{type:String},subject:{type:String},testname:{type:String},ansJson:{type:String},doubtJson:{type:String}});this.model=a.model("SessionData",b);return this};
