import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/orders.css';
import Sidebar from '../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';
import Top from '../components/top';
import {whichpage} from '../components/action';
import { connect } from 'react-redux';

class Orders extends Component {
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
        let data = {page: 'orders'};
        this.props.dispatch(whichpage(data));
        //alert(this.props.data.whichpage);
    }
    componentWillMount(){
        let status = this.props.data.isloggin;
        if(status == false) this.props.history.push('/');
    }
    orderDetails = () => {
        //this.props.history.push('/dashboard');
        this.props.history.push('/order_expand');
        //this.props.history.push('/');
    }
    render() {
        return (
            <div className="wrapper">
                <div className = "sidebar">
                    <Sidebar />
                </div>
                <div className = "main">
                    <Top />
                    <div className="maincontent4">
                        <div className="ordtitle">
                             <div className="prodcolumn1">
                                 <div style={{fontSize:15,fontWeight:500}}>show</div>
                                 <div><input type = "text" className ="" style={{padding:10,width:50,marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}/> </div>
                                 <div style={{fontSize:15,fontWeight:500}}>entries</div>
                             </div>
                             <div className="prodcolumn2">
                                 <div>
                                     <select className="categories" style={{padding:10,width:'20vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}>
                                         <option> Show all categories</option>
                                     </select>
                                 </div>
                                 <div>
                                     <select className="categories" style={{padding:10,width:'22vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}>
                                         <option>show status</option>
                                     </select>
                                 </div>
                             </div>
                             <div className="prodcolumn3">
                               <div style={{fontSize:15,fontWeight:500}}>search</div>
                               <div><input type = "text" className ="" style={{padding:10,width:'20vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}/> </div>
                             </div>
                         </div>
                         <div className='tablewrapper'>
                         <table className='prodtable'>
                            <tr>
                                <th><p style={{display:'inline-block',position:'relative',zIndex:10,color:'#DADADA',borderRadius:3,border: '2px solid #CCCCCC',top:0,width:15,height:15}}></p></th>
                                <th>ORDER BY</th>
                                <th>ORDER ID</th>
                                <th>SHIPPING ADDRESS</th>
                                <th>PAYMENT TYPE</th>
                                <th>STATUS</th>
                                <th>DATE</th>
                                <th>ACTION</th>
                            </tr>
                            <tr>
                                <td><p style={{display:'inline-block',position:'relative',zIndex:10,color:'#DADADA',borderRadius:3,border: '2px solid #CCCCCC',top:0,width:15,height:15}}></p></td>
                                <td>Toy Cars</td>
                                <td>In Stock</td>
                                <td>N 2,000</td>
                                <td>Category</td>
                                <td>20</td>
                                <td>20-20-2002</td>
                                <td onClick={this.orderDetails}>
                                    <span>
                                    <FontAwesomeIcon icon={faEye} style={{position:'relative',zIndex:10,color:'#DADADA',left:-5,fontSize:25}}/>
                                    </span>
                                    
                                </td>
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
export default connect(mapStateToProps)(Orders);
