import React from "react";
import ReactDOM from "react-dom";
import App from "./app/app";

const EVENTS = {
    greeting: "greeting",
};

class SubscriberWidgetElement extends HTMLElement {
    name: any;
    mountPoint: HTMLDivElement;

    constructor() {
        super();
        this.name = null;
        this.subscribeToWidgetEvent(EVENTS.greeting, (evt) =>
            this.onGreeting(evt.detail.name)
        );
    }

    connectedCallback() {
        this.mountPoint = document.createElement("div");
        this.appendChild(this.mountPoint);
        this.render();
    }

    subscribeToWidgetEvent(eventType, eventHandler) {
        window.addEventListener(eventType, eventHandler);
    }

    onGreeting(name) {
        this.name = name;
        this.render();
    }

    render() {
        ReactDOM.render(<App />, this.mountPoint);
    }
}

customElements.define("subscriber-widget-meeting", SubscriberWidgetElement);

export default SubscriberWidgetElement;
