const mongoose = require("mongoose");

//Projects Field Schema
const ProjectSchema =new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: false,
  },
  links: [
     {
    type: String,
  },
],
});

    const Project = mongoose.model("Project", ProjectSchema);
    module.exports = Project; 