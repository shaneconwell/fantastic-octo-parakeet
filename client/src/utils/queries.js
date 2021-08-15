import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      campaigns {
        _id
        campaignTitle
        campaignDescription
        createdAt
      }
    }
  }
`;

export const QUERY_CAMPAIGNS = gql`
  query getCampaigns {
    campaigns {
      _id
      campaignTitle
      campaignDescription
      campaignAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_CAMPAIGN = gql`
  query getSingleCampaign($campaignId: ID!) {
    campaign(campaignId: $campaignId) {
      _id
      campaignTitle
      campaignDescription
      campaignAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      campaigns {
        _id
        campaignTitle
        campaignDescription
        campaignAuthor
        createdAt
      }
    }
  }
`;
