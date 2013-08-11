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

function setupAddPage() 
{
	$("#new-add").click(addNewReflection);
}

function showAddPage()
{
	$("#new-subject").val("One").selectmenu( "refresh" );
	$("#new-learning").val("");
	$("#new-participation").val(0).slider( "refresh" );
}

function addNewReflection()
{
	var reflection = {
		date:			new Date(),
		subject: 		$("#new-subject").val(),
		learning: 		$("#new-learning").val(),
		participation:	$("#new-participation").val()
	}
	
	if (reflection.learning == '')
	{
		promptAlert('Enter what you learnt', 'Add a Reflection');
		return;
	}
	
	reflections.unshift(reflection);
	saveReflections();
	
	$.mobile.navigate( "#main" );
}