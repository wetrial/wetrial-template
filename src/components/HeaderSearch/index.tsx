import React from 'react';
import { Input, Icon, AutoComplete } from 'antd';
import classNames from 'classnames';
import { Debounce, Bind } from 'lodash-decorators';
import styles from './index.less';

export interface HeaderSearchProps {
  placeholder?: string;
  dataSource?: string[];
  defaultOpen?: boolean;
  open?: boolean;
  onSearch?: (value: string) => void;
  onChange?: (value: string) => void;
  onVisibleChange?: (visible: boolean) => void;
  onPressEnter?: (value: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

interface State {
  readonly searchMode: boolean;
  readonly value: string;
}

export default class HeaderSearch extends React.PureComponent<
  HeaderSearchProps,
  State
> {
  static defaultProps = {
    defaultActiveFirstOption: false,
    // tslint:disable-next-line:no-empty
    onPressEnter: () => {},
    // tslint:disable-next-line:no-empty
    onSearch: () => {},
    // tslint:disable-next-line:no-empty
    onChange: () => {},
    className: '',
    placeholder: '',
    dataSource: [],
    defaultOpen: false,
    // tslint:disable-next-line:no-empty
    onVisibleChange: () => {},
  };
  static getDerivedStateFromProps(props) {
    if ('open' in props) {
      return {
        searchMode: props.open,
      };
    }
    return null;
  }

  private timeout: NodeJS.Timer;
  private input = React.createRef<Input>();

  constructor(props) {
    super(props);
    this.state = {
      searchMode: props.defaultOpen,
      value: '',
    };
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onKeyDown = e => {
    if (e.key === 'Enter') {
      const { onPressEnter } = this.props;
      const { value } = this.state;
      this.timeout = setTimeout(() => {
        onPressEnter(value); // Fix duplicate onPressEnter
      }, 0);
    }
  };

  onChange = value => {
    const { onSearch, onChange } = this.props;
    this.setState({ value });
    if (onSearch) {
      onSearch(value);
    }
    if (onChange) {
      onChange(value);
    }
  };

  enterSearchMode = () => {
    const { onVisibleChange } = this.props;
    onVisibleChange(true);
    this.setState({ searchMode: true }, () => {
      const { searchMode } = this.state;
      if (searchMode) {
        this.input.current!.focus();
      }
    });
  };

  leaveSearchMode = () => {
    this.setState({
      searchMode: false,
      value: '',
    });
  };

  // NOTE: 不能小于500，如果长按某键，第一次触发auto repeat的间隔是500ms，小于500会导致触发2次
  @Bind()
  @Debounce(500, {
    leading: true,
    trailing: false,
  })
  debouncePressEnter() {
    const { onPressEnter } = this.props;
    const { value } = this.state;
    onPressEnter(value);
  }

  render() {
    const { className, placeholder, open, ...restProps } = this.props;
    const { searchMode, value } = this.state;
    delete restProps.defaultOpen; // for rc-select not affected
    const inputClass = classNames(styles.input, {
      [styles.show]: searchMode,
    });
    return (
      <span
        className={classNames(className, styles.headerSearch)}
        onClick={this.enterSearchMode}
        onTransitionEnd={({ propertyName }) => {
          if (propertyName === 'width' && !searchMode) {
            const { onVisibleChange } = this.props;
            onVisibleChange(searchMode);
          }
        }}
      >
        <Icon type="search" key="Icon" />
        <AutoComplete
          key="AutoComplete"
          {...restProps}
          className={inputClass}
          value={value}
          onChange={this.onChange}
        >
          <Input
            ref={this.input}
            aria-label={placeholder}
            placeholder={placeholder}
            onKeyDown={this.onKeyDown}
            onBlur={this.leaveSearchMode}
          />
        </AutoComplete>
      </span>
    );
  }
}
