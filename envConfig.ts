type Config = {
	url: string;
};

export const config: Config = {
	url: process.env.NEXT_PUBLIC_API_URL || '',
} as const;
