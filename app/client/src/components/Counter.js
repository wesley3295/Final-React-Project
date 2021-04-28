import React from 'react'
import Button from "@material-ui/core/Button";
import {useState} from 'react'

const Counter = () => {
    const [counter,setCounter]=useState(0)

const upVote=()=>{
  setCounter(counter + 1)
}

const downVote=()=>{
  setCounter(counter - 1)
}
    return (
        <div>
            {counter}
                  <Button onClick={upVote} >+</Button>
                  <Button onClick={downVote} >-</Button>
        </div>
    )
}

export default Counter
