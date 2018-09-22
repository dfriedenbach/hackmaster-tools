import * as React from 'react';
import { Route } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import blue from '@material-ui/core/colors/blue';

import GemsView from './components/GemsView';
import NavBar from './components/NavBar';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

class App extends React.Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              HackMaster Tools
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid>
          <NavBar />
          <Route path='/gems' component={GemsView} />
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
