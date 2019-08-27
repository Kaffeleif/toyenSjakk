import React, {Component} from 'react';
import './App.css';
import { Button } from 'reactstrap';

const lichessUrl = "https://lichess.org/@/";
const lichessRatingDeviationLimit = 110; // Above 110 is considered provisional by Lichess

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            lichessRating: [],

            name: props.name,
            lichessPath: props.lichessPath,
            chessComPath: props.chessComPath
        }
    }

    returnBestPerfLichess(perfs) {
        console.log(perfs);

        let bestPerf = {type: null, rating: 0};
        Object.values(perfs).forEach(function(perf) {
           if (perf.rd < lichessRatingDeviationLimit && perf.rating > bestPerf.rating ) {
               bestPerf = perf;
           }
        });

        return bestPerf;
    }

    componentDidMount() {
        fetch("https://lichess.org/api/user/" + this.state.lichessPath)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        lichessRating: result.perfs ? result.perfs.blitz : {rating: null}
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    render() {
        return (
                <div className="player-card">
                    <h3>{this.state.name}</h3>
                    <div>
                        <small>
                            <a href={lichessUrl + this.state.lichessPath}>Lichess: {this.state.lichessRating.rating }</a>
                        </small>
                    </div>
                </div>
            );
    }
}

class Players extends React.Component {

    render() {
        return (
            <div id="Players">
                <header className="App-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h1>Spillere</h1>
                            </div>
                        </div>

                        <Placeholder/>

                        <div className="row player-card-group">
                            <div className="col-md-4 height-cards-2">
                                <Player name={"Erik Hofsø Knudsen"} lichessPath={"Hoeggern"}/>
                                <Player name={"Audun Melting Kvalbein"} lichessPath={"Kaffeleif"}/>
                            </div>
                            <div className="col-md-4 height-cards-3">
                                <Player name={"Emil Sandbakken"} lichessPath={"eiegod"}/>
                                <Player name={"Thomas Luis Aasen"} lichessPath={"Klossmajoren"}/>
                                <Player name={"Henrik Thomassen"}/>
                            </div>
                            <div className="col-md-4 height-cards-2">
                                <Player name={"Yani Nait-Aissa"}/>
                                <Player name={"Ivar Wolden"}/>
                            </div>
                        </div>
                    </div>

                </header>
            </div>
        );
    }
}

const placeholderStyle = {
    height: '200px'
};

class Placeholder extends React.Component {
    render() {
        return (
            <div className="row" style={placeholderStyle}>
                Placeholder
            </div>
        )
    }
}

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Tøyen Sjakklubb</h1>

                    <div className="Main-nav">
                        <button className="Main-nav-btn">Spillere</button>
                        <button className="Main-nav-btn">Turnering</button>
                        <button className="Main-nav-btn">Ranking</button>
                    </div>

                </header>
            </div>
        );
    }
}

// export default App;
export default Players;
