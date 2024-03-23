// A simple Notion page object without properties
export const baseNotionObject = {
    object: "page",
    id: "9ab4801e-62e2-4f9c-b81c-6368229e75c3",
    created_time: "2024-03-17T02:40:00.000Z",
    last_edited_time: "2024-03-17T02:40:00.000Z",
    created_by: {
        object: "user",
        id: "c6e024e0-7b92-449c-b2a0-3035ecadb870",
    },
    last_edited_by: {
        object: "user",
        id: "c6e024e0-7b92-449c-b2a0-3035ecadb870",
    },
    cover: null,
    icon: null,
    parent: {
        type: "database_id",
        database_id: "2ec5c7e5-36d6-43ae-b474-a1e16925b6ac",
    },
    archived: false,
    properties: {},
    url: "https://www.notion.so/updated-page-9ab4801e62e24f9cb81c6368229e75c3",
    public_url: null,
};

export const baseTableSchema = {
    object: "database",
    id: "2ec5c7e5-36d6-43ae-b474-a1e16925b6ac",
    cover: null,
    icon: null,
    created_time: "2024-03-16T17:23:00.000Z",
    created_by: {
        object: "user",
        id: "c6e024e0-7b92-449c-b2a0-3035ecadb870",
    },
    last_edited_by: {
        object: "user",
        id: "c6e024e0-7b92-449c-b2a0-3035ecadb870",
    },
    last_edited_time: "2024-03-17T02:40:00.000Z",
    title: [
        {
            type: "text",
            text: {
                content: "Test database",
                link: null,
            },
            annotations: {
                bold: false,
                italic: false,
                strikethrough: false,
                underline: false,
                code: false,
                color: "default",
            },
            plain_text: "Test database",
            href: null,
        },
    ],
    description: [],
    is_inline: false,
    properties: {
        "Multi Select": {
            id: "%3EP%60%7D",
            name: "Multi Select",
            type: "multi_select",
            multi_select: {
                options: [
                    {
                        id: "d521ee51-b4ad-468d-979a-d230875c1cf8",
                        name: "option 1",
                        color: "green",
                        description: null,
                    },
                    {
                        id: "82303241-ae20-4690-bd0b-349a1528954c",
                        name: "option 2",
                        color: "red",
                        description: null,
                    },
                ],
            },
        },
        Number: {
            id: "DT%3Eg",
            name: "Number",
            type: "number",
            number: {
                format: "number",
            },
        },
        Select: {
            id: "FSau",
            name: "Select",
            type: "select",
            select: {
                options: [
                    {
                        id: "b5b79bb7-e513-4513-9c0f-8cf81392b189",
                        name: "option 1",
                        color: "red",
                        description: null,
                    },
                    {
                        id: "6d563771-a494-4cc7-ab67-797f9e00fba9",
                        name: "option 2",
                        color: "orange",
                        description: null,
                    },
                ],
            },
        },
        Date: {
            id: "MJSZ",
            name: "Date",
            type: "date",
            date: {},
        },
        URL: {
            id: "gvld",
            name: "URL",
            type: "url",
            url: {},
        },
        Checkbox: {
            id: "jWlx",
            name: "Checkbox",
            type: "checkbox",
            checkbox: {},
        },
        Text: {
            id: "qF%7Cq",
            name: "Text",
            type: "rich_text",
            rich_text: {},
        },
        Status: {
            id: "ynbl",
            name: "Status",
            type: "status",
            status: {
                options: [
                    {
                        id: "fe8bbd6b-11ac-4c32-b9ba-a63b14bff7cd",
                        name: "Not started",
                        color: "default",
                        description: null,
                    },
                    {
                        id: "fec67dab-ecf7-4c94-a9ff-dbce4f5cd87a",
                        name: "In progress",
                        color: "blue",
                        description: null,
                    },
                    {
                        id: "13edf371-8bb1-4d19-921d-a095831dfab0",
                        name: "Done",
                        color: "green",
                        description: null,
                    },
                ],
                groups: [
                    {
                        id: "90f90db3-6f8a-4637-aef0-c9404f2f4dac",
                        name: "To-do",
                        color: "gray",
                        option_ids: ["fe8bbd6b-11ac-4c32-b9ba-a63b14bff7cd"],
                    },
                    {
                        id: "85b7848b-da31-492f-9999-4d9ceb2b7280",
                        name: "In progress",
                        color: "blue",
                        option_ids: ["fec67dab-ecf7-4c94-a9ff-dbce4f5cd87a"],
                    },
                    {
                        id: "b84ad8ca-88df-4f6d-a416-3dc204e3a1ce",
                        name: "Complete",
                        color: "green",
                        option_ids: ["13edf371-8bb1-4d19-921d-a095831dfab0"],
                    },
                ],
            },
        },
        ID: {
            id: "zw%40%3E",
            name: "ID",
            type: "unique_id",
            unique_id: {
                prefix: "PREFIX",
            },
        },
        Title: {
            id: "title",
            name: "Title",
            type: "title",
            title: {},
        },
    },
    parent: {
        type: "page_id",
        page_id: "df1351cc-c3ae-4e82-8fa6-c92061273e54",
    },
    url: "https://www.notion.so/2ec5c7e536d643aeb474a1e16925b6ac",
    public_url: null,
    archived: false,
    request_id: "3ed0d6af-e21b-4940-9508-192090e5be63",
};
