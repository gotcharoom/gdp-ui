import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier'; // Prettier 설정 추가
import prettierPlugin from 'eslint-plugin-prettier'; // Prettier 플러그인 추가

export default tseslint.config(
    { ignores: ['dist'] }, // `dist` 폴더는 ESLint 검사를 무시
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'], // 검사 대상 파일
        // ESLint가 코드 해석시 사용할언어 설정 (분석)
        languageOptions: {
            ecmaVersion: 2021, // ECMAScript 2021 문법 지원
            globals: globals.browser, // 브라우저 환경 전역 변수를 허용 (ex / window.innerWidth)

            // ESLint의 Parser가 문법을 어떻게 분석할지를 지정하는 옵션 (실제 파싱)
            // 분석과 실제 파싱 시 다를 수 있기 떄문에 옵션을 추가 지정해줌
            parserOptions: {
                ecmaVersion: 2021, // 최신 ECMAScript 문법 지원 (보통 languageOptions에 맞춤)
                ecmaFeatures: { jsx: true }, // JSX 문법을 허용 (React에서 사용)
                /*
                 * script : Node.js에서 사용
                 * module : 브라우저 / 최신 Node.js에서 사용
                 * */
                sourceType: 'module', // ECMAScript 모듈(ESM) 사용 (옵션 script, module)
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier: prettierPlugin, // Prettier 플러그인 추가
        },
        rules: {
            /* 권장 설정 */
            // ...js.configs.recommended.rules, // ESLint 추천 규칙 적용 (extends로 대체)
            ...react.configs.recommended.rules, // React 권장 규칙 적용,
            // ...react.configs['jsx-runtime'].rules, // JSX 런타임 관련 규칙 (React 17+에서 불필요)
            ...reactHooks.configs.recommended.rules, // React Hooks 추천 규칙 적용

            /* 개별 설정 */
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], // React Fast Refresh 관련 : 컴포넌트만 export 하도록 경고
            'prettier/prettier': 'error', // Prettier 규칙을 위반하면 ESLint에서 에러로 처리
            'react/react-in-jsx-scope': 'off', // JSX에서 React import 안 해도 되도록 설정
        },
    },
);
