import { readInput } from "../../helpers/readInput";

interface Card {
    id: number,
    winningNumbers: number[],
    yourNumbers: number[],
    copies?: number
}

async function parseInput(file: string) {
    const input = await readInput(file);

    const cards: Card[] = []

    input.forEach((line, index) => {
        const [name, numbers] = line.split(/: +/gm)
        const [winningNumbers, yourNumbers] = numbers.split(/ +\| +/gm)

        cards.push({
            id: parseInt(name.split(/ +/gm)[1]),
            winningNumbers: winningNumbers.split(/ +/gm).map((number) => parseInt(number.trim())),
            yourNumbers: yourNumbers.split(/ +/gm).map((number) => parseInt(number.trim())),
            copies: 1
        })
    })

    return cards
}

function calculatePoints(winningNumbers: number[], yourNumbers: number[]) {
    const result = yourNumbers.filter((number) => winningNumbers.includes(number))

    return result.reduce((acc, _) => {
        if (acc === 0) {
            return acc + 1
        } else {
            return acc * 2
        }
    }, 0)
}

async function partOne(file: string) {
    const cards = await parseInput(file);

    return cards.map((card) => {
        return {
            id: card.id,
            points: calculatePoints(card.winningNumbers, card.yourNumbers)
        }
    }).reduce((acc, curr) => acc + curr.points, 0)
}

async function partTwo(file: string) {
    const cards = await parseInput(file);

    cards.forEach((card) => {
        for (let i = 1; i <= card.copies!; i++) {
            const points = card.yourNumbers.filter((number) => card.winningNumbers.includes(number)).length
            for (let x = 1; x <= points; x++) {
                const temp = cards.find((c) => c.id === card.id + x)
                if (temp) {
                    temp.copies!++
                }
            }
        }
    })

    return cards.reduce((acc, curr) => {
        return acc + curr.copies!
    }, 0)
}

console.log(await partTwo("input.txt"));