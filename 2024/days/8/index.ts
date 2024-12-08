import { readInput } from "../../helpers/readInput";

type Coordinates = {
    x: number,
    y: number
}

type Antenna = {
    freq: string,
    coordinates: Coordinates
}

type Antinode = {
    antennas: Antenna[],
    coordinates: Coordinates
}

async function partOne(file: string) {
    const input = await readInput(file);

    let maxX = input[0].length
    let maxY = input.length

    const antennas: Antenna[] = []
    const antinodes: Antinode[] = []

    for (let i = 0; i < input.length; i++) {
        const line = input[i]
        for (let j = 0; j < line.length; j++) {
            const char = line[j]
            if (char !== ".") {
                const antenna = {
                    freq: char,
                    coordinates: {
                        x: j,
                        y: i
                    }
                }

                const matchingAntennas = antennas.filter((antenna) => antenna.freq === char)

                for (let k = 0; k < matchingAntennas.length; k++) {
                    const matchingAntenna = matchingAntennas[k]

                    const localAntinodes = [
                        {
                            antennas: [antenna, matchingAntenna],
                            coordinates: {
                                x: matchingAntenna.coordinates.x - (antenna.coordinates.x - matchingAntenna.coordinates.x),
                                y: matchingAntenna.coordinates.y - (antenna.coordinates.y - matchingAntenna.coordinates.y)
                            }
                        },
                        {
                            antennas: [antenna, matchingAntenna],
                            coordinates: {
                                x: (antenna.coordinates.x - matchingAntenna.coordinates.x) + antenna.coordinates.x,
                                y: (antenna.coordinates.y - matchingAntenna.coordinates.y) + antenna.coordinates.y
                            }
                        }
                    ]

                    localAntinodes.filter((antinode) => {
                        return !antinodes.some((existingAntinode) => {
                            return existingAntinode.coordinates.x === antinode.coordinates.x && existingAntinode.coordinates.y === antinode.coordinates.y
                        })
                    }).forEach((antinode) => {
                        antinodes.push(antinode)
                    })
                }

                antennas.push(antenna)
            }
        }
    }

    const filteredAntinodes = antinodes.filter((antinode) => {
        return antinode.coordinates.x >= 0 && antinode.coordinates.x < maxX && antinode.coordinates.y >= 0 && antinode.coordinates.y < maxY
    })

    // console.log(filteredAntinodes)
    render(maxX, maxY, filteredAntinodes)

    return filteredAntinodes.length
}

async function partTwo(file: string) {
    const input = await readInput(file);

    let maxX = input[0].length
    let maxY = input.length

    const antennas: Antenna[] = []
    const antinodes: Antinode[] = []

    for (let i = 0; i < input.length; i++) {
        const line = input[i]
        for (let j = 0; j < line.length; j++) {
            const char = line[j]
            if (char !== ".") {
                const antenna = {
                    freq: char,
                    coordinates: {
                        x: j,
                        y: i
                    }
                }

                const matchingAntennas = antennas.filter((antenna) => antenna.freq === char)

                for (let k = 0; k < matchingAntennas.length; k++) {
                    const matchingAntenna = matchingAntennas[k]

                    const diffX = antenna.coordinates.x - matchingAntenna.coordinates.x
                    const diffY = antenna.coordinates.y - matchingAntenna.coordinates.y

                    const localAntinodes = []

                    let x1 = matchingAntenna.coordinates.x
                    let y1 = matchingAntenna.coordinates.y
                    while (x1 < maxX && x1 >= 0 && y1 < maxY && y1 >= 0) {
                        localAntinodes.push({
                            antennas: [antenna, matchingAntenna],
                            coordinates: {
                                x: x1,
                                y: y1
                            }
                        })
                        x1 += diffX
                        y1 += diffY
                    }

                    let x2 = antenna.coordinates.x
                    let y2 = antenna.coordinates.y
                    while (x2 < maxX && x2 >= 0 && y2 < maxY && y2 >= 0) {
                        localAntinodes.push({
                            antennas: [antenna, matchingAntenna],
                            coordinates: {
                                x: x2,
                                y: y2
                            }
                        })
                        x2 -= diffX
                        y2 -= diffY
                    }


                    localAntinodes.forEach((antinode) => {
                        antinodes.push(antinode)
                    })
                }

                antennas.push(antenna)
            }
        }
    }

    const filteredAntinodes = antinodes.filter((antinode, index) => {
        return antinode.coordinates.x >= 0 && antinode.coordinates.x < maxX && antinode.coordinates.y >= 0 && antinode.coordinates.y < maxY && onlyUnique(antinode, index, antinodes)
    })

    console.log(filteredAntinodes)
    render(maxX, maxY, filteredAntinodes)

    return filteredAntinodes.length
}

function onlyUnique(value: Antinode, index: number, array: Antinode[]) {
    const antinode = array.find((antinode) => antinode.coordinates.x === value.coordinates.x && antinode.coordinates.y === value.coordinates.y)
    if (!antinode) return true
    return array.indexOf(antinode) === index;
}

function render(maxX: number, maxY: number, antinodes: Antinode[]) {
    const grid = Array.from({ length: maxY }, () => Array.from({ length: maxX }, () => "."))

    antinodes.forEach((antinode) => {
        grid[antinode.coordinates.y][antinode.coordinates.x] = antinode.antennas[0].freq
    })

    console.log(grid.map((line) => line.join("")).join("\n"))
}

console.log(await partTwo("input.txt"));