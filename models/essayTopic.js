module.exports=function(a){var b=new a.Schema({topicId:{type:Number,required:!0},essayCategory:{type:String},essayTopic:{type:String,required:!0},isOpen:{type:Boolean,default:!0}});this.model=a.model("EssayTopic",b);return this};