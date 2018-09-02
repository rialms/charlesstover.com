import { Typography } from '@material-ui/core';
import React from 'react';
import createObjectProp from 'react-object-prop';
import Link from 'react-router-dom/Link';
import withStyles from './see-no-evil-styles';

class SeeNoEvil extends React.PureComponent {

  _backgroundImageStyle = createObjectProp();
  state = {
    width: null
  };

  get backgroundImageStyle() {
    if (this.state.width === null) {
      return null;
    }

    // Find the smallest image that is larger than the viewport.
    for (const [ width, url ] of this.props.images) {
      if (width >= this.state.width) {
        return this.createBackgroundImageStyle(url);
      }
    }

    // If none are larger than the viewport, use the largest one available.
    return this.createBackgroundImageStyle(this.props.images[this.props.images.length - 1][1]);
  }

  createBackgroundImageStyle(url) {
    return this._backgroundImageStyle({
      backgroundImage: 'url("' + url + '")'
    });
  }

  handleWidthRef = ref => {
    if (ref) {
      this.setState({
        width: ref.getBoundingClientRect().width
      });
    }
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <Link
          className={this.props.classes.faded}
          style={this.backgroundImageStyle}
          to={this.props.to}
        >
          <div
            className={this.props.classes.color}
            ref={this.handleWidthRef}
            style={this.backgroundImageStyle}
          />
          <div className={this.props.classes.description}>
            <Typography
              children={this.props.title}
              gutterBottom
              variant="headline"
            />
            <Typography
              children={this.props.description}
              variant="subheading"
            />
          </div>
        </Link>
      </div>
    );
  }
}

export default withStyles(SeeNoEvil);