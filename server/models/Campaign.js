const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const campaignSchema = new Schema({
  campaignTitle: {
    type: String,
    required: 'You need to leave a campaign!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  campaignDescription: {
    type: String,
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  campaignAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Campaign = model('Campaign', campaignSchema);

module.exports = Campaign;
