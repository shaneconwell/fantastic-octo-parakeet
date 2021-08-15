import React from 'react';
import { useQuery } from '@apollo/client';

import CampaignList from '../components/CampaignList';
import CampaignForm from '../components/CampaignForm';

import { QUERY_CAMPAIGNS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_CAMPAIGNS);
  const campaigns = data?.campaigns || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <CampaignForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <CampaignList
              campaigns={campaigns}
              title="Some Feed for Campaign(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
