import { Component } from "react";
import { Form } from "react-bootstrap";

class RowSelection extends Component{
    render() {
        if (this.props.headerDataLoading) {
            return (
                <div></div>
            )
        }
        else {
            const options = this.props.data.map((i, index) => {
                return (
                    <option value={index}>{index+1}</option>
                )
            })
            return (
                <div>
                    <p>Select the record row for which PDF will be generated</p>
                    <form>
                        <Form.Select className="rowForm" onChange={(e)=>this.props.updateSelectedRow(e.target.value)}>
                            <option value="all" >All</option>
                            {options}
                        </Form.Select>
                    </form>
                </div>
            )
        }
    }
}

export default RowSelection