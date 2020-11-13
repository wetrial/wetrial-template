import { BlockOutlined, BoldOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Space } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Editor, Text, Transforms } from 'slate';
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from 'slate-react';

const CodeElement = (props: RenderElementProps) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = (props: RenderLeafProps) => {
  return (
    <span {...props.attributes} style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}>
      {props.children}
    </span>
  );
};

const CustomEditor = {
  isBlodMarkActive(editor: Editor & ReactEditor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });
    return !!match;
  },
  isCodeBlockActive(editor: Editor & ReactEditor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'code',
    });
    return !!match;
  },
  toggleBlodmark(editor: Editor & ReactEditor) {
    const isActive = CustomEditor.isBlodMarkActive(editor);
    Transforms.setNodes(
      editor,
      {
        bold: !isActive,
      },
      { match: (n) => Text.isText(n), split: true },
    );
  },
  toggleCodeBlock(editor: Editor & ReactEditor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      {
        match: (n) => Editor.isBlock(editor, n),
        split: true,
      },
    );
  },
};

export default () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const storeContent = sessionStorage.getItem('content');
  const [value, setValue] = useState(
    storeContent
      ? JSON.parse(storeContent)
      : [
          {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }],
          },
          {
            type: 'code',
            children: [{ text: 'A line of text in a paragraph.' }],
          },
        ],
  );

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <PageContainer breadcrumb={undefined}>
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue: any) => {
          setValue(newValue);
          // Save the value to Local Storage.
          const content = JSON.stringify(value);
          sessionStorage.setItem('content', content);
        }}
      >
        <Card size="small">
          <Space size={2}>
            <Button
              size="small"
              icon={<BoldOutlined />}
              onClick={(event) => {
                event.preventDefault();
                CustomEditor.toggleBlodmark(editor);
              }}
            />
            <Button
              size="small"
              icon={<BlockOutlined />}
              onClick={(event) => {
                event.preventDefault();
                CustomEditor.toggleCodeBlock(editor);
              }}
            />
          </Space>
        </Card>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }
            switch (event.key) {
              // 实现 ctrl+` 替换成code
              case '`':
                event.preventDefault();
                CustomEditor.toggleCodeBlock(editor);
                break;
              // 实现ctrl+b 替换成bold
              case 'b':
                event.preventDefault();
                CustomEditor.toggleBlodmark(editor);
                break;
              default:
                break;
            }
          }}
        />
      </Slate>
    </PageContainer>
  );
};
