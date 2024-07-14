function random(min, max) {
    return Math.floor(Math.random()*(max-min+1))+min
}

function equals(arr1, arr2) {
    return arr1.length == arr2.length && arr1.every((x, i) => x === arr2[i]);
}
