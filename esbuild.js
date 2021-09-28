const http = require('http')
const PORT = 3000

require('esbuild').serve({
    servedir: "public",
}, {
    entryPoints: ['src/index.tsx'],
    outdir: "public/dist",
    bundle: true,
    jsxFactory: 'h',
    plugins: [
        require('esbuild-plugin-alias')({
            'react': require.resolve('preact/compat'),
            'react-dom': require.resolve('preact/compat')
        })
    ]
})
.then(({ host, port }) => {

    http.createServer((req, res) => {
        const options = {
            hostname: host,
            port: port,
            path: req.url,
            method: req.method,
            headers: req.headers,
        }

        const proxyReq = http.request(options, proxyRes => {
            if (proxyRes.statusCode === 404) {
                res.writeHead(404, { 'Content-Type': 'text/html' })
                res.end('<h1>A custom 404 page</h1>')
                return
            }
            res.writeHead(proxyRes.statusCode, proxyRes.headers)
            proxyRes.pipe(res, { end: true })
        });

        req.pipe(proxyReq, { end: true })
    }).listen(PORT, () => {

        console.log('dev server listening at port ' + PORT)
        require('openurl').open("http://localhost:" + PORT)
    })
})
.catch(() => process.exit(1))

// "dev": "esbuild src/index.tsx --servedir=public --outdir=public --bundle --minify"
