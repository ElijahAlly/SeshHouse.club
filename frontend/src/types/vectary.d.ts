declare global {
    interface Window {
        VctrApi: typeof VctrApi;
    }
}

declare class VctrApi {
    constructor(config: {
        element: string;
        sceneId: string;
    });

    init(): Promise<void>;
    on(eventName: string, callback: (event: any) => void): void;
}

export { };