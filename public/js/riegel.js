//_________________________________________________________________
//RIEGEL FORMULA - predicting today's 5k/10k/HMP
//---------———————————————————————————————————————————–––––––––––––  

function velocityRiegel(D1, T1, D2) {
    // using Riegel prediction formula t2 = t1 × (d2 / d1)1.06:
    if (D2===3.1){
        tempo = `5k`;
        type = `Speed Work`;
    }
    else if (D2===6.2){
        tempo = `10k`;
        type = `Short Tempo`;
    }
    else if (D2===13.1){
        tempo = `HMP`;
        type = `Long Tempo`;
    }
    else {
        tempo = D2;
        type = "";
    }
    var distances = D2 / D1;
    var distPow = Math.pow(distances, 1.07);
    //1.07 is standard for non-pro runners in Riegel formula
    var T2secs = T1 * distPow; //this is now the new predicted time in seconds
    var T2pace = Math.floor(T2secs / D2);
    console.log("T2pace:" + T2pace);
    console.log("T2secs:" + T2secs);

    console.log("tempo: "+tempo);
    console.log("moment says: " + moment().startOf('day').seconds(T2secs).format('H:mm:ss'));
    $(`#predicted-time`).append(`<div><b>${tempo}</b>: ${moment().startOf('day').seconds(T2secs).format('H:mm:ss')} </div>`);
    $(`#predicted-pace`).append(`<div><b>${tempo}</b> ${type}: ${moment().startOf('day').seconds(T2pace).format('mm:ss')} </div>`);
}
//velocityRiegel(13.1, 7200, 26.2);
velocityRiegel(13.1, 7200, 3.1);
velocityRiegel(13.1, 7200, 6.2);
velocityRiegel(13.1, 7200, 13.1);