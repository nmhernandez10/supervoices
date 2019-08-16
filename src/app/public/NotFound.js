import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { FormattedMessage } from 'react-intl';

export default class NotFound extends Component {

    state = {
        app: false
    }

    toApp = () => {
        this.setState({
            app: true
        });
    }

    componentDidMount() {
        document.dispatchEvent(new Event('component'));
    }

    render() {

        if (JSON.parse(localStorage.getItem('loggeduser')) != null) {
            return <Redirect to='/session' />;
        }
        else if (this.state.app) {
            return <Redirect to='/' />;
        }

        return (
            <div className="nfcontent">

                <div className="sessionmain">

                    <nav>
                        <div className="nav-wrapper pink darken-4">
                            <div className="row">
                                <div className="col s12">
                                    <a href="#" className="brand-logo center">SPACEBEAT</a>
                                    <ul className="right hide-on-med-and-down">

                                        <li><a href="#action" onClick={this.toApp}><FormattedMessage id="Home" /></a></li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <div className="row section center">

                        <h2><FormattedMessage id="PNF" /></h2>

                    </div>

                </div>

                <footer className="page-footer pink darken-4">
                    <div className="container">
                        <div className="row">
                            <div className="col l6 s12">
                                <p style={{ "fontSize": "25px" }} className="white-text"><FormattedMessage id="FM1" /></p>
                                <p className="grey-text text-lighten-4"><FormattedMessage id="FM2" /></p>
                            </div>
                            <div className="col l4 offset-l2 s12">
                                <p style={{ "fontSize": "25px" }} className="white-text"><FormattedMessage id="MadeBy" /></p>
                                <ul>
                                    <li><a className="grey-text text-lighten-3" href="#!">Sebastian Benítez</a></li>
                                    <li><a className="grey-text text-lighten-3" href="#!">Diego Ramos</a></li>
                                    <li><a className="grey-text text-lighten-3" href="#!">Nicolás Hernández</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        <div className="container">
                            © 2019 Copyright Text
            <a className="grey-text text-lighten-4 right" href="#" onClick={this.toApp}><FormattedMessage id="Home" /></a>
                        </div>
                    </div>
                </footer>

            </div>
        )
    }
}
