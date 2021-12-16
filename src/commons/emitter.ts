import mitt, { Emitter } from 'mitt';

const instance: Emitter = mitt();
export const emitter = instance;
