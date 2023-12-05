import { readInput } from "../../helpers/readInput";

type SouDesMap = [
    number,
    number,
    number,
]

type Maps = SouDesMap[]

type Data = {
    startSeeds: number[],
    maps: Maps[]
}

async function parseInput(file: string) {
    const input = await readInput(file);

    const startSeeds = input[0].split(/: +/gm)[1].split(/ +/gm).map((number) => parseInt(number.trim()))

    const maps: Maps[] = []

    let currentMap: Maps = []
    input.forEach((line, index) => {
        if (index < 3) return
        // If line starts with any char that is not a number, it's a new map
        if (isNaN(parseInt(line[0]))) {
            if (line.length < 3) {
                maps.push(currentMap)
            } else {
                currentMap = []
            }
        } else {
            currentMap.push(line.split(/ +/gm).map((number) => parseInt(number.trim())) as SouDesMap)
        }
    })
    maps.push(currentMap)

    return {
        startSeeds,
        maps
    } as Data
}

async function partOne(file: string) {
    const data = await parseInput(file);
    const result: number[] = []

    data.startSeeds.forEach((seed) => {
        let start = seed

        data.maps.forEach((map, x) => {

            console.log("\nnew Map")
            for (let i = 0; i < map.length; i++) {
                const souDesMap = map[i];
                console.log(souDesMap)
                if (start <= (souDesMap[1] + souDesMap[2]) && start >= souDesMap[1]) {
                    console.log("found " + start)
                    start = start + (souDesMap[0] - souDesMap[1])
                    console.log("new start " + start)

                    break;
                } else {

                }
            }
            console.log("result " + start)

        })

        result.push(start)
    })

    //Return the minimum value
    return Math.min(...result)

}


async function partTwo(file: string) {
    const time = Date.now()
    console.log("Started at " + new Date().toLocaleTimeString())

    const data = await parseInput(file);
    let result: number = Number.MAX_SAFE_INTEGER

    for (let i = 0; i < (data.startSeeds.length); i = i + 2) {
        for (let j = 0; j < data.startSeeds[i + 1]; j++) {

            let start = data.startSeeds[i] + j
            data.maps.forEach((map) => {
                for (let k = 0; k < map.length; k++) {
                    const souDesMap = map[k];
                    if (start <= (souDesMap[1] + souDesMap[2]) && start >= souDesMap[1]) {
                        start = start + (souDesMap[0] - souDesMap[1])
                        break;
                    }
                }
            })

            if (start < result) {
                result = start
            }
        }
    }

    console.log("Finished in " + (Date.now() - time) / 1000 / 60 + " minutes")

    return result - 1
}



console.log(await partTwo("input.txt"));