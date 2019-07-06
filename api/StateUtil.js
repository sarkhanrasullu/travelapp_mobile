const get = (owner) => {
    if(!owner) return null;
    const {name,component} = owner.props;
    if(!name || !component) return null;
    const p = name;
    const obj = component.state;
    return p.split(".").reduce((xs, x) =>xs&&xs[x]||null, obj)
} 

const getFromObj = (obj, name) => {
    const p = name;
    return p.split(".").reduce((xs, x) =>xs&&xs[x]||null, obj)
} 

const set = (path,schema, value) => {
    if(!path || !schema) return;
    var pList = path.split('.');
    var len = pList.length;
    for(var i = 0; i < len-1; i++) {
        var elem = pList[i];
        if(!schema[elem]){
            schema[elem] = {};
        }
        schema = schema[elem];
    }
    var lastOne = pList[len-1];
    schema[lastOne] = value;
}

const handleFieldChange = (owner, val) => {
    owner.setState({val: val})
    const {name, component} = owner.props;
    if(name && component){
        const st = {...component.state};
        set(name, st, val);
        component.setState(st);
    }
};

export {set, get, handleFieldChange, getFromObj}