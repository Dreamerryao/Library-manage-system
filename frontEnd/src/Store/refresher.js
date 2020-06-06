import {Component} from "react";

const components = {};

const register = (name, inst) => {
    if (typeof name !== 'string' || !(inst instanceof Component)) return;

    components[name] = inst;
    inst.setState({refreshByStore: true});
};

const refresh = name => {
    if (components[name] instanceof Component)
        components[name].setState({refreshByStore: !components[name].state.refreshByStore});
};

const unregister = (name, inst) => {
    if (components[name] === inst) components[name] = undefined;
};

export {refresh, register, unregister};
