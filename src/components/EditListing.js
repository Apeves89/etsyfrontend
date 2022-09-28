import React, { useState } from 'react'

const EditListing = (props) => {
    const [product, setProduct] = useState({...props.product})

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    props.handleUpdate(product)
  }
  

  return (
    <>
      <details>
        <summary>Edit Character</summary>
        <form onSubmit={handleSubmit}>
            <label htmlFor="category">Category: </label>
            <select type="text" name="category" onChange={handleChange}>
                <option value={product.category}>{product.category}</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Clothing">Clothing</option>
                <option value="Home">Home</option>
                <option value="Toys">Toys</option>
                <option value="Art">Art</option>
                <option value="Craft Supplies">Craft Supplies</option>
            </select>
            <br />
            <label htmlFor="title">Title: </label>
            <input type="text" name="title" value={product.title} onChange={handleChange} />
            <br />
            <label htmlFor="image">Image URL: </label>
            <input type="text" name="image" value={product.image} onChange={handleChange} />
            <br />
            <label htmlFor="price">Price: </label>
            <input type="text" name="price" value={product.price} onChange={handleChange} />
            <br />
            <label htmlFor="description">Description: </label>
            <input type="text" name="description" value={product.description} onChange={handleChange} />
            <input type="submit" />
        </form>
      </details>
    </>
  )
}

export default EditListing