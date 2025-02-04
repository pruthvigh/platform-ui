import * as React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import defaultTheme from 'uikit/theme/defaultTheme';

type TagVariant = 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
export const TAG_VARIANTS = {
  INFO: 'INFO' as TagVariant,
  WARNING: 'WARNING' as TagVariant,
  ERROR: 'ERROR' as TagVariant,
  SUCCESS: 'SUCCESS' as TagVariant,
};

const Tag = styled<'div', { variant?: keyof typeof TAG_VARIANTS }>('div')`
  ${({ theme }) => css(theme.typography.paragraph as any)};
  box-sizing: border-box;
  display: inline-block;
  min-height: 14px;
  font-size: 11px;
  line-height: 14px;
  font-weight: bold;
  padding: 3px 8px;
  border-radius: 8px;
  background-color: ${({ theme, variant = 'INFO' }) =>
    ({
      [TAG_VARIANTS.ERROR]: theme.colors.error,
      [TAG_VARIANTS.WARNING]: theme.colors.warning,
      [TAG_VARIANTS.INFO]: theme.colors.secondary,
      [TAG_VARIANTS.SUCCESS]: theme.colors.success,
    }[variant])};
  color: white;
`;

export default Tag;
