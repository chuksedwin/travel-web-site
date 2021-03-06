const mongoose = require('../mongoose_connect');
// Creating the Agency Schema by Stanley
const AgencySchema = new mongoose.Schema({
    AgencyId: {
        type: Number,
        required: true,
        unique: true
    },
    AgncyAddress: {
        type: String,
        required: true,
        trim: true
    },
    AgncyCity: {
        type: String,
        required: true,
        trim: true
    },
    AgncyPostal: String,
    AgncyProv: String,
    AgncyCountry: String,
    AgncyPhone: String,
    AgncyFax: String
    
});
// Creating the Agency collection Model
module.exports = mongoose.model('Agency', AgencySchema);
