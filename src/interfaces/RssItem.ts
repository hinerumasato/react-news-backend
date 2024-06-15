export interface RssItem {
    items: Array<{
        creator: string;
        title: string;
        link: string;
        pubDate: string;
        "dc:creator": string;
        content: string;
        contentSnippet: string;
        guid: string;
        categories: Array<{
            _ : string;
            $: {domain: string};
        }>;
        isoDate: string;
    }>
}