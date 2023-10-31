import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchInput = ({searchInput, handleSearch}) => {

  return ( 
        <TextField size="small" id="outlined-basic" variant="outlined" placeholder="Search here...." value={searchInput} onChange={handleSearch} style={{marginRight: "5px"}} InputProps={{
        endAdornment: (
          <InputAdornment position="start" >
            <SearchIcon />
          </InputAdornment>
        )
        }}></TextField> 
  )
}
