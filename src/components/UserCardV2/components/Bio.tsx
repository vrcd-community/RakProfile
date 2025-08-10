import {Markdown} from "@/components/markdown";
import {Textarea} from "@/components/ui/textarea";

interface Props {
  edit: boolean,
  bio: string
}

const Display = ({bio}: { bio: string }) => {
  return (
    <div className="prose prose-sm max-w-none">
      <Markdown content={bio}/>
    </div>
  )
}

const Edit = ({bio}: { bio: string }) => {
  return (
    <div className="prose prose-sm max-w-none">
      <Textarea value={bio} placeholder="写点什么呢..." className="min-h-[200px]"/>
    </div>
  )
}

export const Bio = ({edit, bio}: Props) => {
  return (
    <div className="flex items-center justify-between">
      <Display bio={bio} />
    </div>
  )
}