export { default as baseStaticUrl } from './baseStaticUrl';
export { default as baseApiUrl } from './baseApiUrl';
export { default as setTitle } from './setTitle';
export const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
