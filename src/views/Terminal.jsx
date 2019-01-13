import React from "react";

const COMMANDS = ["clear", "echo", "help", "sbx"];

function _getCommand(input) {
    let _array = input.split(" ");
    return _array[0];
}

function _getParameters(input) {
    let _array = input.split(" ");
    return _array.slice(1, _array.length).join(" ");
}

function Cli(props) {
    return (
        <dt id={props.id}>
            <div>
                > {props.cmd}
                {!props.executed && <span className="_blink" />}
            </div>
        </dt>
    );
}

function Output(props) {
    if (props.cmd.indexOf("echo") === 0) {
        return <OutputEcho text={_getParameters(props.cmd)} />;
    }
    if (props.cmd === "help") {
        return <OutputHelp />;
    }
    if (props.cmd === "sbx") {
        return <OutputSbx />;
    }
    if (COMMANDS.includes(_getCommand(props.cmd)) && _getParameters(props.cmd)) {
        return <OutputParameterError cmd={_getCommand(props.cmd)} parameters={_getParameters(props.cmd)} />;
    }
    return <OutputCommandError cmd={_getCommand(props.cmd)} />;
}

function OutputCommandError(props) {
    return (
        <dd>
            <div>
                |{" "}
                <span className="fg-err">
                    {props.cmd} : command '{props.cmd}' is not recognized
                </span>
            </div>
            <div>&nbsp;</div>
        </dd>
    );
}

function OutputParameterError(props) {
    return (
        <dd>
            <div>
                |{" "}
                <span className="fg-err">
                    {props.cmd} : parameters '{props.parameters}' are not recognized
                </span>
            </div>
            <div>&nbsp;</div>
        </dd>
    );
}

function OutputEcho(props) {
    return (
        <dd>
            <div>| {props.text}</div>
            <div>&nbsp;</div>
        </dd>
    );
}

function OutputHelp(props) {
    return (
        <dd>
            <div>| {COMMANDS.join(" ")}</div>
            <div>&nbsp;</div>
        </dd>
    );
}

function OutputSbx(props) {
    return (
        <dd>
            <div>
                | <strong className="fg-pink"># software developer</strong>
            </div>
            <div>| - javascript, python, c#, sql, t-sql, powershell, bash</div>
            <div>| - web, nodejs, dotnet, sqlite, ssms, windows, linux</div>
            <div>| - blockchain ( ethereum, stellar )</div>
            <div>|</div>
            <div>
                | <span className="fg-blue">contact: sbx [dot] softdev [at] gmail [dot] com</span>
            </div>
            <div>&nbsp;</div>
        </dd>
    );
}

export default class Terminal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            history: []
        };

        this.parser = this.parser.bind(this);
    }

    componentDidMount() {
        this.setState({history: ["sbx"]});
        document.addEventListener("keydown", this.parser);
    }

    componentDidUpdate() {
        //document.getElementById("_active").scrollIntoView();
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.parser);
    }

    parser(e) {
        if (e.key === "Backspace") {
            this.setState({input: this.state.input.slice(0, this.state.input.length - 1)});
        } else if (e.key === "Enter") {
            if (this.state.input === "clear") {
                this.setState({
                    input: "",
                    history: []
                });
            } else {
                this.setState({
                    input: "",
                    history: [...this.state.history, this.state.input]
                });
            }
        } else if (/^[a-zA-Z\s-]$/.test(e.key)) {
            let input = this.state.input.concat(e.key).replace(/\s+/g, " ");
            this.setState({input});
        }
    }

    render() {
        return (
            <section className="fit view view-terminal">
                <article className="fit">
                    <dl>
                        {this.state.history.map((cmd, i) => (
                            <React.Fragment key={i}>
                                <Cli cmd={cmd} executed />
                                <Output cmd={cmd} />
                            </React.Fragment>
                        ))}
                        <Cli id={"_active"} cmd={this.state.input} />
                    </dl>
                </article>
            </section>
        );
    }
}
