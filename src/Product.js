import { useState, useEffect } from 'react';
import axios from 'axios';
const Product = () => {
  const [products, setProducts] = useState([
    {
      name: 'Levis Shirt',
      price: 1499,
      description: 'This is a levis shirt',
      category: 'Clothes',
      status: 'Available',
    },
    {
      name: 'Remote Control Car',
      price: 899,
      description: 'This is remote control car for childern',
      category: 'Toys',
      status: 'Unavailable',
    },
  ]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    axios
      .get('/products')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addProduct = (event) => {
    event.preventDefault();
    let productOb = {
      name: event.target.name.value,
      price: event.target.price.value,
      description: event.target.description.value,
      category: event.target.category.value,
      status: event.target.status.value,
    };
    axios
      .post('/products', productOb)
      .then((res) => {
        getProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteProduct = (indexToDelete) => {
    axios
      .delete('/products/' + indexToDelete)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getProducts();
  };
  const deleteAll = () => {
    axios
      .get('/products/deleteall')
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getProducts();
  };
  return (
    <div className='product'>
      <h1>Products App</h1>
      <form onSubmit={addProduct} className='productform'>
        <b>Name : </b>
        <input type='text' name='name' />
        <br />
        <b>Price : </b>
        <input type='number' name='price' />
        <br />
        <b>Description : </b>
        <br />
        <textarea name='description' className='desc'></textarea>
        <br />
        <b>Category : </b>
        <select name='category' className='custom-select mr-sm-2'>
          <option>Choose ...</option>
          <option value='Toys'>Toys</option>
          <option value='Clothes'>Clothes</option>
          <option value='Food Items'>Food Items</option>
        </select>
        <br />
        <br />
        <b>Status : </b>
        <select name='status' className='custom-select mr-sm-2'>
          <option>Choose ...</option>
          <option value='Complete'>Complete</option>
          <option value='Incomplete'>Incomplete</option>
        </select>
        <br />
        <br />
        <button>Add Product</button>
        <br />
      </form>
      <div className='row text-center text-white mb-5'>
        <div className='col-lg-7 mx-auto'>
          <h1 className='display-4'>Product List</h1>
        </div>
      </div>
      {products.map((val, index) => {
        return (
          <div className='container py-5'>
            <div className='row'>
              <div className='col-lg-8 mx-auto'>
                <ul className='list-group shadow'>
                  <li className='list-group-item'>
                    <div className='media align-items-lg-center flex-column flex-lg-row p-3'>
                      <div className='media-body order-2 order-lg-1'>
                        <h5 className='mt-0 font-weight-bold mb-2'>
                          Product {index + 1}
                        </h5>
                        <p className='font-italic text-muted mb-0 small'>
                          {val.description}
                        </p>
                        <div className='d-flex align-items-center justify-content-between mt-1'>
                          <h6 className='font-weight-bold my-2'>
                            Price: ${val.price}
                          </h6>
                          <h6 className='font-weight-bold my-2'>
                            Category: {val.category}
                          </h6>
                          <h6 className='font-weight-bold my-2'>
                            Status: {val.status}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </li>
                  <button
                    onClick={() => {
                      deleteProduct(index);
                    }}
                  >
                    <b>Delete</b>
                  </button>
                </ul>
              </div>
            </div>
          </div>
        );
      })}
      <button className='delall' onClick={deleteAll}>
        <b>Delete All</b>
      </button>
      <br />
    </div>
  );
};
export default Product;
