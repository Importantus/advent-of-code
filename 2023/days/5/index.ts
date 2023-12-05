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
    const data = await parseInput(file);
    const result: number[] = []

    // select every odd index
    const startSeeds = data.startSeeds.filter((_, index) => index % 2 === 0)
    const ranges = data.startSeeds.filter((_, index) => index % 2 !== 0)

    startSeeds.forEach((seed, index) => {
        for (let i = 0; i < ranges[index]; i++) {
            let start = seed + i

            data.maps.forEach((map, x) => {

                // console.log("\nnew Map")
                for (let i = 0; i < map.length; i++) {
                    const souDesMap = map[i];
                    // console.log(souDesMap)
                    if (start <= (souDesMap[1] + souDesMap[2]) && start >= souDesMap[1]) {
                        // console.log("found " + start)
                        start = start + (souDesMap[0] - souDesMap[1])
                        // console.log("new start " + start)

                        break;
                    } else {

                    }
                }
                // console.log("result " + start)

            })

            result.push(start)
        }
    })

    console.log(Date.now() - time)

    //Return the minimum value
    return Math.min(...result)

}

console.log(await partTwo("input.txt"));