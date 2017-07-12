const React = require('react');
const PropTypes = require('prop-types');
const VegaLite = require('react-vega-lite').default;
const Vega = require('react-vega').default;

const DOT_UNICODE_REPLACEMENT = '\u2024';

const _ = require('lodash');
// const debug = require('debug')('mongodb-compass:chart:chart');

class Chart extends React.Component {

  shouldComponentUpdate(newProps) {
    return (newProps.reRenderChart);
  }
  /**
   * renders the chart as a ReactVega / ReactVegaLite component.
   *
   * @return {Component}   the ReactVega component.
   */
  render() {
    // pass data into ReactVega/Lite component as dataset with name `source`.
    const data = {values: this.props.data};
    // add width and height to the spec
    const spec = _.assign({}, this.props.spec, _.pick(this.props, ['width', 'height']));

    // temporary work-around to flatten all nested fields, see COMPASS-1246
    _.each(spec.encoding, (encoding, channel) => {
      spec.encoding[channel].field = encoding.field.replace(/\./g, DOT_UNICODE_REPLACEMENT);
    });

    const ChartClass = this.props.specType === 'vega' ? Vega : VegaLite;
    return (
      <ChartClass
        spec={spec}
        data={data}
        width={this.props.width}
        height={this.props.height}
        padding={this.props.padding}
        className={this.props.className}
        renderer={this.props.renderer}
      />
    );
  }
}

Chart.propTypes = {
  specType: PropTypes.oneOf(['vega', 'vega-lite']),
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  padding: PropTypes.object,
  className: PropTypes.string,
  reRenderChart: PropTypes.bool,
  renderer: PropTypes.oneOf(['svg', 'canvas']),
  spec: PropTypes.object.isRequired
};

Chart.defaultProps = {
  data: [],
  renderer: 'svg',
  className: 'chart',
  specType: 'vega-lite'
};

Chart.displayName = 'Chart';

module.exports = Chart;
