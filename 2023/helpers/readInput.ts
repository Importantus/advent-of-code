export async function readInput(file: string): Promise<string[]> {
    const fileType = Bun.file(file)
    const text = await fileType.text()
    return text.trim().split("\n");
}