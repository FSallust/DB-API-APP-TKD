const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema({
        label: {
            type: String,
            required: true,
            maxLength: 100,
            trim: true
        },
        link: {
            type: String,
            required: true,
            maxLength: 500,
            trim: true
        },
        id_grade: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'grade'
        }
    }, {
        versionKey: false,
        collection: "theory",
    });

    const Theory = mongoose.model("theory", schema);
    return Theory;
};