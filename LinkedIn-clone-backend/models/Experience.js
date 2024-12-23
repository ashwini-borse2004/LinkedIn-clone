const mongoose = require("mongoose");

//Experience field Schema
const ExperienceSchema =new mongoose.Schema({
  companyName:{
    type: String,
    required: true,
  },
  position:{
    
    type: String,
    required:true,
  },
  startDate:
  {
    type: Date,
    required: false,
  },
  endDate:{
    type: String,
    required: false,
  },
  discription:{
    type: String,
    required: false,
  },
    });

    const Experience = mongoose.model("Experience", ExperienceSchema);
    module.exports = Experience; 
