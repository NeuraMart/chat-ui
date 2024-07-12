import type { Message } from "$lib/types/Message";
import { writable } from "svelte/store";

export const repliedOnMessage = writable<Message | undefined>(undefined);
