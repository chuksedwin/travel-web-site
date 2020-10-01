const mongoose = require("../mongoose_connect");
// Creating the Booking Schema By Edwin
const BookingSchema = new mongoose.Schema({
  BookingDate: {
    type: Date,
    default: Date.now(),
  },
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  PackageId: {
    type: Number,
    required: true,
    ref: "Package",
  },
  // more fields defined below
});
BookingSchema.index({ UserId: 1, PackageId: 1 }, { unique: true });

// Creating the booking collection Model
module.exports = mongoose.model("booking", BookingSchema);
