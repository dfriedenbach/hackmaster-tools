import * as React from 'react';
import * as Gems from '../gems';
import { simpleCurrencyString } from '../util';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

function renderGem(gem: Gems.IGem, index: number) {
  return (
    <Grid item key={index}>
      {[gem.name, Gems.sizeDescriptions[gem.size], Gems.qualityDescriptions[gem.quality], simpleCurrencyString(gem.value)].join(', ')}
    </Grid>
  );
}

const styles = {
  root: {
    padding: '24px',
  },
};

interface IState {
  gems: Gems.IGem[];
}

class GemsView extends React.Component<{classes: any;}, IState> {
  private numberInput: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    this.state = { gems: [] };
    this.numberInput = React.createRef();
  }
  generateGems = () => {
    const input = this.numberInput.current;
    if (!input) {
      return;
    }
    const numGems = parseInt(input.value, 10);
    if (isNaN(numGems) || numGems < 1) {
      return;
    }
    const gems: Gems.IGem[] = [];
    for (let i = 0; i < numGems; i++) {
      gems.push(Gems.randomGem());
    }
    this.setState({ gems });
  }
  render() {
    const gemComponents: JSX.Element[] = this.state.gems.map(renderGem);
    return (
      <Grid direction="column" container spacing={8} className={this.props.classes.root}>
        <Grid container item spacing={16}>
          <Grid item>
            <Input inputRef={this.numberInput} type="number" placeholder="number of gems" />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={this.generateGems}>generate</Button>
          </Grid>
        </Grid>
        {gemComponents}
      </Grid>
    );
  }
}

export default withStyles(styles)(GemsView);
