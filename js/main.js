var flickrWidget = {};
flickrWidget.apiUrl = 'https://api.flickr.com/services/rest/';
flickrWidget.apiMethod = 'flickr.photos.search';
flickrWidget.apiKey = '0716f25eaf06d2f3f4bcfb5aad2226b1';

flickrWidget.getInfo = function(searchQuery) {
	$.ajax({
		url: flickrWidget.apiUrl,
		format: 'json',
		type: 'GET',
		data: {
			method: flickrWidget.apiMethod,
			api_key: flickrWidget.apiKey,
			format: 'json',
			nojsoncallback: '1',
			sort: 'relevance',
			tag_mode: 'all',
			tags: searchQuery + " ,street, b&w"
		},
		success: function(res) {
			flickrWidget.displayInfo(res.photos.photo);
		} //end success
	}); // end ajax
};  // end .getInfo function

flickrWidget.displayInfo = function(result) {
	$('.image-gallery').empty();
	$.each(result, function(index, item) {
		var $photoContainer = $('<div>');
		$photoContainer.addClass('photo');
		var farmID = item.farm;
		var serverID = item.server;
		var secretID = item.secret;
		var ID = item.id;
		var picUrl = 'https://farm' + farmID + '.staticflickr.com/' + serverID + '/' + ID + '_' + secretID + '.jpg';
		var $photoImage = $('<img>');
		$photoImage.attr('src', picUrl);
		$photoContainer.append($photoImage);
		$('.image-gallery').append($photoContainer);
	}); //end Each function
}; //end .displayInfo function

flickrWidget.searchPhotos = function() {
	$('header form').on('submit', function(evnt) {
		$('html,body').animate({scrollTop: $('#image-gallery').offset().top},2000);
		evnt.preventDefault();  //to stop page from refreshing page upon submit
		$('.credits').addClass('fadeOut');
		$('#arrow').addClass('fadeIn').toggleClass('hide');
		var searchQuery = $('.query').val();
		flickrWidget.getInfo(searchQuery);
	}); //end submit function
}; // end .searchPhotos function

flickrWidget.init = function() {
	flickrWidget.searchPhotos();
}; //end init function

$('#arrow').on('click', function(evnt) {
	$('html,body').animate({scrollTop: $('#top').offset().top},1000);
	$('#arrow').toggleClass('hide');
	$('.credits').removeClass('fadeOut').addClass('fadeIn');
}); // end on click function

$(document).ready(function(){
  flickrWidget.init();
});  // end ready function
