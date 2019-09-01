import React, {Component} from 'react';
import {Placeholder} from './Placeholder.js'

const chessComUrl = "https://www.chess.com/member/";

const lichessUrl = "https://lichess.org/@/";
const lichessRatingDeviationLimit = 110; // Above 110 is considered provisional by Lichess
const lichessPuzzle = "puzzle";

const view_simple = "simple";
const view_extended = "extended";

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lichessError: null,
            lichessIsLoaded: false,
            lichessRatings: {},

            chessComError: null,
            chessComIsLoaded: false,
            chessComRatings: {},

            view: view_simple,

            name: props.name,
            membershipStatus: props.membershipStatus ? props.membershipStatus : "Medlem",
            lichessPath: props.lichessPath,
            chessComPath: props.chessComPath,
        }
    }

    setPlayerView() {
        if (this.state.view === view_simple) {
            this.setState({view: view_extended});
        } else {
            this.setState({view: view_simple});
        }
    }

    fetchLichessData() {
        if (!this.state.isLoaded) {
            fetch("https://lichess.org/api/user/" + this.state.lichessPath)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            lichessIsLoaded: true,
                            lichessRatings: result.perfs ? result.perfs : {}
                        });
                    },
                    (error) => {
                        this.setState({
                            lichessIsLoaded: true,
                            error
                        })
                    }
                )
        }
    }

    fetchChessComData() {
        if (!this.state.isLoaded) {
            fetch("https://api.chess.com/pub/player/" + this.state.chessComPath + "/stats")
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
                        this.setState({
                            chessComIsLoaded: true,
                            chessComRatings: Object.entries(result).map(([type, rating]) => {
                                if (type in ["chess_blitz", "chess_bullet", "chess_rapid"]) {
                                    let typeName = type.substr(type.charAt("_"));
                                    return {typeName: rating.last}
                                } else {
                                    return null;
                                }
                            })
                        });
                    },
                    (error) => {
                        this.setState({
                            chessComIsLoaded: true,
                            error
                        })
                    }
                )
        }
    }

    handleShowPlayerDetails() {
        this.setPlayerView();
        this.fetchLichessData();
        this.fetchChessComData();
    }


    returnBestPerfLichess(perfs) {
        let bestPerf = {type: null, rating: 0};
        Object.entries(perfs).forEach(function ([type, perf]) {
            if (type !== lichessPuzzle &&
                perf.rd < lichessRatingDeviationLimit &&
                perf.rating > bestPerf.rating) {
                bestPerf = {type: type, rating: perf.rating};
            }
        });

        return bestPerf;
    }

    renderLichessRatings(perfs) {
        let bestPerf = this.returnBestPerfLichess(perfs).type;
        return Object.entries(perfs).map(([type, perf]) => {
            if (perf.rd < lichessRatingDeviationLimit && type !== lichessPuzzle) {
                let className = bestPerf === type ? "best-rating" : "";
                return (
                    <div key={type} className={className}>
                        {type.substr(0, 1).toUpperCase() + type.substr(1)}: {perf.rating}
                    </div>
                )
            } else {
                return null;
            }
        })
    }

    renderChessComRatings(perfs) {
        // let bestPerf = this.returnBestPerfLichess(perfs).type;
        // return Object.entries(perfs).map(([type, perf]) => {
        //     if (perf.rd < lichessRatingDeviationLimit && type != lichessPuzzle) {
        //         // let className = bestPerf === type ? "best-rating" : "";
        //         return (
        //             <div key={type} className={className}>
        //                 {type.substr(0, 1).toUpperCase() + type.substr(1)}: {perf.rating}
        //             </div>
        //         )
        //     }
        // })

        console.log(perfs);

        return "";
    }

    render() {
        let playerCardClassName = "player-card";
        if (this.state.membershipStatus === "President") {
            playerCardClassName += " player-president";
        }

        let viewExtended;
        if (this.state.view === view_extended) {
            viewExtended =
                <div className="player-details">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <a href={lichessUrl + this.state.lichessPath}>Lichess:</a>
                            {this.renderLichessRatings(this.state.lichessRatings)}
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <a href={chessComUrl + this.state.chessComPath}>Chess.com:</a>
                            {this.renderChessComRatings(this.state.chessComRatings)}
                        </div>
                    </div>
                </div>;
        }

        let buttonName = this.state.view === view_extended ? "Vis mindre" : "Vis mer";
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
                                <Player id="erik" name={"Erik Hofsø Knudsen"} lichessPath={"Hoeggern"}
                                        chessComPath={"erikhk"}/>
                                <Player id="audun" name={"Audun Melting Kvalbein"} lichessPath={"Kaffeleif"}
                                        chessComPath={"kaffeleif"}/>
                            </div>
                            <div className="col-md-4 height-cards-3">
                                <Player id="emil" name={"Emil Sandbakken"} lichessPath={"eiegod"}
                                        chessComPath={"eiegod"}
                                        membershipStatus={"President"}/>
                                <Player id="thomas" name={"Thomas Luis Aasen"} lichessPath={"Klossmajoren"}
                                        chessComPath={"tullefanten"}/>
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

export class PlayersView extends React.Component {
    render() {
        return (<Players/>)
    }
}