import { writable, derived, type Writable } from 'svelte/store';

import type { ChatMessage, Thread, Setting } from '$lib/types';

// APPLICATION STATE
export const chatMessages: Writable<ChatMessage[]> = writable([]);
export const new_thread: Writable<boolean> = writable(true);
export const threads: Writable<Thread[]> = writable([]);
export const thread_id: Writable<string> = writable('');

export const current_thread = derived(
    [threads, thread_id],
    ([$threads, $thread_id]) => {
        const thread = $threads.find(t => t.thread_id === $thread_id);
        return thread ? thread : null;
    }
);


// SETTINGS
export const showRaw = writable(false);
export const showSuffixPrompt = writable(false);
export const storedSettings: Writable<Setting[]> = writable([]);