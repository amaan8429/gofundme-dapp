import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface FormLeftWrapperProps {
  form: {
    campaignTitle: string
    story: string
  }
  formHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function FormLeftWrapper({ form, formHandler }: FormLeftWrapperProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="campaignTitle">Campaign Title</Label>
        <Input
          id="campaignTitle"
          name="campaignTitle"
          value={form.campaignTitle}
          onChange={formHandler}
          placeholder="Enter campaign title"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="story">Story</Label>
        <Textarea
          id="story"
          name="story"
          value={form.story}
          onChange={formHandler}
          placeholder="Describe your story"
          className="min-h-[160px]"
        />
      </div>
    </div>
  )
}

