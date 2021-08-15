import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CAMPAIGN = gql`
  mutation addCampaign($campaignTitle: String!, $campaignDescription: String!) {
    addCampaign(campaignTitle: $campaignTitle, campaignDescription: $campaignDescription) {
      _id
      campaignTitle
      campaignDescription
      campaignAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($campaignId: ID!, $commentText: String!) {
    addComment(campaignId: $campaignId, commentText: $commentText) {
      _id
      campaignTitle
      campaignDescription
      campaignAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
