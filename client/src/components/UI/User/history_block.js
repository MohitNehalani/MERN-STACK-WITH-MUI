import React from 'react';
// {moment(product.dateOfPurchase).format("MM-DD-YYYY")}

const UserHistoryBlock = (props) => {


   const renderBlocks = () => (
       props.products.length > 0 ?
           props.products.map((product,i)=>(
               <tr key={i}>
                  <td>{product.order}</td>
                  <td>{product.brand} {product.name}</td>
                  <td>$ {product.price}</td>
                  <td>{product.quantity}</td>
               </tr>
           ))
           :<tr>
              <td style={{color:"orange", margin:'10px', padding:'10px'}}>
                 You have not purchased anything yet
              </td>
           </tr>

   )

   return (
       <div className="history_blocks">
          <table>
             <thead>
             <tr>
                <th>Order number</th>
                <th>Product</th>
                <th>Price paid</th>
                <th>Quantity</th>
             </tr>
             </thead>
             <tbody>
             {renderBlocks()}
             </tbody>
          </table>
       </div>
   );
};

export default UserHistoryBlock;