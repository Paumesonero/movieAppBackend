const mongoose = require("mongoose")
const {Schema, model} = mongoose;

const reviewLikeSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        reviewId:{
            type: Schema.Types.ObjectId,
            ref:"Review"
        }
    },
    {
        timestamps: true
    }
);

module.exports = model("ReviewLike", reviewLikeSchema);