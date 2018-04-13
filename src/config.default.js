window.config = {
    // api: '/api',
    api: `//${location.hostname}:2000`,
};

if (location.hostname !== 'localhost') {
    config.api = config.api.replace(':2000', ':2001');
}
