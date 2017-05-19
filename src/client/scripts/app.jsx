import React from 'react';
import {Bond} from 'oo7';
import {Rspan, Rimg} from 'oo7-react';
import {InputBond, HashBond, BButton} from 'parity-reactive-ui';
import {formatBalance, isNullData} from 'oo7-parity';

export class App extends React.Component {
	constructor() {
		super();
		this.name = new Bond;
		this.recipient = parity.bonds.registry.lookupAddress(this.name, 'A');
		this.state = { current: null };
	}
	give () {
		this.setState({
			current: parity.bonds.post({
				to: this.recipient,
				value: 100 * 1e15
			})
		})
	}
	render() {
		return (
			<div>
				My balance: <Rspan>
					{parity.bonds.balance(parity.bonds.me).map(formatBalance)}
				</Rspan>
				<br />
				<InputBond bond={this.name} placeholder='Name of recipient' />
				<BButton
					content={this.name.map(n => `Give ${n} 100 Finney`)}
					disabled={this.recipient.map(isNullData)}
					onClick={this.give.bind(this)}
				/>
				<Rspan>{this.state.current && this.state.current.map(JSON.stringify)}</Rspan>
			</div>
		);
	}
}
