import { http } from 'msw';

const checkApiExists = async (url: string): Promise<boolean> => {
    try {
        const response = await fetch(url, { method: 'HEAD' }); // `HEAD` 요청으로 API 존재 확인
        return response.ok; // 200~299 상태 코드면 API 존재함

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return false;
    }
};

// API 모킹을 설정하는 비동기 함수로, MSW(서비스 워커)를 설정해 브라우저에서 네트워크 요청을 모킹
const enableMocking = async () => {
    // vite의 경우
    // 개발 환경에서만 MSW를 활성화
    if (!import.meta.env.DEV) {
        return;
    }

    // 해당 파일에서 설정한 MSW의 worker 객체를 동적 로딩해 모킹을 설정
    const { worker } = await import('@mocks/browser.ts');

    const apiExists = await checkApiExists('https://api.example.com'); // 실제 API 엔드포인트

    if (!apiExists) {
        console.log('MSW 활성화: API가 존재하지 않습니다.');
        return worker.start();
    } else {
        console.log('MSW 비활성화: 실제 API 사용');
    }
};

const getRest = <T>(url: string, response?: T) => {
    return http.get(url, async () => {
        return new Response(
            JSON.stringify({
                code: 201,
                message: 'Mock Data를 호출했습니다 (GET)',
                data: response ? response : null,
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    });
};

const postRest = <T>(url: string, response?: T) => {
    return http.post(url, async () => {
        return new Response(
            JSON.stringify({
                code: 1001,
                message: 'Mock Data를 호출했습니다 (POST)',
                data: response ? response : null,
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    });
};

const deleteRest = <T>(url: string, response?: T) => {
    return http.delete(url, async () => {
        return new Response(
            JSON.stringify({
                code: 1001,
                message: 'Mock Data를 호출했습니다 (DELETE)',
                data: response ? response : null,
            }),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    });
};

export { enableMocking, getRest, postRest, deleteRest };
