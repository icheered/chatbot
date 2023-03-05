import { writable, type Writable } from 'svelte/store';

import type { ChatMessage, Thread } from '$lib/types';

// APPLICATION STATE
export const chatMessages: Writable<ChatMessage[]> = writable([]);
export const threads: Writable<Thread[]> = writable([]);
export const thread_id: Writable<string> = writable('');
export const new_thread: Writable<boolean> = writable(true);


// SETTINGS
export const showRaw = writable(false);