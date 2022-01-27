const { Schema } = require("mongoose");

module.exports = mongoose => {
  var schema = mongoose.Schema({
    lastname: {
      type: String,
      required: true,
      maxLength: 25,
      trim: true
    },
    firstname: {
      type: String,
      required: true,
      maxLength: 25,
      trim: true
    },
    password: {
      type: String,
      required: true,
      maxLength: 25,
      trim: true
    },
    birthdate: {
      type: Date,
      required: true
    },
    email: {
      type: String,
      required: true,
      maxLength: 100,
      trim: true
    },
    presences: [{
      type: Date,
      required: true,
      default: []
    }],
    photo: {
      type: String,
      trim: true,
      default: ''
    },
    qr: {
      type: String,
      trim: true,
      default: ''
    },
    id_role: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'role'
    },
    id_grade: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'grade'
    }
  }, {
    versionKey: false,
    collection: "user",
    timestamps: true
  });

  const User = mongoose.model("user", schema);
  return User;
};