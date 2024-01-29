import React, { useEffect, useState } from 'react';
import DataTable from 'datatables.net';
import $ from 'jquery';
import Swal from 'sweetalert2'
import categoriesData from '../data/categories.json';

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ categoryCode: '', description: '' });
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({ id: null, categoryCode: '', description: '' });

  useEffect(() => {
    // Simulated data for demonstration purposes
    setCategories(categoriesData);

    // Initialize DataTable
    $(document).ready(function () {
      $('#categoriesTable').DataTable();
    });

    // Cleanup DataTable when component unmounts
    return () => {
      $('.dataTables_wrapper').remove();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleAddCategory = () => {
    setCategories([...categories, { ...newCategory, id: categories.length + 1 }]);
    Swal.fire({
        icon: 'success',
        title: 'Category Added Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    setNewCategory({ categoryCode: '', description: '' });
    
  };

  const handleDeleteCategory = (categoryId) => {
    // Filter out the category with the specified id
    const updatedCategories = categories.filter((category) => category.id !== categoryId);
    setCategories(updatedCategories);
    Swal.fire({
        icon: 'success',
        title: 'Category Deleted Successfully',
        showConfirmButton: false,
        timer: 1500
      })
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    $('#editCategoryModal').modal('show');
  };

  const handleSaveEditCategory = () => {
    if (!selectedCategory.categoryCode) {
      alert('Please select a category to edit');
      return;
    }
    if (newCategory.categoryCode === '') {
        newCategory.categoryCode = selectedCategory.categoryCode;
    }
    if(newCategory.description === ''){
        newCategory.description = selectedCategory.description;
    }
    const updatedCategories = categories.map((category) =>
      category.id === selectedCategory.id ? { ...selectedCategory, ...newCategory } : category
    );
    setCategories(updatedCategories);
    Swal.fire({
        icon: 'success',
        title: 'Category Edited Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    setEditCategoryId(null);
  };

  return (
    <div>
      <h1>Manage Categories</h1>
      <hr />

      {/* Add Category Modal */}
      <div className={`modal fade`} id="addCategoryModal" tabIndex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark" id="addCategoryModalLabel">
                Add Category
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Input fields for adding categories */}
              <div className="mb-3">
                <label htmlFor="categoryCode" className="form-label text-dark">
                  Category Code:
                </label>
                <input type="text" className="form-control" id="categoryCode" name="categoryCode" value={newCategory.categoryCode} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label text-dark">
                  Description:
                </label>
                <input type="text" className="form-control" id="description" name="description" value={newCategory.description} onChange={handleInputChange} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleAddCategory}>
                Add Category
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Category Modal */}
      <div className={`modal fade`} id="editCategoryModal" tabIndex="-1" aria-labelledby="editCategoryModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark" id="editCategoryModalLabel">
                Edit Category
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Input fields for editing categories */}
              <div className="mb-3">
                <label htmlFor="editCategoryCode" className="form-label text-dark">
                  Category Code:
                </label>
                <select
                    className="form-select"
                    id="editCategoryCode"
                    name="categoryCode"
                    value={selectedCategory.categoryCode}
                    onChange={(e) => setSelectedCategory(categories.find(category => category.id === parseInt(e.target.value)))}
                    >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                        {category.categoryCode}
                        </option>
                    ))}
                    </select>

              </div>
              <div className="mb-3">
                <label htmlFor="editDescription" className="form-label text-dark">
                  Description:
                </label>
                <input type="text" className="form-control" id="editDescription" name="description" placeholder={selectedCategory.description} onChange={handleInputChange} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSaveEditCategory}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="card bg-light mb-5 m-3 col-4">
          <div className="card-body">
            <h5 className="card-title">Add a new category</h5>
            <p className="card-text">Click the button below to add a new category.</p>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCategoryModal">
              Add Category
            </button>
          </div>
        </div>
         <div className="card bg-light mb-5 m-3 col-4">
                <div className="card-body">
                    <h5 className="card-title">Edit an categories</h5>
                    <p className="card-text">Click the button below to edit an category.</p>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editCategoryModal">
                        Edit Category
                    </button>
                </div>
            </div>
      </div>

      {/* Display Categories Table */}
      <table id="categoriesTable" className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Code</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.categoryCode}</td>
              <td>{category.description}</td>
              <td>
              
                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteCategory(category.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
