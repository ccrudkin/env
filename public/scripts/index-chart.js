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
    let dataT = [];
    let dataH = [];
    let labels = [];
    for (i = 0; i < data.length; i++) {
        dataT.push(((data[i]['data']['temp'] * ( 9 / 5 )) + 32).toFixed(1));
        dataH.push(data[i]['data']['humidity'].toFixed(1));
        labels.push(new Date(data[i]['datetime']['timestamp']).toISOString());
    }

    let formattedData = {
        "labels": labels,
        "datasets": [{
            "label": 'Temperature',
            "data": dataT,
            "yAxisID": "temp",
            "fill": false,
            "pointRadius": 0,
            "borderColor": '#873600',
            "backgroundColor": "#f6ddcc",
            "pointHitRadius": 5
        },
        {
            "label": 'Humidity',
            "data": dataH,
            "yAxisID": "hum",
            "fill": false,
            "pointRadius": 0,
            "borderColor": '#1a5276',
            "backgroundColor": "#d4e6f1",
            "pointHitRadius": 5
        }]
    }

    drawChart(formattedData);
}

function drawChart(data) {
    var ctx = document.getElementById('chartFortyEight');

    var twoDayChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            legend: {
                display: true,
                labels: {
                    boxWidth: 12,
                    fontSize: 12,
                }
            },
            title: {
                display: true,
                text: 'Temperature and Humidity',
                fontSize: 18,
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        unit: 'minute',
                        displayFormats: {
                            minute: 'MMM D h:mm a'
                        }
                    },
                    ticks: {
                        maxTicksLimit: 12
                    },
                    scaleLabel: {
                        labelString: 'Time',
                        display: true,
                        fontSize: 16
                    }
                }],
                yAxes: [{
                    id: 'temp',
                    type: 'linear',
                    position: 'left',
                    label: 'Temp. &deg;F',
                    offset: true,
                    scaleLabel: {
                        fontSize: 16
                    }
                }, {
                    id: 'hum',
                    type: 'linear',
                    position: 'right',
                    label: 'Hum. %',
                    offset: true,
                    scaleLabel: {
                        fontSize: 16
                    }
                }]
            }
        }
    });
}