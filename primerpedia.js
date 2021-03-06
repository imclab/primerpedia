var apiUrl = "http://en.wikipedia.org/w/api.php?";

function onFormSubmit(){
	// Loading animation from http://www.ajaxload.info/
	$("#content").html("<img src='loading.gif' alt='Loading...' style='margin:1em 50%'>");
	// API request to load non-random page:
	// action=parse&page=Concise_Wikipedia&section=0&prop=text&format=txtfm&disablepp
	// first section of a random article. API query devised by http://stackoverflow.com/q/13517901/266309
	// action=query&prop=revisions&rvprop=content&rvparse=&rvsection=0&generator=random&grnnamespace=0&indexpageids=true&format=json
	$.ajax({
		// https://www.mediawiki.org/wiki/Extension:MobileFrontend#prop.3Dextracts
		url: apiUrl + "action=query&prop=extracts&exintro&generator=random&grnnamespace=0&indexpageids=true&format=json",
		data: {
		    format: "json"
		},
		dataType: "jsonp",
		success: function(jsonObject) {
			var pageid = jsonObject.query.pageids[0];
			var article = jsonObject.query.pages[pageid];
			article.url = "http://en.wikipedia.org/wiki/" + encodeURIComponent(article.title);
			article.link = "<a href='" + article.url + "'>" + article.title + "</a>";
			var editlink = "<a href='" + article.url + "?action=edit&section=0' class='edit-link'>edit</a>";
			$("#content").html("<h2>" + article.link + editlink + "</h2>");
			$("#content").append( article.extract );
		}
	});
}
