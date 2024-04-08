//?id=55&userName=sanyi99
const parseQueryString = (queryString)=> {
    queryString = queryString.replace("?", "");
    const keyValuePairs = queryString.split("&");
    const queryObj = {};

    for(const pair of keyValuePairs) {
        const keyValue = pair.split("=");
        queryObj[keyValue[0]] = decodeURIComponent(keyValue[1]);
    }

    return queryObj;
};

const urlObj = {
    host:location.hostname,
    port:location.port,
    path:location.pathname,
    protocol:location.protocol,
    query:parseQueryString(location.search),
    getBaseUrl() {
        return `${this.protocol}//${this.host}`;
    }
}

export default urlObj;k