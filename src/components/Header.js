import React, { component } from 'react'
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Header = () => (
    <AppBar position="static">
        <Toolbar variant="regular" center="true"> 
        <div style={{ display: 'flex', flex: 'auto', justifyContent:'center' }}>
          <Typography variant="h5" color="inherit">
              IT Deurali Song Request Portal
          </Typography>
          </div>
        </Toolbar>
      </AppBar>
)

export default Header
// IT Deurali Song Request Portal