import * as React from 'react';
import { Route } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import blue from '@material-ui/core/colors/blue';

import ArtView from './components/ArtView';
import GemsView from './components/GemsView';
import NavBar from './components/NavBar';

import * as Util from './util';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

const appStyle = Util.deepFreeze({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
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
        <div style={appStyle}>
          <NavBar />
          <Route path="/gems" component={GemsView} />
          <Route path="/art" component={ArtView} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
