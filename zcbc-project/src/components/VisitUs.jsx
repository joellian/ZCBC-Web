import React from "react";
import VisitInfo from "./VisitInfo";
//pass all of the h1-h5 texts as props from VisitInfo

const VisitUs = () => {
    return (
        <div ClassName="VisitUs">
            <h1> LOCATED IN NORTHERN KENTUCKY </h1>
            <h3> You can get directions to our Church below </h3>
            <h1> OUR ADDRESS </h1>
            <h3> Zion Chin Baptist Church</h3>
            <h3> 213 Main Street </h3>
            <h3> Florence, KY 41042 </h3>
            <VisitInfo />
            <h1> SUNDAY GATHERING TIMES </h1>
            <h3> Sunday School </h3>
            <h4> 12:00 PM to 2:00 PM </h4>
            <h3> The Chapel Service </h3>
            <h4> 2:00 PM to 4:00 PM</h4>
            
            

        </div>

    )
}

export default VisitUs;

