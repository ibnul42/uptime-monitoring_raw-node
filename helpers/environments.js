// module scaffholding
const environments = {}

environments.staging = {
    port: 3000,
    envName: 'staging',
}

environments.production = {
    port: 5000,
    envName: 'production',
}

// check right environment
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string'? process.env.NODE_ENV: 'staging'

// environment to export
const exportEnvironment = typeof environments[currentEnvironment] === 'object' ? environments[currentEnvironment] : environments.staging

// export environment
module.exports = exportEnvironment