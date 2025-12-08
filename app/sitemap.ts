import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap>{
	return [
		{
			url: 'https://hatayyazilim.com',
			lastModified: new Date(),
			priority: 1,
			changeFrequency: 'daily',
		},
	];


}