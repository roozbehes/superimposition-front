import React from "react";
import {ThreeDots} from "react-loading-icons";

class Loading extends React.Component{
    render(){
        return (
            <div style={styleobj}>
                <ThreeDots width="100%" height="50" fill="#4287f5" style={{display: "fixed", marginTop:"20%"}}/>
            </div>
        );
    }

}

const styleobj = {
    position: 'fixed',
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor:` rgba(153, 180, 207, 0.1)`
}


export default Loading;