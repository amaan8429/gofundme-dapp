import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface FormRightWrapperProps {
  form: {
    requiredAmount: string
    category: string
  }
  formHandler: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export function FormRightWrapper({ form, formHandler }: FormRightWrapperProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="requiredAmount">Required Amount</Label>
        <Input
          id="requiredAmount"
          name="requiredAmount"
          type="number"
          value={form.requiredAmount}
          onChange={formHandler}
          placeholder="Enter required amount"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select name="category" value={form.category} onValueChange={(value) => formHandler({ target: { name: 'category', value } } as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="animal">Animal</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

