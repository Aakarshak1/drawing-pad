import { useSelector, useDispatch } from 'react-redux';
import cx from 'clsx';
import { Pencil, Eraser, RotateCcw, RotateCw, Download } from 'lucide-react';

import { menuItemClick, actionItemClick } from '@/src/store/slice/menuSlice';
import { MENU_ITEMS, ICON_COLOR } from '@/src/utility/constant';
import styles from './Menu.module.css';

const Menu = () => {
  const activeMenuItemSelector = (state) => state.menu.activeMenuItem;
  const activeMenuItem = useSelector(activeMenuItemSelector);
  const dispatch = useDispatch();

  const handleMenuClick = (itemName) => {
    dispatch(menuItemClick(itemName));
  };

  const handleActionItemClick = (itemName) => {
    dispatch(actionItemClick(itemName));
  };

  return (
    <div data-testid='menu-container' className={styles.menuContainer}>
      <button
        aria-label='Pencil'
        type='button'
        className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.PENCIL })}
        onClick={() => handleMenuClick(MENU_ITEMS.PENCIL)}
      >
        <Pencil color={ICON_COLOR} size='20px' />
      </button>
      <button
        aria-label='Eraser'
        type='button'
        className={cx(styles.iconWrapper, { [styles.active]: activeMenuItem === MENU_ITEMS.ERASER })}
        onClick={() => handleMenuClick(MENU_ITEMS.ERASER)}
      >
        <Eraser color={ICON_COLOR} size='20px' />
      </button>
      <button
        aria-label='Undo'
        type='button'
        className={styles.iconWrapper}
        onClick={() => handleActionItemClick(MENU_ITEMS.UNDO)}
      >
        <RotateCcw color={ICON_COLOR} size='20px' />
      </button>
      <button
        aria-label='Redo'
        type='button'
        className={styles.iconWrapper}
        onClick={() => handleActionItemClick(MENU_ITEMS.REDO)}
      >
        <RotateCw color={ICON_COLOR} size='20px' />
      </button>
      <button
        aria-label='Downloads'
        type='button'
        className={styles.iconWrapper}
        onClick={() => handleActionItemClick(MENU_ITEMS.DOWNLOAD)}
      >
        <Download color={ICON_COLOR} size='20px' />
      </button>
    </div>
  );
};

export default Menu;
