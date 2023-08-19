// helpers.spec.js
import { describe, test, expect } from 'vitest'
import { increment } from './helper'

// concurrent 并发运行
describe.concurrent('increment', () => {
    test('increments the current number by 1', () => {
        expect(increment(0, 10)).toBe(1)
    })

    test('does not increment the current number over the max', () => {
        expect(increment(10, 10)).toBe(10)
    })

    test('has a default max of 10', () => {
        expect(increment(10, 10)).toBe(10)
    })
})
