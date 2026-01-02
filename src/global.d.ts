// Global type definitions for MiniApp environment
declare global {
    interface Window {
        my: any;
    }

    const my: {
        getAuthCode: (options: {
            scopes: string[];
            success: (res: { authCode: string }) => void;
            fail: (err: { authErrorScopes?: any }) => void;
        }) => void;

        request: (options: {
            url: string;
            method: string;
            headers?: Record<string, string>;
            data?: any;
            success?: (res: any) => void;
            fail?: (err: any) => void;
        }) => void;

        tradePay: (options: {
            paymentUrl: string;
            success: (res: any) => void;
            fail?: (err: any) => void;
        }) => void;

        getLocation: (options: {
            success: (res: { latitude: number; longitude: number; address?: string }) => void;
            fail: () => void;
        }) => void;

        scan: (options: {
            type: string;
            success: (res: { code: string }) => void;
            fail: (err: any) => void;
        }) => void;

        alert: (options: { title?: string; content?: string }) => void;
        showLoading: (options: { content: string }) => void;
        hideLoading: () => void;
    };
}

export { };
