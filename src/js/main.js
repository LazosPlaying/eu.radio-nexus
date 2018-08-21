function audioonload(){
    document.getElementById("audiosource").volume = 0.1;
    document.getElementById("audiosource").play();
}
//main function, which will br probably used the most. Get the value from "save-savedvolume" and set the audio's volume
function setvolumetoaudio(){
    var source = document.getElementById("audiosource"); //specify the veriable for audio
    var savedvolume = document.getElementById("save-savedvolume").innerHTML; //set the savedvolume veriable, which indicates to the volume storage element
    source.volume = savedvolume/100;
}
//Function used to put an alert telling the user to contact us. Triggered when something wrong happenes.
function pageissue(){
    alert("Woops! We ran into an issue! Please refresh the page, if this happenes again, contact us using our email address found in contacts area. Include information what had happened and what you were doing.");
}
//Triggers when the slider has been MOVED using the dot (buttons ignored)
function movingslider(){
    var volume = document.getElementById("volumeslider").value; //Get value of the slider and assign it to veriable called "volume"
    var button = document.getElementsByClassName("buttonmuteunmute")[0]; //Define veriable called button, which indicates to the mute/unmute button
    document.getElementById("tt-volumeslider").innerHTML = "Volume " + volume; //update the tootip, which is displayed when you hover over the slider, to new value
    document.getElementById("save-savedvolume").innerHTML = volume; //after everything is done, we save the volume to the hidden text called "save-savedvolume", located at the bottom of the page
    setvolumetoaudio(); //Set the audio's volume. Function is set on top of the page.
}
function button25(){
    document.getElementById("volumeslider").MaterialSlider.change(25);
    var volume = document.getElementById("volumeslider").value; //Get value of the slider and assign it to veriable called "volume"
    document.getElementById("tt-volumeslider").innerHTML = "Volume " + volume; //update the tootip, which is displayed when you hover over the slider, to new value
    document.getElementById("save-savedvolume").innerHTML = volume; //after everything is done, we save the volume to the hidden text called "save-savedvolume", located at the bottom of the page
    setvolumetoaudio(); //Set the audio's volume. Function is set on top of the page.
}
function button75(){
    document.getElementById("volumeslider").MaterialSlider.change(75);
    var volume = document.getElementById("volumeslider").value; //Get value of the slider and assign it to veriable called "volume"
    document.getElementById("tt-volumeslider").innerHTML = "Volume " + volume; //update the tootip, which is displayed when you hover over the slider, to new value
    document.getElementById("save-savedvolume").innerHTML = volume; //after everything is done, we save the volume to the hidden text called "save-savedvolume", located at the bottom of the page
    setvolumetoaudio(); //Set the audio's volume. Function is set on top of the page.
}
function buttonmute(){
    var button = document.getElementsByClassName("buttonmuteunmute")[0]; //set the button variable, indicates to the mute button
    var buttontt = document.getElementById("volumemutetooltip"); //set the buttontt variable, indicates to button's tooltip
    var savedvolume = document.getElementById("save-savedvolume"); //set the savedvolume veriable, which indicates to the volume storage element
    var volume = document.getElementById("volumeslider").value; //set the volume variable, which indicates the the slider, we get the current volume
    if (button.id == "volumenotmuted"){ //we check if the button is marked as muted or if not muted, if the returned value means "not muted" will will execute the fist part that follows
        button.id = "volumemuted"; //first we change the button's ID to "muted"
        savedvolume.innerHTML = volume; //we save the current volume to the hidden element
        document.getElementById("volumeslider").MaterialSlider.change(0); //we change the slider to 0 (muted)
        button.classList.remove("fa-volume-up"); //now we remove the "not muted" icon
        button.classList.add("fa-volume-off"); //and we set the "muted" one
        buttontt.innerHTML = "Muted"; //here we change the tooltip text to "muted"
        document.getElementById("tt-volumeslider").innerHTML = "Volume 0"; //update the tootip, which is displayed when you hover over the slider, to new value
    }else if (button.id == "volumemuted"){ //if the value means that the audio is muted (according to the button), we will run this part of code. We will just make the opposite from the previous part.
        button.id = "volumenotmuted"; //first we change the button's ID to "not muted"
        volume = savedvolume.innerHTML; //we get the saved volume from the hidden element
        if (volume == 0){ //here we check if the saved value was 0, if so, we override it and set the volume to 5%
            volume = 5;
        }
        document.getElementById("volumeslider").MaterialSlider.change(volume); //we change the slider to volume we saved
        button.classList.remove("fa-volume-off"); //and we remove the "muted" one
        button.classList.add("fa-volume-up"); //now we add the "not muted" icon
        buttontt.innerHTML = "Not Muted"; //here we change the tooltip text to "not muted"
        document.getElementById("tt-volumeslider").innerHTML = "Volume " + volume; //update the tootip, which is displayed when you hover over the slider, to new value
    }else { //if the value doe not match any of values checked above, we will alert the user, and ask him to report the issue to site administrators
        pageissue();
    }
    document.getElementById("save-savedvolume").innerHTML = volume; //after everything is done, we save the volume to the hidden text called "save-savedvolume", located at the bottom of the page
    setvolumetoaudio(); //Set the audio's volume. Function is set on top of the page.
}