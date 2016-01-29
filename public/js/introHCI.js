'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
	$('#spotifyBtn').click(showMyMusic);
	$('#fotoBtn').click(showFotos);
}

function showFotos(e){
	e.preventDefault();

	var query = 'http://www.panoramio.com/map/get_panoramas.php?' +
			'set=public&from=0&to=10&minx=-30&miny=-30&maxx=30&maxy=30&size=medium&mapfilter=true';

	$.get(query, showfotos, 'jsonp');
}

function showfotos(res){
	console.log(res);

	var fotos = $('.fotos');
	var html = "";

	console.log(res["count"]);

	for(var i=0; i<res["photos"].length; i++){
		html += '<div class="thumbnail foto">' +
				'<img src="' + res["photos"][i]["photo_file_url"] + '">' +
				'<a href="' + res["photos"][i]["owner_url"] + '">' + res["photos"][i]["owner_name"]  + '</a>' +
				'<p>' + res["photos"][i]["upload_date"] + '</p>' +
				'</div>';
	}

	fotos.html(html);
}

function showMyMusic(e){
	e.preventDefault();

	var btn = $(this);

	var authorization = 'https://accounts.spotify.com/authorize?' +
					'client_id=c58d47985d76445283527c14ae217c2e&' +
					'redirect_uri=/' +
					'response_type=code';

	$.get(authorization, authorize, 'jsonp');
	$.get('https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF', showMusic);
}

function authorize(res){
	console.log(res);
}

function showMusic(res){
	//console.log(res);

	var music = $('.mymusic');

	console.log(music);

	var name = res["name"];
	var imgurl = res["images"][2]["url"];

	console.log(name);
	console.log(imgurl);

	var html = 		'<div class="thumbnail">' +
					'<img src="' + imgurl + '">' +
					'<p>' + name + '</p>' +
					'</div>';

	music.html(html);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);
	var purl = "/project/" + idNumber;
	console.log("url for get is " + purl);

	$.get(purl, showDetail)
}

function showDetail(result){
	console.log(result);

	var query = "#project" + result["id"];
	console.log(query);

	var project = $(query + " .details");

	var detailHTML = 	'<img src="' + result["image"] + '" class="detailsImage">' +
						//'<p>' + result["title"] + '</p>' +
						'<p><small>' + result["date"] + '</small></p>' +
						result["summary"];

	project.html(detailHTML);
}


/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");

	$.get("/palette", changeColor);
}

function changeColor(result){

	var colors = result["colors"]["hex"];
	console.log(colors);

	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}