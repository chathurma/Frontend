import React, { useEffect, useState } from 'react';
import DataTable from 'datatables.net';
import $ from 'jquery';
import Swal from 'sweetalert2'
import itemsData from '../data/items.json';
import categoriesData from '../data/categories.json';

export default function ManageItems() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', quantity: '', categoryCode  : '' });
  const [categories, setCategories] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
    const [selectedItem, setSelectedItem] = useState({ id: null, name: '', price: '', quantity: '', categoryCode    : '' });
  
  useEffect(() => {
    // Simulated data for demonstration purposes

    setItems(itemsData);
    setCategories(categoriesData); // Set categories from JSON file


    // Initialize DataTable
    $(document).ready(function () {
      $('#itemsTable').DataTable();
    });

    // Cleanup DataTable when component unmounts
    return () => {
      $('.dataTables_wrapper').remove();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    // Add new item to the items list
    setItems([...items, { ...newItem, id: items.length + 1 }]);
    // Reset the new item state and close the modal
    setNewItem({ name: '', price: '', quantity: '', categoryCode: '' });
    Swal.fire({
      icon: 'success',
      title: 'Item Added Successfully',
      showConfirmButton: false,
      timer: 1500, 
    });
  };


  const handleDeleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
    Swal.fire({
      icon: 'success',
      title: 'Item Deleted Successfully',
      showConfirmButton: false,
      timer: 1500, 
    });
  };

  const handleEditItem = (item) => {
    console.log(item);
    setSelectedItem(item);
  };
  const handleSaveEditItem = () => { 
    newItem.id = selectedItem.id;
    if(newItem.name === ''){
        newItem.name = selectedItem.name;
    }
    if(newItem.price === ''){
        newItem.price = selectedItem.price;
    }
    if(newItem.quantity === ''){
        newItem.quantity = selectedItem.quantity;
    }
    if(newItem.categoryCode === ''){
        newItem.categoryCode = selectedItem.categoryCode;
    }
    const updatedItems = items.map((item) => (item.id === selectedItem.id ? newItem : item));
    setItems(updatedItems);
    Swal.fire({
      icon: 'success',
      title: 'Item Updated Successfully',
      showConfirmButton: false,
      timer: 1500, 
    });
    setEditItemId(null);
    $('#selectItem').val('');
    $('#itemName').val('');
    $('#itemPrice').val('');
    $('#itemQuantity').val('');
    $('#editItemCategory').val('');
  };
 
  return (
    <div>
      <h1>Manage Items</h1>
      <hr />

      {/* Add Item Modal */}
      <div className={`modal fade`} id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark" id="exampleModalLabel">Add Item</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Input fields for adding/editing items */}
              <div className="mb-3">
                <label htmlFor="itemName" className="form-label text-dark">Item Name:</label>
                <input type="text" className="form-control" id="itemName" name="name" value={newItem.name} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="itemPrice" className="form-label text-dark">Price:</label>
                <input type="text" className="form-control" id="itemPrice" name="price" value={newItem.price} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="itemQuantity" className="form-label text-dark">Quantity:</label>
                <input type="text" className="form-control" id="itemQuantity" name="quantity" value={newItem.quantity} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="itemCategory" className="form-label text-dark">Category:</label>
                {/* Dropdown for selecting category */}
                <select className="form-control" id="itemCategory" name="categoryCode" value={newItem.categoryCode} onChange={handleInputChange}>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.categoryCode}>
                        {category.description}
                        </option>
                    ))}
                    </select>
                </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleAddItem}>Add Item</button>
            </div>
          </div>
        </div>
      </div>
 {/* Edit Item Modal */}
        <div className={`modal fade`} id="editItemModal" tabIndex="-1" aria-labelledby="editItemModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="editItemModalLabel">Edit Item</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="selectItem" className="form-label text-dark">Select Item:</label>
                            <select className="form-select" id="selectItem" onChange={(e) => handleEditItem(items.find((item) => item.id === parseInt(e.target.value)))}>
                            <option value="">Select Item</option>
                            {items.map((item) => (
                                <option key={item.id} value={item.id}>
                                {item.name}
                                </option>
                            ))}
                            </select>
                        </div>
                        {/* Input fields for adding/editing items */}
                        <div className="mb-3">
                            <label htmlFor="itemName" className="form-label text-dark">Item Name:</label>
                            <input type="text" className="form-control" id="itemName" name="name" placeholder={selectedItem.name} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="itemPrice" className="form-label text-dark">Price:</label>
                            <input type="text" className="form-control" id="itemPrice" name="price" placeholder={selectedItem.price} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="itemQuantity" className="form-label text-dark">Quantity:</label>
                            <input type="text" className="form-control" id="itemQuantity" name="quantity" placeholder={selectedItem.quantity} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="editItemCategory" className="form-label text-dark">Category:</label>
                            {/* Dropdown for selecting category */}
                            <select className="form-control" id="editItemCategory" name="categoryCode"  onChange={handleInputChange}>
                                <option value="">Select Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.categoryCode}>
                                        {category.description}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleSaveEditItem} >
                        Save Changes
                    </button>
                    </div>
                </div>
            </div>
        </div>
      <div className="row">
        <div className="card bg-light mb-5 m-3 col-4">
          <div className="card-body">
            <h5 className="card-title">Add a new item</h5>
            <p className="card-text">Click the button below to add a new item.</p>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">
              Add Item
            </button>
          </div>
        </div>
         <div className="card bg-light mb-5 m-3 col-4">
                <div className="card-body">
                    <h5 className="card-title">Edit an item</h5>
                    <p className="card-text">Click the button below to edit an item.</p>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editItemModal">
                        Edit Item
                    </button>
                </div>
            </div>
      </div>
           


      {/* DataTable for displaying items */}
      <table id="itemsTable" className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price (RM)</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.categoryCode}</td>
                <td>
                {/* Buttons for editing and deleting items */}
                <button type="button" className="btn btn-danger btn-sm" onClick={() => handleDeleteItem(item.id)}>
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
