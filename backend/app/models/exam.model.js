const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema({
        mark: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        comment: {
            type: String,
            required: true,
            maxLength: 500,
            trim: true
        },
        examdate: {
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
        collection: "exam",
    });

    const Exam = mongoose.model("exam", schema);
    return Exam;
};