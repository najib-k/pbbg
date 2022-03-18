import React from "react";

export class Channel extends React.Component {

    click = () => {
        console.log("clic!");
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <div className="channel-item" onClick={this.click}>
                <div>{this.props.name} </div>
                <span>{this.props.participants}</span>
            </div>
        )
    }
}