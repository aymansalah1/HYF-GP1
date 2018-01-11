const KEY_IDX = 0;
const VAL_IDX = 1;
const NEXT_IDX = 2;
var getBucket = function hash(nBuckets, k) {
    var hash = 0, i, chr;
    if (k.length === 0) return hash;
    for (i = 0; i < k.length; i++) {
        chr = k.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash % nBuckets;
}
var get = function get(m, k) {
    
    var bucketElements = m.hashMap[getBucket(m.hashMap.length, k)]||[]
    for (let e of bucketElements)
        if (e[KEY_IDX] === k)
            return e[VAL_IDX]
    return undefined;
}

var put = function put(m, k, v) {
    var bucketElements = m.hashMap[getBucket(m.hashMap.length, k)] || []

        for (let e of bucketElements) {
            if (e[KEY_IDX] === k) {
                var old = e[VAL_IDX];
                e[VAL_IDX] = v;
                return old;
            }
        }

    let kvpair = [k, v, undefined];
    bucketElements.push(kvpair)
    m.hashMap.push([k, v])
    if (!m.head)
        m.head = kvpair;

    if (m.tail)
        m.tail[NEXT_IDX] = kvpair;

    m.tail = kvpair;
    return undefined;
}


var keys = function keys(m) {
    let out = []
    let kv = m.head;
    while (kv) {
        out.push(kv[KEY_IDX])
        kv = kv[NEXT_IDX];
    }
    return out;
}

var newHashMap = function newHashMap() {
    var m = new Array(0);
    for (let i = 0; i < m.length; i++) {
        m[i] = [];
    }
    return { hashMap: m, head: undefined, tail: undefined };
}

var example = newHashMap();
put(example, "name", "jack");
put(example, "bame", "jack");

put(example, "age", 5);
put(example, "old", 6);


put(example, "name", "john");

//console.log({ name: get(example, "name"), age: get(example, "age"), old: get(example, "old") })

console.log(keys(example).toString())
console.log(example)
// let example2 = {
//     name: "jack",
//     age: 5,
//     old: 6
// }

// example2["name"] = "john"
// example2["a"] = "y"
// example2["x"] = "z"
// example2["b"] = "d"

// //for (let i = 0 ;i < 1000000; i ++) {
//     //example2[i] = 0;
// //}
// console.log(Object.keys(example2))
// why is it ordered by insertion order?
// for (let k of Object.keys(example2)) {
//     if (k === "name" || k === "a") {
//         console.log(k)
//     }
// }
// //console.log(example2["name"])


var subscribe = function (observable, callback) {
    observable.observers.push(callback)
}

var notify = function (observable, message) {
    for (let o of observable.observers) {
        o(message)
    }
}

var newObservable = function newObservable() {
    return {
        observers: [],
    }
}

let exampleObservable = newObservable();


let listOfFilter = [];
subscribe(exampleObservable, (m) => {
    if (m.action === 'FILTER_ADD') {
        listOfFilter.push(m.value);
    } else if (m.action === 'FILTER_CLEAR') {
        listOfFilter = [];
    }
})

subscribe(exampleObservable, (m) => {
    if (m.action === 'MAP_CLICK') {
        console.log("CLICK", m.value)
    }
})


let localState = {}
subscribe(exampleObservable, (m) => {
    if (m.action === 'INVOKE') {
        m.value.call(localState)
    }
})

subscribe(exampleObservable, (m) => {
    console.log('observer 2', m)
})

notify(exampleObservable, { action: 'FILTER_ADD', value: 32 })
notify(exampleObservable, { action: 'FILTER_CLEAR' })
notify(exampleObservable, { action: 'FILTER_ADD', value: 35 })
notify(exampleObservable, { action: 'MAP_CLICK', value: { x: 123, y: 123 } })
notify(exampleObservable, {
    action: 'INVOKE', value: function () {
        this.something = "nothing"
    }
})
console.log(listOfFilter)
console.log(localState)





var subscribeStatefullObservable = function (observable, callback) {
    observable.observers.push(callback)
}

var unsubscribeStatefullObservable = function subscribeStatefullObservable(observable, callback) {
    observable.observers = observable.observers.filter(e => e !== callback);
}

var newStatefullObservable = function newObservable() {
    return {
        observers: [],
        data: {}
    }
}

var modifyStatefullObservable = function modifyObservable(observable, k, v) {
    observable.data[k] = v;
    for (let o of observable.observers) {
        o(observable.data)
    }
}


var statefull = newStatefullObservable();
var watcher = (data) => {
    this.setState({ selectedFilters: data.filters })
}
subscribeStatefullObservable(statefull, watcher)
unsubscribeStatefullObservable(statefull, watcher)


modifyStatefullObservable(statefull, "name", "jack")
