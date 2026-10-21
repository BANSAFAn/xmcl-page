import { writeFileSync, existsSync } from "fs";
import { resolve } from "path";
import { execSync } from "child_process";

const path = resolve('.env')
if (process.env.PROD && process.env.VITE_GITHUB_TOKEN) {
    writeFileSync(path, `VITE_GITHUB_TOKEN=${process.env.VITE_GITHUB_TOKEN}`)
    console.log(path, 'Write .env file successfully!')
} else {
    console.log(path, 'No need to write .env file.', !!process.env.PROD, !!process.env.VITE_GITHUB_TOKEN)
}

const corePath = resolve('src/en/core/sidebar.json')
if (!existsSync(corePath)) {
    try {
        console.log('Cloning minecraft-launcher-core-node gh-pages into src/en/core...')
        execSync('git clone --branch gh-pages --depth 1 https://github.com/voxelum/minecraft-launcher-core-node src/en/core', { stdio: 'inherit' })
    } catch (e) {
        console.error('Failed to clone core docs:', e)
    }
}
