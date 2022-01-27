module.exports = mongoose => {
  var schema = mongoose.Schema({
    label: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },
  }, {
    versionKey: false,
    collection: "role",
  });

  const Role = mongoose.model("role", schema);
  return Role;
};