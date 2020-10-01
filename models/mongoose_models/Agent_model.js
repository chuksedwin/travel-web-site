const mongoose = require('../mongoose_connect');
// Creating the Agent Schema by Abdullah
const AgentSchema = new mongoose.Schema({
    AgentId: {
        type: Number,
        required: true,
        unique: true
    },
    AgtFirstName: {
        type: String,
        required: true,
        trim: true
    },
    AgtLastName: {
        type: String,
        required: true,
        trim: true
    },
    AgtMiddleInitial: String,
    AgtBusPhone: String,
    AgtEmail: String,
    AgtPosition: String,
    AgencyId: {
        type: Number,
        required: true
    }
    
});
// Creating the Agent collection Model
module.exports = mongoose.model('Agent', AgentSchema);
