const express = require("express");
const router = express.Router();
const {isAuthenticated} = require('../middlewares/jwt');
const Vote = require("../models/Vote");
const ErrorResponse = require('../utils/error');

// @desc    Posts vote to the database (like).
// @route   POST /votes/:movieId/like
// @access  User
router.post("/:movieId/like", isAuthenticated, async (req, res, next) => {
    const {movieId} = req.params;
    const user = req.payload;
    try {
        const existingVote = await Vote.find({userId: user._id, movieId: movieId});
        if(existingVote) {
            await Vote.findOneAndDelete({userId: user._id, movieId: movieId});
        };
        const voteAdded = await Vote.create({userId: user._id, movieId, vote:true});
        res.status(201).json({data: voteAdded});
    } catch (error) {
        error = new ErrorResponse(message, 400);
    }
});
// @desc    Posts vote to the database (dislike).
// @route   POST /votes/:movieId/dislike
// @access  User
router.post("/:movieId/dislike", isAuthenticated, async (req, res, next) => {
    const {movieId} = req.params;
    const user = req.payload;
    try {
        const existingVote = await Vote.find({userId: user._id, movieId: movieId});
        if(existingVote) {
            await Vote.findOneAndDelete({userId: user._id, movieId: movieId});
        }
        const voteAdded = await Vote.create({userId: user._id, movieId, vote:false});
        res.status(201).json({data: voteAdded});
    } catch (error) {
        error = new ErrorResponse(message, 400);
    }
});
// @desc    Posts vote to the database (ignore).
// @route   POST /votes/:movieId/ignore
// @access  User
router.post("/:movieId/ignore", isAuthenticated, async (req, res, next) => {
    const {movieId} = req.params;
    const user = req.payload;
    try {
        const existingVote = await Vote.find({userId: user._id, movieId: movieId});
        if(existingVote) {
            await Vote.findOneAndDelete({userId: user._id, movieId: movieId});
        }
        const voteAdded = await Vote.create({userId: user._id, movieId, ignore:true});
        res.status(201).json({data: voteAdded});        
    } catch (error) {
        error = new ErrorResponse(message, 400);
    }
});
// @desc    checks user's votes.
// @route   POST /votes/myVotes
// @access  User
router.get("/myVotes", isAuthenticated, async (req,res,next) =>{
    const userId = req.payload._id;
    try {
        const votesFromDb = await Vote.find({userId: userId}).populate("movieId");
        res.status(200).json({data: votesFromDb});
    } catch (error) {
        error = new ErrorResponse(message, 400);
    }
});

module.exports = router;