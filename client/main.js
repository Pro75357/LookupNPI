import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http';
import { Session } from 'meteor/session'
import { Results } from '../imports/Results';
import './main.html';

Template.body.helpers({
    searchType(){
        return Session.get('searchType')
    }
})

Template.searchSelect.onCreated(function searchOnCreated() {
    Meteor.call('ClearResults') // clears previous results from db on creation
    Session.set('resultPresent', false)
    Session.set('searchType',false)
})


Template.searchSelect.events({
    'click #namebutton'(event) {
        event.preventDefault()
        Session.set('searchType', true)
    },
    'click #NPIbutton'(event) {
        event.preventDefault()
        Session.set('searchType', false)
    }
})

Template.NPIresults.helpers({
    resultPresent() {
        return Session.get('resultPresent')
    },

    NPI() {
        return Session.get('NPISearchNumber')
    },

    firstname() {
        return Results.findOne({}).result.results[0].basic.first_name
    },
    lastname() {
        return Results.findOne({}).result.results[0].basic.last_name
    },
    credential() {
        return Results.findOne({}).result.results[0].basic.credential
    },
    city() {
        return Results.findOne({}).result.results[0].addresses[0].city
    },
    state() {
        return Results.findOne({}).result.results[0].addresses[0].state
    },
    taxonomies() {
        //console.dir(Results.findOne({}).result.results[0].taxonomies)
        return Results.findOne({}).result.results[0].taxonomies
    },
});

Template.NPIsearch.events({
    'submit form'(event, template) {
        event.preventDefault()
        var number = event.target.number.value
        //console.log(number)
        Meteor.call('NumberSearch', number)
        Session.set('NPISearchNumber', number)
        Session.set('resultPresent',true)
    },
});
