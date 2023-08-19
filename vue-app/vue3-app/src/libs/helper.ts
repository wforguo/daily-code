// helpers.js
export function increment(current: number, max = 10): number {
    if (current < max) {
        return current + 1
    }
    return current
}
