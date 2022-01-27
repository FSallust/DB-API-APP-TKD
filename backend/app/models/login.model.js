module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            email: String,
            password: String,
        }, {
        versionKey: false,
        collection: "login",
    });

    const Login = mongoose.model("login", schema);
    return Login;
};