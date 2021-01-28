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
        dataT.push(data[i]['data']['temp']);
        dataH.push(data[i]['data']['humidity']);
        labels.push(data[i]['datetime']['timestamp']);
    }

    let formattedData = {
        "labels": labels,
        "datasets": [{
            "label": 'Temperature',
            "data": dataT,
            "pointRadius": 0,
            "borderColor": '#873600'
        },
        {
            "label": 'Humidity',
            "data": dataH,
            "pointRadius": 0,
            "borderColor": '#1a5276'
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
                        maxTicksLimit: 24
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