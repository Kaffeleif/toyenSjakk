import React, {Component} from 'react';
import './App.css';
import { Button } from 'reactstrap';

class Spiller extends Component {
    render() {
        const { name } = this.props;

        return (
                <div className="player-card">
                    <h3>{name}</h3>
                    <div>Medlem</div>
                </div>
            );
    }
}

class Spillere extends Component {
    render() {
        return (
            <div id="Spillere">
                <header className="App-header">
                    <h1>Spillere</h1>

                    <div className="row">
                        <div className="col-md-4 height-cards-2">
                            <Spiller name={"Erik Hofsø Knudsen"}/>
                            <Spiller name={"Audun Melting Kvalbein"}/>
                        </div>
                        <div className="col-md-4 height-cards-3">
                            <Spiller name={"Emil Sandbakken"}/>
                            <Spiller name={"Thoimas Luis Aasen"}/>
                            <Spiller name={"Henrik Thomassen"}/>
                        </div>
                        <div className="col-md-4 height-cards-2">
                            <Spiller name={"Yani Nait-Aissa"}/>
                            <Spiller name={"Ivar Wolden"}/>
                        </div>
                    </div>

                </header>
            </div>
        );
    }
}

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Tøyen Sjakklubb</h1>

                    <div className="Main-nav">
                        <button className="Main-nav-btn">
                            <i className="fa fa-camera-retro fa-3x">T</i>
                            Spillere
                        </button>
                        <button className="Main-nav-btn">Turnering</button>
                        <button className="Main-nav-btn">Ranking</button>
                    </div>

                </header>
            </div>
        );
    }
}

export default Spillere;
