import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockItems = () => {
  const [stockItems, setStockItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/get_stock_items/')
      .then(response => {
        console.log("API Response:", response.data); // Debugging log

        if (response.data && Array.isArray(response.data.stock_items)) {
          setStockItems(response.data.stock_items);
        } else {
          console.error("Invalid API response format:", response.data);
        }

        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching stock items:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Stock Items</h2>
      {loading ? <p>Loading...</p> : (
        stockItems.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
            <thead>
              <tr style={{ backgroundColor: '#f4f4f4' }}>
                <th style={tableHeaderStyle}>Item ID</th>
                <th style={tableHeaderStyle}>Category</th>
                <th style={tableHeaderStyle}>Additional Attribute</th>
                <th style={tableHeaderStyle}>Price ($)</th>
                <th style={tableHeaderStyle}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {stockItems.map((item, index) => (
                <tr key={item.item_id || index} style={{ textAlign: 'center' }}>
                  <td style={tableCellStyle}>{item.item_id}</td>
                  <td style={tableCellStyle}>{item.category}</td>
                  <td style={tableCellStyle}>{item.additional_attribute || "N/A"}</td>
                  <td style={tableCellStyle}>{item.price}</td>
                  <td style={tableCellStyle}>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No stock items available.</p>
        )
      )}
    </div>
  );
}

// Define styles for table headers and cells
const tableHeaderStyle = {
  padding: '10px',
  borderBottom: '2px solid #ddd',
  textAlign: 'center'
};

const tableCellStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
  textAlign: 'center'
};

export default StockItems;
