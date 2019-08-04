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
            
            var trainStart = snapshot.val().startTime;
            var trainFrequency = Number(snapshot.val().frequency);
            var trainStartConvert = moment(trainStart, 'HH:mm').subtract(1, 'years');
            var timeDifference = moment().diff(moment(trainStartConvert), 'minutes');
            var remainder = timeDifference % trainFrequency;
            var minutesUntil = trainFrequency - remainder;
            var nextTrain = moment().add(minutesUntil, 'minutes')
            var displayTable = $('<tr>').append(
                $('<td>').text(snapshot.val().trainName),
                $('<td>').text(snapshot.val().destination),
                $('<td>').text(snapshot.val().frequency + ' min'),
                $('<td>').text(moment(nextTrain).format('hh:mm a')),
                $('<td>').text(minutesUntil),
            )

            var tableButton = $('<td>');
            var removeButton = $('<button>').text('Remove').addClass('btn btn-danger').attr({value:snapshot.key, id:'remove'});
            tableButton.append(removeButton);
            displayTable.append(tableButton);

            $('#current-trains').append(displayTable);
        })
    }

    $('#schedule-submit').click(function(){

        storeData();
    })

    $(document).on('click', '#remove', function(){
    
        var childId = this.value;
        database.ref().child(childId).remove();
        location.reload();

    })
    writeData();


})