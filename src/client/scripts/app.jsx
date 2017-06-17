import React from 'react';
import {Bond, TimeBond} from 'oo7';
import {Rspan} from 'oo7-react';
import {InputBond} from 'parity-reactive-ui';
import {bonds, formatBlockNumber} from 'oo7-parity';

export class App extends React.Component {
	render() {
		return (
			<div>
        Latest block's timestamp is: &nbsp;
        <Rspan style={{fontWeight: 'bold'}}>
          {bonds.blocks[bonds.height].map(b => b.timestamp).map(_ => _.toString())}
        </Rspan>
			</div>
		);
	}
}
