import { Component } from "react";
import { FormControl } from "react-bootstrap";

class HeaderRow extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        this.props.updateHeaderId(e.target.value);
    }
    
    render() {
        if (this.props.sheetsMetadataLoading) {
            return (
                <div></div>
            )
        } else {
            return (
                <>
                <div>
                    <p>Select the row number which contains the headers</p>
                    <form>
                        <FormControl className="rowForm" placeholder="1" onChange={this.handleChange} type="number" min="1" max={this.props.sheetsMetadata[this.props.sheetIndex].properties.gridProperties.rowCount} />
                    </form>
                    </div>
                    <hr />
                    </>
            )
        }
    }
}

export default HeaderRow;