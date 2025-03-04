import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd()); // 현재 환경(`mode`)을 기반으로 `.env` 파일 로드

    return {
        plugins: [react(), tsconfigPaths()],
        server: {
            port: 5173,
            strictPort: true,
            proxy: {
                '/api': {
                    target: env.VITE_API_URL, // 환경 변수 적용
                    changeOrigin: true,
                    secure: env.VITE_API_SECURE as unknown as boolean,
                },
                '/sample': {
                    target: env.VITE_API_URL, // 환경 변수 적용
                    changeOrigin: true,
                    secure: env.VITE_API_SECURE as unknown as boolean,
                },
            },
        },
    };
});
