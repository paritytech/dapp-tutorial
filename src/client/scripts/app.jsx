import React from 'react';
import {Bond} from 'oo7';
import {Rspan, Rimg} from 'oo7-react';
import {InputBond, HashBond, BButton, TransactButton} from 'parity-reactive-ui';
import {formatBalance, isNullData} from 'oo7-parity';

export class App extends React.Component {
	constructor() {
		super();
		this.name = new Bond;
		this.recipient = parity.bonds.registry.lookupAddress(this.name, 'A');
	}
	render() {
		return (
			<div>
				My balance: <Rspan>
					{parity.bonds.balance(parity.bonds.me).map(formatBalance)}
				</Rspan>
				<br />
				<InputBond bond={this.name} placeholder='Name of recipient' />
				<TransactButton
					content={this.name.map(n => `Give ${n} 100 Finney`)}
					disabled={this.recipient.map(isNullData)}
					tx={{
						to: this.recipient,
						value: 100 * 1e15
					}}
				/>
			</div>
		);
	}
}
