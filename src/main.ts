import './scss/style.scss'
import * as jsSampler from './scripts'
import {PlayerCompositionOptions} from "./scripts/classes/Player";
import {Source} from "./scripts";

// const instr = new jsSampler.Instrument({
//     name: 'organ',
//     url: 'https://mc.v-helper.ru/media/instruments/Chord Organ Exp.dsbundle/Chord Organ Exp 1.dspreset',
//     onLoad: ()=>{
//         console.log(instr)
//     },
// })
//
// const instr = new jsSampler.Instrument({
//     name: 'ektra',
//     url: 'https://mc.v-helper.ru/media/instruments/The Ektara.dsbundle/The Ektara - Normal Patch.dspreset',
//     onLoad: ()=>{
//         console.log(instr)
//     },
// })
//
// const instr = new jsSampler.Instrument({
//     name: 'kalimba',
//     url: 'https://mc.v-helper.ru/media/instruments/Gourd Kalimba.dsbundle/Kalimba.dspreset',
//     onLoad: ()=>{
//         console.log(instr)
//     },
// })
//
// const instr = new jsSampler.Instrument({
//     name: 'kartals',
//     url: 'https://mc.v-helper.ru/media/instruments/kartals/Kartals.dspreset',
//     onLoad: ()=>{
//         console.log(instr)
//     },
// })






