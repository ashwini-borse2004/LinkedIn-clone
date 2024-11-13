const mongoose = require("mongoose");

//Skills field Schema
const SkillSchema =new mongoose.Schema({
  skillName:{
    type: String,
  },
 });

    const Skill = mongoose.model("Skill", SkillSchema);
    module.exports = Skill; 