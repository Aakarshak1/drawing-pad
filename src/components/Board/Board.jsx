/* eslint-disable consistent-return */
import { useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MENU_ITEMS } from '@/src/utility/constant';
import { actionItemClick } from '@/src/store/slice/menuSlice';

const Board = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);
  const shouldDraw = useRef(false);
  const contextRef = useRef(null);
  const menuSelector = (state) => state.menu;
  const { activeMenuItem, actionMenuItem } = useSelector(menuSelector);
  const activeMenuItemSelector = (state) => state.toolbox[activeMenuItem];
  const { color, size } = useSelector(activeMenuItemSelector);

  const changeConfig = useCallback((color, size) => {
    contextRef.current.strokeStyle = color;
    contextRef.current.lineWidth = size;
  }, []);

  const beginPath = useCallback((x, y) => {
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
  }, []);

  const drawLine = useCallback((x, y) => {
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  }, []);

  const handleMouseDown = useCallback(
    (e) => {
      shouldDraw.current = true;
      beginPath(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
    },
    [beginPath]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!shouldDraw.current) return;
      drawLine(e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY);
    },
    [drawLine]
  );

  const handleMouseUp = useCallback(() => {
    shouldDraw.current = false;
    const imageData = contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    drawHistory.current.push(imageData);
    historyPointer.current = drawHistory.current.length - 1;
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    contextRef.current = canvas.getContext('2d', { willReadFrequently: true });

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL();
      const anchor = document.createElement('a');
      anchor.href = URL;
      anchor.download = 'sketch.jpg';
      anchor.click();
    } else if (actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO) {
      if (historyPointer.current > 0 && actionMenuItem === MENU_ITEMS.UNDO) historyPointer.current -= 1;
      if (historyPointer.current < drawHistory.current.length - 1 && actionMenuItem === MENU_ITEMS.REDO)
        historyPointer.current += 1;
      const imageData = drawHistory.current[historyPointer.current];
      contextRef.current.putImageData(imageData, 0, 0);
    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    contextRef.current = canvas.getContext('2d', { willReadFrequently: true });
    changeConfig(color, size);
  }, [color, size]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    contextRef.current = canvas.getContext('2d', { willReadFrequently: true });

    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    canvas.addEventListener('touchstart', handleMouseDown);
    canvas.addEventListener('touchmove', handleMouseMove);
    canvas.addEventListener('touchend', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);

      canvas.removeEventListener('touchstart', handleMouseDown);
      canvas.removeEventListener('touchmove', handleMouseMove);
      canvas.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return <canvas data-testid='canvas' ref={canvasRef} />;
};

export default Board;
