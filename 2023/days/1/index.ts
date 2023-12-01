import { readInput } from "../../helpers/readInput";

function partOne(input: string[]): number {
    const numbers: number[] = []

    input.forEach((line) => {
        const firstNumber = line.split("").find((char) => char.match(/[0-9]/));
        const lastNumber = line.split("").reverse().find((char) => char.match(/[0-9]/));

        numbers.push(parseInt(firstNumber! + lastNumber))
    })

    return numbers.reduce((acc, curr) => acc + curr, 0);
}

async function partTwo(file: string) {
    const input = await readInput(file);
    const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    const regex = new RegExp(`${numbers.join("|")}`)

    const result = input.map((line) => {
        let match = regex.exec(line)

        while (match && match[0]) {
            const firstMatch = match[0]
            line = line.replace(firstMatch, firstMatch[0] + (numbers.indexOf(firstMatch) + 1).toString() + firstMatch[firstMatch.length - 1])
            match = regex.exec(line)
        }

        return line
    })

    return partOne(result);
}

console.log(await partTwo("example.txt"));
console.log(await partTwo("input.txt"));