import React, {Component} from 'react';
import './App.css';
import {Button} from 'reactstrap';

const lichessUrl = "https://lichess.org/@/";
const lichessRatingDeviationLimit = 110; // Above 110 is considered provisional by Lichess
const view_simple = "simple";
const view_extended = "extended";

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            lichessRating: [],
            view: view_simple,

            name: props.name,
            membershipStatus: props.membershipStatus ? props.membershipStatus : "Medlem",
            lichessPath: props.lichessPath,
            chessComPath: props.chessComPath,
        }
    }

    setPlayerView() {
        if (this.state.view == view_simple) {
            this.setState({view: view_extended});
        } else {
            this.setState({view: view_simple});
        }
    }

    handleShowPlayerDetails() {
        this.setPlayerView();

        if (!this.state.isLoaded) {
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
    }


    returnBestPerfLichess(perfs) {
        console.log(perfs);

        let bestPerf = {type: null, rating: 0};
        Object.values(perfs).forEach(function (perf) {
            if (perf.rd < lichessRatingDeviationLimit && perf.rating > bestPerf.rating) {
                bestPerf = perf;
            }
        });

        return bestPerf;
    }

    render() {
        let playerCardClassName = "player-card";
        if (this.state.membershipStatus == "President") {
            playerCardClassName += " player-president";
        }

        let viewExtended;
        if (this.state.view == view_extended) {
            viewExtended = <div className="player-details">
                <a href={lichessUrl + this.state.lichessPath}>Lichess: {this.state.lichessRating.rating}</a>
            </div>;
        }

        let buttonName = this.state.view == view_extended ? "Vis mindre" : "Vis mer";
        let viewExtendedButton = <div>
            <span className="show-player-details" onClick={() => this.handleShowPlayerDetails()}>{buttonName}</span>
        </div>;

        return (
            <div className={playerCardClassName}>
                <h3>{this.state.name}</h3>
                <h5>{this.state.membershipStatus}</h5>
                {viewExtended}
                {viewExtendedButton}
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
                                <Player id="erik" name={"Erik Hofsø Knudsen"} lichessPath={"Hoeggern"}/>
                                <Player id="audun" name={"Audun Melting Kvalbein"} lichessPath={"Kaffeleif"}/>
                            </div>
                            <div className="col-md-4 height-cards-3">
                                <Player id="emil" name={"Emil Sandbakken"} lichessPath={"eiegod"}
                                        membershipStatus={"President"}/>
                                <Player id="thomas" name={"Thomas Luis Aasen"} lichessPath={"Klossmajoren"}/>
                                <Player id="henrik" name={"Henrik Thomassen"}/>
                            </div>
                            <div className="col-md-4 height-cards-2">
                                <Player id="yani" name={"Yani Nait-Aissa"}/>
                                <Player id="ivar" name={"Ivar Wolden"}/>
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
