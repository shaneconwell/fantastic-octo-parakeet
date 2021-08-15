const { AuthenticationError } = require('apollo-server-express');
const { User, Campaign } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('campaigns');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('campaigns');
    },
    campaigns: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Campaign.find(params).sort({ createdAt: -1 });
    },
    campaign: async (parent, { campaignId }) => {
      return Campaign.findOne({ _id: campaignId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('campaigns');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addCampaign: async (parent, { campaignTitle , campaignDescription}, context) => {
      if (context.user) {
        const campaign = await Campaign.create({
          campaignTitle,
          campaignDescription,
          campaignAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { campaigns: campaign._id } }
        );

        return campaign;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { campaignId, commentText }, context) => {
      if (context.user) {
        return Campaign.findOneAndUpdate(
          { _id: campaignId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeCampaign: async (parent, { campaignId }, context) => {
      if (context.user) {
        const campaign = await Campaign.findOneAndDelete({
          _id: campaignId,
          campaignAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { campaigns: campaign._id } }
        );

        return campaign;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeComment: async (parent, { campaignId, commentId }, context) => {
      if (context.user) {
        return Campaign.findOneAndUpdate(
          { _id: campaignId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
