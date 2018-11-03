import React from 'react';
import Header from "../components/Header&Footer/Header";
import Footer from "../components/Header&Footer/Footer";
import {CssBaseline} from "@material-ui/core";

class Layout extends React.Component{
    state = {
        show: false
    };
    toggleShow = () => {
        this.setState({show: !this.state.show})
    };

    render(){
        return (
            <div>
              <CssBaseline/>
                <Header toggleShow={this.toggleShow} show={this.state.show}/>

                {this.props.children}
                <Footer/>
            </div>
        );
    }

}

export default Layout;
