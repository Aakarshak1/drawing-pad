import { Provider } from 'react-redux';
import store from '@/src/store';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className='App'>Hello</div>;
    </Provider>
  );
};

export default App;
