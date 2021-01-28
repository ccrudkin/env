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
            'temp': data[i]['data']['temp']
        }
        formattedT[i] = {
            'x': data[i]['datetime']['timestamp'],
            'hum': data[i]['data']['humidity']
        }
    }
    drawChart(formattedT, formattedH);
}

function drawChart(dataT, dataH) {
    var ctx = document.getElementById('chartFortyEight');

    var twoDayChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Temperature',
                data: dataT
            },
            {
                label: 'Humidity',
                data: dataH
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