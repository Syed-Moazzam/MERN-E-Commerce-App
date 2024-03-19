const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return process.env.REACT_APP_BASE_URL_PRODUCTION;
    } else {
        return process.env.REACT_APP_BASE_URL_LOCAL;
    }
};

export default getBaseUrl;
