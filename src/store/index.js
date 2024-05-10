import { configureStore } from '@reduxjs/toolkit';
import MenuReducer from '@/src/store/slice/menuSlice';
import ToolboxReducer from '@/src/store/slice/toolboxSlice';

const store = configureStore({
  reducer: {
    menu: MenuReducer,
    toolbox: ToolboxReducer,
  },
});

export default store;
