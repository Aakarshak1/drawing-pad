import { Provider } from 'react-redux';
import store from '@/src/store';
import './App.css';

import Board from '@/src/components/Board';
import Menu from '@/src/components/Menu';

const App = () => {
  return (
    <Provider store={store}>
      <>
        <Board />
        <Menu />
      </>
    </Provider>
  );
};

export default App;
