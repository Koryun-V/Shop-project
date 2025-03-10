import React, { useState } from 'react';
import axios from 'axios';

function ProductForm() {
    const [formData, setFormData] = useState({
        name: '',
        size: '',
        price: '',
        description: '',
        brandName: '',
        productImage: null,
    });

    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYxLCJlbWFpbCI6ImFkbWluQG1haWwucnUiLCJpYXQiOjE3NDE1MjA0MDMsImV4cCI6MTc0NDExMjQwM30.OnQGtsVYvHjvOvQ1Xv06ZrJHofwSXDc2e6vJJ61MhUo";

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const categoryId = 24;
        const form = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'productImage' && formData.productImage) {
                for (let i = 0; i < formData.productImage.length; i++) {
                    form.append(key, formData.productImage[i]);
                }
            } else {
                form.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post(
                `https://world-of-construction.onrender.com/admin/product/${categoryId}`,
                form,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h1>Test</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="Size"
                />
                <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                />
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <input
                    type="text"
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleChange}
                    placeholder="Brand Name"
                />
                <input
                    type="file"
                    name="productImage"
                    onChange={handleChange}
                    multiple
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ProductForm;
