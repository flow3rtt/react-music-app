import { css } from 'styled-components';

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const full = css`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
export const hiddenFont = (maxWidth = 150) => css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: ${maxWidth}px;
`;
