import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import NewListing from './components/NewListing'
import EditListing from './components/EditListing';
import SearchBar from './components/Searchbar';
import { ColorRing } from 'react-loader-spinner';
import Footer from './components/Footer';
import Listing from './components/Listing';

const API_URL = process.env.REACT_APP_API_URL

const App = () => {

  const [products,setProducts] = useState([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isSearching, setIsSearching] = useState(false);
  const [showAdd, setShowAdd] = useState(false)
  const [showEdit,setShowEdit] = useState(false)

  const getProducts = () => {
    axios
    .get(`${API_URL}/etsy`)
    .then(
      (response) => setProducts(response.data),
      (err) => console.error(err)
    )
    .catch((error) => console.error(error))
  }

  const handleCreate = (addListing) => {
    axios.post(`${API_URL}/etsy`, addListing)
    .then((response) => {
      getProducts();
    })
    showAddButton()
  }

  const handleDelete = (deletedProduct) => {
  confirmAlert({
    title: 'Confirm Deletion',
    message: `Are you sure you want to delete this listing?`,
    buttons: [{
      label: 'Yes',
      onClick: () => {
        axios
          .delete(`${API_URL}/etsy/` + deletedProduct.id)
          .then((response) => {
            setProducts(products.filter(product => product.id !== deletedProduct.id))
          })
      }
    },
    {
      label: 'No',
      onClick: () => { }
    }
    ]
  })
}

  const handleUpdate = (editProduct) => {
    axios.put(`${API_URL}/etsy/` + editProduct.id, editProduct)
    .then((response) => {
      setProducts(products.map((product) => {
        return product.id !== editProduct.id ? product : editProduct
      }))
    })
  }

  const onSearchChange = (searchInput) => {
    const searchInputLower = searchInput.toLowerCase()
    if (searchInput.length > 0) {
      setIsSearching(true)
      const result = products.filter((product) => {
        return product.category.toLowerCase().match(searchInputLower) || product.title.toLowerCase().match(searchInputLower)
      })
      setFilteredProducts(result);
    } else {
      setIsSearching(false)
    }
  }

  const NoSearchResults = () => {
    return (
      <><p className="noResults">No Items Found</p></>
    )
  }

  const productsToDisplay = isSearching ? filteredProducts : products

  const categoryMenuButton = () => {
    const x = document.getElementById("catdiv");
    if (x.style.display === "block"){
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }

  useEffect(() => {
    getProducts()
   }, [])

   const showAddButton = () => {
     showAdd ? setShowAdd(false):setShowAdd(true)
   }

   
  return(
    <>
    <div className='categorymenu-div' id='catdiv'>
      <div className='category-menu'>
        <div className='catmenu-header'>
          <div className='catmenu-logo'>Not Etsy</div>
          <p>Browse Categories</p>
          <svg onClick={categoryMenuButton} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor" /></svg>
          <div className='catmenu-item' onClick={()=>{onSearchChange("Jewelry"); categoryMenuButton()}}>Jewelry</div>
          <div className='catmenu-item' onClick={()=>{onSearchChange("Clothing"); categoryMenuButton()}}>Clothing</div>
          <div className='catmenu-item' onClick={()=>{onSearchChange("Home"); categoryMenuButton()}}>Home</div>
          <div className='catmenu-item' onClick={()=>{onSearchChange("Toys"); categoryMenuButton()}}>Toys</div>
          <div className='catmenu-item' onClick={()=>{onSearchChange("Art"); categoryMenuButton()}}>Art</div>
          <div className='catmenu-item' onClick={()=>{onSearchChange("Craft"); categoryMenuButton()}}>Craft Supplies</div>
        </div>
      </div>
    </div>
    <div className='header'>
      <a href='/'><div className='title-logo'>Not Etsy</div></a>
        <div className="searchbar-div" >
            <svg onClick={categoryMenuButton} className='menu-icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z" fill="currentColor" /><path d="M2 12.0322C2 11.4799 2.44772 11.0322 3 11.0322H21C21.5523 11.0322 22 11.4799 22 12.0322C22 12.5845 21.5523 13.0322 21 13.0322H3C2.44772 13.0322 2 12.5845 2 12.0322Z" fill="currentColor" /><path d="M3 17.0645C2.44772 17.0645 2 17.5122 2 18.0645C2 18.6167 2.44772 19.0645 3 19.0645H21C21.5523 19.0645 22 18.6167 22 18.0645C22 17.5122 21.5523 17.0645 21 17.0645H3Z" fill="currentColor" /></svg>
            <SearchBar onSearchChange={onSearchChange} categoryMenuButton={categoryMenuButton}/>
        </div>
      <div className='signcart-div'>
        <button className='sign-button'>Sign In</button>
          <svg className='cart-icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z" fill="currentColor" /><path d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z" fill="currentColor" /><path d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z" fill="currentColor" />
          </svg>      
      </div>
      <div className='category-div'>
        <div className='category' onClick={()=>{onSearchChange("Jewelry")}}>Jewelry</div>
        <div className='category' onClick={()=>{onSearchChange("Clothing")}}>Clothing</div>
        <div className='category' onClick={()=>{onSearchChange("Home")}}>Home</div>
        <div className='category' onClick={()=>{onSearchChange("toys")}}>Toys</div>
        <div className='category' onClick={()=>{onSearchChange("art")}}>Art</div>
        <div className='category' onClick={()=>{onSearchChange("craft")}}>Craft Supplies</div>
      </div>
    </div>
    {showAdd ? <div className='newlistingform-div'>
            <div className='newlisting-form'>
              <div className='closebutton-div'>
                <h3>Create New Listing</h3>
                <svg className='close-button' onClick={showAddButton} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor" /></svg>
              </div>
              <NewListing handleCreate={handleCreate}/>
            </div>            
          </div>
          :
          null}
    
    <div className='listings'>
      <div className='create-div'>
        <div className='inside-create' onClick={showAddButton}>
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M5 22C3.34315 22 2 20.6569 2 19V5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5ZM4 19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V19Z" fill="currentColor" />
          </svg>
          
        </div>
      </div>
    {
          isFetchingProducts ? <div className='spinner'>
            <>
              <ColorRing
                visible={true}
                height='200'
                width='200'
                ariaLabel='blocks-loading'
                wrapperStyle={{}}
                wrapperClass='blocks-wrapper'
                colors={['#c444b9', '#9e2419', '#c444b9', '#9e2419', '#c444b9']} />
            </>
          </div> :
            productsToDisplay.length > 0 ?
              productsToDisplay.map((product) => {
                return (
                <>
                  <div className='listing-div' key={product.id}>
                    <Listing product={product} handleUpdate={handleUpdate} handleDelete={handleDelete} setShowEdit={setShowEdit} showEdit={showEdit} key={product.id}/>
                  </div>
                  </>
                )
              })
              : <NoSearchResults />
        }
        </div>
        <Footer/>
    </>
  )
}
export default App;