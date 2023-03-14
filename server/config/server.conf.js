const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.SERVER_PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "SECRET_KEY",
    jwtExpiry: process.env.JWT_EXPIRY || 999
}

export default config