import React from 'react'

interface Props {

    addToCart: (productId: string) => void;

}


function Counter({ addToCart }: Props) {
    return (
        <div className="flex items-center gap-2">
            <button
                className="bg-red-600 px-2 py-1 rounded text-lg"
                onClick={() => addToCart(product._id, -1)}
            >-</button>
            <span className="px-2">{counter}</span>
            <button
                className="bg-red-600 px-2 py-1 rounded text-lg"
                onClick={() => addToCart(product._id, 1)}
            >+</button>
        </div>
    )
}

export default Counter
