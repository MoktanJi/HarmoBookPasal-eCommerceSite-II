const mongoose =  require("mongoose");
const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
        default: "https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png",
    },

    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },

    favourites: [
        {
            type: mongoose.Types.ObjectId,
            ref: "books",
        },
    ],

    cart: [
        {
            type: mongoose.Types.ObjectId,
            ref: "books",
        },
    ],

    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: "orders",
        },
    ],
},
{ timestamps: true }
);

module.exports = mongoose.model("user", user)