const composition: PlayerCompositionOptions = {
    duration: 64,
    instruments: [
        {
            name: 'organ',
            url: 'https://mc.v-helper.ru/media/instruments/Chord Organ Exp.dsbundle/Chord Organ Exp 1.dspreset',
            volume: 1,
            reverb: {
                wet: 0,
                decay: 2.2,
                preDelay: .05,
            },
            fadeOut: .4,
            fadeIn: 0,
        },
        {
            name: 'kartals',
            url: 'https://mc.v-helper.ru/media/instruments/kartals/Kartals.dspreset',
            volume: .4,
            reverb: {
                wet: 0,
                decay: 2.2,
                preDelay: .05,
            },
        },
        {
            name: 'mridang',
            url: 'https://mc.v-helper.ru/media/instruments/mridang/Mridang.web.dspreset',
            volume: .5,
            reverb: {
                wet: 0,
                decay: 2.2,
                preDelay: .05,
            },
        },
    ],
    layers: [
        {
            instrument: 'organ',
            events: [
                {
                    time: 0,
                    note: 50,
                    duration: 5,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 5,
                    note: 53,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 6,
                    note: 52,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 7,
                    note: 48,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 8,
                    note: 46,
                    duration: 5,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 13,
                    note: 43,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 14,
                    note: 46,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 15,
                    note: 53,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 16,
                    note: 52,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 17,
                    note: 53,
                    duration: .5,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 17.5,
                    note: 52,
                    duration: .5,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 18,
                    note: 50,
                    duration: 3,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 21,
                    note: 53,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 22,
                    note: 52,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 23,
                    note: 48,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 24,
                    note: 46,
                    duration: 5,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 29,
                    note: 43,
                    duration: .5,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 29.5,
                    note: 45,
                    duration: .5,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 30,
                    note: 46,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 31,
                    note: 48,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 32,
                    note: 45,
                    duration: 5,
                    velocity: 1,
                    volume: 1
                },


                {
                    time: 37,
                    note: 53,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 38,
                    note: 52,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 39,
                    note: 48,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 40,
                    note: 46,
                    duration: 5,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 45,
                    note: 43,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 46,
                    note: 46,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 47,
                    note: 53,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 48,
                    note: 52,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 49,
                    note: 53,
                    duration: .5,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 49.5,
                    note: 52,
                    duration: .5,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 50,
                    note: 50,
                    duration: 3,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 53,
                    note: 53,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 54,
                    note: 52,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 55,
                    note: 48,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 56,
                    note: 46,
                    duration: 5,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 61,
                    note: 43,
                    duration: .5,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 61.5,
                    note: 45,
                    duration: .5,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 62,
                    note: 46,
                    duration: 1,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 63,
                    note: 48,
                    duration: 1,
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
                {
                    time: 4,
                    note: 72,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 6,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 7,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 8,
                    note: 72,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 10,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 11,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 12,
                    note: 72,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 14,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 15,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 16,
                    note: 72,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 18,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 19,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 20,
                    note: 72,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 22,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 23,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 24,
                    note: 72,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 26,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 27,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 28,
                    note: 72,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 30,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 31,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },

                {
                    time: 0+32,
                    note: 72,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 2+32,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 3+32,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 4+32,
                    note: 72,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 6+32,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 7+32,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 8+32,
                    note: 72,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 10+32,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 11+32,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 12+32,
                    note: 72,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 14+32,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 15+32,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 16+32,
                    note: 72,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 18+32,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 19+32,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 20+32,
                    note: 72,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 22+32,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 23+32,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 24+32,
                    note: 72,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 26+32,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 27+32,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 28+32,
                    note: 72,
                    velocity: 1,
                    volume: 1
                },
                {
                    time: 30+32,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
                {
                    time: 31+32,
                    note: 71,
                    velocity: .7,
                    volume: 1
                },
            ]
        },
        {
            instrument: 'mridang',
            events: [
                {
                    time: 0,
                    note: 79,
                },
                {
                    time: 2,
                    note: 77,
                },
                {
                    time: 3,
                    note: 79,
                },
                {
                    time: 4,
                    note: 79,
                },
                {
                    time: 5,
                    note: 76,
                    velocity: .6
                },
                {
                    time: 6,
                    note: 77,
                },
                {
                    time: 7,
                    note: 79,
                },
            ]
        },
        {
            instrument: 'mridang',
            events: [
                {
                    time: 0,
                    note: 76,
                },
                {
                    time: 3,
                    note: 74,
                    velocity: .65
                },
                {
                    time: 5,
                    note: 76,
                    velocity: .65
                },
                {
                    time: 6,
                    note: 76,
                },
            ]
        },
    ]
}

composition.layers[2].events.forEach((event)=>{
    for(let i=1; i<8; i++){
        let new_event = {
            time: event.time + i*8,
            note: event.note,
            velocity: event.velocity?event.velocity:1
        }
        composition.layers[2].events.push(new_event)
    }
})
composition.layers[3].events.forEach((event)=>{
    for(let i=1; i<8; i++){
        let new_event = {
            time: event.time + i*8,
            note: event.note,
            velocity: event.velocity?event.velocity:1
        }
        composition.layers[3].events.push(new_event)
    }
})



const buttonPlay = document.querySelector<HTMLButtonElement>('#play')!
const buttonPause = document.querySelector<HTMLButtonElement>('#pause')!
const buttonStop = document.querySelector<HTMLButtonElement>('#stop')!
const buttonBpm80 = document.querySelector<HTMLButtonElement>('#bpm80')!
const buttonBpm100 = document.querySelector<HTMLButtonElement>('#bpm100')!
const buttonBpm120 = document.querySelector<HTMLButtonElement>('#bpm120')!
const buttonBpm140 = document.querySelector<HTMLButtonElement>('#bpm140')!
const buttonVolume = document.querySelector<HTMLButtonElement>('#volume')!
const buttonVolumeS = document.querySelector<HTMLButtonElement>('#volumes')!

const player = new jsSampler.Player({
    loop: true,
    bpm: 100,
    composition: composition,
    onReady: () => {
        buttonPlay.addEventListener('click', () => {
            player.start()
        })
    }
})

player.addEventListener('load', ()=>{
    console.log(player)

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
player.addEventListener('progress', () => {
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



const instr = player.getInstrumentByName('organ')!

const card = document.querySelector<HTMLDivElement>('.card')!

let html = ''
for (let i = 24; i<=96; i++) {
    html += `<button id="${i}" type="button">${i}</button>`
}
card.innerHTML = html

const elements = card.querySelectorAll<HTMLButtonElement>('button')

let sources: jsSampler.Source[] = []
let event = ''
elements.forEach((opt) => {
    opt.addEventListener('mousedown', (e) => {
        if (event === '') {
            event = 'mousedown,'+opt.id
            // @ts-ignore
            const velocity = e.layerY / opt.offsetHeight
            const source = instr?.triggerAttack(parseInt(opt.id), jsSampler.Tone.now(), velocity, 1)
            if (source) sources.push(source)
        }
    })
    opt.addEventListener('touchstart', (e) => {
        if (event === '') {
            event = 'touchstart,'+opt.id
            // @ts-ignore
            const rect = e.target?.getBoundingClientRect()
            const y = e.touches[0].clientY - rect.top
            const velocity = y / opt.offsetHeight
            const source = instr?.triggerAttack(parseInt(opt.id), jsSampler.Tone.now(), velocity, 1)
            if (source) sources.push(source)
        }

        return false
    })
    opt.addEventListener('mouseleave', () => {
        const [name, id] = event.split(',')
        if (id == opt.id && name === 'mousedown') {
            sources.forEach((source) => {
                instr.triggerRelease(source, jsSampler.Tone.now())
                const index = sources.indexOf(<Source>source)
                if (index > -1) {
                    sources.splice(index, 1)
                }
            })
            event = ''
        }
    })
    opt.addEventListener('touchend', () => {
        const [name, id] = event.split(',')
        if (id == opt.id && name === 'touchstart') {
            sources.forEach((source) => {
                instr.triggerRelease(source, jsSampler.Tone.now())
                const index = sources.indexOf(<Source>source)
                if (index > -1) {
                    sources.splice(index, 1)
                }
            })
            event = ''
        }

        return false
    })
    opt.addEventListener('mouseup', () => {
        const [name, id] = event.split(',')
        if (id == opt.id && name === 'mousedown') {
            sources.forEach((source) => {
                instr.triggerRelease(source, jsSampler.Tone.now())
                const index = sources.indexOf(<Source>source)
                if (index > -1) {
                    sources.splice(index, 1)
                }
            })
            event = ''
        }
    })
})


