const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema({
        title: {
            type: String,
            required: true,
            maxLength: 100,
            trim: true
        },
        description: {
            type: String,
            required: true,
            maxLength: 500,
            trim: true
        },
        eventdate: {
            type: Date,
            required: true
        },
        id_user: {
            type: Schema.Types.ObjectId,
            require: true,
            ref: 'user'
        }
    }, {
        versionKey: false,
        collection: "event",
    });

    const Event = mongoose.model("event", schema);
    return Event;
};