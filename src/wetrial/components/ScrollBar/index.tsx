import { PureComponent } from "react";

class ScrollBar extends PureComponent<{name:string}> {
    render() {
        const {name}=this.props;
        return name;
    }
}
export default ScrollBar;