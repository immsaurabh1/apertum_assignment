import React from "react";
import "./style.css"

export default function (props) {
    return <div className="card-container">
        <div>
            <span> Name</span>
            {`${props.firstName} ${props.lastName}`}
        </div>
        <div><span>Age</span> {props.age}</div>
        <div><span>Account ID</span> {props.accountId}</div>
    </div>
}