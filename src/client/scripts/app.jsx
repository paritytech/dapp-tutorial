import React from 'react';
import {Bond, TimeBond} from 'oo7';
import {Rspan} from 'oo7-react';
import {InputBond} from 'parity-reactive-ui';
import {bonds, formatBalance, formatBlockNumber} from 'oo7-parity';

export class App extends React.Component {
	render() {
		return (
			<div>
				Current block author's balance is:&nbsp;
				<Rspan style={{fontWeight: 'bold'}}>
					{bonds.balance(bonds.head.author).map(formatBalance)}
				</Rspan>
			</div>
		);
	}
}
