const { Schema } = require("mongoose");

module.exports = mongoose => {
    var schema = mongoose.Schema({
        question: {
            type: String,
            required: true,
            maxLength: 500,
            trim: true
          },
        answers: [{
            type: {
                label: {
                    type: String,
                    required: true,
                    maxLength: 100,
                    trim: true
                },
                isRight: {
                    type: Boolean,
                    required: true
                }
            },
            required: true,
            default: []
        }],
        level: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'grade'
        }
    }, {
        versionKey: false,
        collection: "question",
        timestamps: true
    });

    const Question = mongoose.model("question", schema);
    return Question;
};