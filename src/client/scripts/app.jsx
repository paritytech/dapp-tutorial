import React from 'react';
import {Bond, TimeBond} from 'oo7';
import {Rspan} from 'oo7-react';
import {InputBond} from 'parity-reactive-ui';

const computeColor = t => t.match(/^[0-9]+$/) ? {color: 'red'} : {color: 'black'}
const format = ([msg, t]) => `${new Date(t)}: ${msg}`

export class App extends React.Component {
	constructor() {
		super();
		this.bond = new Bond();
		this.time = new TimeBond();
	}
	render() {
		return (
			<div>
				<InputBond
					bond={this.bond}
					placeholder="Go ahead and type some text"
				/>
				<Rspan
					style={this.bond.map(computeColor)}
				>
					{Bond.all([this.bond, this.time]).map(format)}
				</Rspan>
			</div>
		);
	}
}
