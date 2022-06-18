import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  ButtonGroup,
  TextField,
  Checkbox,
  InputLabel,
  Tooltip,
} from "@mui/material";
import { Button } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import axios from "axios";

class AppMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useRandomGraph: true,
      randomGraphModel: 1,
      randomGraphProperties: {
        n: 100,
        p: 0.1,
        k: 1,
      },
      edge_list: [],
      group_list: [],
      diffusionModel: 1,
      diffusionTransmissionRate: 0.1,
      diffusionExposureToInfectedRate: 0.1,
      diffusionRecoveryRate: 0.1,
      diffusionInitialInfected: 0.1,
      numberOfIterations: 100,
      UseHigherOrderTransmition: false,
      useHigherOrderRandomGraph: true,
      higherOrderRandomGraphProperties: {
        m: 100,
        p: 0.1,
      },
      higherOrderDiffusionModel: 1,
      higherOrderDiffusionTransmissionRate: 0.1,
      HigherOrderDiffusionThreshold: 0.5,
    };
  }

  handleSubmit = () => {
    // fetch('http://127.0.0.1:5000/model' ,
    // {
    //     // method: 'POST',
    //     body: JSON.stringify({...this.state}),
    //     // headers: {
    //     //     'Content-Type': 'application/json'
    //     // },
    //     // mode: 'no-cors'
    //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //     mode: 'no-cors', // no-cors, *cors, same-origin
    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: 'same-origin', // include, *same-origin, omit
    //     headers: {
    //     'Content-Type': 'application/json'
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //     redirect: 'follow', // manual, *follow, error
    //     referrerPolicy: 'no-referrer',
    // })
    // .then(response=>{
    //     console.log(response);
    //     return response.json();
    // })
    // .then((dt)=>{console.log(dt)})
    // .catch((err)=>{console.log(err)});
    // let url = "http://127.0.0.1:5000/model";

    let url = "https://superimposition-backend.herokuapp.com/model";
    this.props.handleLoading(true);
    axios
      .post(
        url,
        { ...this.state },
        {
          headers: {
            "content-type": "application/json",
          },
          mode: "no-cors",
          cache: "no-cache",
          credentials: "same-origin",
          redirect: "follow",
          referrerPolicy: "no-referrer",
        }
      )
      .then((x) => this.props.handleResult(x.data))
      .catch((err) => console.log(err));
  };

  read_edgelist = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const lines = e.target.result.split("\n");
      console.log(lines.map((i) => i.trim()));
      this.setState({ ...this.state, edge_list: lines.map((i) => i.trim()) });
    };
    reader.readAsText(e.target.files[0]);
  };

  read_grouplist = async (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const lines = e.target.result.split("\n");
      console.log(lines.map((i) => i.trim()));
      this.setState({ ...this.state, group_list: lines.map((i) => i.trim()) });
    };
    reader.readAsText(e.target.files[0]);
  };

  render() {
    return (
      <Box sx={{ minWidth: 120 }}>
        <div className="pb-2 mt-2 mb-4 border-bottom h5">Graph Properties</div>

        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
          className="mb-3"
          fullWidth="true"
        >
          <Button
            onClick={() => {
              this.setState({ ...this.state, useRandomGraph: true });
            }}
          >
            {" "}
            Random Graph{" "}
          </Button>
          <Button
            onClick={() => {
              this.setState({ ...this.state, useRandomGraph: false });
            }}
          >
            {" "}
            Edge List{" "}
          </Button>
        </ButtonGroup>

        {/* Graph Properties */}

        {this.state.useRandomGraph ? (
          <FormControl fullWidth variant="standard">
            <InputLabel id="demo-simple-select-label">Random Model</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // label = "Random Graph Model"
              value={this.state.randomGraphModel}
              onChange={(e) => {
                this.setState({
                  ...this.state,
                  randomGraphModel: e.target.value,
                });
              }}
            >
              <MenuItem value={1}>Erdos-Renyi</MenuItem>
              <MenuItem value={2}>Barabasi-Albert</MenuItem>
              <MenuItem value={3}>Watts-Strogatz</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <Button variant="contained" component="label" fullWidth>
            Upload Edge List
            <input type="file" onChange={(e) => this.read_edgelist(e)} hidden />
          </Button>
        )}
        <div className="mt-4 mb-2">
          {this.state.useRandomGraph && this.state.randomGraphModel === 1 ? (
            <div>
              <TextField
                variant="standard"
                fullWidth="true"
                type="number"
                defaultValue="100"
                label="number of nodes"
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    randomGraphProperties: {
                      ...this.state.randomGraphProperties,
                      n: e.target.value,
                    },
                  });
                }}
                inputProps={{ min: 0 }}
              />

              <TextField
                variant="standard"
                fullWidth="true"
                className="mt-3"
                type="number"
                defaultValue="0.1"
                label="p [0,1]"
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    randomGraphProperties: {
                      ...this.state.randomGraphProperties,
                      p: e.target.value,
                    },
                  });
                }}
                inputProps={{ min: 0, step: 0.01, max: 1 }}
              />
            </div>
          ) : this.state.useRandomGraph && this.state.randomGraphModel === 2 ? (
            <div>
              <TextField
                variant="standard"
                fullWidth
                type="number"
                defaultValue="100"
                label="number of nodes"
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    randomGraphProperties: {
                      ...this.state.randomGraphProperties,
                      n: e.target.value,
                    },
                  });
                }}
                inputProps={{ min: 0 }}
              />

              <TextField
                variant="standard"
                fullWidth
                className="mt-3"
                type="number"
                defaultValue="1"
                label="k"
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    randomGraphProperties: {
                      ...this.state.randomGraphProperties,
                      k: e.target.value,
                    },
                  });
                }}
                inputProps={{ min: 0 }}
              />
            </div>
          ) : this.state.useRandomGraph && this.state.randomGraphModel === 3 ? (
            <div>
              <TextField
                variant="standard"
                fullWidth
                type="number"
                defaultValue="100"
                label="number of nodes"
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    randomGraphProperties: {
                      ...this.state.randomGraphProperties,
                      n: e.target.value,
                    },
                  });
                }}
                inputProps={{ min: 0 }}
              />

              <TextField
                variant="standard"
                fullWidth
                className="mt-3"
                type="number"
                defaultValue="1"
                label="k"
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    randomGraphProperties: {
                      ...this.state.randomGraphProperties,
                      k: e.target.value,
                    },
                  });
                }}
                inputProps={{ min: 0 }}
              />
              <TextField
                variant="standard"
                fullWidth="true"
                className="mt-3"
                type="number"
                defaultValue="0.1"
                label="p [0,1]"
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    randomGraphProperties: {
                      ...this.state.randomGraphProperties,
                      p: e.target.value,
                    },
                  });
                }}
                inputProps={{ min: 0, step: 0.01, max: 1 }}
              />
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Diffusion Properties */}

        <div className="pb-2 mt-4 mb-4 border-bottom h5">
          Diffusion Properties
        </div>

        <FormControl fullWidth variant="standard">
          <InputLabel id="demo-simple-select-label">Diffusion Model</InputLabel>
          <Select
            variant="standard"
            fullWidth
            className="mb-2"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.diffusionModel}
            label="Diffusion Model"
            onChange={(e) => {
              this.setState({ ...this.state, diffusionModel: e.target.value });
            }}
          >
            <MenuItem value={1}>S - I - S</MenuItem>
            <MenuItem value={2}>S - I - R</MenuItem>
            <MenuItem value={3}>S - E - I - S</MenuItem>
            <MenuItem value={4}>S - E - I - R</MenuItem>
          </Select>
        </FormControl>

        <TextField
          variant="standard"
          fullWidth
          className="mb-2"
          type="number"
          defaultValue="0.1"
          label="Initial Infected Probability"
          onChange={(e) => {
            this.setState({
              ...this.state,
              diffusionInitialInfected: e.target.value,
            });
          }}
          inputProps={{ min: 0, step: 0.01, max: 1 }}
        />

        {this.state.diffusionModel < 3 ? (
          <TextField
            variant="standard"
            fullWidth
            className="mb-2"
            type="number"
            defaultValue="0.1"
            label="Transmission Probability"
            onChange={(e) => {
              this.setState({
                ...this.state,
                diffusionTransmissionRate: e.target.value,
              });
            }}
            inputProps={{ min: 0, step: 0.01, max: 1 }}
          />
        ) : (
          <>
            <TextField
              variant="standard"
              fullWidth
              className="mb-2"
              type="number"
              defaultValue="0.1"
              label="Infection Probability"
              onChange={(e) => {
                this.setState({
                  ...this.state,
                  diffusionExposureToInfectedRate: e.target.value,
                });
              }}
              inputProps={{ min: 0, step: 0.01, max: 1 }}
            />
            <TextField
              variant="standard"
              fullWidth
              className="mb-2"
              type="number"
              defaultValue="0.1"
              label="Exposure Probability"
              onChange={(e) => {
                this.setState({
                  ...this.state,
                  diffusionTransmissionRate: e.target.value,
                });
              }}
              inputProps={{ min: 0, step: 0.01, max: 1 }}
            />
          </>
        )}
        {/* <TextField
          variant="standard"
          fullWidth
          className="mb-2"
          type="number"
          defaultValue="0.1"
          label="Transmission Probability"
          onChange={(e) => {
            this.setState({
              ...this.state,
              diffusionTransmissionRate: e.target.value,
            });
          }}
          inputProps={{ min: 0, step: 0.01, max: 1 }}
        /> */}
        <Tooltip
          title="Hellp there how are you are you doing fine what is the date"
          placement="right"
        >
          <TextField
            variant="standard"
            fullWidth
            className="mb-2"
            type="number"
            defaultValue="0.1"
            label="Recovery Probability"
            onChange={(e) => {
              this.setState({
                ...this.state,
                diffusionRecoveryRate: e.target.value,
              });
            }}
            inputProps={{ min: 0, step: 0.01, max: 1 }}
          />
        </Tooltip>

        <TextField
          variant="standard"
          fullWidth
          className="mb-4 border-bottom"
          type="number"
          defaultValue="100"
          label="Number of Iterations"
          onChange={(e) => {
            this.setState({
              ...this.state,
              numberOfIterations: e.target.value,
            });
          }}
          inputProps={{ min: 0 }}
        />
        <FormControl fullWidth>
          <FormControlLabel
            fullWidth
            className="border-top"
            control={
              <Checkbox
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    UseHigherOrderTransmition: e.target.checked,
                  });
                }}
              />
            }
            label="Higher-Order Transmission"
          />
        </FormControl>

        {/* Higher-order structure */}
        {this.state.UseHigherOrderTransmition ? (
          <div>
            <div className="pb-2 mt-2 mb-4 border-bottom h5">
              Higher-Order Graph Properties
            </div>

            <ButtonGroup
              variant="outlined"
              aria-label="outlined primary button group"
              className="mb-3"
            >
              <Button
                onClick={() => {
                  this.setState({
                    ...this.state,
                    useHigherOrderRandomGraph: true,
                  });
                }}
              >
                {" "}
                Random Intersection Graph{" "}
              </Button>
              <Button
                onClick={() => {
                  this.setState({
                    ...this.state,
                    useHigherOrderRandomGraph: false,
                  });
                }}
              >
                {" "}
                Group List{" "}
              </Button>
            </ButtonGroup>

            {this.state.useHigherOrderRandomGraph ? (
              <div>
                <TextField
                  variant="standard"
                  fullWidth="true"
                  type="number"
                  defaultValue="100"
                  label="number of groups"
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      higherOrderRandomGraphProperties: {
                        ...this.state.higherOrderRandomGraphProperties,
                        m: e.target.value,
                      },
                    });
                  }}
                  inputProps={{ min: 0 }}
                />

                <TextField
                  variant="standard"
                  fullWidth="true"
                  className="mt-3"
                  type="number"
                  defaultValue="0.1"
                  label="intersection probability"
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      higherOrderRandomGraphProperties: {
                        ...this.state.higherOrderRandomGraphProperties,
                        p: e.target.value,
                      },
                    });
                  }}
                  inputProps={{ min: 0, step: 0.01, max: 1 }}
                />
              </div>
            ) : (
              <Button fullWidth variant="contained" component="label">
                Upload Group List
                <input type="file" hidden />
              </Button>
            )}

            <div className="pb-2 mt-4 mb-3 border-bottom h5">
              Higher-Order Diffusion Properties
            </div>

            <FormControl fullWidth variant="standard">
              <InputLabel id="demo-simple-select-label">
                Diffusion Model
              </InputLabel>
              <Select
                variant="standard"
                className="mb-2"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.higherOrderDiffusionModel}
                label="Diffusion Model"
                fullWidth="true"
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    higherOrderDiffusionModel: e.target.value,
                  });
                }}
              >
                <MenuItem value={1}>Triangle Diffusion</MenuItem>
                <MenuItem value={2}>Clique Diffusion</MenuItem>
                <MenuItem value={3}>Threshold Clique Diffusion</MenuItem>
              </Select>
            </FormControl>

            <TextField
              variant="standard"
              fullWidth="true"
              className="mb-2"
              type="number"
              defaultValue="0.1"
              label={
                this.state.diffusionModel < 3
                  ? "Higher-Order Transmission Probability"
                  : "Higher-Order Exposure Probability"
              }
              onChange={(e) => {
                this.setState({
                  ...this.state,
                  higherOrderDiffusionTransmissionRate: e.target.value,
                });
              }}
              inputProps={{ min: 0, step: 0.01, max: 1 }}
            />

            {this.state.higherOrderDiffusionModel === 3 ? (
              <TextField
                variant="standard"
                fullWidth="true"
                className="mb-2"
                type="number"
                defaultValue="0.5"
                label="Higher-Order Diffusion Threshold"
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    HigherOrderDiffusionThreshold: e.target.value,
                  });
                }}
                inputProps={{ min: 0, step: 0.01, max: 1 }}
              />
            ) : (
              ""
            )}
          </div>
        ) : (
          <p></p>
        )}

        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="success"
          className="mb-3"
          // className={classes.button}
          onClick={this.handleSubmit}
        >
          Run Model
        </Button>
      </Box>
    );
  }
}
// </FormControl>
export default AppMenu;
