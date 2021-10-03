import { Component } from "react";
import { Link } from "react-router-dom";
import HeaderData from "./HeaderData";
import HeaderRow from "./HeaderRow";
import RowSelection from "./RowSelection";
import SheetNumbers from "./SheetNumbers";

class SheetData extends Component{
    render() {
            return (
                <div>
                    <h3 style={{textDecoration: "underline"}}>Select the sheet data to be used in PDF</h3>
                    <br/>
                    <SheetNumbers sheetsMetadataLoading={this.props.sheetsMetadataLoading}
                        updateSheetIndex={this.props.updateSheetIndex}
                        sheetIndex={this.props.sheetIndex}
                        sheetsMetadata={this.props.sheetsMetadata}
                    />
                
                    <HeaderRow sheetsMetadataLoading={this.props.sheetsMetadataLoading}
                        sheetIndex={this.props.sheetIndex}
                        updateHeaderId={this.props.updateHeaderId}
                        sheetsMetadata={this.props.sheetsMetadata} />
                    
                    <HeaderData headerDataLoading={this.props.headerDataLoading}
                        sheetsMetadataLoading={this.props.sheetsMetadataLoading}
                        headerData={this.props.headerData}
                        selectedData={this.props.selectedData}
                        updateSelectedData={this.props.updateSelectedData}
                        removeSelectedData={this.props.removeSelectedData}
                    />
                    
                    <RowSelection headerDataLoading={this.props.headerDataLoading}
                        data={this.props.data}
                        updateSelectedRow={this.props.updateSelectedRow} />
                    <Link to="/pdftemplate" className="btn btn-success mt-1">Go</Link>
                </div>
            )
    }
}

export default SheetData;