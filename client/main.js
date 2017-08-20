import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http';
import { Session } from 'meteor/session'
import { Results } from '../imports/Results';
import './main.html';

Template.body.helpers({
    searchTypeName(){
        return Session.get('searchTypeName')
    }
})

Template.searchSelect.onCreated(function searchOnCreated() {
    Meteor.call('clearResults') // clears previous results from db on creation
    Session.set('NPIresultPresent', false)
    Session.set('nameResultPresent', false)
    Session.set('searchTypeName',false)
})


Template.searchSelect.events({
    'click #namebutton'(event) {
        event.preventDefault()
        Session.set('searchTypeName', true)
    },
    'click #NPIbutton'(event) {
        event.preventDefault()
        Session.set('searchTypeName', false)
    }
})

Template.NPIresults.helpers({
    NPIresultPresent() {
        return Session.get('NPIresultPresent')
    },

    NPI() {
        return Session.get('NPISearchNumber')
    },

    firstname() {
        return Results.findOne({type: 'npi'}).result.results[0].basic.first_name
    },
    lastname() {
        return Results.findOne({ type: 'npi'}).result.results[0].basic.last_name
    },
    credential() {
        return Results.findOne({ type: 'npi'}).result.results[0].basic.credential
    },
    city() {
        return Results.findOne({ type: 'npi'}).result.results[0].addresses[0].city
    },
    state() {
        return Results.findOne({ type: 'npi' }).result.results[0].addresses[0].state
    },
    lastUpdated() {
        return Results.findOne({ type: 'npi'}).result.results[0].basic.last_updated
    },
    taxonomies() {
        return Results.findOne({ type: 'npi' }).result.results[0].taxonomies
    },
});

Template.NPIsearch.events({
    'submit form'(event, template) {
        event.preventDefault()
        var number = event.target.number.value
        //console.log(number)
        Meteor.call('NumberSearch', number)
        Session.set('NPISearchNumber', number)
        Session.set('NPIresultPresent',true)
    },
});

Template.nameSearch.events({
    'submit form'(event, template) {
        event.preventDefault()
        var first = event.target.first.value
        var last = event.target.last.value
        Meteor.call('nameSearch', first, last)
        Session.set('firstName', first)
        Session.set('lastName', last)
        Session.set('nameResultPresent', true)
    }
})

Template.nameResults.helpers({
    nameResultPresent() {
        return Session.get('nameResultPresent')
    },
    firstName() {
        return Session.get('firstName')
    },
    lastName() {
        return Session.get('lastName')
    },
    nameResult() {
        names = Results.findOne({ type: 'name' }).result.results
        console.dir(names)
        return names
    }
})

Template.nameResults.events({
    'click .resultRow' (event, tempate){
        event.preventDefault()
        Meteor.call('NpiSearchFromClick', this.number)
        Session.set('NPISearchNumber', this.number)
        Session.set('NPIresultPresent', true)        
        Meteor.call('NumberSearch', this.number)
        Session.set('searchTypeName', false) //Returns to NPI search screen.
    }
})
