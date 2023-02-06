js-sampler
=========

## Installation

To install the latest stable version.

```bash
npm install js-sampler
```

To import js-sampler:

```js
import * as jsSampler from 'js-sampler'
```

## Usage


### Composition format

#### Instrument

The format used to connect the instrument is [DecentSampler file format](https://www.decentsamples.com/docs/format-documentation.html)

Publish the folder with the instrument sample library and provide a link to the .dspreset file in `instrument.url`.

#### Events

`time` - bpm based float number  
`note` - midi note number, see the value in the downloaded .dspreset file of instrument  
`duration` - note duration, bpm based float number  
`velocity` - samples based volume value, float number between 0 and 1  
`volume` - volume value, float number between 0 and 1

```javascript
const composition = {
    duration: 4,
    layers: [
        {
            volume: 1,
            instrument: {
                name: 'organ',
                url: 'https://mc.v-helper.ru/instruments/Chord Organ Exp.dsbundle/Chord Organ Exp 1.dspreset',
            },
            events: [
                {
                    time: 0,
                    note: 50,
                    duration: 4,
                    velocity: 1,
                    volume: 1
                },
            ]
        },
        {
            volume: .5,
            instrument: {
                name: 'kartals',
                url: 'https://mc.v-helper.ru/instruments/kartals/Kartals.dspreset',
            },
            events: [
                {
                    time: 0,
                    note: 72,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 2,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 3,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
            ]
        },
    ]
}
```

### Player

```javascript
const player = new jsSampler.Player({
    loop: true,
    bpm: 100,
    onLoad: ()=>{
        console.log(player)
        buttonPlay.addEventListener('click', () => {
            player.start()
        })
        buttonPause.addEventListener('click', () => {
            player.pause()
        })
        buttonStop.addEventListener('click', () => {
            player.stop(true)
        })
        buttonBpm80.addEventListener('click', () => {
            player.bpm = 80
        })
        buttonBpm100.addEventListener('click', () => {
            player.bpm = 100
        })
    },
    data: composition,
})
```



### Instrument

```javascript
const instrument = new jsSampler.Instrument({
    name: 'organ',
    url: 'https://mc.v-helper.ru/instruments/Chord Organ Exp.dsbundle/Chord Organ Exp 1.dspreset',
    onLoad: ()=>{
        console.log(instr)
    },
})
```


### triggerAttack / triggerRelease

`triggerAttack` starts the note, and `triggerRelease` is note off.

```javascript
let source = instrument.triggerAttack(50, jsSampler.Tone.now(), 1, 1)
if(source) {
    instrument.triggerRelease(source, jsSampler.Tone.now())
}
```

### triggerAttackRelease

`triggerAttackRelease` is a combination of `triggerAttack` and `triggerRelease`

```javascript
const note = 50
const satrt_in_s = 1.25 
const duration_in_s = 4
const velocity = 1
const volume = 1
instrument.triggerAttackRelease(note, satrt_in_s, duration_in_s, velocity, volume)
```

### Time

Web Audio has advanced, sample accurate scheduling capabilities. The AudioContext time is what the Web Audio API uses to schedule events, starts at 0 when the page loads and counts up in **seconds**.

`jsSampler.Tone.now()` gets the current time of the AudioContext. 

```javascript
setInterval(() => console.log(jsSampler.Tone.now()), 100);
```