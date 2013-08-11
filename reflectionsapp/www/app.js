/*
Reflections
Copyright 2013 Phil Haeusler

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

function initialise()
{
	$( document ).on( "pageinit", "#main", setupMainPage);
	$( document ).on( "pagebeforeshow", "#main", showMainPage);
	$( document ).on( "pageinit", "#add", setupAddPage);
	$( document ).on( "pagebeforeshow", "#add", showAddPage);
	$( document ).on( "pageinit", "#view", setupViewPage);
	$( document ).on( "pagebeforeshow", "#view", showViewPage);
}

var reflections = [];
var currentReflection = 0;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wedneday", "Thursday", "Friday", "Saturday"];

function dateFormat(date)
{
	return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
}

function dateTimeFormat(date)
{
	return days[date.getDay()] + " " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear() + " " + date.getHours() + ":" + pad(date.getMinutes());
}

function pad(val)
{
	return (val < 10 ? '0' : '') + val;
}

// Save the reflections array to HTML localStorage
function saveReflections()
{
	localStorage["reflections.num"] = reflections.length;
	
	for(var i=0; i<reflections.length; i++)
	{
		var reflection = reflections[i];
		localStorage["reflection." + i + ".date"] = reflection.date.getTime();
		localStorage["reflection." + i + ".subject"] = reflection.subject;
		localStorage["reflection." + i + ".learning"] = reflection.learning;
		localStorage["reflection." + i + ".participation"] = reflection.participation;
	}
}

// Load in any saved reflections from HTML localStorage
function loadReflections()
{
	reflections = [];

	var numSaved = parseInt(localStorage["reflections.num"], 10);

	for(var i=0; i<numSaved; i++)
	{
		var reflection = {
			date:			new Date(parseInt(localStorage["reflection." + i + ".date"], 10)),
			subject: 		localStorage["reflection." + i + ".subject"],
			learning: 		localStorage["reflection." + i + ".learning"],
			participation: parseInt(localStorage["reflection." + i + ".participation"], 10)
		};

		reflections.push(reflection);
	}
}

// Show a native alert dialog if using phonegap or otherwise a javascript one
function promptAlert(message, title)
{
	if (navigator.notification != undefined && navigator.notification.confirm != undefined)
	{		
		navigator.notification.alert(message, function() {}, title);
	}
	else 
	{
		alert(message);
	}
}

// Show a native confirm dialog if using phonegap or otherwise a javascript one
function promptConfirm(message, callback, detail, buttons)
{
	if (navigator.notification != undefined && navigator.notification.confirm != undefined)
	{		
		navigator.notification.confirm(detail, function(choice)
		{
			if (choice == 1) callback();
		}, message, buttons);
	}
	else if (confirm(message) == true)
	{
		callback();
	}
}

