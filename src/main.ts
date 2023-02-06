import './scss/style.scss'
import * as jsSampler from './scripts/js-sampler'

// const instr = new jsSampler.Instrument({
//     name: 'organ',
//     url: 'https://mc.v-helper.ru/instruments/Chord Organ Exp.dsbundle/Chord Organ Exp 1.dspreset',
//     onLoad: ()=>{
//         console.log(instr)
//     },
// })
//
// const instr = new jsSampler.Instrument({
//     name: 'ektra',
//     url: 'https://mc.v-helper.ru/instruments/The Ektara.dsbundle/The Ektara - Normal Patch.dspreset',
//     onLoad: ()=>{
//         console.log(instr)
//     },
// })
//
// const instr = new jsSampler.Instrument({
//     name: 'kalimba',
//     url: 'https://mc.v-helper.ru/instruments/Gourd Kalimba.dsbundle/Kalimba.dspreset',
//     onLoad: ()=>{
//         console.log(instr)
//     },
// })
//
// const instr = new jsSampler.Instrument({
//     name: 'kartals',
//     url: 'https://mc.v-helper.ru/instruments/kartals/Kartals.dspreset',
//     onLoad: ()=>{
//         console.log(instr)
//     },
// })






const composition = {
    duration: 64,
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
    ]
}

const buttonPlay = document.querySelector<HTMLButtonElement>('#play')!
const buttonPause = document.querySelector<HTMLButtonElement>('#pause')!
const buttonStop = document.querySelector<HTMLButtonElement>('#stop')!
const buttonBpm80 = document.querySelector<HTMLButtonElement>('#bpm80')!
const buttonBpm100 = document.querySelector<HTMLButtonElement>('#bpm100')!
const buttonBpm120 = document.querySelector<HTMLButtonElement>('#bpm120')!
const buttonBpm140 = document.querySelector<HTMLButtonElement>('#bpm140')!

const player = new jsSampler.Player({
    loop: true,
    mpm: 100,
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
            player.mpm = 80
        })
        buttonBpm100.addEventListener('click', () => {
            player.mpm = 100
        })
        buttonBpm120.addEventListener('click', () => {
            player.mpm = 120
        })
        buttonBpm140.addEventListener('click', () => {
            player.mpm = 140
        })
    },
    data: composition,
})



const instr = player.getInstrumentByName('organ')

const card = document.querySelector<HTMLDivElement>('.card')!

let html = ''
for (let i = 24; i<=96; i++) {
    html += `<button id="${i}" type="button">${i}</button>`
}
card.innerHTML = html

const elements = card.querySelectorAll<HTMLButtonElement>('button')

let source: jsSampler.Source | null
elements.forEach((opt) => {
    opt.addEventListener('mousedown', (e) => {
        const velocity = e.layerY / opt.offsetHeight
        source = instr.triggerAttack(parseInt(opt.id), jsSampler.Tone.now(), velocity, 1)
    })
    opt.addEventListener('mouseleave', () => {
        if(source) {
            instr.triggerRelease(source, jsSampler.Tone.now())
            source = null
        }
    })
    opt.addEventListener('mouseup', () => {
        if(source) {
            instr.triggerRelease(source, jsSampler.Tone.now())
            source = null
        }
    })
})


