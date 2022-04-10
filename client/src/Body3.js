import React, { useState } from 'react'

const Body3 = ({setuser}) => {
    const[Value,setvalue] = useState("");

    const onchange = (e) => {
        setvalue(e.target.value);
        console.log(e.target.value);
    }

    const onsubmit = (e) => {
        e.preventDefault();
        setuser(Value);
    };

    return (
        <div class="d-flex flex-column bd-highlight mb-3">
        
        <div className="mt-3 ml-5 h5">Make a Bid</div>
        <div className="mt-3 h5">
            <form onSubmit={onsubmit}>
                <label className="ml-5">Name :
                    <input type="text" onChange={onchange} className="ml-5"/>
                </label>
                <input type="submit" value="Submit" className="ml-5"/>
            </form>
        </div>
        </div>
    )
}

export default Body3
