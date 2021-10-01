import { Component } from "react";
import { Button } from "react-bootstrap";
import Loading from "./Loading";

const SheetNumberItem = props => {
    if (props.sheet.properties.index === props.sheetIndex) {
        return (
            <>
                <Button variant="light">{props.sheet.properties.title}</Button>{' '}
            </>
        )
    }
    else {
        return (
            <>
                <Button variant="outline-light" onClick={() => props.updateSheetIndex(props.sheet.properties.index)}>{props.sheet.properties.title}</Button>{' '}
            </>
        );
    }
}

class SheetNumbers extends Component {
    render() {
        if (this.props.sheetsMetadataLoading) {
            return (
                <Loading />
            );
        }
        else {
            const sheetNumberViews = this.props.sheetsMetadata.map((sheet) => {
                return (<SheetNumberItem sheet={sheet}
                    sheetIndex={this.props.sheetIndex}
                    updateSheetIndex={this.props.updateSheetIndex} />);
            });

            return (
                <>
                <div>
                    <p>Select the Sheet to be used:</p>
                    {sheetNumberViews}
                </div>
                    <hr />
                    </>
            )
        }
    }
}

export default SheetNumbers;