
function getFormatTheaterName(theaterName) {
    return theaterName.slice(0,3);
}

function getFormatSeatName(seatName){
    return seatName.slice(-3);
}

export {getFormatTheaterName,getFormatSeatName};
