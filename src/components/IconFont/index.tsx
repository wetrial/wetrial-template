import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { IconBaseProps } from '@ant-design/icons/es/components/Icon';

let scriptUrl: string = '';

interface IconFontProps extends IconBaseProps {
  type: string;
}

export function configIconUrl(url) {
  scriptUrl = url;
}

const IconFont = createFromIconfontCN({
  scriptUrl,
});

export default function(props: IconFontProps) {
  return <IconFont {...props} />;
}
