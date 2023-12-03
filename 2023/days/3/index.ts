import { getgroups } from "process";
import { readInput } from "../../helpers/readInput";

interface SymbolOrNumber {
    index: number,
    number: string
    line: number
    numbers?: Set<SymbolOrNumber>
}

function parseLine(line: string, index: number, regex: RegExp) {
    const result: SymbolOrNumber[] = []

    let match = regex.exec(line)
    while (match && match[0]) {
        result.push({
            index: match.index,
            number: match[0],
            line: index
        })
        line = line.replace(match[0], "X".repeat(match[0].length))
        match = regex.exec(line)
    }

    return result
}

function indexToArray(input: SymbolOrNumber) {
    const indexArray = []
    for (let i = 0; i < input.number.length; i++) {
        indexArray.push(input.index + i)
    }
    return indexArray
}

async function partOne(file: string) {
    const input = await readInput(file);

    const numbers: SymbolOrNumber[] = []
    const symbols: SymbolOrNumber[] = []

    input.forEach((line, index) => {
        const regex = /[0-9]+/g

        numbers.push(...parseLine(line, index, regex))
    })

    input.forEach((line, index) => {
        const regex = /[^0-9.]+/g

        symbols.push(...parseLine(line, index, regex))
    })

    const result: Set<SymbolOrNumber> = new Set()

    symbols.forEach((symbol) => {
        const tl = [symbol.index - 1, symbol.line - 1]
        const t = [symbol.index, symbol.line - 1]
        const tr = [symbol.index + 1, symbol.line - 1]
        const l = [symbol.index - 1, symbol.line]
        const c = [symbol.index, symbol.line]
        const r = [symbol.index + 1, symbol.line]
        const bl = [symbol.index - 1, symbol.line + 1]
        const b = [symbol.index, symbol.line + 1]
        const br = [symbol.index + 1, symbol.line + 1]

        const neighbors = [tl, t, tr, l, c, r, bl, b, br]

        neighbors.forEach((neighbor) => {
            const found = numbers.find((number) => indexToArray(number).includes(neighbor[0]) && number.line === neighbor[1])
            if (found) {
                result.add(found)
            }
        })
    })

    return Array.from(result).reduce((acc, curr) => {
        return acc + parseInt(curr.number)
    }, 0)
}

async function partTwo(file: string) {
    const input = await readInput(file);

    const numbers: SymbolOrNumber[] = []
    const symbols: SymbolOrNumber[] = []

    input.forEach((line, index) => {
        const regex = /[0-9]+/g

        numbers.push(...parseLine(line, index, regex))
    })

    input.forEach((line, index) => {
        const regex = /[\*]/g

        symbols.push(...parseLine(line, index, regex))
    })

    const result: SymbolOrNumber[] = []

    symbols.forEach((symbol) => {
        const tl = [symbol.index - 1, symbol.line - 1]
        const t = [symbol.index, symbol.line - 1]
        const tr = [symbol.index + 1, symbol.line - 1]
        const l = [symbol.index - 1, symbol.line]
        const c = [symbol.index, symbol.line]
        const r = [symbol.index + 1, symbol.line]
        const bl = [symbol.index - 1, symbol.line + 1]
        const b = [symbol.index, symbol.line + 1]
        const br = [symbol.index + 1, symbol.line + 1]

        const neighbors = [tl, t, tr, l, c, r, bl, b, br]

        neighbors.forEach((neighbor) => {
            const found = numbers.find((number) => indexToArray(number).includes(neighbor[0]) && number.line === neighbor[1])
            if (found) {
                if (!symbol.numbers) {
                    symbol.numbers = new Set()
                }
                symbol.numbers.add(found)
            }
        })

        if (symbol.numbers?.size === 2) {
            result.push(symbol)
        }
    })

    return result.reduce((acc, curr) => {
        return acc + Array.from(curr.numbers!).reduce((acc, curr) => acc * parseInt(curr.number), 1)
    }, 0)
}

console.log(await partTwo("input.txt"));

