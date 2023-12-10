import { readInput } from "../../helpers/readInput";

type Position = [number, number]

const left: Position = [0, -1]
const right: Position = [0, 1]
const up: Position = [-1, 0]
const down: Position = [1, 0]

const allDirections = [left, right, up, down]

const leftPipes = ["-", "F"]
const rightPipes = ["-", "J"]
const upPipes = ["|", "7", "F"]
const downPipes = ["|", "L", "J"]

const allPipes = [leftPipes, rightPipes, upPipes, downPipes]

async function parseInput(file: string): Promise<string[][]> {
    const input = await readInput(file);
    return input.map((line) => line.split(""));
}

function findStart(input: string[][]) {
    for (let y = 0; y < input.length; y++) {
        const line = input[y];
        for (let x = 0; x < line.length; x++) {
            const char = line[x];
            if (char === "S") {
                return [y, x] as Position
            }
        }
    }
}

async function findFirstPipe(input: string[][], [y, x]: Position) {
    for (let i = 0; i < allDirections.length; i++) {
        const direction = allDirections[i];
        const pipes = allPipes[i]

        const [dy, dx] = direction

        const nextY = y + dy
        const nextX = x + dx

        const char = input[nextY]?.[nextX]

        if (char === undefined) continue

        if (pipes.includes(char)) {
            return [nextY, nextX] as Position
        }
    }
}

async function partOne(file: string) {
    const input = await parseInput(file);
    const start = findStart(input)!
    const firstPipe = await findFirstPipe(input, start)

    const visited: Position[] = []

    const possibleDirections: { [key: string]: Position[] } = {
        "F": [right, down],
        "J": [left, up],
        "7": [down, left],
        "L": [up, right],
        "-": [left, right],
        "|": [up, down]
    }

    let currentPositon: Position = firstPipe!

    while (input[currentPositon[0]][currentPositon[1]] !== "S") {
        const [y, x] = currentPositon
        const char = input[y][x]

        if (!char || char === ".") continue

        // console.log(char)

        visited.push(currentPositon)

        // console.log(visited)

        const directions = possibleDirections[char]

        for (let direction of directions) {
            const [dy, dx] = direction

            const nextY = y + dy
            const nextX = x + dx

            if (visited.some((pos) => pos[0] === nextY && pos[1] === nextX)) continue

            const nextChar = input[nextY]?.[nextX]

            if (visited.length === 1 && !allPipes.some((pipes) => pipes.includes(nextChar))) continue

            currentPositon = [nextY, nextX]
        }
    }

    return { loop: visited, distance: (visited.length + 1) / 2 }
}

async function partTwo(file: string) {
    const input = await parseInput(file);
    const part1 = await partOne(file)
    const loop = part1.loop

    for (let y = 0; y < input.length; y++) {
        const line = input[y];
        for (let x = 0; x < line.length; x++) {
            const char = line[x];
            if (char === "S") continue
            if (loop.some((pos) => pos[0] === y && pos[1] === x)) continue
            input[y][x] = "."
        }
    }

    const partsWithSameDirection = [
        /L-*J/gm,
        /F-*7/gm,
    ]

    const partsWithDifferentDirection = [
        /L-*7/gm,
        /F-*J/gm,
    ]

    for (let y = 0; y < input.length; y++) {
        for (let i = 0; i < partsWithSameDirection.length; i++) {
            const reg = partsWithSameDirection[i];
            input[y] = input[y].join("").replaceAll(reg, "").split("")
        }

        for (let i = 0; i < partsWithDifferentDirection.length; i++) {
            const reg = partsWithDifferentDirection[i];
            input[y] = input[y].join("").replaceAll(reg, "|").split("")
        }
    }


    let partsEnclosed = 0
    let posParts: Position[] = []

    for (let y = 0; y < input.length; y++) {
        const line = input[y];
        // console.log(line.join(""))
        let parity = 0;

        for (let x = 0; x < line.length; x++) {
            const char = line[x];
            if (char === "." && parity % 2 === 1) {
                partsEnclosed++
                posParts.push([y, x])
            }

            // You have to manually check if S is partsWithSameDirection or partsWithDifferentDirection
            if (char === "|" || char === "S") {
                parity++
            }
        }
    }

    return partsEnclosed

}

console.log(await partTwo("input.txt"))