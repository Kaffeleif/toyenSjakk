import React, {Component} from 'react';

const lichessApiUrl = "https://lichess.org/api/user/";
export const lichessRatingDeviationLimit = 110; // Above 110 is considered provisional by Lichess
const lichessPuzzle = "puzzle";

export function fetchLichessData(player) {
    if (!player.state.lichessIsLoaded) {
        fetch(lichessApiUrl + player.state.lichessPath)
            .then(res => res.json())
            .then(
                (result) => {
                    player.setState({
                        lichessIsLoaded: true,
                        lichessRatings: result.perfs ? result.perfs : {}
                    });
                },
                (error) => {
                    player.setState({
                        lichessIsLoaded: true,
                        error
                    })
                }
            )
    }
}

export function returnBestPerfLichess(perfs) {
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