import { readInput } from "../../helpers/readInput";

interface Race {
    time: number;
    distance: number;
}

async function partOneParsing(file: string) {
    const input = await readInput(file);

    const values = input.map((line) => line.split(/: +/gm)[1].split(/ +/gm).map((number) => parseInt(number.trim())))

    const races = []
    for (let i = 0; i < values[0].length; i++) {
        races.push({
            time: values[0][i],
            distance: values[1][i]
        })
    }

    return races
}

async function partOne(file: string) {
    const races = await partOneParsing(file);
    const result: number[] = []

    races.forEach((race) => {
        result.push(countWinningWays(race))
    })

    return result.reduce((a, b) => a * b)
}

async function partTwoParsing(file: string) {
    const input = await readInput(file);

    const value = input.map((line) => parseInt(line.split(/: +/gm)[1].replaceAll(/ +/gm, "").trim()))

    return {
        time: value[0],
        distance: value[1]
    }
}

async function partTwo(file: string) {
    const race = await partTwoParsing(file);
    return countWinningWays(race)
}

function countWinningWays(race: Race) {
    let winCount = 0;
    for (let i = 0; i <= race.time; i++) {
        const chargingTime = i;
        const travelTime = race.time - i;

        if ((chargingTime * travelTime) > race.distance) {
            winCount++;
        }
    }
    return winCount
}


console.log(await partTwo("input.txt"))