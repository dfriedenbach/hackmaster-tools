import * as React from 'react';
import * as Gems from '../gems';
import { simpleCurrencyString } from '../util';

interface IState {
  gems: Gems.IGem[];
}

export class GemsView extends React.Component<{}, IState> {
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
    const gemComponents: JSX.Element[] = this.state.gems.map((gem: Gems.IGem, index: number) => {
      return (
        <div key={index}>
          {[gem.name, Gems.sizeDescriptions[gem.size], Gems.qualityDescriptions[gem.quality], simpleCurrencyString(gem.value)].join(', ')}
        </div>
      );
    });
    return (
      <div className='flexCol'>
        Gem Generator
        <div className='flexRow jc-c'>
          <input ref={this.numberInput} type='number' placeholder='number of gems' />
          <button onClick={this.generateGems}>generate</button>
        </div>
        {gemComponents}
      </div>
    );
  }
}