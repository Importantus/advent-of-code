import { readInput } from "../../helpers/readInput";

const regex = [
    /^(.)\1{4}$/,
    /(.)\1{3}(?!\1)/,
    /(.)\1(.)\2\2|(.)\3\3(.)\4/,
    /.*(.)\1\1.*/,
    /.*(.)\1.*(.)\2.*/,
    /.*(.)\1.*/,
    /.*/
]

interface Game {
    cards: string;
    bet: number;
    score: number;
}

async function parseInput(file: string) {
    const input = await readInput(file);

    const games: Game[] = []

    input.forEach((line) => {
        const [cards, bet] = line.split(/ +/gm)
        games.push({
            cards,
            bet: parseInt(bet),
            score: 0
        })
    })

    return games
}

async function partOne(file: string) {
    const cardMapping: { [key: string]: number } = {
        'A': 13,
        'K': 12,
        'Q': 11,
        'J': 10,
        'T': 9,
        '9': 8,
        '8': 7,
        '7': 6,
        '6': 5,
        '5': 4,
        '4': 3,
        '3': 2,
        '2': 1
    };

    let games = await parseInput(file)

    games.forEach((game) => {
        const cards = game.cards.split("").sort((a, b) => cardMapping[b] - cardMapping[a]).join("")
        console.log(cards)
        const score = regex.findIndex((reg) => reg.test(cards))

        game.score = score === -1 ? 0 : regex.length - score
    })
    return calc(games, cardMapping)
}

async function partTwo(file: string) {
    let games = await parseInput(file)
    const cardMapping: { [key: string]: number } = {
        'A': 13,
        'K': 12,
        'Q': 11,
        'T': 10,
        '9': 9,
        '8': 8,
        '7': 7,
        '6': 6,
        '5': 5,
        '4': 4,
        '3': 3,
        '2': 2,
        'J': 1
    };

    games.forEach((game) => {
        let cards

        if (game.cards.indexOf("J") !== -1) {
            const cardsWithoutJ = game.cards.replaceAll("J", "").split("")
            let mostFreq = cardsWithoutJ.sort((a, b) => cardsWithoutJ.filter(v => v === a).length - cardsWithoutJ.filter(v => v === b).length).pop();
            cards = game.cards.replaceAll("J", (mostFreq || "J") as string).split("")
        } else {
            cards = game.cards.split("")
        }

        const cardsString = cards.sort((a, b) => cardMapping[b] - cardMapping[a]).join("")
        const score = regex.findIndex((reg) => reg.test(cardsString))

        game.score = score === -1 ? 0 : regex.length - score
    }
    )

    return calc(games, cardMapping)
}

async function calc(games: Game[], cardMapping: { [key: string]: number }) {
    games = games.sort((a, b) => {
        if (a.score === b.score) {
            for (let i = 0; i < a.cards.length; i++) {
                if (a.cards[i] !== b.cards[i]) {
                    return cardMapping[b.cards[i]] - cardMapping[a.cards[i]]
                }
            }
        }
        return b.score - a.score
    }).reverse()

    return games.reduce((a, b, index) => a + ((index + 1) * b.bet), 0)
}

console.log(await partTwo("input.txt"))
