import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';
import { Results } from '../imports/Results';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
    NumberSearch: function (number) {
        npiresult = HTTP.call(
            'GET', 'https://npiregistry.cms.hhs.gov/api', {
                params: {
                    'number': number
                }
            }).data
          // console.dir(result)
        Meteor.call('clearNPIResults')
        Results.insert({
            type: 'npi',
            result: npiresult
        })// inserts new results into db for display.
    },


    nameSearch: function (first, last) {
        nameresult = HTTP.call(
            'GET', 'https://npiregistry.cms.hhs.gov/api', {
                params: {
                    'first_name': first,
                    'last_name': last
                }
            }).data
        Meteor.call('clearNameResults')
        console.dir(nameresult)
        Results.insert({
            type: 'name',
            result: nameresult
        })
        
    },


    clearNPIResults: function () {
        console.log('npi result supposed to be cleared')
        Results.remove({type: 'npi'}) // Remove any prior NPI results. this is run on browser startup.
    },
    clearNameResults: function () {
        Results.remove({type: 'name'}) // Remove any prior Name results. this is run on browser startup.
    },
    clearResults: function () {
        Results.remove({})
    },

    NpiSearchFromClick: function (number) {
        console.log(number)
    }
})