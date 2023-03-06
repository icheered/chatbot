import { error as throwError } from '@sveltejs/kit';
import { supabase, getThreads, getSettings } from "$lib/supabase";

/** @type {import('./$types').PageServerLoad} */
export async function load({ }) {
    const threads = await getThreads()
    const settings = await getSettings()

    console.log(settings)

    return {
        threads: threads,
        settings: settings
    }
}