import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/order_expand.css';
import Sidebar from '../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';
import OrderTop from '../components/order_top';
import {connect} from 'react-redux';

class OrderExpand extends Component {
    render() {
        return (
            <div className="wrapper">
                <div className = "sidebar">
                    <Sidebar />
                </div>
                <div className = "main">
                    <OrderTop />
                    <div className="submain16">
                        <div className="contenta" style={{color:'#969696',fontSize:13}}>
                            <p style={{fontWeight:500,fontSize:15}}>Order Date</p>
                            <p style={{textAlign:'center',fontSize:18,color:'#303030',fontWeight:500,marginTop:15}}>20-20-2020</p>
                        </div>
                        <div className="contenta" style={{color:'#969696',fontSize:13,textAlign:'center'}}>
                            <p style={{fontWeight:500,fontSize:15}}>ORDER STATUS</p>
                            <div style={{textAlign:'center',fontSize:17,color:'#303030',fontWeight:'600',marginTop:-2}}>
                                <span>
                                        <select className="categories" style={{padding:10,width:'20vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}>
                                            <option></option>
                                        </select>
                                </span>
                                <span>
                                   <button type="submit" style={{width:'20vh',padding:11}} className="btn-product">Update</button>
                                </span>
                            </div>
                            
                            
                        </div>
                        <div className="contentb" style={{color:'#969696',fontSize:13}}>
                            <div className="contenta" style={{color:'#969696',fontSize:13}}>
                                <p style={{fontWeight:500,fontSize:15}}>PAYMENT TYPE</p>
                                <p style={{textAlign:'center',fontSize:18,color:'#303030',fontWeight:500,marginTop:15}}>Bank Deposit</p>
                            </div>
                        </div>
                    </div>
                    <div className="submain2">
                        <div className="contenta" style={{color:'#969696',fontSize:13}}>
                             <p style={{fontWeight:500,fontSize:18}}>Customer Details</p>
                             <div>
                                 <div style={{textAlign:"left",marginLeft:'20%'}}>
                                     <div style={{marginTop:-10}}>
                                        <p style={{display:'inline-block', width:'40%',fontSize:15,fontWeight:500}}>
                                            FullName:
                                        </p>
                                        <p style={{display:'inline-block',width:'60%',color:'#303030',fontSize:15,fontWeight:500}}>
                                            FullName:
                                        </p>
                                     </div>
                                     <div style={{marginTop:-10}}>
                                        <p style={{display:'inline-block', width:'40%',fontSize:15,fontWeight:500}}>
                                            Email Address:
                                        </p>
                                        <p style={{display:'inline-block',width:'60%',color:'#303030',fontSize:15,fontWeight:500}}>
                                            FullName:
                                        </p>
                                     </div>
                                      
                                     <div style={{marginTop:-10}}>
                                        <p style={{display:'inline-block', width:'40%',fontSize:15,fontWeight:500}}>
                                            Unique ID:
                                        </p>
                                        <p style={{display:'inline-block',width:'60%',color:'#303030',fontSize:15,fontWeight:500}}>
                                            FullName:
                                        </p>
                                     </div>
                                     <div style={{marginTop:-10}}>
                                        <p style={{display:'inline-block', width:'40%',fontSize:15,fontWeight:500}}>
                                            Phone Number:
                                        </p>
                                        <p style={{display:'inline-block',width:'60%',color:'#303030',fontSize:15,fontWeight:500}}>
                                            FullName:
                                        </p>
                                     </div>
                                 </div>
                             </div>
                        </div>
                        <div className="contenta" style={{color:'#969696',fontSize:13,textAlign:'center'}}>
                             <p style={{fontWeight:500,fontSize:15}}>Shipping Details</p>
                        </div>
                        
                    </div>
                    <div className="maincontentorder">
                        
                         <div>
                         <table>
                            <tr style={{backgroundColor:'#B92368',color:"#fff",padding:15}}>
                                <th>ITEM</th>
                                <th>QUANTITY</th>
                                <th>COST</th>
                                <th>TOTAL</th>
                            </tr>
                            <tr>
                                <td>Toy Cars</td>
                                <td>In Stock</td>
                                <td>N 2,000</td>
                                <td>Category</td>
                                
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td style={{color:'#118DE6',fontSize:10}}>Gift wrappings : 0</td>
                                <td style={{color:'#118DE6', fontSize:10}}>Gift Certificate: 0</td>
                                
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
export default connect(mapStateToProps)(OrderExpand);

