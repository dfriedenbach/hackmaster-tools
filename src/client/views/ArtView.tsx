import * as React from "react";
import * as Art from "game/art";
import { simpleCurrencyString } from "shared/util";

import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import { withStyles, StyleRules } from "@material-ui/core/styles";

function renderArt(art: Art.IArt, index: number) {
  return (
    <Grid item key={index}>
      {[
        Art.typeDescriptions[art.type],
        Art.renownDescriptions[art.renown],
        Art.sizeDescriptions[art.size],
        Art.materialDescriptions[art.materialQuality],
        Art.workDescriptions[art.workQuality],
        art.age + " years old",
        Art.conditionDescriptions[art.condition],
        Art.subjectDescriptions[art.subject],
        simpleCurrencyString(art.value),
      ].join(", ")}
    </Grid>
  );
}

const styles: StyleRules = {
  root: {
    padding: "24px",
    flexGrow: 1,
  },
};

interface IState {
  art: Art.IArt[];
}

class ArtView extends React.Component<{ classes: any }, IState> {
  private numberInput: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    this.state = { art: [] };
    this.numberInput = React.createRef();
  }
  generateArt = () => {
    const input = this.numberInput.current;
    if (!input) {
      return;
    }
    const numArt = parseInt(input.value, 10);
    if (isNaN(numArt) || numArt < 1) {
      return;
    }
    const art: Art.IArt[] = [];
    for (let i = 0; i < numArt; i++) {
      art.push(Art.randomArt());
    }
    this.setState({ art });
  };
  render() {
    const artComponents: JSX.Element[] = this.state.art.map(renderArt);
    return (
      <div className={this.props.classes.root}>
        <Grid direction="column" container spacing={2}>
          <Grid container item spacing={4}>
            <Grid item>
              <Input
                inputRef={this.numberInput}
                type="number"
                placeholder="number of art objects"
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={this.generateArt}
              >
                generate
              </Button>
            </Grid>
          </Grid>
          {artComponents}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(ArtView);
