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
		thread_name: 'Random name'
	}
	supabase.from('threads').upsert(thread_data, { onConflict: 'thread_id' }).then((data, error) => {
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
	return supabase.from('messages').select().eq('thread_id', thread_id)
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