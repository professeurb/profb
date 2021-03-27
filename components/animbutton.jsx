import { jsx } from "theme-ui";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";

import { FaPlay, FaPause, FaStepForward } from "react-icons/fa";
import { Button, Flex, Icon } from "theme-ui";

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
      <Flex
        sx={{
          // border: "1px solid",
          // borderColor: "primary",
          // width: "fit-content",
          // borderRadius: 3,
          // cursor: "pointer",
        }}
      >
        {this.props.name && (
          <Flex sx={{ placeItems: "center" }}>
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                // borderTopLeftRadius: 3,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                // border: "0px solid",
                // backgroundColor: "Highlight",
              }}
              disabled={this.state.playDisabled || this.props.disabled}
              onClick={() => {
                this.state.playResolve();
              }}
            >
              {this.props.name}
            </Button>
          </Flex>
        )}
        <Flex
          sx={{
            border: "0px solid",
            placeItems: "center",
            mr: "1px",
          }}
        >
          <Button
            sx={{ borderRadius: 0 }}
            disabled={this.state.playDisabled || this.props.disabled}
            onClick={() => {
              this.state.playResolve();
            }}
          >
            <FontAwesomeIcon icon={faPlay} />
          </Button>
        </Flex>
        <Flex sx={{ placeItems: "center", mr: "1px" }}>
          <Button
            sx={{ borderRadius: 0 }}
            disabled={this.state.pauseDisabled || this.props.disabled}
            onClick={() => {
              this.enable();
            }}
          >
            <FontAwesomeIcon icon={faPause} />
          </Button>
        </Flex>
        <Flex sx={{ placeItems: "center" }}>
          <Button
            sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            disabled={this.state.stepDisabled || this.props.disabled}
            onClick={() => {
              this.state.stepResolve();
            }}
          >
            <FontAwesomeIcon icon={faStepForward} />
          </Button>
        </Flex>
      </Flex>
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
