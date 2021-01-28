function getUserData() {
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
            }
        }
    });
}