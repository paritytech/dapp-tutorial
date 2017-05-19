import React from 'react';
import {Bond} from 'oo7';
import {Rspan, Rimg, ReactiveComponent} from 'oo7-react';
import {InputBond, HashBond, BButton, TransactionProgressLabel, AccountIcon} from 'parity-reactive-ui';
import {formatBalance, isNullData} from 'oo7-parity';

const CounterABI = [
	{"constant":false,"inputs":[{"name":"_option","type":"uint256"}],"name":"vote","outputs":[],"payable":false,"type":"function"},
	{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"hasVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},
	{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"votes","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},
	{"anonymous":false,"inputs":[{"indexed":true,"name":"who","type":"address"},{"indexed":true,"name":"option","type":"uint256"}],"name":"Voted","type":"event"}
];
const Options = ['Red', 'Green', 'Blue'];

class VoteOption extends ReactiveComponent {
	constructor () {
		super(['votes', 'enabled', 'already']);
	}
	readyRender () {
		var s = {float: 'left', minWidth: '3em'};
		if (!this.state.enabled)
			s.cursor = 'not-allowed';
		return (<span style={{ borderLeft:
			`${1 + this.state.votes * 10}px black solid` }}>
			<a
				style={s}
				href='#'
				onClick={this.state.enabled && this.props.vote}>
				{this.props.label}
			</a>
			{this.state.already.map(a => (<AccountIcon
				style={{width: '1.2em', verticalAlign: 'bottom', marginLeft: '1ex'}}
				key={a}
				address={a}
			/>))}
		</span>);
	}
}

export class Counter extends React.Component {
	constructor() {
		super();
		this.state = { tx: null };
	}
	componentWillMount () { this.componentWillReceiveProps(this.props); }
	componentWillReceiveProps (props) {
		this.voted = this.props.contract.hasVoted(parity.bonds.me);
		this.prevVote = this.props.contract.Voted({ who: parity.bonds.me });
		this.prevVotes = this.props.contract.Voted({ who: parity.bonds.accounts });
	}
	render () {
		var votingEnabled = Bond.all([this.voted, this.state.tx])
			.map(([v, t]) => !v && (!t || !!t.failed));
		return (<div>
			{Options.map((n, i) => (<div key={i}><VoteOption
				label={n}
				votes={this.props.contract.votes(i)}
				vote={() => this.setState({tx: this.props.contract.vote(i)})}
				enabled={votingEnabled}
				already={this.prevVotes.map(a => a.filter(x => x.option == i).map(x => x.who))}
			/></div>))}
			<div style={{marginTop: '1em'}}>
				<TransactionProgressLabel value={this.state.tx}/>
			</div>
			<Rspan>
				{this.prevVote.map(v => v.length > 0 ? `Already voted for ${Options[v[0].option]}` : '')}
			</Rspan>
		</div>);
	}
}

export class App extends React.Component {
	constructor () {
		super();
		this.state = { counter: parity.bonds.makeContract('0x7aC77Cb854E064f22E747F40b90FE6D6Bc1e3197', CounterABI) };
	}
	render () {
		return (<div>
			<Counter contract={this.state.counter} />
		</div>);
	}
}
