import React from 'react';
import {Bond} from 'oo7';
import {Rspan, Rimg} from 'oo7-react';
import {InputBond, HashBond, BButton} from 'parity-reactive-ui';
import {formatBalance} from 'oo7-parity';

export class App extends React.Component {
	constructor() {
		super();
		this.gavofyork = parity.bonds.registry.lookupAddress('gavofyork', 'A');
	}
	render() {
		return (
			<div>
				My balance: <Rspan>
					{parity.bonds.balance(parity.bonds.me).map(formatBalance)}
				</Rspan>
				<br />
				<BButton
					content='Give gavofyork 100 Finney'
					onClick={() => parity.bonds.post({to: this.gavofyork, value: 100 * 1e15})}
				/>
			</div>
		);
	}
}
