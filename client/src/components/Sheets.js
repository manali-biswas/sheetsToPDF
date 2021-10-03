import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

// todo: use bootstrap

const SheetItem = props => {
    return (
        <p>
            <Button variant="outline-light" onClick={(() => props.updateSpreadsheetId(props.sheet.id))}>{props.sheet.name}</Button>
        </p>
    );
}

class SheetList extends Component{
    

    render() {
        if (this.props.loading) {
            return (
                <Loading />
            );
        }
        else {
            const sheetViews = this.props.sheets.map((sheet) => {
                return (<SheetItem sheet={sheet} updateSpreadsheetId={ this.props.updateSpreadsheetId }/>);
            });
            return (
                <div className="sheets">
                    {sheetViews}
                </div>
            )
        }
    }
}

class Sheets extends Component{
    constructor(props) {
        super(props);

        this.state = {
            url: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log("h");
        console.log(this.props.loggedIn)
        if (this.props.loggedIn)
            this.props.fetchSheets();
    }

    handleChange(event) {
        this.setState({
            url: event.target.value
        });
    }

    handleSubmit(event) {
        this.props.updateSpreadsheetId(this.state.url.match('\\/d\\/(.*?)(\\/|$)')[1]);
        event.preventDefault();
    }

    render() {
        if (this.props.userLoading) {
            return (
                <Loading/>
            )
        }
        else if (this.props.loggedIn) {
            return (
                <div>
                    <i>{this.props.userText}!</i>
                    <br/>
                    <h3>Now you can create PDF from your Google Sheet</h3>
                    <br/>
                    <p>Select your Sheet</p>
                    <SheetList loading={this.props.sheetsLoading}
                        sheets={this.props.sheets}
                        updateSpreadsheetId={this.props.updateSpreadsheetId}
                    />
                    <p>- OR -</p>
                    <p>Copy the URL of your Google Sheet</p>
                    <form onSubmit={this.handleSubmit}>
                        <InputGroup className="sheetForm">
                            <FormControl
                                placeholder="To do this, open your Google Sheet, copy the URL from the address bar and paste here!"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.url}
                            />
                            <Button variant="outline-light" id="button-addon1" type="submit">
                                Go!!
                            </Button>
                        </InputGroup>
                    </form>

                </div>
            )
        }
        else {
            return <Redirect to="/"/>
        }
    }
};

export default Sheets;