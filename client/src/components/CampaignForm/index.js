import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_CAMPAIGN } from '../../utils/mutations';
import { QUERY_CAMPAIGNS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const CampaignForm = () => {
  const [campaignTitle, setCampaignTitleText] = useState('');
  const [campaignDescription, setCampaignDescriptionText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addCampaign, { error }] = useMutation(ADD_CAMPAIGN, {
    update(cache, { data: { addCampaign } }) {
      try {
        const { campaigns } = cache.readQuery({ query: QUERY_CAMPAIGNS });

        cache.writeQuery({
          query: QUERY_CAMPAIGNS,
          data: { campaigns: [addCampaign, ...campaigns] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, campaigns: [...me.campaigns, addCampaign] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addCampaign({
        variables: {
          campaignTitle,
          campaignDescription,
          campaignAuthor: Auth.getProfile().data.username,
        },
      });

      setCampaignTitleText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleTitleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'campaignTitle' && value.length <= 280) {
      setCampaignTitleText(value);
      setCharacterCount(value.length);
    }
  };
  const handleDescriptionChange = (event) => {
    const { name, value } = event.target;

    if (name === 'campaignDescription' && value.length <= 280) {
      setCampaignDescriptionText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Want to add an item to your bucket list?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="campaignTitle"
                placeholder="Here's a new campaign..."
                value={campaignTitle}
                className="form-input w-100"
                style={{ lineHeight: '1', resize: 'vertical' }}
                onChange={handleTitleChange}
              ></textarea>
              <textarea
                name="campaignDescription"
                placeholder="Here's a new campaign..."
                value={campaignDescription}
                className="form-input w-100"
                style={{ lineHeight: '2', resize: 'vertical' }}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Campaign
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your campaigns. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CampaignForm;
