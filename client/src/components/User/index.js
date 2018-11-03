import React, {Fragment} from 'react';
import UserHistoryBlock from '../UI/User/history_block';
import {Button, Grid} from "@material-ui/core";
import Link from "react-router-dom/es/Link";

const UserDashboard = ({user}) => {
   return (
       <Fragment>
          <Grid container>
             <Grid item xs={12}>
                <h1>User information</h1>
                <div>
                   <div style={{margin: '10px', padding: '5px'}}>{user.name}</div>
                   <div style={{margin: '10px', padding: '5px'}}>{user.contactNumber}</div>
                   <div style={{margin: '10px', padding: '5px'}}>{user.email}</div>
                   <div style={{margin: '10px', padding: '5px'}}>{user.address}</div>
                </div>
                <Link to={"/user/user_profile"}>
                   <Button variant="contained" color="primary">Update Profile</Button>
                </Link>
             </Grid>

          </Grid>

          {
             user.ordersHistory ?
                 <Grid item xs={12}>
                    <h1>History purchases</h1>
                    <div >
                       <UserHistoryBlock
                           products={user.ordersHistory}
                       />
                    </div>
                 </Grid>
                 : null
          }
       </Fragment>
   )
       ;
};

export default UserDashboard;