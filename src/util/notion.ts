import {
  APIErrorCode,
  APIResponseError,
  type BlockObjectResponse,
  Client,
  collectPaginatedAPI,
  type DatePropertyItemObjectResponse,
  LogLevel,
  type PageObjectResponse,
  type RichTextItemResponse,
} from '@notionhq/client';
import { env } from './env';

const notion = new Client({
  auth: env.NOTION_API_KEY,
  logLevel: env.DEVELOPMENT ? LogLevel.INFO : LogLevel.ERROR,
});

export interface PoemPageObjectResponse extends PageObjectResponse {
  properties: {
    Name: {
      id: string;
      type: 'title';
      title: Array<RichTextItemResponse>;
    };
    Written: {
      id: string;
      type: 'date';
      date: Exclude<DatePropertyItemObjectResponse['date'], null>;
    };
    Status: {
      id: string;
      type: 'status';
      status: {
        id: string;
        name: 'Written';
        color: 'green';
      };
    };
    Category: {
      id: string;
      type: 'select';
      select: {
        id: string;
        name: 'Poem';
        color: 'blue';
      };
    };
    Modification: {
      id: string;
      type: 'last_edited_time';
      last_edited_time: string;
    };
  };
}

function sanitizePoem(page: PoemPageObjectResponse) {
  return {
    ...page,
    properties: {
      ...page.properties,
      Name: {
        ...page.properties.Name,
        title: page.properties.Name.title
          .map((item) => item.plain_text)
          .join(' '),
      },
      Written: {
        ...page.properties.Written,
        start: new Date(page.properties.Written.date.start),
        end: page.properties.Written.date.end
          ? new Date(page.properties.Written.date.end)
          : undefined,
      },
      Modification: {
        ...page.properties.Modification,
        last_edited_time: new Date(
          page.properties.Modification.last_edited_time,
        ),
      },
    },
  };
}

export async function getPoems() {
  const data = (await collectPaginatedAPI(notion.dataSources.query, {
    data_source_id: env.NOTION_DATA_SOURCE_ID,
    filter: {
      and: [
        {
          property: 'Category',
          select: {
            equals: 'Poem',
          },
        },
        {
          property: 'Status',
          status: {
            equals: 'Written',
          },
        },
      ],
    },
    sorts: [
      {
        direction: 'descending',
        property: 'Written',
      },
    ],
  })) as PoemPageObjectResponse[];

  return data.map(sanitizePoem);
}

export async function getPoem(id: string) {
  try {
    const data = (await notion.pages.retrieve({
      page_id: id,
    })) as PoemPageObjectResponse;

    return sanitizePoem(data);
  } catch (error) {
    if (
      error instanceof APIResponseError &&
      (error.code === APIErrorCode.ObjectNotFound ||
        error.code === APIErrorCode.ValidationError)
    ) {
      return null;
    }
    throw error;
  }
}

export function getPoemContent(id: string) {
  return collectPaginatedAPI(notion.blocks.children.list, {
    block_id: id,
  }) as Promise<BlockObjectResponse[]>;
}
