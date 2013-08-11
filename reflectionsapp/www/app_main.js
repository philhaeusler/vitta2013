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

function setupMainPage() 
{
	loadReflections();
	$("#main-list").on("click", "li", viewReflection);
}

function showMainPage()
{
	var list = "";
	for(var i=0; i<reflections.length; i++)
	{
		var reflection = reflections[i];
		
		list += "<li>" + reflection.subject 
			  + " <i>" + dateFormat(reflection.date) + "</i>"
			  + "<span class='ui-li-count'>" + reflection.participation + " / 10</span></li>";
	}

	if (reflections.length)
	{
		$("#main-my-reflections").show();
	}
	else
	{
		$("#main-my-reflections").hide();
	}

	try {
		$("#main-list")
			.empty()
			.append(list)
			.listview( "refresh" );
	}
	catch(e) { }
}

function viewReflection(e)
{
	currentReflection = $("#main-list li").index(e.currentTarget);
	$.mobile.navigate( "#view" );
}

