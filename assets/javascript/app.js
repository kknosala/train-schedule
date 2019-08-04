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

    function writeData(){
        database.ref().on('child_added', function(snapshot){
            
            var displayTable = $('<tr>').append(
                $('<td>').text(snapshot.val().trainName),
                $('<td>').text(snapshot.val().destination),
                $('<td>').text(snapshot.val().frequency + ' min')
            )

            $('#current-trains').append(displayTable);
        })
    }

    $('#schedule-submit').click(function(){

        event.preventDefault();
        storeData();
    })
    writeData();


})