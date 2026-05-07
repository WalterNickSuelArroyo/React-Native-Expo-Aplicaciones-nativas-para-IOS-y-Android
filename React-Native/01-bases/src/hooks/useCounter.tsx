import { useState } from "react"

export const useCounter = () => {
    const [count, setCount] = useState<number>(10)

    const increaseBy = (value: number) => {
        setCount(Math.max(count + value, 0))
    }

    return {
        count,
        increaseBy
    }
}