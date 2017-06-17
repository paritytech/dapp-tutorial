import React from 'react';
import {Bond} from 'oo7';
import {Rspan} from 'oo7-react';
import {InputBond} from 'parity-reactive-ui';

export class App extends React.Component {
	constructor() {
		super();
		this.bond = new Bond();
	}
	render() {
		return (
			<div>
				<InputBond bond={this.bond} placeholder="Go ahead and type some text"/>
        <Rspan style={{color: this.bond.map(t => t.match(/^[0-9]+$/) ? 'red' : 'black')}}>
        	{this.bond.map(t => t.toUpperCase())}
        </Rspan>
			</div>
		);
	}
}
