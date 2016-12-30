module.exports=function(a){var b=new a.Schema({title:String,author:String,postText:String,postTime:{type:Date,default:Date.now}});this.model=a.model("BlogPost",b);return this};
