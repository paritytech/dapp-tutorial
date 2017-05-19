import React from 'react';
import {Bond} from 'oo7';
import {Rspan, Rimg} from 'oo7-react';
import {InputBond, HashBond, BButton, TransactButton} from 'parity-reactive-ui';
import {formatBalance, isNullData} from 'oo7-parity';

const CounterABI = [
	{"constant":false,"inputs":[{"name":"_option","type":"uint256"}],"name":"vote","outputs":[],"payable":false,"type":"function"},
	{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"hasVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},
	{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"votes","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},
	{"anonymous":false,"inputs":[{"indexed":true,"name":"who","type":"address"},{"indexed":true,"name":"option","type":"uint256"}],"name":"Voted","type":"event"}
];
const Options = ['Red', 'Green', 'Blue'];

export class App extends React.Component {
	constructor() {
		super();
		this.counter = parity.bonds.makeContract('0x7aC77Cb854E064f22E747F40b90FE6D6Bc1e3197', CounterABI);
	}
	render () {
		return (<div>
			{Options.map((n, i) => (<div key={i}>
				<Rspan style={{
					borderLeft: this.counter
						.votes(i)
						.map(v => `${1 + v * 10}px black solid`)
				}}>
					<span style={{float: 'left', minWidth: '3em'}}>
						{n}
					</span>
				</Rspan>
			</div>))}
		</div>);
	}
}
