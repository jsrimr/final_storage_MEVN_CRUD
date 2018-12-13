var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
    id: String,
    name: String,
    password: String
});
console.log('UserSchema 정의함.');

// UserModel 모델 정의
UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
console.log('UserModel 정의함.');