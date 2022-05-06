import {EventEmitter } from 'events'

let ticksEventsCount = 0

const tickEvent = new EventEmitter();
tickEvent.on('tick', () => {
    ++ticksEventsCount
    console.log('Tick..')
});


function useCallback(timer, cb) {
    const firstInvocationDate = Date.now();
    const DEFAULT_INTERVAL = 50;

    if(firstInvocationDate % 5 === 0) {
        return cb(new Error('Current timestamp is invalid! Try later!'), ticksEventsCount)
    }

    process.nextTick(()=> tickEvent.emit('tick'))

    setTimeout(function recursiveCall(){
        tickEvent.emit('tick');
        const currentDate = Date.now();

        if(currentDate - firstInvocationDate >= timer) {
            console.log("Time is up")
            return cb(null, ticksEventsCount)
        }
        
        setTimeout(recursiveCall, DEFAULT_INTERVAL)

    }, DEFAULT_INTERVAL);
}

useCallback(1200, (error, count) => {
    if(error) {
        console.error("Error: ", error.message)
    }

    console.log(`Total ticks: ${count}`)
})