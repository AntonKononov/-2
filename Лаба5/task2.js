var toArray = {
    a: 1,
    b: 2,
    shrimp: 15,
    tots: 12,
    Ukraine: 24442,
    Italia: 124124,
    apple: 89,
    banana: 142,
    name: ['Bob', 'Smith']
};

var empty = {};

function obj_to_array(data) {
    var array = [];
    if (data !== undefined) {
        array = Object.entries(data);
        console.log(array);
    } else {
        console.log(array);
    }

}

obj_to_array(toArray);
obj_to_array(empty);