import React from 'react'

const Body2 = ({endBid}) => {

    function sayHello() {
        endBid();
    }

    return (
        <div>
            <button onClick={sayHello} className="mt-4 ml-5 h5">End bid</button>    
        </div>
    )
}

export default Body2
