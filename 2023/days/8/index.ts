import { getLCM } from "../../helpers/lcm";
import { readInput } from "../../helpers/readInput";


async function parseInput(file: string) {
    const instructions: number[] = []
    const nodes: { [key: string]: string[] } = {}

    const input = await readInput(file);

    while (input.length > 0 && input[0] !== "") {
        const line = input.shift()
        if (line === undefined) continue
        instructions.push(...(line?.split("") || []).map((char) => char === "L" ? 0 : 1))
    }

    while (input.length > 0) {
        const [node, children] = input.shift()?.split(/ += +/gm) || []
        if (node === undefined || children === undefined) continue
        nodes[node] = children.replaceAll(/\(|\)/gm, "").split(/, /gm)
    }

    return { instructions, nodes }
}

async function partOne(file: string) {
    const input = await parseInput(file);
    const instructions = input.instructions
    const nodes = input.nodes

    let result = 0
    let index = 0

    let nextNode: string = "AAA"

    while (nextNode !== "ZZZ") {
        const instruction = instructions[index]

        console.log(nextNode, instruction)

        nextNode = nodes[nextNode][instruction]
        result++

        index = (index + 1) % instructions.length
    }

    return result
}

async function partTwo(file: string) {
    const input = await parseInput(file);
    const instructions = input.instructions
    const nodes = input.nodes

    let stepsToFirstZ: number[] = []

    let nextNodes: string[]

    nextNodes = Object.keys(nodes).filter((node) => node.endsWith("A"))

    for (let nextNode of nextNodes) {
        let result = 0
        let index = 0
        while (!nextNode.endsWith("Z")) {
            const instruction = instructions[index]

            nextNode = nodes[nextNode][instruction]
            result++

            index = (index + 1) % instructions.length
        }
        stepsToFirstZ.push(result)
    }
    console.log(stepsToFirstZ)
    return getLCM(stepsToFirstZ)
}
console.log(await partTwo("input.txt"))