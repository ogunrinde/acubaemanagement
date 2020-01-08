import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/product.css';
import Sidebar from '../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Top from '../components/top';
import {whichpage} from '../components/action';
import { connect } from 'react-redux';
import { eachproducts } from '../components/action';
import SweetAlert from 'sweetalert2-react';
import swal from 'sweetalert';

class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            products:[],
            siteurl:'http://localhost/CustomerApp/public',
            searchproducts:[],
            show:false

        }
        this.addproduct = this.addproduct.bind(this);
        this.edit = this.edit.bind(this);
    }
    addproduct() {
        this.props.history.push('/addproduct');
    }
    componentDidMount(){
        this.getproducts();
        let data = {page: 'product'};
        this.props.dispatch(whichpage(data));
    }
    componentWillMount(){
        let status = this.props.data.isloggin;
        if(status == false) this.props.history.push('/');
    }
    edit = (prod) => {
        let data = {products: prod};
        this.props.dispatch(eachproducts(data));
        //console.log(this.props.data.products);
        this.props.history.push('/editproduct');
    }
    showdialog(id){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              this.delete(id);  
            } else {
              
            }
          });
    }
    delete = async (id) => {
        await fetch(`${this.props.data.siteurl}/api/auth/deleteproduct`,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.props.data.access_token}`
            },
            body: JSON.stringify({id:id})
        })
          .then(data => data.json())
          .then(data => {
              console.log(data);
              if(data.status == 'success'){
                  //alert("Data Deleted Successfully");
                  swal("Poof! Your Data has been deleted!", {
                    icon: "success",
                  });
                  this.setState({products:data.products,searchproducts:data.products});
              }
          })
          .catch(err => {
            alert("Error: Please check your internet");
          });
    }
    getText = (val) => {
        let thisval  = val.target.value;
        let searchproduct = [];
        for(let f  = 0; f < this.state.products.length; f++){
            let index = this.state.products[f].name.toLowerCase().search(thisval.toLowerCase());
            
            if(index > -1){
                searchproduct.push(this.state.products[f]);
            }
        }
        this.setState({searchproducts:searchproduct});
        
    }
    async getproducts(){
        await fetch(`${this.props.data.siteurl}/api/auth/products`,{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.props.data.access_token}`
            }
        })
          .then(data => data.json())
          .then(data => {
              this.setState({products:data.products,searchproducts:data.products});
          })
          .catch(err => {
            alert("Error: Please check your internet");
          });
    }
    render() {
        return (
            <div className="wrapper">
                <div className = "sidebar">
                    <Sidebar />
                </div>
                <div className = "main">
                    <Top style={{marginTop:500}}/>
                    
                    <div className="submain">
                        <div className="contenta" style={{color:'#969696',fontSize:13}}>
                            <p style={{fontSize:19,fontWeight:'600'}}>TOTAL NUMBER OF PRODUCTS</p>
                            <p style={{textAlign:'center',fontSize:17,color:'#303030',fontWeight:'600',marginTop:-2}}>500</p>
                        </div>
                        <div className="contentb">
                            <button type="submit" onClick = {this.addproduct} className="btn-product">Add New Product</button>
                        </div>
                    </div>
                    <div className="maincontent1">
                         <div className="prodtitle1">
                             <div className="prodcolumn1">
                                 <div style={{fontSize:15,fontWeight:500}}>show</div>
                                 <div>
                                     <select className="categories" className ="" style={{padding:10,width:70,marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}>
                                         <option> 25</option>
                                     </select>
                                 </div>
                                 <div style={{fontSize:15,fontWeight:500}}>entries</div>
                             </div>
                             <div className="prodcolumn2">
                                 <div>
                                     <select className="categories" style={{padding:10,width:'23vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}>
                                         <option> Show all categories</option>
                                     </select>
                                 </div>
                                 <div>
                                     <select className="categories" style={{padding:10,width:'23vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}>
                                         <option>show status</option>
                                     </select>
                                 </div>
                             </div>
                             <div className="prodcolumn3">
                               <div style={{fontSize:15,fontWeight:500}}>search</div>
                               <div><input onChange = {(text) => this.getText(text)} type = "text" className ="" style={{padding:10,width:'20vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}/> </div>
                             </div>
                         </div>
                         <div className='tablewrapper'>
                         <table className='prodtable'>
                            <tr className='prodtr'>
                                <th>Picture</th>
                                <th>Name</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th>Gender</th>
                                <th>Unit left</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                            {
                                this.state.searchproducts.map((prod)=>
                                        <tr className='prodtr'>
                                        <td>
                                         <img src={this.props.data.siteurl+'/public/images/'+prod.picture.split('|')[0]} style={{width:60,height:60}}/>
                                        </td>
                                        <td>{prod.name}</td>
                                        <td>{prod.stock}</td>
                                        <td>N {prod.price}</td>
                                        <td>{prod.gender}</td>
                                        <td>{prod.unit_left}</td>
                                        <td>{prod.date_created}</td>
                                        <td>
                                            <span>
                                            <FontAwesomeIcon onClick = {() => this.edit(prod)} icon={faEdit} style={{position:'relative',zIndex:10,color:'#DADADA',left:-5}}/>
                                            </span>
                                            <span>
                                            <FontAwesomeIcon onClick = {() => this.showdialog(prod.id)} icon={faTrash} style={{position:'relative',zIndex:10,color:'red'}}/>
                                            </span>
                                        </td>
                                    </tr>
                                )
                            }
                            
                            
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
export default connect(mapStateToProps)(Product);

