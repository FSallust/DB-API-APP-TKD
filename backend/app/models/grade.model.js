module.exports = mongoose => {
    var schema = mongoose.Schema({
      label: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
      },
      belt: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true
      },
      level: {
        type: Number,
        min: 0,
        max: 10
      },
    }, {
      versionKey: false,
      collection: "grade",
    });
  
    const Grade = mongoose.model("grade", schema);
    return Grade;
  };