class Jogo extends React.Component {
  render() {
    return (
      React.createElement("div", { className: "game" },

      React.createElement("div", { className: "game-board" },
      React.createElement(Tabuleiro, null)),


      React.createElement("div", { className: "game-info" },
      React.createElement("span", { className: "game-history" }, "Movimentos"),
      React.createElement("ol", null))));




  }}



class Tabuleiro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quadrados: Array(9).fill(null),
      xIsNext: true };

  }

  reset() {
    this.setState({
      quadrados: Array(9).fill(null),
      xIsNext: true });

  }

  hasOver() {
    return !this.state.quadrados.includes(null) || calculateWinner(this.state.quadrados);
  }

  ramdom() {
    if (this.hasOver()) {
      alert('O jogo já acabou');
      return;
    }

    const vazios = this.state.quadrados.reduce((a, v, i) => {
      if (!v)
      a.push(i);
      return a;
    }, Array());
    this.handleClick(vazios[Math.floor(Math.random() * vazios.length)]);
  }

  render() {
    const vencedor = calculateWinner(this.state.quadrados);
    const status = vencedor ? 'Vencedor: ' + vencedor : this.hasOver() ? 'Empate' : 'Jogador: ' + (this.state.xIsNext ? 'X' : 'O');
    return (
      React.createElement("div", null,
      React.createElement("div", null, status),
      React.createElement("div", { className: "board-row" },
      this.renderizarQuadrado(0),
      this.renderizarQuadrado(1),
      this.renderizarQuadrado(2)),

      React.createElement("div", { className: "board-row" },
      this.renderizarQuadrado(3),
      this.renderizarQuadrado(4),
      this.renderizarQuadrado(5)),


      React.createElement("div", { className: "board-row" },
      this.renderizarQuadrado(6),
      this.renderizarQuadrado(7),
      this.renderizarQuadrado(8)),

      React.createElement("p", null,
      React.createElement("button", { className: "randomButton", onClick: () => this.ramdom() }, "Aleat\xF3ria"),


      React.createElement("button", { className: "resetButton", onClick: () => this.reset() }, "Reiniciar"))));





  }

  renderizarQuadrado(i) {
    return (
      React.createElement(Quadrado, {
        value: this.state.quadrados[i],
        onClick: () => this.handleClick(i) }));


  }

  handleClick(i) {

    const quadrados = this.state.quadrados.slice();

    if (this.hasOver()) {
      alert('O jogo já acabou');
      return;
    }

    if (quadrados[i]) {
      return;
    }

    quadrados[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({ quadrados: quadrados, xIsNext: !this.state.xIsNext });
  }}

class Quadrado extends React.Component {

  render() {
    return (
      React.createElement("button", {
        className: "square",
        onClick: this.props.onClick },

      this.props.value));


  }}


/*function Quadrado(props) {
        return (
          <button className="square" onClick={props.onClick}>
            {props.value}
          </button>
        );
      }*/


function calculateWinner(quadrados) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];


  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c])
    return quadrados[a];
  }

  return null;
}

ReactDOM.render(
React.createElement(Jogo, null),
document.getElementById('root'));


/*ReactDOM.render(
                                     <Tabuleiro quadrados={Array(9).fill().map((v, pos) => pos)} />,
                                     document.getElementById("root")  
                                   );*/

/*ReactDOM.render(
                                           <Quadrado onClick={() => alert("Clicou!")} value={2 + 2} />,
                                           document.getElementById("root")
                                         );*/