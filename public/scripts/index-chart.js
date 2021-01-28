function getData() {
    $.ajax({
        url: '/data',
        type: 'GET',
        dataType: 'json',
        error(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        },
        success(data, textStatus, jqXHR) {
            if (data[0] === 'error') {
                console.log(data[1]);
            } else {
                console.log(data);
                formatData(data);
            }
        }
    });
}

getData();

function formatData(data) {
    let formattedT = [];
    let formattedH = [];
    for (i = 0; i < data.length; i++) {
        formattedT[i] = {
            'x': data[i]['datetime']['timestamp'],
            'y': data[i]['data']['temp']
        }
    }
    console.log('Formatted data:');
    console.log(formattedT);
    let formattedTH = [
        {'x': 1, 'y': 68},
        {'x': 2, 'y': 69},
        {'x': 3, 'y': 70},
        {'x': 4, 'y': 72},
        {'x': 6, 'y': 68}
    ]
    drawChart(formattedTH);
}

function drawChart(dataT) {
    var ctx = document.getElementById('chartFortyEight');

    var twoDayChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            legend: {
                display: true,
                labels: {
                    boxWidth: 10,
                    fontSize: 10
                }
            },
            title: {
                display: true,
                text: 'Temperature and Humidity'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        labelString: 'Time',
                        display: true
                    }
                }]
            }
        }
    });
}