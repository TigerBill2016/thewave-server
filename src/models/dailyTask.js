let mongoose = require('mongoose')

let BreakfastModel = require('./breakfast')
let BusrunsModel = require('./busrun')

let list = [
    { code: '6B', time: '6：30 ~ 7：00', count: 2 },
    { code: '7A', time: '7：00 ~ 7：30', count: 2 },
    { code: '7B', time: '7：30 ~ 8：00', count: 2 },
    { code: '8A', time: '8：00 ~ 8：30', count: 2 },
    { code: '8B', time: '8：30 ~ 9：00', count: 2 },
    { code: '9A', time: '9：00 ~ 9：30', count: 2 },
    { code: '9B', time: '9：30 ~ 10：00', count: 2 },
]

let runs = [
    { destination: 'market', time: '10: 00', count: 10 },
    { destination: 'market', time: '11: 00', count: 10 },
    { destination: 'market', time: '13: 00', count: 10 },
    { destination: 'market', time: '14: 00', count: 10 },
    { destination: 'market', time: '15: 00', count: 10 },
    { destination: 'market', time: '17: 00', count: 10 },
    { destination: 'market', time: '18: 00', count: 10 },
    { destination: 'market', time: '19: 00', count: 10 },
    { destination: 'market', time: '20: 00', count: 10 },
    { destination: 'market', time: '21: 00', count: 10 },


    { destination: 'villas', time: '10: 20', count: 10 },
    { destination: 'villas', time: '11: 20', count: 10 },
    { destination: 'villas', time: '13: 20', count: 10 },
    { destination: 'villas', time: '14: 20', count: 10 },
    { destination: 'villas', time: '15: 20', count: 10 },
    { destination: 'villas', time: '17: 20', count: 10 },
    { destination: 'villas', time: '18: 20', count: 10 },
    { destination: 'villas', time: '19: 20', count: 10 },
    { destination: 'villas', time: '20: 20', count: 10 },
    { destination: 'villas', time: '21: 20', count: 10 },
]

async function foo1() {
    try {
        let count = await BusrunsModel.countDocuments()
        if (count === 0) {
            BusrunsModel.create(runs)
        }
    } catch (error) {
        console.log('init busruns data error', error)
    }
}

async function foo2() {
    try {
        let count = await BreakfastModel.countDocuments()
        if (count === 0) {
            BreakfastModel.create(list)
        }
    } catch (error) {
        console.log('init breakfast data error', error)
    }
}

foo1()
foo2()


