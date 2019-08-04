$(document).ready(function(){
    
    var database = firebase.database();

    function storeData(){

        var trainInput = $('#train-input').val().trim();
        var desinationInput = $('#destination-input').val().trim();
        var firstInput = $('#time-input').val();
        var frequencyInput = $('#frequency-input').val().trim();

        database.ref().push({
            trainName: trainInput,
            destination: desinationInput,
            startTime: firstInput,
            frequency: frequencyInput,
        })

    }

    $('#schedule-submit').click(function(){

        event.preventDefault();
        storeData();
    })



})