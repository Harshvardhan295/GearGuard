import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockCategories, mockTeams, mockUsers, mockWorkCenters } from "@/data/mockData";
import { useState } from "react";

interface EquipmentFormProps {
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
}

export function EquipmentForm({ onSubmit, onCancel }: EquipmentFormProps) {
  const [usedBy, setUsedBy] = useState<'employee' | 'department'>('employee');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Equipment Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter equipment name" />
          </div>
          <div className="space-y-2">
            <Label>Equipment Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {mockCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="serialNumber">Serial Number</Label>
            <Input id="serialNumber" placeholder="Enter serial number" />
          </div>
          <div className="space-y-2">
            <Label>Company</Label>
            <Input value="My Company (San Francisco)" disabled />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Used By</Label>
          <RadioGroup 
            value={usedBy} 
            onValueChange={(v) => setUsedBy(v as 'employee' | 'department')}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="employee" id="employee" />
              <Label htmlFor="employee" className="cursor-pointer">Employee</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="department" id="department" />
              <Label htmlFor="department" className="cursor-pointer">Department</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {usedBy === 'employee' ? (
            <div className="space-y-2">
              <Label>Employee</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" placeholder="Enter department name" />
            </div>
          )}
          <div className="space-y-2">
            <Label>Maintenance Team</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                {mockTeams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>{team.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Technician</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select technician" />
              </SelectTrigger>
              <SelectContent>
                {mockUsers.filter(u => u.role === 'technician' || u.role === 'admin').map((user) => (
                  <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignedDate">Assigned Date</Label>
            <Input id="assignedDate" type="date" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="location">Used in Location</Label>
            <Input id="location" placeholder="Enter location" />
          </div>
          <div className="space-y-2">
            <Label>Work Center</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select work center" />
              </SelectTrigger>
              <SelectContent>
                {mockWorkCenters.map((wc) => (
                  <SelectItem key={wc.id} value={wc.id}>{wc.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="scrapDate">Scrap Date</Label>
          <Input id="scrapDate" type="date" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Enter equipment description..." rows={4} />
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={() => onSubmit?.({})}>Save Equipment</Button>
        </div>
      </CardContent>
    </Card>
  );
}
