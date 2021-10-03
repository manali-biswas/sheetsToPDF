import { Component } from "react";
import { Button } from "react-bootstrap";
import Loading from "./Loading";

const HeaderDataItem = props => {
    if (props.selectedData.includes(props.index)) {
        return (
            <>
                <Button variant="light" onClick={() => props.removeSelectedData(props.index)}>{props.data}</Button>{' '}
            </>
        )
    }
    else {
        return (
            <>
                <Button variant="outline-light" onClick={() => props.updateSelectedData(props.index)}>{props.data}</Button>{' '}
            </>
        );
    }
}

class HeaderData extends Component {
    render() {
        if (this.props.headerDataLoading) {
            if(this.props.sheetsMetadataLoading)
            return (
                <div></div>
                );
            else
                return (
                    <div><Loading/></div>
                )
        }
        else {
            const headerDataViews = this.props.headerData.map((data, index) => {
                return (<HeaderDataItem key={index} data={data} index={index}
                    selectedData={this.props.selectedData}
                    updateSelectedData={this.props.updateSelectedData}
                    removeSelectedData={this.props.removeSelectedData}
                />);
            });

            return (
                <>
                <div>
                    <p>Select the data to be used</p>
                    <div>
                        {headerDataViews}
                    </div>
                    </div>
                    <hr />
                    </>
            )
        }
    }
}

export default HeaderData;