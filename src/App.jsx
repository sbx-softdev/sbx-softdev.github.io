import React from "react";

import Terminal from "./views/Terminal";

export default class App extends React.Component {
    render() {
        return (
            <main className="app fit text-not-selectable">
                <div className="fit">
                    <Terminal />
                </div>
            </main>
        );
    }
}
