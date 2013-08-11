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

function setupViewPage() 
{
	$("#view-remove").on("click", removeReflection);
}

function showViewPage()
{
	var reflection = reflections[currentReflection];

	$("#view-subject").text(reflection.subject);
	$("#view-date").html(dateTimeFormat(reflection.date));
	$("#view-learning").html(reflection.learning.replace(/\n/g, '<br>'));
	
	var participation = "";
	for(i=0; i<reflection.participation; i++)
	{
		participation += "<div class='star'/>";
	}
	
	$("#view-participation").html(participation);
}

function removeReflection()
{
	promptConfirm("Delete this reflection?", doRemoveReflection, "Are you sure you want to delete this reflection?", "Delete,No");
}

function doRemoveReflection()
{
	reflections.splice(currentReflection, 1);
	saveReflections();
	$.mobile.navigate( "#main" );
}

