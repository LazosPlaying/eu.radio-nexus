//
// INITIALISE GLOBAL VARIABLES
//

let $slider = $('#volume-control-slider');
let $mutebtn = $('#volume-toggle').children('button');

//
// INITIALISE TRIGGERS
//

$slider.on('input', function() {
	$vol = $(this).val();
	console.log('Volume changed to: '+$vol);
	Cookies.set('volume', $vol);
	if ($vol == 0){
		setMuteState('true');
	} else {
		setMuteState('false');
	}
});

$mutebtn.on('click', function() {
	let $ismuted = Cookies.get('volumeMuted');
	if ($ismuted == 'true'){														// Audio is MUTED - we need to UNMUTE it
		Cookies.set('volumeMuted', 'false');
		setMuteState('false');

	} else if ($ismuted == 'false'){												// Audio is UNMUTED - we need to MUTE it
		Cookies.set('volumeMuted', 'true');
		setMuteState('true');
	} else {
		console.log('Something went wrong @ $mutebtn.on(click)');
	}
});

//
// INITIALISE FUNCTIONS
//

function setVolumeSlider($val){
	document.getElementById("volume-control-slider").MaterialSlider.change($val);
}
function setMutedButton($val){
	if ($val == 'true'){
		$mutebtn.css({'background-color': '#ec4b4b', 'color': '#fff'});
	} else if ($val == 'false'){
		$mutebtn.css({'background-color': '', 'color': ''});
	} else {
		console.log('Something went wrong @ setMutedButton()');
	}
}
function setAudioVolume($val){
	let volume = $val / 1000;

	setVolumeSliderTooltip($val);
	if (volume <= 1){
		document.getElementById("audiosource").volume = volume;
	} else {
		console.log('Volume value is too big @ setAudioVolume() -> '+volume);
	}
}
function setVolumeSliderTooltip($vol){
	if ($vol == 0){
		$('#volume-control-slider-tooltip').html('Muted');
	} else {
		$('#volume-control-slider-tooltip').html('Volume '+($vol/10)+'%');
	}
}
function setMuteState($val){
	if ($val == 'true'){
		Cookies.set('volumeMuted', 'true');
		setMutedButton('true');
		setAudioVolume(0);

	} else if ($val == 'false') {
		Cookies.set('volumeMuted', 'false');
		setMutedButton('false');
		setAudioVolume(Cookies.get('volume'));

	} else {
		console.log('Something went wrong @ setMuteState()');
	}
}

function secondsToTime(time){

	var hours = Math.floor(time / 3600);
	time = time - hours * 3600;

	var minutes = Math.floor(time / 60);
	var seconds = time - minutes * 60;

	function str_pad_left(string,pad,length) {
	    return (new Array(length+1).join(pad)+string).slice(-length);
	}

	var finalTime = (hours > 0) ? str_pad_left(hours,'0',2)+':'+str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2) : str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
	return finalTime;	//
}

function nowPlayingUpdate(){
	console.log('**********************************');
	$.get(
		'https://radio.aljaxus.eu/api/nowplaying/1',
	    {},
		function(data, textStatus, xhr){
	})
	.done(function(requestdata) {
		console.log("nowPlaying update - query success");
		let $data = requestdata.now_playing;

		$img = '<img src="'+$data.song.art+'" alt="Song cover art" id="nowplaying-thumbnail"></img>';

		$('#nowplaying').find('#nowplaying-thumbnail-box').html($img);
		$('#nowplaying').find('#nowplaying-title').html($data.song.title);
		$('#nowplaying').find('#nowplaying-artist').html($data.song.artist);
		$('#nowplaying').find('#nowplaying-editby').html($data.song.custom_fields.edit_by);

		{
			let timenow = $data.elapsed;
			(function move() {

				$('#nowplaying').find('#nowplaying-time').html(secondsToTime(timenow)+' / '+secondsToTime($data.duration));

				timenow++;

				if ( timenow < $data.duration){
					setTimeout(move, 1000);
				} else {
					setTimeout(nowPlayingUpdate(), 1000);
				}
			})();
		}

	})
	.fail(function(requestdata) {
		console.log("nowPlaying update - query error");
	})
	.always(function(requestdata) {
		console.log(requestdata);
		console.log("nowPlaying update - process complete");
	});
}





$( window ).on("load", function() {


// SET PRELOADER OPACITY TO 1 (100%)
$('body').css('opacity', '1');

// GET "nowPlaying" DATA AND RENDER THE #nowplaying CONTAINER
nowPlayingUpdate();

// COOKIES INITIALISATION
{
	(Cookies.get('volume') == null) ? Cookies.set('volume', '5') : setAudioVolume(Cookies.get('volume'));
	(Cookies.get('volumeMuted') == null) ? Cookies.set('volumeMuted', 'false') : setMuteState(Cookies.get('volumeMuted'));
}

// START PLAYING AUDIO WHEN AUDIO IS LOADED
$('#audiosource').on('canplay canplaythrough', function(event) {
	event.preventDefault();

	let $volume = Cookies.get('volume');
	setAudioVolume($volume);
	setVolumeSlider($volume);

	$('#extraActions').find('.mdl-progress').remove();

	$('#audiosource')[0].play().then(() => {
		console.log('**********************************');
		console.log("Audio has auto started playing!");
		$slider.attr('disabled', false);
		$mutebtn.attr('disabled', false);
	}).catch((error) => {
	 	// An error ocurred or the user agent prevented playback.
		console.log('**********************************');
	 	console.log("Error: " + error);
	 	$('#extraActions').append('<br><button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect startPlaying">Start playing</button>');
	 	$('#extraActions').find('.startPlaying').click(function(event) {
			$('#audiosource')[0].play();
			$slider.attr('disabled', false);
			$mutebtn.attr('disabled', false);
			setMuteState('false');
			$(this).html('Started playing').css('color', '#777').attr('disabled', true);
			setTimeout(function(){
				$('#extraActions').html(null);
			}, 2500);
	 	});
	});
});


});
