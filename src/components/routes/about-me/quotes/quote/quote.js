import { Tooltip, Typography } from '@material-ui/core';
import React from 'react';
import Image from './image/image';
import withStyles from './quote-styles';

class Quote extends React.PureComponent {

  get className() {
    return (
      this.props.classes.root + (
        this.props.animate ?
          ' ' + this.props.classes.animate :
          ''
      )
    );
  }


  mapQuote = (quote, index) =>
    <Typography
      children={quote}
      className={this.props.classes.p}
      key={index}
      paragraph
    />;

  get quote() {
    if (Array.isArray(this.props.quote)) {
      return this.props.quote.map(this.mapQuote);
    }
    return this.mapQuote(this.props.quote);
  }

  render() {
    return (
      <div className={this.className}>
        <div className={this.props.classes.image}>
          <Image
            alt={this.props.author}
            src={this.props.image}
          />
        </div>
        <div className={this.props.classes.quote}>
          <blockquote
            children={this.quote}
            className={this.props.classes.blockquote}
          />
          {
            this.props.company ?
              <Tooltip
                placement="left"
                title={this.props.title}
              >
                <span className={this.props.classes.company}>
                  <cite
                    children={this.props.author}
                    className={this.props.classes.cite}
                  />,{' '}
                  {this.props.company}
                </span>
              </Tooltip> :
              <cite
                children={this.props.author}
                className={this.props.classes.cite}
              />
          }
        </div>
      </div>
    );
  }
}

export default withStyles(Quote);