import { beforeEach, describe, expect, test } from "bun:test";
import { baseTableSchema } from "./testAssets";

// Import the function to test
import { jsonToNotion } from "../src/json_to_notion";

describe("JSON to Notion", () => {
    describe("Basic conversions", () => {
        test("Title", () => {
            const input = {
                Title: "Test Title",
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Title: {
                    title: [
                        {
                            text: {
                                content: "Test Title",
                            },
                        },
                    ],
                },
            });
        });

        test("Text", () => {
            const input = {
                Text: "page 1",
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Text: {
                    rich_text: [
                        {
                            text: {
                                content: "page 1",
                            },
                        },
                    ],
                },
            });
        });

        test("Number", () => {
            const input = {
                Number: 42,
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Number: {
                    number: 42,
                },
            });
        });

        test("Select", () => {
            const input = {
                Select: "option 1",
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Select: {
                    select: {
                        name: "option 1",
                    },
                },
            });
        });

        test("MultiSelect", () => {
            const input = {
                "Multi Select": ["option 1", "option 2"],
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                "Multi Select": {
                    multi_select: [
                        {
                            name: "option 1",
                        },
                        {
                            name: "option 2",
                        },
                    ],
                },
            });
        });

        test("Status", () => {
            const input = {
                Status: "Done",
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Status: {
                    status: {
                        name: "Done",
                    },
                },
            });
        });

        test("Single Date", () => {
            const input = {
                Date: {
                    start: "2024-03-16",
                },
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Date: {
                    date: {
                        start: "2024-03-16",
                        end: null,
                    },
                },
            });
        });

        test("DateTime Range", () => {
            const input = {
                Date: {
                    start: "2024-03-16T00:00:00.000-05:00",
                    end: "2024-03-17T00:00:00.000-05:00",
                },
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Date: {
                    date: {
                        start: "2024-03-16T00:00:00.000-05:00",
                        end: "2024-03-17T00:00:00.000-05:00",
                    },
                },
            });
        });

        test("DateTime Range Incomplete", () => {
            const input = {
                Date: {
                    start: "2024-03-16T00:00:00.000-05:00",
                    end: null,
                },
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Date: {
                    date: {
                        start: "2024-03-16T00:00:00.000-05:00",
                        end: null,
                    },
                },
            });
        });

        test("Checkbox", () => {
            const input = {
                Checkbox: true,
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Checkbox: {
                    checkbox: true,
                },
            });
        });

        test("URL", () => {
            const input = {
                URL: "https://example.com",
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                URL: {
                    url: "https://example.com",
                },
            });
        });
    });

    describe("Empty value conversions", () => {
        test("Null Title", () => {
            const input = {
                Title: null,
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Title: {
                    title: [],
                },
            });
        });

        test("Empty String Title", () => {
            const input = {
                Title: "",
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Title: {
                    title: [],
                },
            });
        });

        test("Null Text", () => {
            const input = {
                Text: null,
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Text: {
                    rich_text: [],
                },
            });
        });

        test("Empty String Text", () => {
            const input = {
                Text: "",
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Text: {
                    rich_text: [],
                },
            });
        });

        test("Null Number", () => {
            const input = {
                Number: null,
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Number: {
                    number: null,
                },
            });
        });

        test("Null Select", () => {
            const input = {
                Select: null,
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Select: {
                    select: null,
                },
            });
        });

        test("Empty MultiSelect", () => {
            const input = {
                "Multi Select": [],
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                "Multi Select": {
                    multi_select: [],
                },
            });
        });

        test("Null Status", () => {
            const input = {
                Status: null,
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Status: {
                    status: null,
                },
            });
        });

        test("Null Date", () => {
            const input = {
                Date: null,
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Date: {
                    date: null,
                },
            });
        });

        test("Null Date Range End", () => {
            const input = {
                Date: {
                    start: "2024-03-16",
                    end: null,
                },
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Date: {
                    date: {
                        start: "2024-03-16",
                        end: null,
                    },
                },
            });
        });

        test("Null Checkbox", () => {
            const input = {
                Checkbox: null,
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                Checkbox: {
                    checkbox: false,
                },
            });
        });

        test("Null URL", () => {
            const input = {
                URL: null,
            };

            expect(jsonToNotion(input, baseTableSchema)).toEqual({
                URL: {
                    url: null,
                },
            });
        });
    });

    // mixed types
    test("Mixed types", () => {
        const input = {
            Title: "page 1",
            Description: "There is some **text** in this property!",
            Number: 2,
            Select: "option 1",
            "Multi Select": ["option 2", "option 1"],
            Status: "Done",
            Date: {
                start: "2024-03-16T00:00:00.000-05:00",
                end: "2024-03-17T00:00:00.000-05:00",
            },
            Checkbox: true,
            URL: "https://www.notion.so",
        };

        expect(jsonToNotion(input, baseTableSchema)).toEqual({
            Title: {
                title: [
                    {
                        text: {
                            content: "page 1",
                        },
                    },
                ],
            },
            Number: {
                number: 2,
            },
            Select: {
                select: {
                    name: "option 1",
                },
            },
            "Multi Select": {
                multi_select: [
                    {
                        name: "option 2",
                    },
                    {
                        name: "option 1",
                    },
                ],
            },
            Status: {
                status: {
                    name: "Done",
                },
            },
            Date: {
                date: {
                    start: "2024-03-16T00:00:00.000-05:00",
                    end: "2024-03-17T00:00:00.000-05:00",
                },
            },
            Checkbox: {
                checkbox: true,
            },
            URL: {
                url: "https://www.notion.so",
            },
        });
    });
});
