$(document).ready(function() {
	// SET PRELOADER OPACITY TO 1 (100%)
	$('body').css('opacity', '1');

	// COOKIES INITIALISATION
	{
		(Cookies.get('volume') == undefined) ? Cookies.set('volume', 5) : null;
		(Cookies.get('volumeMuted') == undefined) ? Cookies.set('volumeMuted', false) : null;
	}
});

//
// INITIALISE FUNCTIONS
//

function toggleMuteVolume(){
	$btn = $('#volume-toggle').children('button');
	$state = Cookies.get('volumeMuted');

	if ($state === true){																												// VOLUME IS MUTED - WE WILL UNMUTE IT
		Cookies.set('volumeMuted', false);
		$btn.removeClass('mdl-button--colored');

	} else if ($state === false){																										// VOLUME IS UNMUTED - WE WILL MUTE IT
		Cookies.set('volumeMuted', true);
		$btn.addClass('mdl-button--colored');

	} else {
		if(!alert('Something went wrong! Please, reload the page')){window.location.reload();}
	}

}

//
// INITIALISE TRIGGERS
//

$('#volume-toggle').children('button').on('click', function(){
	toggleMuteVolume();
});
