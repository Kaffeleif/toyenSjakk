import React, {Component} from 'react';
import './App.css';
import {PlayersView} from './sjakk/Players.js'
import {Placeholder} from './sjakk/Placeholder.js'
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

function MainPage() {
    return (
        <div>
            <h1>Tøyen Sjakklubb</h1>
            <div className="Main-nav">
                <Link to="/spillere" className="Main-nav-btn">Spillere</Link>
                <Link to="/turnering" className="Main-nav-btn">Turnering</Link>
                <Link to="/ranking" className="Main-nav-btn">Ranking</Link>
            </div>
        </div>
    );
}

function NoMatch({ location }) {
        return (
            <div>
                <Placeholder/>
                <h1>
                    Sorry, page <code>{location.pathname}</code> not found
                </h1>

                <div className="Main-nav">
                    <Link to="/" className="Main-nav-btn">To main page</Link>
                </div>
            </div>
        );

}

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <Switch>
                            <Route exact path="/" component={MainPage}/>
                            <Route exact path="/spillere" component={PlayersView}/>
                            <Route component={NoMatch}/>
                        </Switch>
                    </header>
                </div>
            </Router>
        );
    }
}

export default App;
