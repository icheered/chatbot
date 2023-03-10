import { createClient } from "@supabase/supabase-js"

import type { ChatMessage as ChatMessageType } from "$lib/types"
import {
	PUBLIC_SUPABASE_ANON_KEY,
	PUBLIC_SUPABASE_URL,
} from "$env/static/public"

export const supabase = createClient(
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_ANON_KEY,
)


export function createThreadIfNotExist(thread_id: string) {
	const thread_data = {
		thread_id: thread_id,
		thread_name: 'Placeholder...'
	}
	supabase.from('threads').insert(thread_data).then((data, error) => {
		if (error) {
			console.log("Error creating thread: ", error)
		}
	})
}

export function upsertMessages(messages: ChatMessageType[]) {
	createThreadIfNotExist(messages[0].thread_id)
	supabase.from('messages').upsert(messages).then((data, error) => {
		if (error) {
			console.log("Error upserting messages: ", error)
		}
		return data
	})
}

export function getMessages(thread_id: string) {
	return supabase.from('messages').select().eq('thread_id', thread_id).order("created_at", { ascending: true })
		.then((data, error) => {
			if (error) {
				console.log("Error getting messages: ", error)
				throw error
			}
			return data.data
		})
}

export function getThreads() {
	return supabase.from('threads').select().order("created_at", { ascending: false }).then((data, error) => {
		if (error) {
			console.log("Error getting threads: ", error)
			throw error
		}
		return data.data
	})
}
export function getSettings() {
	return supabase.from('settings').select().then((data, error) => {
		if (error) {
			console.log("Error getting settings: ", error)
			throw error
		}
		return data.data
	})
}

export function deleteThread(thread_id: string) {
	return supabase.from('messages').delete().eq('thread_id', thread_id).then((data, error) => {
		if (error) {
			console.log("Error deleting messages: ", error)
		}
		return supabase.from('threads').delete().eq('thread_id', thread_id).then((data, error) => {
			if (error) {
				console.log("Error deleting thread: ", error)
			}
			return data
		})
	})
}

export function updateThreadName(thread_id: string, thread_name: string) {
	console.log(thread_id)
	return supabase.from('threads').update({ thread_name: thread_name }).eq('thread_id', thread_id).select().then((data, error) => {
		if (error) {
			console.log("Error updating thread name: ", error)
		}
		console.log("Updated thread: ", data)
		return getThreads()
	})
}

export function updateThreadTokens(thread_id: string, tokens: number) {
	// thread_id = "eabe6e80-e95d-466a-aeb5-c0ece9aed6d1"
	// tokens = 10
	console.log("Updating tokens!")

	return supabase.from('threads').update({ tokens: tokens }).eq('thread_id', thread_id).select().then((data, error) => {
		if (error) {
			console.log("Error updating thread tokens: ", error)
		}
		console.log("Updated thread: ", data)
		//return getThreads()
	})
}


export function updateSuffixPrompt(suffix_prompt: string) {
	return supabase.from('settings').upsert({ value: suffix_prompt, key: 'suffix_prompt' }).eq('key', "suffix_prompt").select().then((data, error) => {
		if (error) {
			console.log("Error updating suffix prompt: ", error)
		}
		console.log("Updated suffix prompt: ", data)
	})
}