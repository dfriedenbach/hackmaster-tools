import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles, StyleRules } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { linkToRoute } from 'client/components/Util';

function linkButton(route: string, text: string) {
  const component = linkToRoute(route);
  return (props: RouteComponentProps) => (
    <ListItem button component={component} selected={!!(props.match)}>
      <Typography>{text}</Typography>
    </ListItem>
  );
}

const GemsLink = linkButton('/gems', 'random gems');
const ArtLink = linkButton('/art', 'random art');


const styles: StyleRules = {
  drawerPaper: {
    position: 'relative',
    width: '180px',
  },
};

class NavBar extends React.Component<{classes: any;}, {}> {
  render() {
    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: this.props.classes.drawerPaper
        }}>
        <List disablePadding>
          <Route path="/gems" children={GemsLink} />
          <Route path="/art" children={ArtLink} />
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles)(NavBar);
