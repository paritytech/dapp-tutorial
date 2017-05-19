import React from 'react';
import {Bond} from 'oo7';
import {Rspan} from 'oo7-react';
import {InputBond} from 'parity-reactive-ui';
import {formatBalance} from 'oo7-parity';

export class App extends React.Component {
	constructor() {
		super();
		this.bond = new Bond;
	}
	render() {
		return (
			<div>
				Address of <InputBond bond={this.bond} placeholder='Lookup a name' /> is:<br/>
				<Rspan>{parity.bonds.registry.lookupAddress(this.bond, 'A')}</Rspan>
				, it's balance is <Rspan>
					{parity.bonds.balance(parity.bonds.registry.lookupAddress(this.bond, 'A')).map(formatBalance)}
				</Rspan>
			</div>
		);
	}
}
