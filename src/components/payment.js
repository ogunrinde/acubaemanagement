import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/payment.css';
import Sidebar from '../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Top from '../components/top';
import {whichpage} from '../components/action';
import { connect } from 'react-redux';

class Payment extends Component {
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
        let data = {page: 'payment'};
        this.props.dispatch(whichpage(data));
        //alert(this.props.data.whichpage);
    }
    componentWillMount(){
        let status = this.props.data.isloggin;
        if(status == false) this.props.history.push('/');
    }
    render() {
        return (
            <div className="wrapper">
                <div className = "sidebar">
                    <Sidebar />
                </div>
                <div className = "main">
                    <Top />
                    <div className="submain">
                        <div className="contenta" style={{color:'#969696',fontSize:13}}>
                            <p style={{fontSize:17,color:'#303030',fontWeight:'500'}}>Payment transactions : <span style={{color:'#B92368'}}>Last 7 days</span></p>
                        </div>
                        <div className="contentb">
                        </div>
                    </div>
                    <div className="maincontent2">
                         
                         <div className='tablewrapper'>
                         <table className='prodtable2'>
                            <tr>
                                <th>ORDER ID</th>
                                <th>AMOUNT</th>
                                <th>PAYMENT</th>
                                <th>PAYMENT MODE</th>
                                <th>DATE</th>
                            </tr>
                            <tr>
                                
                                <td>Toy Cars</td>
                                <td>In Stock</td>
                                <td>N 2,000</td>
                                <td>Category</td>
                                <td>20</td>
                                
                            </tr>
                            
                            </table>
                         </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        data: state.DataReducer
    }
}
export default connect(mapStateToProps)(Payment);
