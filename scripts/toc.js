$(document).ready(function() {
	// add h2 heading to the aside
	$("aside").append("<h2>Table of contents</h2>");

	// wrap h2 text in a tags
	$("article h2").wrapInner("<a></a>");
	
	// add ids to the a tags
	/*
	$("article a").each (function(index) {
		var id = "heading" + (index + 1);
		$(this).attr("id", id);
	});
	*/
	$("article a").attr("id", function(index) {
	    var id = "heading" + (index + 1);
		return id;
    });

	// clone article a tags and insert them into the aside
	$("article a").clone().insertAfter($("aside h2"));
	
	// remove the id attributes from the a tags
	$("aside a").removeAttr("id");
	
	// add the href attributes to the a tags
	$("aside a").attr("href", function(index) {
	    var href = "#heading" + (index + 1);
		return href;
    });

	// insert back to top tag at end of toc
    $("aside").append("<br><a href='#heading1'>Back to top</a>");
		
	// indent all paragraphs except the first ones after h2s
	$("article p").nextUntil("h2").css("text-indent", "1.5em");
	// $("article p").css("text-indent", "1.5em");
	// $("article h2 + p").css("text-indent", 0);
	
	// change the CSS for the selected topic and move the TOC
	$("aside a").click (function() {
		// get id of a element within h2 element
		id = $(this).attr("href");
		$(id).css({ "color": "#d0ba43", "font-size": "150%" });
		
		// reset the color and font size for the other a tags in the article	
		$("article a").not(id).css("color", "white");
		$("article a").not(id).css("font-size", "120%");
		
		// move toc to selected heading
		var h2Offset = $(id).offset().top;
		var asideHeight = $("aside").height();
		var articleHeight = $("article").height();
		if ((h2Offset + asideHeight) <= articleHeight) {
			asideOffset = h2Offset;
		}
		else { 
			asideOffset = articleHeight - asideHeight;
		}
		$("aside").css("top", asideOffset);
	});
})