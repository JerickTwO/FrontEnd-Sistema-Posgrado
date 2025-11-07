// Polyfills para @react-pdf/renderer y dependencias que esperan APIs de Node
import { Buffer } from 'buffer';

// Asegura objetos globales en distintos entornos (navegador, workers)
if (typeof globalThis !== 'undefined') {
	if (!globalThis.Buffer) globalThis.Buffer = Buffer;
	if (!globalThis.global) globalThis.global = globalThis;
	if (!globalThis.process) globalThis.process = { env: {} };
}

if (typeof window !== 'undefined') {
	if (!window.Buffer) window.Buffer = Buffer;
	if (!window.global) window.global = window;
	if (!window.process) window.process = { env: {} };
}

// Para Web Workers
/* eslint-disable no-undef */
if (typeof self !== 'undefined') {
	if (!self.Buffer) self.Buffer = Buffer;
	if (!self.process) self.process = { env: {} };
}
/* eslint-enable no-undef */

export default Buffer;