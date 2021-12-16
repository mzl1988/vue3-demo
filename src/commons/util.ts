
export const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const setTitle = (title?: string) => {
    const { VITE_APP_TITLE } = import.meta.env;
    const processTitle = VITE_APP_TITLE || 'vue3-demo';
    window.document.title = `${title ? `${title} | ` : ''} ${processTitle}`;
}
