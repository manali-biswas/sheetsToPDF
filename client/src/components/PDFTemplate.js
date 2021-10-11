import { Component } from "react";
import { Button } from "react-bootstrap";
import FroalaEditor from "react-froala-wysiwyg";

const OrientationViews = props => {
    if (props.orientation === 'landscape') {
        return (
            <div>
                <Button variant="light mr-2">Landscape</Button>
                <Button variant="outline-light" onClick={() => props.changeOrientation('portrait')}>Portrait</Button>
            </div>
        );
    }
    else {
        return (
            <div>
                <Button variant="outline-light mr-2" onClick={() => props.changeOrientation('landscape')}>Landscape</Button>
                <Button variant="light">Portrait</Button>
            </div>
        );
    }
}

const HeaderDataItemPDF = props => {
    if (props.selectedData.includes(props.index)) {
        return (
            <>
                <Button variant="outline-light" onClick={() => props.updateSelectedData(props.index)}>{props.data}</Button>{' '}
            </>
        )
    }
    else {
        return (
            <> </>
        );
    }
}

class PDFTemplate extends Component{
    constructor(props) {
        super(props);

        this.state = {
            content: ''
        }

        this.handleModelChange = this.handleModelChange.bind(this);
        this.updateSelectedData = this.updateSelectedData.bind(this);
    }

    handleModelChange(model) {
        this.setState({
            content: model
        });
    }

    updateSelectedData(id) {
        var i = this.state.content.lastIndexOf(';<') + 1;
        var x = this.state.content;
        this.setState({
            content: x.slice(0,i) + `<button>row[${id}]</button> .`+x.slice(i,x.length)
        });
    }

    render() {
        const headerDataViews = this.props.headerData.map((data, index) => {
            return (<HeaderDataItemPDF key={index} data={data} index={index}
                selectedData={this.props.selectedData}
                updateSelectedData={this.updateSelectedData}
            />);
        });

        const config = {
            placeholderText: "Make your PDF Template here!",
            imageUpload: true,
            imageMaxSize: 5 * 1024 * 1024,
            imageAllowedTypes: ['png','jpg','jpeg'],
            events: {
                'image.uploaded': (res) => {
                    console.log(res);
                }
            }
        }

        return (
            <div>
                <h3 style={{ textDecoration: "underline" }}>Make the template for the PDF</h3>
                <br />
                
                <div>
                    <p>Select data to insert</p>
                    <div className="mb-2">
                        {headerDataViews}
                    </div>

                    <p>Select PDF Orientation</p>
                    <OrientationViews orientation={this.props.orientation}
                    changeOrientation={this.props.changeOrientation}/>
                </div>
                <br/>
                <div className="container">
                    <FroalaEditor tag="textarea" config={config} model={this.state.content} onModelChange={ this.handleModelChange }/>
                </div>
                { //keep a button and use the pdf template to make pdfs in client side
                }
                <Button variant="light mt-2" onClick={ ()=>this.props.makePDF(this.state.content) }>Make PDF</Button>
            </div>
        )
    }
}

export default PDFTemplate;