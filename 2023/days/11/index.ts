import { readInput } from "../../helpers/readInput";

type Position = [number, number]

function expandUniverse(input: string[]) {
    for (let i = 0; i < input.length; i++) {
        let line = input[i]

        if (line.match(/^\.+$/gm)) {
            input.splice(i, 0, ".".repeat(line.length))
            i++
        }
    }

    for (let i = 0; i < input[0].length; i++) {
        if (input.every((line) => line[i] === ".")) {
            input.forEach((line, index) => {
                input[index] = line.slice(0, i) + "." + line.slice(i)

            })
            i++
        }
    }

    return input
}

function getGalaxyPositions(input: string[]) {
    const result: Position[] = []

    for (let y = 0; y < input.length; y++) {
        const line = input[y];
        for (let x = 0; x < line.length; x++) {
            const char = line[x];
            if (char === "#") {
                result.push([y, x])
            }
        }
    }

    return result
}

function getGalaxyPositions2(input: string[], expansion: number) {
    const result: Position[] = []

    let numberOfDotOnlyLines = 0
    for (let y = 0; y < input.length; y++) {
        const line = input[y];
        if (line.match(/^\.+$/gm)) {
            numberOfDotOnlyLines++
        }

        let numberOfDotOnlyColumns = 0
        for (let x = 0; x < line.length; x++) {


            if (input.every((line) => line[x] === ".")) {
                numberOfDotOnlyColumns++
            }


            const char = line[x];
            if (char === "#") {
                console.log(numberOfDotOnlyLines, numberOfDotOnlyColumns)
                result.push([(y + numberOfDotOnlyLines * (expansion - 1)), x + numberOfDotOnlyColumns * (expansion - 1)])
            }
        }
    }

    return result
}

async function partOne(file: string) {
    const galaxies = getGalaxyPositions(expandUniverse(await readInput(file)))
    let result = 0

    for (let i = 0; i < galaxies.length; i++) {
        const galaxy = galaxies[i];
        // j = i because every pair counts only once
        for (let j = i; j < galaxies.length; j++) {
            const otherGalaxy = galaxies[j];
            result += calculateManhattanDistance(galaxy, otherGalaxy)
        }
    }

    return result
}

async function partTwo(file: string) {
    const galaxies = getGalaxyPositions2(await readInput(file), 1000000)

    console.log(galaxies)
    let result = 0

    for (let i = 0; i < galaxies.length; i++) {
        const galaxy = galaxies[i];
        // j = i because every pair counts only once
        for (let j = i; j < galaxies.length; j++) {
            const otherGalaxy = galaxies[j];
            result += calculateManhattanDistance(galaxy, otherGalaxy)
        }
    }

    return result
}

function calculateManhattanDistance(a: Position, b: Position) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])
}

// console.log(calculateManhattanDistance([0, 4], [10, 9]))
console.log(await partTwo("input.txt"))
