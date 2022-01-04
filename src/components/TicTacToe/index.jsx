import React from 'react';
import './index.css'

class Square extends React.Component {
  render() {
    let active = this.props.indexList[this.props.step - 1] === this.props.i ? 'active' : '',
      acBg = this.props.winIndex && this.props.winIndex.includes(this.props.i) ? 'active-bg' : '';
    return (
      <button className={`square ${active} ${acBg}`} onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square key={i} i={i} winIndex={this.props.winIndex} indexList={this.props.indexList} step={this.props.step} value={this.props.list[i]} onClick={() => this.props.onClick(i)} />
    );
  }
  render() {
    let list = Array(3).fill(null).map((i, a) => (
      <div className="board-row" key={a}>
        {Array(3).fill(null).map((j, b) => (
          this.renderSquare(a * 3 + b)
        ))}
      </div>
    ))
    return (
      <div>
        {list}
      </div>
    );
  }
}

export class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          list: Array(9).fill(null),
        }
      ],
      position: [],
      step: 0,
      isNext: true,
      indexList: [],
      winIndex: null,
      order: false,
    }
    this.handleOrder = this.handleOrder.bind(this)
  }
  handleClick(index) {
    let history = this.state.history.slice(0, this.state.step + 1)
    let copyList = history[history.length - 1].list.slice()
    if (this.clcaWinner(copyList) || copyList[index]) {
      return;
    }
    copyList[index] = this.state.isNext ? 'X' : 'O';
    let position = this.state.position.slice(0, this.state.step),
      indexList = this.state.indexList.slice(0, this.state.step),
      row = index % 3,
      cur = parseInt(index / 3),
      msg = `行${cur + 1} 列${row + 1}`;
    position.push(msg)
    indexList.push(index)
    this.handleWinStatus(copyList)
    this.setState({history: history.concat({list: copyList}), position, indexList, step: history.length, isNext: !this.state.isNext})
  }
  handleWinStatus(copyList) {
    this.setState({winIndex: this.clcaWinner(copyList)})
  }
  clcaWinner(list) {
    const winList = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    let checkObj = winList.find(i => {
      const [a, b, c] = i
      if (list[a] && (list[a] === list[b]) && (list[a] === list[c])) {
        return i;
      } else {
        return null;
      }
    })
    return checkObj
  }
  jump(idx) {
    let history = this.state.history.slice(0, idx + 1)
    let copyList = history[history.length - 1].list.slice()
    this.handleWinStatus(copyList)
    this.setState({step: idx, isNext: (idx % 2) === 0,})
  }
  handleOrder() {
    this.setState({order: !this.state.order})
  }
  componentDidMount () {
    console.log('creat TicTacToe')
  }
  render() {
    const current = this.state.history[this.state.step]
    const win = this.clcaWinner(current.list);
    let status;
    if (win) {
      status = `胜利者是: ${!this.state.isNext ? 'X' : 'O'}`;
    } else {
      status = (this.state.step > 0 && this.state.history.length > 9) ? '平局' : `下一个: ${this.state.isNext ? 'X' : 'O'}`;
    }
    let moveList = []
    if (this.state.order) {
      this.state.history.forEach(i => {
        moveList.unshift(i)
      })
    } else {
      moveList = this.state.history
    }
    const moves = moveList.map((item, index) => {
      let acIndex = this.state.order ? moveList.length - index - 1 : index;
      let message = '';
      if (this.state.order) {
        message = acIndex ? `回到第${acIndex}步：${this.state.position[acIndex - 1]}` : '重新开始'
      } else {
        message = index ? `回到第${acIndex}步：${this.state.position[acIndex - 1]}` : '重新开始'
      }
      return (
        <li key={acIndex} className={this.state.step === acIndex ? 'active' : ''}>
          <button onClick={() => this.jump(acIndex)}>{message}</button>
        </li>
      )
    })
    return (
      <div className="game">
        <div className="game-board">
          <Board list={current.list} winIndex={this.state.winIndex} indexList={this.state.indexList} step={this.state.step} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div className="info-title">{status}</div>
          <div>排序：<button onClick={this.handleOrder}>{this.state.order ? '升序' : '降序'}</button></div>
          <ol reversed={this.state.order ? true : false}>{moves}</ol>
        </div>
      </div>
    );
  }
}

// function TestForm() {
//   return (
//     <form>
//       <label>
//         名字:
//         <input type="text" name="name" />
//       </label>
//       <input type="submit" value="提交" />
//     </form>
//   )
// }
