import * as React from "react";

import MatrixEntry from "./MatrixEntry";

import "./Matrix.css";

export interface Props {
  source: string;
  stream: string;
}

export interface State {
  matrixItemIds: number[];
  matrixItems: { [id: string]: MatrixItem };
}

export interface MatrixItem {
  char: string;
  id: string;
  name: string;
  score: number;
}

class EmojiMatrix extends React.Component<Props, State> {
  private scoreUpdates: EventSource;

  constructor(props: Props) {
    super(props);
    this.state = { matrixItemIds: [], matrixItems: {} };
  }

  public componentDidMount() {
    const req = new Request(this.props.source);
    fetch(req).then(response => {
      response
        .json()
        .then(data => {
          const initialMatrixItemIds = [];
          const initialMatrixItems = {};
          for (const record of data) {
            initialMatrixItemIds.push(record.id);
            initialMatrixItems[record.id] = {
              char: record.char,
              id: record.id,
              name: record.name,
              score: record.score
            };
          }
          this.setState({
            matrixItemIds: initialMatrixItemIds,
            matrixItems: initialMatrixItems
          });
        })
        .then(() => {
          this.startStreaming();
        });
    });
  }

  public componentWillUnmount() {
    this.stopStreaming();
  }

  public parseStreamUpdate(data: any) {
    const update = JSON.parse(data);
    this.setState((prevState: State, props: Props) => {
      /* TODO: need to profile, but I suspect this is where some of the inefficiency is,
      since updating state without mutation involves a heck of a lot of object creation
      and I'm guessing maybe heap allocation / gc pressure? */
      const updatedItems: { [id: string]: MatrixItem } = {};
      for (const [k, v] of Object.entries(update)) {
        if (typeof k === "string" && typeof v === "number") {
          updatedItems[k] = { ...prevState.matrixItems[k] };
          updatedItems[k].score += v;
        } else {
          console.error(`Received an unparseable stream update: ${update}`);
        }
      }
      const mergedItems = { ...prevState.matrixItems, ...updatedItems };
      return { matrixItems: mergedItems };
    });
  }

  public startStreaming() {
    this.scoreUpdates = new EventSource(this.props.stream);
    this.scoreUpdates.onmessage = event => {
      this.parseStreamUpdate(event.data);
    };
  }

  public stopStreaming() {
    this.scoreUpdates.close();
  }

  public render() {
    const matrixEntries = this.state.matrixItemIds.map(id => {
      const c = this.state.matrixItems[id];
      return (
        <MatrixEntry key={c.id} score={c.score} char={c.char} name={c.name} />
      );
    });

    return <div id="emojiMatrix">{matrixEntries}</div>;
  }
}

export default EmojiMatrix;
