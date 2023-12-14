import { readInput } from "../../helpers/readInput";

async function partOne(file: string) {
    const input = await readInput(file)
    const lines = input.map((line) => line.split(""))

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i]

        for (let j = 0; j < line.length; j++) {
            const letter = line[j]

            if (letter === "O") {
                line[j] = "."
                for (let k = i - 1; k >= 0; k--) {
                    const aboveLetter = lines[k][j]
                    if (aboveLetter === "#" || aboveLetter === "O") {
                        lines[k + 1][j] = "O"
                        break
                    }

                    if (k === 0) {
                        lines[k][j] = "O"
                    }
                }
            }
        }
    }

    // console.log(lines.map((line) => line.join("")).join("\n"))

    let total = 0
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const count = line.filter((letter) => letter === "O").length
        total += count * (lines.length - i)
    }

    return total
}

console.log(await partOne("input.txt"))