import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Input from "../../components/Input";
import axios from 'axios';

const Edit = () => {
  const { id } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    status: false
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`/products/${id}`);
      setFormData(response.data);
    };
    fetchProduct();
  }, [id]);

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = ['Name is required'];
    if (!formData.price) errors.price = ['Price is required'];
    if (!formData.stock) errors.stock = ['Stock is required'];
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      await axios.put(`/products/${id}`, formData);
      setSuccessMessage('Data berhasil diupdate');
      setErrors({});
      setTimeout(() => history.push('/'), 2000);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={formData.name} onChange={handleChange} error={errors.name} />
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={formData.price} onChange={handleChange} error={errors.price} />
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" value={formData.stock} onChange={handleChange} error={errors.stock} />
          <Input name="status" type="checkbox" label="Active" checked={formData.status} onChange={handleChange} />
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
