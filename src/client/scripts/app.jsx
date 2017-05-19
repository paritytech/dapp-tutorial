import React from 'react';
import {Bond, TimeBond} from 'oo7';
import {Rspan} from 'oo7-react';
import {InputBond} from 'parity-reactive-ui';
import {formatBlockNumber, formatBalance} from 'oo7-parity';

export class App extends React.Component {
	render() {
		return (
			<div>
				Current block author's balance is:&nbsp;
				<Rspan style={{fontWeight: 'bold'}}>
					{parity.bonds.balance(parity.bonds.head.author).map(formatBalance)}
				</Rspan>
			</div>
		);
	}
}
