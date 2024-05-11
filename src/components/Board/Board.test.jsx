import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MenuReducer from '@/src/store/slice/menuSlice';
import ToolboxReducer from '@/src/store/slice/toolboxSlice';
import { describe, beforeEach, it, expect } from 'vitest';
import Board from './Board';

describe('Board', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        menu: MenuReducer,
        toolbox: ToolboxReducer,
      },
    });
  });

  it('should render canvas element', () => {
    render(
      <Provider store={store}>
        <Board />
      </Provider>
    );
    expect(screen.getByTestId('canvas')).toBeInTheDocument();
  });

  it('should handle mouse down event', () => {
    render(
      <Provider store={store}>
        <Board />
      </Provider>
    );
    const canvas = screen.getByTestId('canvas');
    fireEvent.mouseDown(canvas, { clientX: 10, clientY: 10 });
    const ctx = canvas.getContext('2d');

    // Verify that beginPath() is called
    expect(ctx.beginPath).toHaveBeenCalled();

    // Verify that moveTo() is called with the correct coordinates
    expect(ctx.moveTo).toHaveBeenCalledWith(10, 10);
  });

  it('should handle mouse move event', () => {
    render(
      <Provider store={store}>
        <Board />
      </Provider>
    );
    const canvas = screen.getByTestId('canvas');
    fireEvent.mouseDown(canvas, { clientX: 10, clientY: 10 });
    fireEvent.mouseMove(canvas, { clientX: 20, clientY: 20 });
    const ctx = canvas.getContext('2d');
    expect(ctx.lineTo).toHaveBeenCalledWith(20, 20);
    expect(ctx.stroke).toHaveBeenCalled();
  });

  it('should handle mouse up event without error', async () => {
    render(
      <Provider store={store}>
        <Board />
      </Provider>
    );
    const canvas = screen.getByTestId('canvas');
    fireEvent.mouseDown(canvas, { clientX: 10, clientY: 10 });
    fireEvent.mouseMove(canvas, { clientX: 20, clientY: 20 });
    fireEvent.mouseUp(canvas);
    const ctx = canvas.getContext('2d');
    expect(() => ctx.putImageData).not.toThrow();
  });
});
