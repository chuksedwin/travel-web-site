const mongoose = require("../mongoose_connect");
// Creating the Package Schema by Stanley
const PackageSchema = new mongoose.Schema({
  PackageId: {
    type: Number,
    required: true,
    unique: true,
  },
  PkgName: {
    type: String,
    required: true,
    trim: true,
  },
  PkgStartDate: {
    type: Date,
    required: true,
  },
  PkgEndDate: {
    type: Date,
    required: true,
  },
  PkgDesc: {
    type: String,
    required: true,
    trim: true,
  },
  PkgBasePrice: {
    type: Number,
    required: true,
  },
  
});
// Creating the Package collection Model
module.exports = mongoose.model("Package", PackageSchema);
