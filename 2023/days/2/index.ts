import { readInput } from "../../helpers/readInput";

type Subset = Color[]

interface Color {
    color: string,
    cubes: number
}

interface Game {
    id: number,
    subsets: Subset[],
    minRed?: number,
    minGreen?: number,
    minBlue?: number
}

type ColorNumbers = {
    [key: string]: number
}

const colors: ColorNumbers = {
    "red": 12,
    "green": 13,
    "blue": 14
}

function parseLine(line: string, id: number): Game {
    const game: Game = {
        id,
        subsets: []
    }

    const results = line.split(":")[1]

    const subsets = results.split(";")
    console.log(subsets);

    subsets.forEach((subset) => {
        const combinations = subset.split(",")
        const subsetColors: Color[] = []

        combinations.forEach((combination) => {
            const [cubes, color] = combination.trim().split(" ")
            subsetColors.push({
                color,
                cubes: parseInt(cubes)
            })
        })

        game.subsets.push(subsetColors)
    })

    return game
}

async function partOne(file: string) {
    const input = await readInput(file);

    const games: Game[] = []

    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        games.push(parseLine(line, i + 1))
    }

    return games.filter((game) => {
        return game.subsets.every((subset) => {
            return subset.every((color) => {
                return color.cubes <= (colors[color.color] as number)
            })
        })

    }
    ).reduce((acc, curr) => {
        return acc + curr.id
    }, 0)

}

async function partTwo(file: string) {
    const input = await readInput(file);

    const games: Game[] = []

    for (let i = 0; i < input.length; i++) {
        const line = input[i];
        games.push(parseLine(line, i + 1))
    }

    return games.map((game) => {
        game.subsets.forEach((subset) => {
            subset.forEach((color) => {
                if (color.color === "red") {
                    game.minRed = game.minRed ? Math.max(game.minRed, color.cubes) : color.cubes
                } else if (color.color === "green") {
                    game.minGreen = game.minGreen ? Math.max(game.minGreen, color.cubes) : color.cubes
                } else if (color.color === "blue") {
                    game.minBlue = game.minBlue ? Math.max(game.minBlue, color.cubes) : color.cubes
                }
            })
        })

        return game
    }).reduce((acc, curr) => {
        return acc + (curr.minRed! * curr.minGreen! * curr.minBlue!)
    }, 0)
}

console.log(await partTwo("input.txt"));