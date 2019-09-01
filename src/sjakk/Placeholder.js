import React, {Component} from 'react';


const placeholderStyle = {
    height: '200px'
};

export class Placeholder extends React.Component {
    render() {
        return (
            <div className="row" style={placeholderStyle}>
                Placeholder
            </div>
        )
    }
}