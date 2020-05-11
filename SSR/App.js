import React from 'react';
import Generetor from './components/Dragging/generator';
class App extends React.Component {
  render(){
    return (
        <Generetor  datas={this.props.datas} author_name={this.props.author_name}>
            

        </Generetor>

    );
    }
}
export default App;