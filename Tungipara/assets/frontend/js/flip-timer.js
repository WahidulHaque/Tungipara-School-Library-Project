var clock;
$(document).ready(function() {
    var clock;

    clock = $('.clock').FlipClock({
        clockFace: 'HourlyCounter',
        autoStart: false,
        callbacks: {
            stop: function() {
                $('.message').html('The clock has stopped!')
            }
        }
    });

    clock.setTime(220880);
    clock.setCountdown(true);
    clock.start();

});
