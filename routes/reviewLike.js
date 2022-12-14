const express = require('express');
const router = express.Router();
const {isAuthenticated} = require('../middlewares/jwt')
const ReviewLike = require('../models/ReviewLike');
const ErrorResponse = require('../utils/error');

// @desc    User likes a review.
// @route   POST reviewLike/:reviewId/add
// @access  User
router.post("/:reviewId/add", isAuthenticated, async(req, res, next) => {
    const userId = req.payload._id;
    const {reviewId} = req.params;
    try {
        await ReviewLike.findOneAndDelete({userId: userId, reviewId: reviewId});
        const addedLike = await ReviewLike.create({userId: userId, reviewId: reviewId});
        res.status(201).json({data: addedLike});
    } catch (error) {
        error = new ErrorResponse(message, 400);
    }
});
// @desc    User removes a like from a review.
// @route   DELETE reviewLike/:reviewId/remove
// @access  User
router.delete("/:reviewId/remove", isAuthenticated, async(req, res, next) => {
    const userId = req.payload._id;
    const {reviewId} = req.params;
    try {
        const removedLike = await ReviewLike.findOneAndDelete({userId: userId, reviewId});
        res.status(202).json({data: removedLike})
    } catch (error) {
        error = new ErrorResponse(message, 400);
    }
});
// @desc    User can see the number of likes
// @route   GET /reviewLike/:reviewId
// @access  User
router.get("/:reviewId", isAuthenticated, async(req, res, next) => {
    const {reviewId} = req.params;
    try {
        const reviewLikes = await ReviewLike.find({reviewId});
        const numberOfLikes = reviewLikes.length
        res.status(202).json({data: numberOfLikes})
    } catch (error) {
        error = new ErrorResponse(message, 400);
    }
});
// @desc    Review has been liked by user
// @route   GET reviewLike/isliked/:reviewId
// @access  User
router.get("/isLiked/:reviewId", isAuthenticated, async(req, res, next) => {
    const {reviewId} = req.params;
    const userId = req.payload._id;
    try {
        const reviewLikes = await ReviewLike.find({reviewId:reviewId, userId: userId});
        let isLiked;
        reviewLikes.length > 0 ? isLiked = true : isLiked = false
        res.status(202).json({data: isLiked})
    } catch (error) {
        error = new ErrorResponse(message, 400);
    }
});

module.exports = router;