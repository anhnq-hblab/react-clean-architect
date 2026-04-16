import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './infrastructure/store';
import { AppRoutes } from './presentation/routes';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
