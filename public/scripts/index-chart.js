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
            'x': data[i]['datetime']['ms'],
            'y': data[i]['data']['temp']
        }
    }
    console.log('Formatted data:');
    console.log(formattedT);
    drawChart(formattedT);
}

function drawChart(dataT) {
    var ctx = document.getElementById('chartFortyEight');

    var twoDayChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Temperature',
                data: dataT
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