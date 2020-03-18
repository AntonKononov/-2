// var array = [false, true, true, false, true];
// function findFrequent(array) {
//     var arr = [],
//         max_arr = 0,
//         max_elem = 0;
//     for (let i = 0; i < array.length; i++) {
//         var idx = array.indexOf(array[i]);
//         while (idx != -1) {
//             arr.push(idx);
//             idx = array.indexOf(array[i], idx + 1);
//         }
//         if (arr.length > max_arr.length) {
//             max_arr = arr;
//             max_elem = array[0];
//             arr = [];
//         }
//     }
//     return max_elem;
// }
// console.log(findFrequent(array));

var array = [false, true, true, false, true];

function findFrequent(array) {
    let map = new Map();
    for (let i = 0; i < array.length; i++) {
        if (map.has(array[i]) == false) {
            map.set(array[i], 1);
        } else {
            let value = map.get(array[i]);
            value += 1;
            map.set(array[i], value);
        }
    }
    let max_value = 0,
        value;
    for (let val of map.values()) {
        if (val > max_value) {
            max_value = val;
        }
    }
    for (let key of map.keys()) {
        if (map.get(key) == max_value) {
            return key;
        }
    }
}
console.log(findFrequent(array));