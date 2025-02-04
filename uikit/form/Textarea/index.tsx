import React, { useState, useContext, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import useTheme from '../../utils/useTheme';

import css from '@emotion/css';
import FormControlContext from '../FormControl/FormControlContext';

const Textarea: React.ComponentType<
  {
    ['aria-label']: string;
    error?: boolean;
  } & TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ error, disabled, className, ...props }) => {
  const theme = useTheme();

  const { disabled: calcDisabled = disabled, error: calcError = error } =
    useContext(FormControlContext) || {};

  return (
    <textarea
      className={clsx({ error: calcError, disabled: calcDisabled }, className)}
      css={css`
        ${css(theme.typography.paragraph as any)};
        resize: vertical;
        width: 100%;
        box-sizing: border-box;
        padding: 8px 10px;
        border: 1px solid;
        border-radius: 8px;
        border-color: ${theme.input.borderColors.default};
        background-color: ${theme.input.colors.default};

        &:hover {
          border-color: ${theme.input.borderColors.hover} !important;
        }

        &:focus {
          outline: 0;
          border-color: ${theme.input.borderColors.focus};
        }

        &.error {
          border-color: ${theme.input.borderColors.error};
        }

        &.disabled {
          background-color: ${theme.input.colors.disabled};
        }
      `}
      aria-label={props['aria-label']}
      disabled={calcDisabled}
      id={props.id}
      {...props}
    />
  );
};

export default Textarea;
