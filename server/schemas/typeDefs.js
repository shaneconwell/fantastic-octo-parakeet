const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    campaigns: [Campaign]!
  }

  type Campaign {
    _id: ID
    campaignTitle: String
    campaignDescription: String
    campaignAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    campaigns(username: String): [Campaign]
    campaign(campaignId: ID!): Campaign
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCampaign(campaignTitle: String!, campaignDescription: String!): Campaign
    addComment(campaignId: ID!, commentText: String!): Campaign
    removeCampaign(campaignId: ID!): Campaign
    removeComment(campaignId: ID!, commentId: ID!): Campaign
  }
`;

module.exports = typeDefs;
