import React from 'react';
import {Bond} from 'oo7';
import {Rspan, Rimg} from 'oo7-react';
import {InputBond, HashBond} from 'parity-reactive-ui';
import {formatBalance} from 'oo7-parity';

export class App extends React.Component {
	constructor() {
		super();
		this.bond = new Bond;
		this.GithubHint = parity.bonds.makeContract(parity.bonds.registry.lookupAddress('githubhint', 'A'), parity.api.abi.githubhint);
	}
	render() {
		return (
			<div>
				<InputBond bond={this.bond} placeholder='Name' />
				<Rimg src={this.GithubHint.entries(parity.bonds.registry.lookupData(this.bond, 'IMG'))[0]} />
			</div>
		);
	}
}
