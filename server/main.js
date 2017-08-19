import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';
import { Results } from '../imports/Results';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
    NumberSearch: function (number) {
        result = HTTP.call(
            'GET', 'https://npiregistry.cms.hhs.gov/api', {
                params: {
                    'number': number
                }
            }).data
          // console.dir(result)
        Results.insert({ result })// inserts new results into db for display.
    },
    ClearResults: function () {
        Results.remove({}) // Remove any prior results. this is run on browser startup.
    },
})