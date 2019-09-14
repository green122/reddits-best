import React, { useContext } from 'react'
import { StateContext } from '../../App'

export default function RedditDetails(props: any) {
    const {state} = useContext(StateContext);
    console.log(props, state);
    return (
        <div>
            
        </div>
    )
}
