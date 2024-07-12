import type { MessageUpdate } from "./MessageUpdate";
import type { Timestamps } from "./Timestamps";
import type { WebSearch } from "./WebSearch";
import type { v4 } from "uuid";

export type Message = Partial<Timestamps> & {
	from: "user" | "assistant" | "system";
	id: ReturnType<typeof v4>;
	content: string;
	updates?: MessageUpdate[];
	webSearchId?: WebSearch["_id"]; // legacy version
	webSearch?: WebSearch;
	score?: -1 | 0 | 1;
	files?: string[]; // can contain either the hash of the file or the b64 encoded image data on the client side when uploading
	interrupted?: boolean;

	// needed for conversation trees
	ancestors?: Message["id"][];

	// goes one level deep
	children?: Message["id"][];

	//repliedMessage
	repliedOnMessage?: Message["id"];
};
