import React, {Component} from 'react';
import {lichessRatingDeviationLimit} from '../lichess/LichessService.js'

const chessComApiUrl = "https://api.chess.com/pub/player/";
const chessComRatingDeviationLimit = lichessRatingDeviationLimit; // Chess.com uses rating deviation, but doesn't say when it is considered 'good'/stable, so we reuse Lichess' limit


export function  fetchChessComData(player) {
    if (!player.state.chessComIsLoaded) {
        fetch(chessComApiUrl + player.state.chessComPath + "/stats")
            .then(res => res.json())
            .then(
                (result) => {
                    player.setState({
                        chessComIsLoaded: true,
                        chessComRatings: Object.fromEntries(Object.entries(result).map(([type, rating]) => {
                            if (["chess_blitz", "chess_bullet", "chess_rapid"].includes(type)) {
                                let typeName = type.substr(type.charAt("_"));
                                return [typeName, rating.last];
                            }
                        }).filter(Boolean))
                    });
                },
                (error) => {
                    player.setState({
                        chessComIsLoaded: true,
                        error
                    })
                }
            )
    }
}

export function bestPerfChessCom(perfs) {
    let bestPerf = {type: null, rating: 0};
    Object.entries(perfs).forEach(function ([type, perf]) {
        if (["chess_blitz", "chess_bullet", "chess_rapid"].includes(type) &&
            perf.rd < chessComRatingDeviationLimit &&
            perf.rating > bestPerf.rating) {
            bestPerf = {type: type, rating: perf.rating};
        }
    });

    return bestPerf;
}

