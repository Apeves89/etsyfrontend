import { useState } from "react";

const NewListing = (props) => {
  let emptyProduct = { category: '',description: '', image: '', price: '',title: ''}
  const [product, setProduct] = useState(emptyProduct)

  const handleChange = (event) => {
    setProduct({...product, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleCreate(product)
    setProduct(emptyProduct)
  }

  return(
    <>
    <form className="createlistingform" onSubmit={handleSubmit}>
        <label htmlFor="category">Category: </label>
        <select className="add-input" type="text" name="category" onChange={handleChange}>
            <option value=" ">Choose one</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Clothing">Clothing</option>
            <option value="Home">Home</option>
            <option value="Toys">Toys</option>
            <option value="Art">Art</option>
            <option value="Craft Supplies">Craft Supplies</option>
        </select>
        <br />
        <label htmlFor="title">Title: </label>
        <input className="add-input" type="text" name="title" value={product.title} onChange={handleChange} />
        <br />
        <label htmlFor="image">Image URL: </label>
        <input className="add-input" type="text" name="image" value={product.image} onChange={handleChange} />
        <br />
        <label htmlFor="price">Price: </label>
        <input className="add-input" type="text" name="price" value={product.price} onChange={handleChange} />
        <br />
        <label htmlFor="description">Description: </label>
        <input className="add-input" type="text" name="description" value={product.description} onChange={handleChange} />
        <input className="add-submit-button" type="submit" />
    </form>
    </>
  )

}

export default NewListing;