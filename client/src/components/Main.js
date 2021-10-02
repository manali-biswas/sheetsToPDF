import Home from './Home';
import Login from './Login';
import Sheets from './Sheets';
import {
    Switch,
    Route
} from 'react-router-dom';
import { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchHeaderdata, fetchMetadata, fetchSheets, fetchUser } from '../redux/ActionCreators';
import SheetData from './SheetData';
import PDFTemplate from './PDFTemplate';
import ejs from 'ejs';
import html2pdf from 'html2pdf.js';
import Footer from './Footer';

//mapping redux store state to app props
const mapStateToProps = state => {
    return {
        user: state.user,
        sheets: state.sheets,
        metadata: state.metadata,
        headerdata: state.headerdata
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchUser: () => dispatch(fetchUser()),
    fetchSheets: () => dispatch(fetchSheets()),
    fetchMetadata: (id) => dispatch(fetchMetadata(id)),
    fetchHeaderdata: (id, name,row,cols)=>dispatch(fetchHeaderdata(id,name,row,cols))
});

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            spreadsheetId: '',
            sheetIndex: 0,
            headerId: 1,
            selectedData: [],
            selectedRow: 'all',
            opt: {
                margin: 1,
                htmlcanvas: {scale: 2},
                jsPDF: { unit: 'in', orientation: 'landscape' }
            },
            orientation: 'landscape'
        }

        this.updateSpreadsheetId = this.updateSpreadsheetId.bind(this);
        this.updateSheetIndex = this.updateSheetIndex.bind(this);
        this.updateHeaderId = this.updateHeaderId.bind(this);
        this.updateSelectedData = this.updateSelectedData.bind(this);
        this.removeSelectedData = this.removeSelectedData.bind(this);
        this.updateSelectedRow = this.updateSelectedRow.bind(this);
        this.makePDF = this.makePDF.bind(this);
        this.changeOrientation = this.changeOrientation.bind(this);
    }

    componentDidMount(){
        this.props.fetchUser();
        this.props.fetchSheets();
        if (this.state.spreadsheetId !== '') {
            this.props.fetchMetadata(this.state.spreadsheetId);
                this.props.fetchHeaderdata(
                    this.state.spreadsheetId,
                    this.props.metadata.sheets[this.state.sheetIndex].properties.title,
                    this.state.headerId,
                    this.props.metadata.sheets[this.state.sheetIndex].properties.gridProperties.columnCount
                );
        }
    }

    updateSpreadsheetId(id) {
        this.setState({
            spreadsheetId: id
        });
        this.props.fetchMetadata(id);
        this.props.history.push("/sheetsdata");
    };

    updateSheetIndex(index) {
        this.setState({
            sheetIndex: index
        });
    };

    updateHeaderId(id) {
        this.setState({
            headerId: id
        });
        this.props.fetchHeaderdata(
            this.state.spreadsheetId,
            this.props.metadata.sheets[this.state.sheetIndex].properties.title,
            this.state.headerId,
            this.props.metadata.sheets[this.state.sheetIndex].properties.gridProperties.columnCount
        );
    };

    updateSelectedData(id) {
        this.setState({
            selectedData: this.state.selectedData.concat([id])
        });
    };

    removeSelectedData(id) {
        var i = this.state.selectedData.indexOf(id);
        var x = this.state.selectedData;
        x.splice(i, 1);
        if (i > -1) {
            this.setState({
                selectedData: x
            });
        }
    };

    updateSelectedRow(option) {
        this.setState({
            selectedRow: option
        });
    };

    changeOrientation(orient) {
        this.setState({
            orientation: orient
        });
    }

    makePDF(content) {
        content=content.replaceAll("<button>", "<%=");
        content = content.replaceAll("</button>", "%>");
        var html;
        var options = this.state.opt;
        options.jsPDF.orientation = this.state.orientation;
        if (this.state.selectedRow !== 'all') {
            var row = this.props.headerdata.data[parseInt(this.state.selectedRow)];
            html = ejs.render(content, { row: row });
            console.log(html);
            html2pdf().from(html).set(options).save();
        }
        else {
            this.props.headerdata.data.forEach((row) => {
                html = ejs.render(content, { row: row });
                html2pdf().from(html).set(options).save();
            })
        }
    }

    render() {
        return (
            <div>
            <div className="App">

                <Switch>
                    <Route exact path="/">
                        <Home />
                        <Login />
                    </Route>
                    <Route path="/sheets" >
                        <Sheets userText={this.props.user.text}
                            updateSpreadsheetId={this.updateSpreadsheetId}
                            spreadsheetId={this.state.spreadsheetId}
                            userLoading={this.props.user.loading}
                            loggedIn={this.props.user.loggedIn}
                            sheetsLoading={this.props.sheets.loading}
                            sheets={this.props.sheets.sheets}
                        />
                    </Route>
                    <Route path="/sheetsdata">
                        <SheetData loggedIn={this.props.user.loggedIn}
                            sheetsMetadataLoading={this.props.metadata.loading}
                            sheetsMetadata={this.props.metadata.sheets}
                            sheetIndex={this.state.sheetIndex}
                            updateSheetIndex={this.updateSheetIndex}
                            updateHeaderId={this.updateHeaderId}
                            headerDataLoading={this.props.headerdata.loading}
                            headerData={this.props.headerdata.headerdata}
                            data={this.props.headerdata.data}
                            selectedData={this.state.selectedData}
                            updateSelectedData={this.updateSelectedData}
                            removeSelectedData={this.removeSelectedData}
                            updateSelectedRow={this.updateSelectedRow}
                        />
                    </Route>
                    <Route path="/pdftemplate">
                        <PDFTemplate headerDataLoading={this.props.headerdata.loading}
                            headerData={this.props.headerdata.headerdata}
                            selectedData={this.state.selectedData}
                            makePDF={this.makePDF}
                            orientation={this.state.orientation}
                            changeOrientation={this.changeOrientation}
                        />
                    </Route>
                    
                </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));