import React, { Component } from 'react';
import './css/addproduct.css';
import Sidebar from '../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMarker } from '@fortawesome/free-solid-svg-icons';
import Top from '../components/top';
import {connect} from 'react-redux';
import {whichpage} from '../components/action';

class EditProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            prodtname:'',
            isFetching:false,
            price:'',
            quantity:'',
            desc:'',
            category:'',
            selectcate:'',
            gender:'',
            top:'',
            skirts:'',
            trouser_short:'',
            dresses:'',
            suits:'',
            children_wear:'',
            files:[],
            siteurl:'http://localhost/CustomerApp/public'
        }
        this.submitData = this.submitData.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        //this.filefolder = this.filefolder.bind(this);
    }
    onChangeHandler(event) {
        if(this.state.files.length == 3){
            alert("You have added 3 images already");
            return false;
        }
        let file = event.target.files[0];
        let allfiles = this.state.files;
        allfiles.push(file);
        this.setState({files:allfiles});
        //console.log(this.state.files);
    }
    componentDidMount(){
        //alert(this.props.data.access_token);
        if(this.props.data.products.name == '') this.props.history.push('/product');
        let data = {page: 'product'};
        this.props.dispatch(whichpage(data));
        this.setState({
            prodtname:this.props.data.products.name,
            price: this.props.data.products.price,
            quantity: this.props.data.products.stock,
            gender: this.props.data.products.gender,
            category:this.props.data.products.category,
            desc:this.props.data.products.description,
            selectcate:this.props.data.products.category,
            top:this.props.data.products.top,
            skirts:this.props.data.products.skirts,
            trouser_short:this.props.data.products.trouser_short,
            dresses:this.props.data.products.dresses,
            suits:this.props.data.products.suits,
            children_wear:this.props.data.products.children_wear,
            id:this.props.data.products.id
        })
    }
    componentWillMount(){
        let status = this.props.data.isloggin;
        if(status == false) this.props.history.push('/');
    }
    selectCategory(val){
        this.setState({selectcate:val,category:val});
        //alert(val);
    }
    async submitData(e) {
        e.preventDefault();
        let data = new FormData();
        //alert(this.state.prodtname);
        if(this.state.prodtname === ''){
            alert('Product name is Unknown');
            return false;
        }
        if(this.state.price === ''){
            alert('Product cost is Unknown');
            return false;
        }
        if(this.state.quantity === ''){
            alert('Product quantity is Unknown');
            return false;
        }
        
        if(this.state.desc === ''){
            alert('Product description is Unknown');
            return false;
        }
        if(this.state.gender === ''){
            alert('Gender is Unknown');
            return false;
        }
        if(this.state.files.length == 0){
            alert('Product Images is Required');
            return false;
        }
        this.setState({isFetching:true});
        data.append('productname',this.state.prodtname);
        data.append('price',this.state.price);
        data.append('quantity',this.state.quantity);
        data.append('description',this.state.desc);
        data.append('category',this.state.category);
        data.append('gender', this.state.gender);
        data.append('top',this.state.top);
        data.append('skirts',this.state.skirts);
        //data.append('top',this.state.top);
        data.append('trouser_short',this.state.trouser_short);
        data.append('dresses',this.state.dresses);
        data.append('suits',this.state.suits);
        data.append('children_wear',this.state.children_wear);
        this.state.files.forEach((image_file) => {
            data.append('images[]', image_file);
       });
        //data.append('images',this.state.files);
        //for(let f  = 0; f < this.state.files; f++){
          //  data.append('images[]',this.state.files[f]);
        //}
        
        await fetch(`${this.props.data.siteurl}/api/auth/addproduct`,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.props.data.access_token}`
            },
            body: data
        })
          .then(data => data.json())
          .then(data => {
              console.log(data);
              this.setState({isFetching:false});
              if(data.status == 'success'){
                  alert('Data saved successfully');
                  this.setState({isFetching:false});
                  this.setState(
                      {
                      prodtname:'',
                      price:'',
                      quantity:'',
                      desc:'',
                      category:'',
                      files:[], 
                      selectcate :'',
                      top:'',
                      skirts:'',
                      trouser_short:'',
                      dresses:'',
                      suits:'',
                      children_wear:'',
                      gender:''
                      }
                      );
              }else{
                alert('Error saving data, try again later');
              }
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
                    <Top />
                    
                    <div className="submainprod">
                        <div className="contenta" style={{color:'#969696',fontSize:13,fontWeight:600}}>
                            <p style={{marginRight:10, fontSize:17}}><span style={{marginRight:10, fontSize:30}}>&#x2190;</span> ADD PRODUCT</p>
                        </div>
                        <div className="contentb">
                            <button onClick = {this.submitData} type="submit" className="btn-productbtn">
                            {
                                this.state.isFetching == true &&
                                <i className="fa fa-spinner fa-spin" style={{fontSize:20,color:'#fff'}} />
                            }
                            {
                                this.state.isFetching == false && <span>Submit</span>
                            } 
                            </button>
                        </div>
                    </div>
                    <div className="maincontent">
                         <div className="prodtitle">
                             <div className="column1">
                                 <div style={{fontSize:14,fontWeight:500}}>Product Name</div>
                                 <div><input value = {this.state.prodtname} onChange = {event => this.setState({prodtname:event.target.value})} type = "text" className ="" style={{padding:10,width:'96%',border: '1px solid #CCCCCC',borderRadius: 3}}/> </div>
                                 <div className="sublist">
                                     <div>
                                       <div style={{fontSize:14,fontWeight:500}}>Price</div>
                                       <div><input value = {this.state.price} onChange = {event => this.setState({price:event.target.value})} type = "number" className ="" style={{padding:10,width:'80%',border: '1px solid #CCCCCC',borderRadius: 3}}/> </div>
                                     </div>
                                     <div>
                                       <div style={{fontSize:14,fontWeight:500}}>Quantity</div>
                                       <div><input value = {this.state.quantity} onChange = {event => this.setState({quantity:event.target.value})} type = "number" className ="" style={{padding:10,width:'95%',border: '1px solid #CCCCCC',borderRadius: 3}}/> </div>
                                     </div>
                                    
                                 </div>
                             </div>
                             <div className="column2">
                                    <div>
                                       <div style={{fontSize:14,fontWeight:500}}>Upload Pictures</div>
                                    </div>
                                    <div style={{border:'1px solid #CCCCCC',height:'70%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                     <img src={require('../components//assets/illustrate.png')} style={{width:60,height:60}}/>  
                                     <h3>{this.state.files.length} IMAGES ADDED</h3>                                      
                                    </div>
                                    <div style={{display:'flex',width:'100%'}}>
                                        <div>
                                           <input type="file" onChange = {this.onChangeHandler} style={{position:'relative',zIndex:10,color:'#8D8D8D',left:0}} />
                                           <br/><small style={{color:'#C10F0F',fontWeight:'400'}}>Upload maximum of 3 pictures</small> 
                                        </div>
                                    </div>
                             </div>
                             
                         </div>
                         <div className="others">
                             <div className="desc">
                                 <div style={{color:'#4C4C4C',fontSize:14,fontWeight:500}}>Description</div>
                                 <div>
                                     <textarea value = {this.state.desc} onChange = {event => this.setState({desc:event.target.value})} className ="" style={{padding:10,width:'96%',height:'32vh',border: '1px solid #CCCCCC',borderRadius: 3}}>
                                     </textarea>
                                 </div>    
                                 
                             </div>
                             <div className="cate">
                                 <div style={{color:'#4C4C4C',fontSize:14,fontWeight:500}}>Gender</div> 
                                 <div>
                                    <select onChange = {event => this.setState({gender:event.target.value,children_wear:'',dresses:'',top:'',skirts:'',trouser_short:'',dresses:''})} name = 'gender' className="form-control" style={{padding:10}}>
                                        <option value=""></option>
                                        <option value ="Men">Men</option>
                                        <option value="Women">Women</option>
                                        <option value="Children">Children</option>
                                    </select>
                                 </div> 
                                 
                                 {
                                     this.state.gender == 'Women' && <div>
                                     <div style={{color:'#4C4C4C',fontSize:14,fontWeight:500}}>Top</div>
                                        <div>
                                            <select onChange = {event => this.setState({top:event.target.value})} name = 'top' className="form-control" style={{padding:10}}>
                                                <option value=""></option>
                                                <option value ="Camisoles">Camisoles</option>
                                                <option value="Shirts">Shirts</option>
                                                <option value="Croptops">Croptops</option>
                                                <option value ="T-shirts">T-shirts</option>
                                                <option value="Cardigan">Cardigan</option>
                                                <option value="Blazers">Blazers</option>
                                            </select>
                                        </div>
                                        <div style={{color:'#4C4C4C',fontSize:14,fontWeight:500}}>Skirts</div>
                                        <div>
                                            <select onChange = {event => this.setState({skirts:event.target.value})} name = 'top' className="form-control" style={{padding:10}}>
                                                <option value=""></option>
                                                <option value ="Demin skirts">Demin skirts</option>
                                                <option value="High – low skirts">High – low skirts</option>
                                                <option value="Pencil skirts">Pencil skirts</option>
                                                <option value ="Leather skirt">Leather skirt</option>
                                                <option value="Wrap skirt">Wrap skirt</option>
                                                <option value="Suit skirt">Suit skirt</option>
                                            </select>
                                        </div>
                                        <div style={{color:'#4C4C4C',fontSize:14,fontWeight:500}}>Trousers and shorts</div>
                                        <div>
                                            <select onChange = {event => this.setState({trouser_short:event.target.value})} name = 'top' className="form-control" style={{padding:10}}>
                                                <option value=""></option>
                                                <option value ="Cargo pants">Cargo pants</option>
                                                <option value="Leather shorts">Leather shorts</option>
                                                <option value="Palazzo pants">Palazzo pants</option>
                                                <option value ="Pencil suit">Pencil suit</option>
                                                <option value="Parachute pants">Parachute pants</option>
                                                <option value="Sweat pants">Sweat pants</option>
                                                <option value="Yoga pants">Yoga pants</option>
                                                <option value ="Jeans">Jeans</option>
                                                <option value="Capri pants">Capri pants</option>
                                                <option value="Bandage pants">Bandage pants</option>
                                            </select>
                                        </div>
                                        <div style={{color:'#4C4C4C',fontSize:14,fontWeight:500}}>Dress</div>
                                        <div>
                                            <select onChange = {event => this.setState({dresses:event.target.value})} name = 'top' className="form-control" style={{padding:10}}>
                                                <option value=""></option>
                                                <option value ="Abaya">Abaya</option>
                                                <option value="Bandage dress">Bandage dress</option>
                                                <option value="Backless dress">Backless dress</option>
                                                <option value ="Cape dress">Cape dress</option>
                                                <option value="Lingerie dress">Lingerie dress</option>
                                                <option value="Shirt dress">Shirt dress</option>
                                                <option value="Wrap dress">Wrap dress</option>
                                                <option value ="Tutu dress">Tutu dress</option>
                                            </select>
                                        </div>
                                    </div>   
                                 }
                                 {
                                     this.state.gender == 'Men' && <div>
                                     <div style={{color:'#4C4C4C',fontSize:14,fontWeight:500}}>Top</div>
                                        <div>
                                            <select onChange = {event => this.setState({top:event.target.value})} name = 'top' className="form-control" style={{padding:10}}>
                                                <option value=""></option>
                                                <option value ="T-shirts">T-shirts</option>
                                                <option value="Dashiki">Dashiki</option>
                                                <option value="Sweat shirt">Sweat shirt</option>
                                                <option value ="Cardigan">Cardigan</option>
                                            </select>
                                        </div>
                                        <div style={{color:'#4C4C4C',fontSize:14,fontWeight:500}}>Trousers and shorts</div>
                                        <div>
                                            <select onChange = {event => this.setState({trouser_short:event.target.value})} name = 'top' className="form-control" style={{padding:10}}>
                                                <option value=""></option>
                                                <option value ="Cargo pants">Cargo pants</option>
                                                <option value="Capri pants">Capri pants</option>
                                                <option value="Formal trouser">Formal trouser</option>
                                                <option value ="Sweat pant">Sweat pant</option>
                                            </select>
                                        </div>
                                        <div style={{color:'#4C4C4C',fontSize:14,fontWeight:500}}>Suits</div>
                                        <div>
                                            <select onChange = {event => this.setState({suits:event.target.value})} name = 'top' className="form-control" style={{padding:10}}>
                                                <option value=""></option>
                                                <option value ="Suits">Suits</option>
                                            </select>
                                        </div>
                                    </div>   
                                 }
                                 {
                                     this.state.gender == 'Children' && <div>
                                     <div style={{color:'#4C4C4C',fontSize:14,fontWeight:500}}>Childrens Wear</div>
                                        <div>
                                            <select onChange = {event => this.setState({children_wear:event.target.value})} name = 'top' className="form-control" style={{padding:10}}>
                                                <option value=""></option>
                                                <option value ="Top">Top</option>
                                                <option value="Skirts">Skirts</option>
                                                <option value="Short">Short</option>
                                                <option value ="Trousers">Trousers</option>
                                                <option value ="Dresses">Dresses</option>
                                            </select>
                                        </div>
                                        
                                    </div>   
                                 }
                                
                                 </div>
                             
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
export default connect(mapStateToProps)(EditProduct);

