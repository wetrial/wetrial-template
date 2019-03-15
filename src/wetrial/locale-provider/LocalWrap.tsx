
import React from "react";
import PropTypes from "prop-types";

const LocalWrap = Component => {
    return class I18nComponent extends React.PureComponent {
        static contextTypes = {
            locale: PropTypes.string.isRequired
        };

        render() {
            const { locale } = this.context;
            return <Component {...this.props} locale={locale} />;
        }
    };
};

export default LocalWrap;