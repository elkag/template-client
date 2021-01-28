import React from 'react';
import { CircularProgress, Backdrop, ThemeProvider } from '@material-ui/core';
import { theme } from './theme';


const PageBackdrop = ({loading}) => {
  
  return (
    <ThemeProvider theme={theme}>
      <Backdrop open={loading}>
            <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  )
}


export default PageBackdrop;