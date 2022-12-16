import type { FC } from 'react';
import { useState, useRef } from 'react';
import type { StringCutterProps } from './types';

import styles from './styles.module.scss';

const StringCutter: FC<StringCutterProps> = ({ children, lines = 1 }) => {
  const [isCut, setIsCut] = useState(false);
  const cutterRef = useRef(null);
  const isMultiLine = lines > 1;

  const checkIsCut = () => {
    const cutterElem = cutterRef.current;
    if (cutterElem) {
      const { offsetWidth, scrollWidth, offsetHeight, scrollHeight } =
        cutterElem;

      setIsCut(
        isMultiLine ? scrollHeight > offsetHeight : scrollWidth > offsetWidth,
      );
    }
  };

  return (
    <div
      ref={cutterRef}
      className={`${isMultiLine ? styles.multiline : styles.singleline}`}
      style={{ lineClamp: lines, WebkitLineClamp: lines }}
      onMouseEnter={checkIsCut}
    >
      {isCut ? children : <span>{children}</span>}
    </div>
  );
};

export { StringCutter };
