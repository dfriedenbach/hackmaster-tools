import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import blue from '@material-ui/core/colors/blue';

import { GemsView } from './components/GemsView';

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
        <GemsView />
      </MuiThemeProvider>
    );
  }
}

export default App;
