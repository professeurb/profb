import React from "react";
import { Button, Icon } from "semantic-ui-react";

export class AnimButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playDisabled: false,
      pauseDisabled: true,
      stepDisabled: false,
      playResolve: () => {},
      stepResolve: () => {},
    };
  }

  async waiter() {
    if (!this.state.pauseDisabled) {
      return Promise.resolve(true);
    } else {
      this.setState({
        playDisabled: false,
        pauseDisabled: true,
        stepDisabled: false,
      });
      let playPromise = new Promise((resolve, _) => {
        this.setState({
          playResolve: () => {
            resolve(1);
          },
        });
      });
      let stepPromise = new Promise((resolve, _) => {
        this.setState({
          stepResolve: () => {
            resolve(2);
          },
        });
      });
      return Promise.race([playPromise, stepPromise]).then((value) => {
        if (value === 1) {
          // Play
          this.setState({
            playDisabled: true,
            pauseDisabled: false,
            stepDisabled: true,
          });
        } else {
          // Step
          this.setState({
            playDisabled: true,
            pauseDisabled: true,
            stepDisabled: true,
          });
        }
        return true;
      });
    }
  }

  render() {
    return (
      <Button.Group>
        {this.props.name && (
          <Button
            icon
            labelPosition="right"
            disabled={this.state.playDisabled || this.props.disabled}
            onClick={() => {
              this.state.playResolve();
            }}
          >
            {this.props.name}
            <Icon name="play" />
          </Button>
        )}
        <Button
          icon
          disabled={this.state.pauseDisabled || this.props.disabled}
          onClick={() => {
            this.enable();
          }}
        >
          <Icon name="pause" />
        </Button>
        <Button
          icon
          disabled={this.state.stepDisabled || this.props.disabled}
          onClick={() => {
            this.state.stepResolve();
          }}
        >
          <Icon name="step forward" />
        </Button>
      </Button.Group>
    );
  }

  async componentDidMount() {
    while (true) {
      await this.props.anim(this.waiter.bind(this));
      this.enable();
    }
  }

  disable() {
    this.setState({
      playDisabled: true,
      pauseDisabled: true,
      stepDisabled: true,
    });
  }

  enable() {
    this.setState({
      playDisabled: false,
      pauseDisabled: true,
      stepDisabled: false,
    });
  }
}
