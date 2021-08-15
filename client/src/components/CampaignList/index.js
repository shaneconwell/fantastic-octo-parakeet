import React from 'react';
import { Link } from 'react-router-dom';

const CampaignList = ({
  campaigns,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!campaigns.length) {
    return <h3>No Campaigns Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {campaigns &&
        campaigns.map((campaign) => (
          <div key={campaign._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${campaign.campaignAuthor}`}
                >
                  {campaign.campaignAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this campaign on {campaign.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this campaign on {campaign.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{campaign.campaignTitle}</p>
              <p>{campaign.campaignDescription}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/campaigns/${campaign._id}`}
            >
              Join the discussion on this campaign.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default CampaignList;
