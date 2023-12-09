import { readInput } from "../../helpers/readInput";

async function parseInput(file: string): Promise<number[][]> {
    const input = await readInput(file);

    return input.map((line) => line.split(/ +/gm)).map((line) => line.map((number) => parseInt(number.trim())))
}

async function partOneAndTwo(file: string) {
    const input = await parseInput(file);
    let resultPartOne = 0
    let resultPartTwo = 0

    for (let line of input) {
        let lines = [line]

        while (true) {
            let nextLine = []
            for (let i = 0; i < line.length - 1; i++) {
                nextLine.push(line[i + 1] - line[i])
            }

            line = nextLine

            lines.push(line)

            if (nextLine.every((number) => number === 0)) {
                break
            }
        }

        let last = 0
        let first = 0


        lines = lines.reverse()
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i]
            last = line[line.length - 1] + last

            first = line[0] - first
        }

        resultPartOne += last
        resultPartTwo += first
    }

    return [resultPartOne, resultPartTwo]
}

console.log(await partOneAndTwo("input.txt"))