import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

const Forum = () => {
  const [forums, setForums] = useState([
    {
    title: 'Reservation',
    author: 'Ambedkar',
    dateOfAdding: '2022-03-20',
    body: 'It is a help provided by over constitution to the backward people.',
  },
  ]);
  const getForums = () => {
    axios
      .get('/forum')
      .then((res) => {
        setForums(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getForums();
  }, []);
  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      dateOfAdding: '',
      body: '',
    },
    onSubmit(values) {
      const forumOb = {
        title: formik.values.title,
        author: formik.values.author,
        dateOfAdding: formik.values.dateOfAdding,
        body: formik.values.body,
      };
      axios
        .post('/forum', forumOb)
        .then((res) => {
          getForums();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
      const errors = {};
      const combined = /^[0-9a-zA-Z]+$/;
      if (formik.values.title.length < 10 || formik.values.title.length > 100) {
        errors.title =
          '*title must have minimum of 10 and maximum of 100 characters';
      }
      if (formik.values.author.length < 5 || formik.values.author.length > 50) {
        errors.author =
          '*author must have minimum of 5 and maximum of 50 characters';
      }
      if (!formik.values.author.match(combined)) {
        errors.author = '*author name must be alpha numberic';
      }
      if (formik.values.body.length < 50 || formik.values.body.length > 500) {
        errors.body =
          '*body must have minimum of 50 and maximum of 500 characters';
      }
      return errors;
    },
  });
  const deleteForum = (indexToDelete) => {
    axios
      .delete('/forum/' + indexToDelete)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getForums();
  };
  const deleteAll = () => {
    axios
      .get('/forum/deleteall')
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getForums();
  };
  return (
    <div className='forum'>
      <h1>User Details</h1>
      <form className='forumf' onSubmit={formik.handleSubmit} noValidate>
        <b>Title : </b>
        <input
          type='text'
          name='title'
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <br />
        <div className='text-danger'>
          {formik.errors.title ? formik.errors.title : null}
        </div>
        <br />
        <b>Author : </b>
        <input
          type='text'
          name='author'
          value={formik.values.author}
          onChange={formik.handleChange}
        />
        <br />
        <div className='text-danger'>
          {formik.errors.author ? formik.errors.author : null}
        </div>
        <br />
        <b>Date of Adding : </b>
        <input
          type='date'
          name='dateOfAdding'
          value={formik.values.dateOfAdding}
          onChange={formik.handleChange}
        />
        <br />
        <br />
        <b>Body : </b>
        <br />
        <textarea
          className='desc'
          name='body'
          value={formik.values.body}
          onChange={formik.handleChange}
        />
        <div className='text-danger'>
          {formik.errors.body ? formik.errors.body : null}
        </div>
        <br />
        <button>Add Forum</button>
      </form>
      <div className='row text-center text-white mb-5'>
        <div className='col-lg-7 mx-auto'>
          <h1 className='display-4'>Forums List</h1>
        </div>
      </div>
      {forums.map((val, index) => {
        return (
          <div className='container py-4'>
            <div className='row'>
              <div className='col-lg-8 mx-auto'>
                <ul className='list-group shadow'>
                  <li className='list-group-item'>
                    <div className='media align-items-lg-center flex-column flex-lg-row p-3'>
                      <h5 className='mt-0 font-weight-bold mb-2'>
                        Forum {index + 1}
                      </h5>
                      <h6 className='mt-0 font-weight-bold mb-2'>
                        Title: {val.title}
                      </h6>
                      <p className='font-italic text-muted mb-0 small'>
                        {val.body}
                      </p>
                      <div className='d-flex align-items-center justify-content-between mt-1'>
                        <h6 className='font-weight-bold my-2'>
                          Author: {val.author}
                        </h6>
                        <h6 className='font-weight-bold my-2'>
                          Date: {val.dateOfAdding}
                        </h6>
                      </div>
                    </div>
                  </li>
                  <button
                    className='delall'
                    onClick={() => {
                      deleteForum(index);
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
    </div>
  );
};
export default Forum;
