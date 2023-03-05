import { error as throwError } from '@sveltejs/kit';
import { supabase, getThreads } from "$lib/supabase";

/** @type {import('./$types').PageServerLoad} */
export async function load({ }) {
    const threads = await getThreads()

    return {
        threads: threads
    }
}