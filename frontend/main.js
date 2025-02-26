//siri config

var siriWave = new SiriWave({
container: document.getElementById("siri-container"),
width: 640,
height: 200,
style: "ios9"
});

$('.siri-message').textillate({
    loop: true,
    sync: true,
    in:{
        effect: "fadeInUp",
        sync: true,
    },
    out:{
        effect: "fadeOutUp",
        sync: true,
    }
});

$('.text').textillate({
    loop: true,
    sync: true,
    in: {
        effect: "bounceIn",
    },
    out: {
        effect: "bounceOut",
    },

});


$('#MicBtn').click(function () {
    $('#Oval').hide();  // Hide the Oval section
    $('#siriwave').removeAttr("hidden").show();  // Show the SiriWave section
});

$('#BackBtn').click(function () {
    $('#siriwave').hide();  // Hide the SiriWave section
    $('#Oval').show();  // Show the Oval section again
});
