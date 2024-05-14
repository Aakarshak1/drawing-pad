import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MenuReducer, { menuItemClick, actionItemClick } from '@/src/store/slice/menuSlice';
import ToolboxReducer from '@/src/store/slice/toolboxSlice';
import { describe, beforeEach, it, expect } from 'vitest';
import { MENU_ITEMS } from '@/src/utility/constant';
import Menu from './Menu';

describe('Menu', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        menu: MenuReducer,
        toolbox: ToolboxReducer,
      },
    });
  });

  const setup = () =>
    render(
      <Provider store={store}>
        <Menu />
      </Provider>
    );

  it('should render Menu component with all buttons', () => {
    setup();
    expect(screen.getByTestId('menu-container')).toBeInTheDocument();
    expect(screen.getByLabelText('Pencil')).toBeInTheDocument();
    expect(screen.getByLabelText('Eraser')).toBeInTheDocument();
    expect(screen.getByLabelText('Undo')).toBeInTheDocument();
    expect(screen.getByLabelText('Redo')).toBeInTheDocument();
    expect(screen.getByLabelText('Downloads')).toBeInTheDocument();
  });

  it('Pencil should be active item by default', () => {
    setup();
    const pencilButton = screen.getByLabelText('Pencil');
    expect(pencilButton).toHaveClass(/active/);
  });

  it('clicking on "Eraser" should dispatch "menuItemClick" action with ERASER as argument and toggle active class', async () => {
    setup();
    const eraserButton = screen.getByLabelText('Eraser');
    const pencilButton = screen.getByLabelText('Pencil');
    const previousState = {
      activeMenuItem: MENU_ITEMS.PENCIL,
      actionMenuItem: null,
    };

    // Simulate click on the Eraser button
    fireEvent.click(eraserButton);

    expect(MenuReducer(previousState, menuItemClick(MENU_ITEMS.ERASER))).toEqual({
      activeMenuItem: MENU_ITEMS.ERASER,
      actionMenuItem: null,
    });

    expect(eraserButton).toHaveClass(/active/);
    expect(pencilButton).not.toHaveClass(/active/);
  });

  it('Clicking the "Undo" button should dispatch the "actionItemClick" action with "UNDO" as the argument', () => {
    setup();
    const previousState = {
      activeMenuItem: MENU_ITEMS.PENCIL,
      actionMenuItem: null,
    };

    const undoButton = screen.getByLabelText('Undo');
    fireEvent.click(undoButton);

    expect(MenuReducer(previousState, actionItemClick(MENU_ITEMS.UNDO))).toEqual({
      activeMenuItem: MENU_ITEMS.PENCIL,
      actionMenuItem: MENU_ITEMS.UNDO,
    });
  });
});
