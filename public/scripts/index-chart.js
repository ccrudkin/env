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
    let formatted = [];
    for (i = 0; i < data.length; i++) {
        formatted[i] = {
            'x': data[i]['datetime']['timestamp'],
            'temp': data[i]['data']['temp'],
            'hum': data[i]['data']['humidity'],
        }
    }
    console.log(`Formatted data:`);
    console.log(formattted);
    drawChart(formatted);
}

function drawChart(data) {
    var ctx = document.getElementById('chartFortyEight');

    var twoDayChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Temperature',
                data: data,
                parsing: {
                    yAxisKey: 'temp'
                }
            },
            {
                label: 'Humidity',
                data: data,
                parsing: {
                    yAxisKey: 'hum'
                }
            }]
        },
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
                    ticks: {
                        maxTicksLimit: 48
                    },
                    scaleLabel: {
                        labelString: 'Time',
                        display: true
                    }
                }]
            }
        }
    });
}