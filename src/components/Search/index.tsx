import axios from "axios";
import Markdown from "react-markdown";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface SearchRespose {
  timing: {
    took: number;
    timeout: boolean;
  };
  debug: {
    _data: {
      value: number;
      relation: string;
    };
    _source: {
      max: number;
    }
  };
  hits: {
    _score: number;
    _source: {
      chunk: {
        title: string;
        level: number;
        content: string;
      },
      title: string;
      extra: {
        source: string;
        tags: string[];
        path: string;
      }
    }
  }[]
}

interface SearchItemProps {
  hit: {
    _source: {
      title: string;
      extra: {
        path: string;
        source: string;
        tags: string[];
      };
      chunk: {
        content: string;
        title: string;
      };
    };
  };
}

const DoSearch = async (search: string): Promise<SearchRespose> => {
  const url = `https://ifs.imoe.xyz/api/v1/vrcd/search_service/search`
  const data = {
    query: search,
    filter: {},
    offset: 0,
    size: 20
  }

  const response = await axios.post(url, data, {
    headers: {
      "Authorization": "Bearer ncP4sj4FzFEzU5pieSdsjcZdsr7tE6RK63BCRPNWL3VpDZF2aQ8jv4nihg7MpPYaBGC8TrJk8MiSJTrQ84j5vQwdiWotuDY5RYmsdcqHL7gh8kwytXAesTKziBvpKLrc"
    }
  })

  return response.data
}

const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g
const rCombining = /[\u0300-\u036F]/g

export function slugify(str: string): string {
  return (
    str
      .normalize("NFKD")
      // Remove accents
      .replace(rCombining, "")
      // Remove control characters
      .replace(rControl, "")
      // Replace special characters
      .replace(rSpecial, "-")
      // Remove continuos separators
      .replace(/-{2,}/g, "-")
      // Remove prefixing and trailing separators
      .replace(/^-+|-+$/g, "")
      // ensure it doesn't start with a number (#121)
      .replace(/^(\d)/, "_$1")
      // lowercase
      .toLowerCase()
  )
}

const SearchItemHeader = ({
  title,
  path,
  source,
  tags,
  chunkTitle
}: {
  title: string;
  path: string;
  source: string;
  tags: string[];
  chunkTitle: string;
}) => {
  const urlFormatter = () => {
    if (source === "bookstack") {
      path = path + "#" + ("bkmrk-" + chunkTitle).substring(0, 26).toLowerCase()
      return path
    }

    const docs = [
      "creators.vrchat.com",
      "docs.vrchat.com",
      "udonsharp.docs.vrchat.com",
      "vcc.docs.vrchat.com",
      "clientsim.docs.vrchat.com"
    ]

    if (docs.includes(source)) {
      path = (
        "https://docs.vrczh.org/" +
        path.replace(".md", "") +
        "#" +
        slugify(chunkTitle)
      )

      return path;
    }

    return path;
  }

  return (
    <div className="flex items-start justify-between">
      <div>
        <Link
          href={urlFormatter()}
          target="_blank"
          className="text-xl font-semibold hover:text-primary flex items-center gap-2"
        >
          {title}
          <ExternalLink className="h-4 w-4" />
        </Link>
        <p className="text-sm text-muted-foreground">{source}</p>
      </div>
      <div className="flex gap-2">
        {tags.map((tag, i) => (
          <Badge key={i} variant="secondary">
            {tag}
          </Badge>
        ))}
        <Badge variant="outline">来源: {source}</Badge>
      </div>
    </div>
  );
};

const SearchItem = ({ hit }: SearchItemProps) => {
  const { title, extra, chunk } = hit._source;

  return (
    <Card className="p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex flex-col gap-2 relative">
        <SearchItemHeader
          title={title}
          path={extra.path}
          source={extra.source}
          tags={extra.tags}
          chunkTitle={chunk.title}
        />
        <div
          className="max-h-[180px] overflow-y-hidden prose prose-sm dark:prose-invert"
        >
          <Markdown>{chunk.content}</Markdown>
        </div>
        <div
          className={`absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t dark:from-[#1C1917] from-[#FFFFFF] to-transparent block`}
        />
      </div>
    </Card>
  );
};

export const Search = async ({ search }: { search: string }) => {
  const response = await DoSearch(search)
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        找到 {response.hits.length} 个结果 ({response.timing.took}ms)
      </p>
      {response.hits.map((hit, index) => (
        <SearchItem
          key={`${index}:${hit._source.chunk.title}`}
          hit={hit}
        />
      ))}
    </div>
  )
}