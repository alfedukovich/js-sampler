js-sampler
=========

[Demo page](https://alfedukovich.github.io/js-sampler/)

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

#### Instruments

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
    instruments: [
        {
            name: 'organ',
            url: 'https://mc.v-helper.ru/media/instruments/Chord Organ Exp.dsbundle/Chord Organ Exp 1.dspreset',
            volume: 1,
            reverb: {
                wet: .5,
                decay: 2.2,
                preDelay: .05,
            },
            fadeOut: .4,
            fadeIn: 0,
        },
        {
            name: 'kartals',
            url: 'https://mc.v-helper.ru/media/instruments/kartals/Kartals.dspreset',
            volume: .5,
        },
    ],
    layers: [
        {
            instrument: 'organ',
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
            instrument: 'kartals',
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
    composition: composition,
})

player.addEventListener('load', ()=>{
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
    buttonBpm120.addEventListener('click', () => {
        player.bpm = 120
    })
    buttonBpm140.addEventListener('click', () => {
        player.bpm = 140
    })
    buttonVolume.addEventListener('click', () => {
        player.setInstrumentVolume('kartals', 1)
    })
    buttonVolumeS.addEventListener('click', () => {
        player.setInstrumentVolume('kartals', .1)
    })
})
player.addEventListener('progress', (e) => {
    //console.log(e.detail.value)
})
player.addEventListener('start', () => {
    console.log('player start')
})
player.addEventListener('stop', () => {
    console.log('player stop')
})
player.addEventListener('pause', () => {
    console.log('player pause')
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