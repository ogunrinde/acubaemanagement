import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/top_order.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export default class OrderTop extends Component {
    render() {
        return (
            <div className="header">
                <div className="accountowner">
                    <div >&larr;</div>
                    <div style={{marginLeft:10,color:'#000'}}>Order Number</div>
                    <div><button type="submit" className="btn-order">Processing</button></div>
                </div>
                <div className="notification">
                    <FontAwesomeIcon icon={faBell} />
                    <p style={{position:"relative",left:9,zIndex:1,top:-85,backgroundColor:'#C10F0F',width:30,height:30,borderRadius:15,textAlign:'center',color:'#fff'}}>
                        <h4 style={{position:"absolute",top:-10,left:7,fontSize:12}}>30</h4>
                    </p>
                    
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<OrderTop />, document.getElementById('example'));
}
