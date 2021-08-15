const db = require('../config/connection');
const { User, Campaign } = require('../models');
const userSeeds = require('./userSeeds.json');
const campaignSeeds = require('./campaignSeeds.json');

db.once('open', async () => {
  try {
    await Campaign.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < campaignSeeds.length; i++) {
      const { _id, campaignAuthor } = await Campaign.create(campaignSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: campaignAuthor },
        {
          $addToSet: {
            campaigns: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
