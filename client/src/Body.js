import React, { useState } from 'react'

const Body = ({makeBid,HighestBid,getName}) => {
    const[Value,setvalue] = useState("");

    const onchange = (e) => {
        setvalue(e.target.value);
        console.log(e.target.value);
    }

    const onsubmit = (e) => {
        e.preventDefault();
        console.log(Number(Value)*1000000000000000000);
        makeBid(Number(Value)*1000000000000000000);
    };

        return (
        
        <div class="d-flex flex-column bd-highlight mb-3" >
        <div className="h4">Name: Kohinoor Diamond</div>
        <div className="mt-3 h4">Current price : {HighestBid} ETH</div>
        <div className="mt-3 h4">
            <form onSubmit={onsubmit}>
                <label className="">Bid Amount :
                    <input type="text" onChange={onchange} className="ml-5"/>
                </label>
                <input type="submit" value="Submit" className="ml-5"/>
            </form>
        </div>
        </div>
        
    )
}

export default Body
